package com.cinioweb.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinioweb.dto.BeatAssetRequestDto;
import com.cinioweb.dto.CharacterImageRequestDto;
import com.cinioweb.dto.GeneratedAssetDto;
import com.cinioweb.service.ai.PollinationsImageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "http://localhost:5173")
public class AssetGenerationController {
	private final PollinationsImageService imageService;	
	
	public AssetGenerationController(PollinationsImageService imageService) {
		this.imageService = imageService;
	}

	@PostMapping("/background")
	public GeneratedAssetDto generateBackground(@RequestBody BeatAssetRequestDto beat) {
	    
	    String prompt = """
	    			Create a cinematic environment background for a film scene.
	    			
	    			Location: %s
	    			Time: %s
	    			Story action: %s
	    			Emotional atmosphere: %s
	    			
	    			Wide cinematic composition, realistic environment, professional film cinematography, detailed lighting. 
	    			The environment must contain no visible text, captions, logos or watermarks.
	    			Do not include characters or people.	    			
	    			""".formatted(
	    				beat.location(),
	    				beat.timeContext(),
	    				beat.action(),
	    				beat.emotionalShift()
	    				);
		String url = imageService.generateImage(prompt, "background");	
	    return new GeneratedAssetDto("BACKGROUND", url, prompt);
	}

	@PostMapping("/character")
    public GeneratedAssetDto generateCharacter(@RequestBody CharacterImageRequestDto character) {


		String prompt = """
				        Generate a premium-quality, photorealistic cinematic
				        character reference image for a fictional story character.
				
				        CHARACTER IDENTITY:
				        Character name: %s
				
				        PHYSICAL DESCRIPTION:
				        %s
				
				        VISUAL REQUIREMENTS:
				
				        1. Full-body composition:
				           - Show exactly one character.
				           - Entire body must be visible from head to feet.
				           - Character must face directly towards the camera.
				           - Use a natural, relaxed neutral standing pose.
				           - Keep both arms slightly separated from the torso.
				           - Keep hands, fingers and feet fully visible.
				           - Position the character in the center of the frame.
				           - Maintain realistic human anatomy and proportions.
				
				        2. Photorealistic appearance:
				           - Extremely realistic human facial features.
				           - Natural skin texture, pores and subtle imperfections.
				           - Realistic eyes, eyebrows, nose, lips and facial hair.
				           - Physically accurate hair strands and hairstyle.
				           - Realistic body proportions and anatomy.
				           - Natural fabric texture, clothing folds and stitching.
				           - Detailed and physically believable footwear.
				           - High-end live-action cinema production quality.
				           - Professional cinematic character photography.
				           - Realistic studio lighting with soft, balanced illumination.
				           - Sharp facial details and high-resolution rendering.
				
				        3. Character identity preservation:
				           - Facial appearance must accurately reflect the
				             supplied physical description.
				           - Do not exaggerate facial features.
				           - Do not introduce fantasy elements unless specified.
				           - Clothing, hairstyle, skin tone and body structure
				             must match the character description.
				           - Create a clean visual reference suitable for
				             maintaining character identity across multiple scenes.
				
				        4. Background and isolation:
				           - Isolate the character completely from the environment.
				           - Output a genuine transparent background with an
				             RGBA alpha channel.
				           - No scenery, studio walls, floor or background objects.
				           - No background gradients or artificial backdrops.
				           - No decorative elements.
				           - No frame, border or layout.
				
				        5. Image quality:
				           - Photorealistic live-action movie aesthetic.
				           - Professional film character reference photography.
				           - Natural color grading.
				           - High detail without artificial sharpening.
				           - Clean edges suitable for foreground compositing.
				
				        STRICT EXCLUSIONS:
				        No additional people, duplicate characters, portraits,
				        inset images, text, labels, character sheets, collages,
				        illustrations, anime styling, cartoon appearance,
				        3D game-avatar appearance, logos or watermarks.
				
				        IMPORTANT:
				        The output must contain only the single full-body character.
				        Preserve the character's complete silhouette and anatomy.
				        Transparency must be represented through the actual
				        image alpha channel, not simulated using a checkerboard,
				        white background or transparent-looking pattern.
				
				        """.formatted(
				            character.name(),
				            character.visualDescription()
				        );


        String url = imageService.generateImage(prompt, "character");

        return new GeneratedAssetDto("CHARACTER", url, prompt);
    }

    @PostMapping("/beat")
    public List<GeneratedAssetDto> generateBeatAssets(@RequestBody BeatAssetRequestDto beat) {

        List<GeneratedAssetDto> assets = new ArrayList<>();

        assets.add(generateBackground(beat));

        if (beat.characters() != null) {
            for (var character : beat.characters()) {  //more than 1 character in single beat - not handled yet
                assets.add(generateCharacter(
                        new CharacterImageRequestDto(
                                character.name(),
                                character.visualDescription()
                        )
                ));
            }
        }

        return assets;
    }
	
	
}
