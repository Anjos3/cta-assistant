import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import competenciesData from '../data/competencies.json'
import videosData from '../data/videos.json'
import labsData from '../data/labs.json'
import ResourceList from '../components/ResourceList'
import ChatBot from '../components/ChatBot'

function CompetencyDetail() {
  const { id } = useParams()
  const [competency, setCompetency] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    const comp = competenciesData.competencies.find((c) => c.id === id)
    setCompetency(comp)
    if (comp && comp.topics.length > 0) {
      setSelectedTopic(comp.topics[0])
    }
  }, [id])

  if (!competency) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-primary hover:text-blue-600 mb-6"
      >
        ← Volver a competencias
      </Link>

      <div className="card border-t-4 mb-8" style={{ borderTopColor: competency.color }}>
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
            style={{ backgroundColor: competency.color }}
          >
            {competency.id.replace('comp', '')}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {competency.name}
            </h1>
            <p className="text-gray-600">{competency.description}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-lg mb-3 text-gray-800">Capacidades:</h3>
          <ul className="grid md:grid-cols-2 gap-3">
            {competency.capacidades.map((cap, index) => (
              <li key={index} className="flex items-start">
                <span
                  className="font-bold mr-2 flex-shrink-0"
                  style={{ color: competency.color }}
                >
                  •
                </span>
                <span className="text-gray-700">{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Temas</h2>
        <div className="flex flex-wrap gap-2">
          {competency.topics.map((topic, index) => (
            <button
              key={index}
              onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTopic === topic
                  ? 'text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={{
                backgroundColor: selectedTopic === topic ? competency.color : '',
              }}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {selectedTopic && (
        <ResourceList
          topic={selectedTopic}
          competencyId={competency.id}
          videos={videosData.resources}
          labs={labsData.virtualLabs}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50">
        {!showChat ? (
          <button
            onClick={() => setShowChat(true)}
            className="w-16 h-16 rounded-full text-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center text-2xl"
            style={{ backgroundColor: competency.color }}
            title="Abrir chat con IA"
          >
            💬
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow-2xl w-96 h-[500px] flex flex-col">
            <div
              className="p-4 text-white rounded-t-lg flex justify-between items-center"
              style={{ backgroundColor: competency.color }}
            >
              <h3 className="font-bold">Asistente IA - {competency.name.split(' ')[0]}</h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-white hover:bg-white/20 rounded px-2 py-1"
              >
                ✕
              </button>
            </div>
            <ChatBot
              competency={competency}
              currentTopic={selectedTopic}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CompetencyDetail
