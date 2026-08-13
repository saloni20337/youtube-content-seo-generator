package com.youtube_tools.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.youtube_tools.model.SearchVideo;
import com.youtube_tools.service.YoutubeService;

@RestController
@RequestMapping("/youtube")
@CrossOrigin(origins="http://localhost:5173")
public class YoutubeTagsController {

    @Autowired
    private YoutubeService youtubeService;

    @Value("${youtube.api.key}")
    private String apiKey;

    private boolean isApiKeyValid(){
        return apiKey != null && !apiKey.isEmpty();
    }

    @PostMapping("/search")
    public SearchVideo videoTags(@RequestParam String videoTitle){

        if(!isApiKeyValid()){
            throw new RuntimeException("API key is not valid");
        }

        if(videoTitle == null || videoTitle.isEmpty()){
            throw new RuntimeException("Video title is required");
        }

        return youtubeService.searchVideos(videoTitle);
    }
}