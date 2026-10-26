package com.cinioweb.dto;

public record StoryBeatDto(
		int beatOrder,
		String sourceText,
		String action,
		String emotionalShift,
		String narrativePurpose,
		String location,
		String timeContext
		) {

}
