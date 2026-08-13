import { Link, useLocation } from "react-router-dom"

function Navbar(){

  const location = useLocation()

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg font-medium transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`

  return(

    <nav className="bg-white shadow-md border-b">

      <div className="max-w-6xl mx-auto px-6">

        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-600">
            YouTube Tools
          </h1>

          {/* Menu */}
          <div className="flex items-center gap-4">

            <Link to="/" className={linkStyle("/")}>
              SEO Tags
            </Link>

            <Link to="/thumbnail" className={linkStyle("/thumbnail")}>
              Thumbnail
            </Link>

            <Link to="/video-details" className={linkStyle("/video-details")}>
              Video Data
            </Link>

            {/* NEW AI FEATURE */}
            <Link to="/ai-thumbnail" className={linkStyle("/ai-thumbnail")}>
              AI Thumbnail 🚀
            </Link>

          </div>

        </div>

      </div>

    </nav>

  )

}

export default Navbar