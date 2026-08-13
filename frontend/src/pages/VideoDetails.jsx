import { useState } from "react"
import axios from "axios"

function VideoDetails(){

  const [url,setUrl] = useState("")
  const [video,setVideo] = useState(null)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")

  const getDetails = async ()=>{

    setLoading(true)
    setError("")
    setVideo(null)

    try{
      const res = await axios.get(
        "http://localhost:8080/youtube/video-details",
        {
          params:{ videoUrlOrId:url }
        }
      )

      setVideo(res.data)

    }catch(err){
      setError("Invalid URL or video not found")
    }finally{
      setLoading(false)
    }

  }

  return(

    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Video Details
        </h1>

        {/* Input + Button */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter YouTube URL"
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e)=>setUrl(e.target.value)}
          />

          <button
            onClick={getDetails}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Get
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center mt-4 text-green-500 font-medium">
            Fetching video data...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center mt-4 text-red-500 font-medium">
            {error}
          </p>
        )}

        {/* Video Data */}
        {video && (

          <div className="mt-8">

            {/* Thumbnail */}
            <img
              src={video.thumbnailUrl}
              alt="thumbnail"
              className="rounded-xl shadow-md w-full"
            />

            {/* Title */}
            <h2 className="text-2xl font-bold mt-4 text-gray-800">
              {video.title}
            </h2>

            {/* Channel */}
            <p className="text-gray-600 mt-1">
              Channel: {video.channelTitle}
            </p>

            {/* Description */}
            <p className="mt-4 text-gray-700 leading-relaxed">
              {video.description}
            </p>

            {/* Tags */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800">
                Tags
              </h3>

              <div className="flex flex-wrap gap-2 mt-2">
                {video.tags?.map((tag,index)=>(
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

        )}

      </div>
    </div>

  )

}

export default VideoDetails