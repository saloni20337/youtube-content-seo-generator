package com.youtube_tools.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.youtube_tools.service.AiThumbnailService;

import java.util.Map;

@RestController
@RequestMapping("/youtube/ai-thumbnail")
@CrossOrigin(origins = "http://localhost:5173")
public class AiThumbnailController {

    @Autowired
    private AiThumbnailService aiThumbnailService;

    @PostMapping
    public ResponseEntity<Map<String, String>> generateAiThumbnail(@RequestBody Map<String, String> request) {

        String prompt = request.get("prompt");

        if (prompt == null || prompt.isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "Prompt is required"));
        }

        try {
            String imageUrl = aiThumbnailService.generateImage(prompt);
            return ResponseEntity.ok(Map.of("aiThumbnailUrl", imageUrl));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Image generation failed: " + e.getMessage()));
        }
    }
}
