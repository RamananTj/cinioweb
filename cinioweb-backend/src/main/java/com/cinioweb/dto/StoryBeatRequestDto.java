package com.cinioweb.dto;

import jakarta.validation.constraints.Size;

public record StoryBeatRequestDto(
		@Size(max = 100000, message = "Chapter text is too long")
		String chapterText
		) {

}
