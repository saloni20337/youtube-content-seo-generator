import { useState } from "react"
import axios from "axios"

function Thumbnail(){

  const [url,setUrl] = useState("")
  const [thumbnail,setThumbnail] = useState("")
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")

  const getThumbnail = async ()=>{

    setLoading(true)
    setError("")
    setThumbnail("")

    try{
      const res = await axios.get(
        "http://localhost:8080/youtube/thumbnail",
        {
          params:{ videoUrlOrId:url }
        }
      )

      setThumbnail(res.data.thumbnailUrl)

    }catch(err){
      setError("Invalid URL or server error")
    }finally{
      setLoading(false)
    }

  }

  return(

    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Thumbnail Generator
        </h1>

        {/* Input + Button */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter YouTube URL"
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setUrl(e.target.value)}
          />

          <button
            onClick={getThumbnail}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Get
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center mt-4 text-blue-500 font-medium">
            Fetching thumbnail...
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
              alt="Thumbnail"
              className="rounded-xl shadow-md mx-auto"
            />

            {/* Download Button */}
            <a
              href={thumbnail}
              download
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

export default Thumbnail