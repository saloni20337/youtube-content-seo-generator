package com.youtube_tools.service;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;


@Service
public class ThumbnailService {
    public String extractVideoId(Object videoUrlOrId){
        if(((String) videoUrlOrId).matches("^[a-zA-Z0-9_-]{11}$")) {
            return (String) videoUrlOrId;
        }
        String[] patterns={
            "(?:https?:\\/\\/)?(?:www\\.)?youtube\\.com\\/watch\\?v=([a-zA-Z0-9_-]{11})",
                "(?:https?:\\/\\/)?(?:www\\.)?youtu\\.be\\/([a-zA-Z0-9_-]{11})",
                "(?:https?:\\/\\/)?(?:www\\.)?youtube\\.com\\/embed\\/([a-zA-Z0-9_-]{11})"
        };
        for(String pattern:patterns){
            Matcher matcher=Pattern.compile(pattern).matcher((CharSequence) videoUrlOrId);
            if(matcher.find()){
                return matcher.group(1);
            }
        
    }
        return null;
    }

}
