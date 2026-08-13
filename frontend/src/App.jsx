import { BrowserRouter,Routes,Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Thumbnail from "./pages/Thumbnail"
import VideoDetails from "./pages/VideoDetails"
import AiThumbnail from './pages/AiThumbnail'
function App(){

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/thumbnail" element={<Thumbnail/>}/>
<Route path="/video-details" element={<VideoDetails/>}/>
<Route path="/ai-thumbnail" element={<AiThumbnail/>}/>
</Routes>

</BrowserRouter>

)

}

export default App