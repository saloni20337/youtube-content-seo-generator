package com.youtube_tools.service;

import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class AiThumbnailService {

  private static final String BASE_URL = "https://image.pollinations.ai/prompt/";

    public String generateImage(String prompt) {

        if (prompt == null || prompt.isBlank()) {
            throw new RuntimeException("Prompt is required");
        }

        
        String encodedPrompt = URLEncoder.encode(prompt, StandardCharsets.UTF_8)
                .replace("+", "%20");

        
        
                String imageUrl = 
                BASE_URL + encodedPrompt
                + "?width=1280&height=720&nologo=true";

        return imageUrl;
    }
}