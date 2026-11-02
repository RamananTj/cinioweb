package com.cinioweb.dto;

import java.util.List;

public record StoryBeatDto(
		int beatOrder,
		String sourceText,
		String action,
		List <String> characters,
		List <String> characterVisualDescription,
		String emotionalShift,
		String narrativePurpose,
		String location,
		String timeContext
		) {

}
