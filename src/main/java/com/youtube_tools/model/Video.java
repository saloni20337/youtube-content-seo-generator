package com.youtube_tools.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Video {
    private String id;
    private String channelTitle;
    private String title;
    private List<String> tags;
}
