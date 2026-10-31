package com.cinioweb.service.ai;

import com.cinioweb.dto.StoryBeatAnalysisDto;

public interface StoryBeatAnalyzer {

    StoryBeatAnalysisDto analyzeChapter(String chapterText);

}