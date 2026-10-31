package com.cinioweb.service.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.cinioweb.dto.StoryBeatAnalysisDto;

@Service
@Qualifier("openrouter")
public class OpenRouterStoryBeatAnalyzer implements StoryBeatAnalyzer {

    private final ChatClient chatClient;

    public OpenRouterStoryBeatAnalyzer(@Qualifier("openRouterChatClient") ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @Override
    public StoryBeatAnalysisDto analyzeChapter(String chapterText) {       

    	String prompt = """
    		    You are a professional film screenwriter, narrative analyst,
    		    and storyboard specialist working on CinioWeb,
    		    a cinematic book-reading platform.

    		    YOUR TASK:
    		    Analyze the supplied chapter and divide it into meaningful
    		    chronological story beats.

    		    STORY BEAT RULES:
    		    1. A story beat represents a meaningful narrative event,
    		       such as an important action, revelation, decision,
    		       conflict, discovery, or emotional shift.

    		    2. Preserve the original story and its chronological order.

    		    3. Do not invent characters, events, dialogue, actions,
    		       locations, or time references.

    		    4. Combine minor actions into coherent beats when they
    		       contribute to the same narrative event.

    		    5. Create separate beats when there is a meaningful change
    		       in action, location, situation, conflict, or emotion.

    		    6. Do not create a separate beat for every paragraph.
    		       Identify the actual narrative progression.

    		    FIELD INSTRUCTIONS:

    		    chapterSummary:
    		    - Provide a concise summary of the entire chapter.
    		    - Include the central events and their outcome.
    		    - Do not introduce information absent from the chapter.

    		    beatOrder:
    		    - Assign sequential integers starting from 1.
    		    - Preserve the original chronological sequence.
    		    - Never duplicate or skip an order number.

    		    sourceText:
    		    - Include the relevant original passage supporting the beat.
    		    - Preserve the original wording exactly.
    		    - Do not paraphrase, rewrite, or invent source text.
    		    - Each passage should represent the relevant portion
    		      of the supplied chapter.
    		      
			    characters:
    			- Identify all named characters directly involved in this beat.
				- Include characters who perform an action, speak, interact,
				  or are directly involved in the event.
				- Use consistent character names throughout the chapter.
				- Do not create new character names.
				- Do not include characters merely mentioned in unrelated context.
				- Include unnamed characters when they are clearly involved,
				  using a descriptive identifier such as "Unknown soldier".
				- Return an empty array if no character is involved.

    		    action:
    		    - Describe what actually happens in this beat.
    		    - Use clear, concise sentences.
    		    - Focus on observable actions, events, or revelations.

    		    emotionalShift:
    		    - Describe the emotional state or transition associated
    		      with this beat.
    		    - Use the emotions established or reasonably implied
    		      by the chapter.
    		    - If no emotional change is evident, describe the
    		      dominant emotional state.

    		    narrativePurpose:
    		    - Explain why this beat matters to the story.
    		    - Identify its narrative role, such as setup, discovery,
    		      conflict, turning point, climax, or resolution.
    		    - Do not invent hidden motivations.

    		    location:
    		    - Identify the physical location where the event occurs.
    		    - Use the location explicitly established in the text.
    		    - If the location cannot be determined, return "Unknown".

    		    timeContext:
    		    - Identify the time or temporal context established
    		      by the chapter.
    		    - Examples: Morning, Night, Flashback, Present time.
    		    - Do not guess. Return "Unknown" when unclear.

    		    OUTPUT REQUIREMENTS:
    		    Return ONLY valid JSON.
    		    Do not include Markdown code fences or additional commentary.
    		    Use exactly the following JSON structure and field names:

    		    {
    		      "chapterSummary": "Concise chapter summary",
    		      "beats": [
    		        {
    		          "beatOrder": 1,
    		          "sourceText": "Exact original passage",
    		          "action": "What happens",
    		          "characters": ["Character name"],
    		          "emotionalShift": "Emotional state or transition",
    		          "narrativePurpose": "Why this beat matters",
    		          "location": "Location or Unknown",
    		          "timeContext": "Time context or Unknown"
    		        }
    		      ]
    		    }

    		    Every beat must contain all seven fields.
    		    Return an empty beats array only if the chapter contains
    		    no meaningful narrative events.

    		    CHAPTER TEXT:
    		    <chapter>
    		    %s
    		    </chapter>
    		    """.formatted(chapterText);

        return chatClient.prompt()
                .user(prompt)
                .call()
                .entity(StoryBeatAnalysisDto.class);
    }
}