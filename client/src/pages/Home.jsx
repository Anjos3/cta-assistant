import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import competenciesData from '../data/competencies.json'

function Home() {
  const [competencies, setCompetencies] = useState([])

  useEffect(() => {
    setCompetencies(competenciesData.competencies)
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
          Bienvenido al Asistente de CTA
        </h2>
        <p className="text-base sm:text-lg text-gray-600">
          Explora las competencias, accede a videos educativos, laboratorios virtuales
          y consulta con la IA sobre tus temas de estudio.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {competencies.map((competency) => (
          <Link
            key={competency.id}
            to={`/competencia/${competency.id}`}
            className="card border-t-4 hover:scale-105 transform transition-all"
            style={{ borderTopColor: competency.color }}
          >
            <div className="mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3"
                style={{ backgroundColor: competency.color }}
              >
                {competency.id.replace('comp', '')}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                {competency.name}
              </h3>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {competency.description}
            </p>

            <div className="mt-auto">
              <div className="text-sm text-gray-500 mb-2">
                <strong>Capacidades:</strong> {competency.capacidades.length}
              </div>
              <div className="text-sm text-gray-500">
                <strong>Temas:</strong> {competency.topics.length}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <span
                className="text-sm font-semibold"
                style={{ color: competency.color }}
              >
                Ver detalles →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 sm:mt-12 card bg-blue-50 border-l-4 border-blue-500">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
          ¿Cómo usar el asistente?
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">1.</span>
            <span>Selecciona una competencia para ver sus capacidades y temas</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">2.</span>
            <span>Explora videos educativos y laboratorios virtuales por tema</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">3.</span>
            <span>Usa el chatbot IA para hacer preguntas sobre cada competencia</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
