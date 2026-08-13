package com.youtube_tools.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.youtube_tools.service.ThumbnailService;




// @Controller
// public class ThumnailController {
    
//     @Autowired
//     ThumbnailService service;
//     @GetMapping("/thumbnail")
//     public String getThumbnail(){
//         return "thumbnails";
//     }
//     @PostMapping("/get-thumbnail")
//     public String showThumbnail(@RequestParam("videoUrlOrId") String videoUrlOrId,Model model){
//        String videoId=service.extractVideoId(videoUrlOrId);
//       if(videoId==null){
//           model.addAttribute("error","Invalid youtube url or id");
//           return "thumbnails";
//       }

//       String thumbnailUrl="https://img.youtube.com/vi/"+videoId+"/maxresdefault.jpg";
//       model.addAttribute("thumbnailUrl",thumbnailUrl);
//        return "thumbnails";
//     }
// }
@RestController
@RequestMapping("/youtube")
@CrossOrigin(origins="http://localhost:5173")
public class ThumbnailController {

    @Autowired
    ThumbnailService service;

    @GetMapping("/thumbnail")
    public Map<String, String> getThumbnail(@RequestParam String videoUrlOrId){

        String videoId = service.extractVideoId(videoUrlOrId);

        if(videoId == null){
            throw new RuntimeException("Invalid youtube url or id");
        }

        return Map.of("thumbnailUrl",
        "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg");
    }
}