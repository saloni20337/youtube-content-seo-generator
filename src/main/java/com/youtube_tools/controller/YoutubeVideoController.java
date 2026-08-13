package com.youtube_tools.controller;




import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.youtube_tools.model.VideoDetails;
import com.youtube_tools.service.ThumbnailService;
import com.youtube_tools.service.YoutubeService;


import lombok.RequiredArgsConstructor;

// @Controller
// @RequiredArgsConstructor
// public class YoutubeVideoController {
//     private final YoutubeService youtubeService;
//     private final ThumbnailService service;
//     @GetMapping("/youtube/video-details")
//     public String showVideoForm(){
//         return "video-details";
//     }
//  @PostMapping("/youtube/video-details")
//  public String fetchVideoDetails(@RequestParam String videoUrlOrId,Model model){
   
//     String videoId=service.extractVideoId(videoUrlOrId);
//     if(videoId
//         ==null){
//         model.addAttribute("error","INvalid youtube url or id");
//         return "video-details";
//     }
//     VideoDetails details=youtubeService.getVideoDetails(videoId);
//     if(details==null){
//         model.addAttribute("error","video not found");
//     }else{
//         model.addAttribute("videoDetails",details);
//     }
//     model.addAttribute("videoUrlOrId",videoUrlOrId);
//     return "video-details";
//  }
    
// }

@RestController
@RequestMapping("/youtube")
@CrossOrigin(origins="http://localhost:5173")
@RequiredArgsConstructor
public class YoutubeVideoController {

    private final YoutubeService youtubeService;
    private final ThumbnailService service;

    @GetMapping("/video-details")
    public VideoDetails fetchVideoDetails(@RequestParam String videoUrlOrId){

        String videoId = service.extractVideoId(videoUrlOrId);

        if(videoId == null){
            throw new RuntimeException("Invalid youtube url or id");
        }

        VideoDetails details = youtubeService.getVideoDetails(videoId);

        if(details == null){
            throw new RuntimeException("Video not found");
        }

        return details;
    }
}