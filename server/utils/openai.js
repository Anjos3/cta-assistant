import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️ WARNING: OPENAI_API_KEY no está configurada en las variables de entorno')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default openai
