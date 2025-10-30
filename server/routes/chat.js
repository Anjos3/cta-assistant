import express from 'express'
import openai from '../utils/openai.js'
import chatLimiter from '../middleware/rateLimit.js'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Cargar datos de competencias
let competencies = null
async function loadCompetencies() {
  if (!competencies) {
    const dataPath = path.join(__dirname, '../data/competencies.json')
    const data = await readFile(dataPath, 'utf-8')
    competencies = JSON.parse(data)
  }
  return competencies
}

// Endpoint principal del chat
router.post('/', chatLimiter, async (req, res) => {
  try {
    const { message, competencyId, topic, conversationHistory = [] } = req.body

    // Validación
    if (!message || message.length > 500) {
      return res.status(400).json({
        error: 'Mensaje inválido',
        message: 'El mensaje debe tener entre 1 y 500 caracteres',
      })
    }

    if (!competencyId) {
      return res.status(400).json({
        error: 'Competencia no especificada',
      })
    }

    // Cargar competencias
    const competenciesData = await loadCompetencies()
    const competency = competenciesData.competencies.find((c) => c.id === competencyId)

    if (!competency) {
      return res.status(404).json({
        error: 'Competencia no encontrada',
      })
    }

    // Construir el system prompt contextualizado
    const systemPrompt = `Eres un asistente educativo especializado en Ciencia, Tecnología y Ambiente (CTA) para estudiantes de 5to grado de secundaria en Perú.

CONTEXTO DEL CURRÍCULO PERUANO:
- Trabajas bajo el enfoque de competencias del Ministerio de Educación del Perú
- Los estudiantes desarrollan CAPACIDADES para lograr COMPETENCIAS
- El enfoque pedagógico es de indagación y alfabetización científica y tecnológica

COMPETENCIA ACTUAL: ${competency.name}

CAPACIDADES DE ESTA COMPETENCIA:
${competency.capacidades.map((cap, i) => `${i + 1}. ${cap}`).join('\n')}

TEMA ESPECÍFICO ACTUAL: ${topic || 'General'}

DESCRIPCIÓN: ${competency.description}

TU ROL COMO ASISTENTE:
- Explica conceptos de física de manera clara y apropiada para adolescentes de 15-16 años
- Usa ejemplos del contexto peruano cuando sea posible (ej: recursos naturales del Perú, fenómenos locales)
- Fomenta el pensamiento científico y la indagación mediante preguntas reflexivas
- Conecta los conceptos con las capacidades que están desarrollando
- Sé paciente, alentador y motivador
- Usa lenguaje sencillo pero científicamente preciso
- Relaciona la teoría con aplicaciones prácticas y cotidianas
- Si no sabes algo, sé honesto y sugiere recursos adicionales

INSTRUCCIONES DE FORMATO:
- Mantén las respuestas concisas: máximo 150 palabras
- Incluye preguntas de reflexión cuando sea apropiado
- Sugiere experimentos o simulaciones virtuales relacionadas cuando sea relevante
- NO resuelvas tareas completamente, guía al estudiante a pensar y descubrir
- Usa ejemplos concretos y visuales en tus explicaciones

IMPORTANTE: Estás aquí para GUIAR el aprendizaje, no para dar respuestas directas a tareas.`

    // Preparar mensajes para OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10).map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ]

    // Llamar a OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    })

    const assistantMessage = completion.choices[0].message.content

    res.json({
      message: assistantMessage,
      competency: competency.name,
      topic: topic,
    })
  } catch (error) {
    console.error('Error en /api/chat:', error)

    // Manejo de errores específicos de OpenAI
    if (error.code === 'insufficient_quota') {
      return res.status(503).json({
        error: 'Servicio temporalmente no disponible',
        message: 'La cuota de la API ha sido excedida. Por favor contacta al administrador.',
      })
    }

    if (error.code === 'invalid_api_key') {
      return res.status(500).json({
        error: 'Error de configuración',
        message: 'La API key no es válida. Por favor contacta al administrador.',
      })
    }

    res.status(500).json({
      error: 'Error al procesar la pregunta',
      message: 'Hubo un problema al procesar tu pregunta. Por favor intenta de nuevo.',
    })
  }
})

export default router
