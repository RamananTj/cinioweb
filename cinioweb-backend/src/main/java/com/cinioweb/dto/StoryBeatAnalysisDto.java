package com.cinioweb.dto;

import java.util.List;

public record StoryBeatAnalysisDto(
		String chapterSummary,
		List<StoryBeatDto>beats
		) {
}
