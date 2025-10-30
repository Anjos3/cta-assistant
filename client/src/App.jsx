import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import CompetencyDetail from './pages/CompetencyDetail'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competencia/:id" element={<CompetencyDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
