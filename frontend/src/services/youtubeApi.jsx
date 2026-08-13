

import axios from "axios"

export const searchVideos = async (title) => {

  const res = await axios.post(
    "http://localhost:8080/youtube/search",
    null,
    {
      params: {
        videoTitle: title
      }
    }
  )

  return res.data
}