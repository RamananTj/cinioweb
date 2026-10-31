package com.cinioweb.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.cinioweb.dto.StoryBeatAnalysisDto;
import com.cinioweb.service.ai.StoryBeatAnalyzer;

@Service
public class StoryBeatService {
	
	private final StoryBeatAnalyzer bedrockAnalyzer;
	private final StoryBeatAnalyzer openRouterAnalyzer;
	
	@Value("${storybeat.provider:openrouter}")  //storybeat.provider=openai - we can set property in application.properties using value notation. :<defaultvalue>
	private String provider;
	
	public StoryBeatService(
			@Qualifier("bedrock") StoryBeatAnalyzer bedrockAnalyzer,
			@Qualifier("openrouter") StoryBeatAnalyzer openRouterAnalyzer
			) {
		this.bedrockAnalyzer = bedrockAnalyzer;
		this.openRouterAnalyzer = openRouterAnalyzer;
	}
	
	public StoryBeatAnalysisDto analyzeChapter(String chapterText) {
		
		return switch(provider.toLowerCase()) {		
			case "bedrock" -> bedrockAnalyzer.analyzeChapter(chapterText);
			case "openrouter" -> openRouterAnalyzer.analyzeChapter(chapterText);
			default -> throw new IllegalArgumentException("Unsupported AI Provider: " + provider);
		};
		
//		for (StoryBeatDto beat : response.beats()) {
//
//		    if (beat.sourceText() == null ||
//		        beat.sourceText().isBlank()) {
//
//		        throw new IllegalArgumentException(
//		            "Story beat sourceText is missing"
//		        );
//		    }
//
//		    if (!chapterText.contains(beat.sourceText())) {
//
//		        throw new IllegalArgumentException(
//		            "Story beat sourceText does not match original chapter"
//		        );
//		    }
//		}
	}
	
}
