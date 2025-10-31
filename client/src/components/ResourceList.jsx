import { useState, useEffect } from 'react'

function ResourceList({ topic, competencyId, videos, labs }) {
  const [topicVideos, setTopicVideos] = useState([])
  const [topicLabs, setTopicLabs] = useState([])

  useEffect(() => {
    const videoResource = videos.find((v) => v.topic === topic)
    const labResource = labs.find((l) => l.topic === topic)

    setTopicVideos(videoResource?.videos || [])
    setTopicLabs(labResource?.labs || [])
  }, [topic, videos, labs])

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="card">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">📺</span>
          <span className="text-base sm:text-2xl">Videos Educativos - {topic}</span>
        </h3>

        {topicVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {topicVideos.map((video, index) => (
              <a
                key={index}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    ▶
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm sm:text-base text-gray-800 mb-1">{video.title}</h4>
                    {video.description && (
                      <p className="text-xs sm:text-sm text-gray-600">{video.description}</p>
                    )}
                    <p className="text-xs text-primary mt-2">Ver en YouTube →</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No hay videos disponibles para este tema
          </p>
        )}
      </div>

      <div className="card">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">🔬</span>
          <span className="text-base sm:text-2xl">Laboratorios Virtuales - {topic}</span>
        </h3>

        {topicLabs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {topicLabs.map((lab, index) => (
              <a
                key={index}
                href={lab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-secondary hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-lg flex items-center justify-center text-white flex-shrink-0 text-xl sm:text-2xl">
                    🧪
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm sm:text-base text-gray-800 mb-1">{lab.name}</h4>
                    {lab.description && (
                      <p className="text-xs sm:text-sm text-gray-600">{lab.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {lab.type}
                      </span>
                      <p className="text-xs text-secondary">Abrir simulación →</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No hay laboratorios virtuales disponibles para este tema
          </p>
        )}
      </div>
    </div>
  )
}

export default ResourceList
