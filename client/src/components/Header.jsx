import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <h1 className="text-3xl font-bold">CTA Assistant</h1>
          <p className="text-sm mt-1 opacity-90">
            Ciencia, Tecnología y Ambiente - 5to Secundaria
          </p>
        </Link>
      </div>
    </header>
  )
}

export default Header
