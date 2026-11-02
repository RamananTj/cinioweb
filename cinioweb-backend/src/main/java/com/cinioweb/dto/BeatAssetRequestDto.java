package com.cinioweb.dto;

import java.util.List;

public record BeatAssetRequestDto(
		int beatOrder,
        String action,
        String emotionalShift,
        String location,
        String timeContext,
        List<CharacterVisualProfileDto> characters
		) {}
