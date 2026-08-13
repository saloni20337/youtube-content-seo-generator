import { useState } from "react"
import axios from "axios"

function Home(){

  const [query, setQuery] = useState("")
  const [primary, setPrimary] = useState([])
  const [secondary, setSecondary] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
 const [copied, setCopied] = useState(false)

 const copyTags = () => {
  const allTags = [...primary, ...secondary].join(", ")

  navigator.clipboard.writeText(allTags)

  setCopied(true)

  setTimeout(() => setCopied(false), 2000)
}
  const handleSearch = async () => {
    setLoading(true)
    setError("")
    setPrimary([])
    setSecondary([])

    try {

      const res = await axios.post(
        "http://localhost:8080/youtube/search",
        null,
        {
          params: { videoTitle: query }
        }
      )

      const primaryTags = res.data.primaryVideo?.tags || []
      const related = res.data.relatedVideos || []
      const secondaryTags = related.flatMap(v => v.tags || [])

      setPrimary(primaryTags)
      setSecondary(secondaryTags)

    } catch(err){
      setError("No data found or API error")
    } finally {
      setLoading(false)
    }
  }

  return(
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          SEO Tags Generator
        </h1>

        {/* Input + Button */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter keyword (e.g. spring boot)"
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setQuery(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Generate
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center mt-4 text-blue-500 font-medium">
            Loading...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center mt-4 text-red-500 font-medium">
            {error}
          </p>
        )}

        {/* Primary Tags */}
        {primary.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-green-600 mb-3">
              Primary Tags
            </h2>

            <div className="flex flex-wrap gap-2">
              {primary.map((tag,index)=>(
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Secondary Tags */}
        {secondary.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Related Tags
            </h2>

            <div className="flex flex-wrap gap-2">
              {secondary.map((tag,index)=>(
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
       {(primary.length > 0 || secondary.length > 0) && (
  <div className="mt-8 text-center">

    <button
      onClick={copyTags}
      className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
    >
      Copy All Tags
    </button>

    {copied && (
      <p className="text-green-500 mt-2">Copied ✅</p>
    )}

  </div>
)}
      </div>
    </div>
  )
}

export default Home