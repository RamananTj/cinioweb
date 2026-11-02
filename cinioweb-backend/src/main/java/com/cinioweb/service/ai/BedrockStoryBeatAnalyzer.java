package com.cinioweb.service.ai;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import com.cinioweb.dto.StoryBeatAnalysisDto;

@Service
@Qualifier("bedrock")
public class BedrockStoryBeatAnalyzer implements StoryBeatAnalyzer {	
	private final RestClient bedrockRestClient;
	private final ObjectMapper objectMapper;
	private final String modelId;
	
	public BedrockStoryBeatAnalyzer(RestClient bedrockRestClient, ObjectMapper objectMapper, @Value("${bedrock.model-id}") String modelId) {		
		this.bedrockRestClient = bedrockRestClient;
		this.objectMapper = objectMapper;
		this.modelId = modelId;
	}
	
	@Override
	public StoryBeatAnalysisDto analyzeChapter(String chapterText) {
		if(chapterText == null || chapterText.isBlank())
		{
			throw new IllegalArgumentException("chapter text cannot be empty");
		}
		
		String prompt = """
	            You are a professional film screenwriter and storyboard
	            analyst working on CinioWeb, a cinematic book-reading platform.

	            Analyze the supplied chapter and divide it into meaningful
	            story beats. A beat should represent an important action,
	            revelation, decision, conflict, or emotional shift.

	            Preserve the original story. Do not invent events or dialogue.
	            Keep each sourceText passage faithful to the supplied text.
	            Combine minor actions into coherent beats when appropriate.

	            Return ONLY valid JSON using exactly this structure:
	            {
	              "chapterSummary": "A concise summary",
	              "beats": [
	                {
	                  "beatOrder": 1,
	                  "sourceText": "Relevant original passage",
	                  "action": "What happens",
	                  "emotionalShift": "How the emotion changes",
	                  "narrativePurpose": "Why this beat matters",
	                  "location": "Location or unknown",
	                  "timeContext": "Time or unknown"
	                }
	              ]
	            }

	            Do not include Markdown fences or additional commentary.

	            CHAPTER TEXT:
	            """ + chapterText;
		
		Map<String, Object> requestBody = Map.of("messages", List.of(Map.of("role", "user",
																			"content", List.of(Map.of("text", prompt)))),
												 "inferenceConfig", Map.of(
																	 "maxTokens", 4096,
																	 "temperature",0.2
														 			  )
												 );
		
		JsonNode response = bedrockRestClient.post()
							.uri("/model/{modelId}/converse", modelId) //https://bedrock-runtime.ap-southeast-2.amazonaws.com/model/claudeHaiku-5.5/converse
							.body(requestBody)
							.retrieve()
							.body(JsonNode.class);
		
		if(response == null) {
			throw new IllegalArgumentException("Amazon bedrock returned an empty response");
		}
		
		JsonNode textNode = response.at("/output/message/content/0/text");
		
		if(textNode.isMissingNode()|| !textNode.isString()) {
			throw new IllegalArgumentException("Bedrock response did not contain the generated text");
		}
		
		String json = textNode.asString().trim();
		
		// Defensive cleanup if the model returns Mark down fences.
        if (json.startsWith("```")) {
            json = json.replaceFirst("^```(?:json)?\\s*", "");
            json = json.replaceFirst("\\s*```$", "");
        }
		
        try {
        	return objectMapper.readValue(json, StoryBeatAnalysisDto.class);
        }
        catch(Exception e)
        {
        	throw new IllegalArgumentException("Couldn't parse the story-beat Json returned by bedrock", e);
        }
	}

}
