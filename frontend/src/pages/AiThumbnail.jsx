import { useState } from "react"
import axios from "axios"

function AiThumbnail(){

  const [prompt, setPrompt] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const generateThumbnail = async () => {

    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setLoading(true)
    setError("")
    setThumbnail("")

    try {
      const res = await axios.post(
        "http://localhost:8080/youtube/ai-thumbnail",
        { prompt }
      )

      setThumbnail(res.data.aiThumbnailUrl)

    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to generate thumbnail. Try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return(

    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          AI Thumbnail Generator 🚀
        </h1>

        {/* Input + Button */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Describe the thumbnail you want e.g. 'shocked gamer face with neon text, YouTube thumbnail style'"
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateThumbnail()}
          />

          <button
            onClick={generateThumbnail}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center mt-4 text-blue-500 font-medium">
            Generating your thumbnail... this can take 10–20s
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center mt-4 text-red-500 font-medium">
            {error}
          </p>
        )}

        {/* Thumbnail Result */}
        {thumbnail && (
          <div className="mt-8 text-center">

            <img
              src={thumbnail}
              alt="AI Generated Thumbnail"
              className="rounded-xl shadow-md mx-auto"
            />

            {/* Download Button */}
            <a
              href={thumbnail}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
            >
              Download Thumbnail
            </a>

          </div>
        )}

      </div>
    </div>

  )

}

export default AiThumbnail