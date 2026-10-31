package com.cinioweb.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.cinioweb.dto.StoryBeatAnalysisDto;
import com.cinioweb.dto.StoryBeatRequestDto;
import com.cinioweb.entity.Chapter;
import com.cinioweb.service.ChapterService;
import com.cinioweb.service.StoryBeatService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/chapters")
@CrossOrigin(origins = "http://localhost:5173")
public class ChapterController {
	private final ChapterService chapterService;
	private final StoryBeatService storyBeatService; //aws Bedrock model
	
	public ChapterController(ChapterService chapterService, StoryBeatService storyBeatService) {
		this.chapterService = chapterService;
		this.storyBeatService = storyBeatService;		
	}
	
	@GetMapping
	public List<Chapter> getAllChapters(){
		return chapterService.getAllChapters();
	}
	
	@GetMapping("/book/{bookId}")
	public List<Chapter> getChaptersByBookId(@PathVariable Long bookId){
		return chapterService.getChaptersByBookId(bookId);
	}	
	
	@GetMapping("/{id}")
	public Chapter getChapterByid(@PathVariable Long id)
	{
		return chapterService.getChapterById(id);
	}
	
	@PostMapping
	public Chapter createChapter(@RequestBody Chapter chapter) {
		return chapterService.createChapter(chapter);
	}
	
	@DeleteMapping("/{id}")
	public void deleteChapter(@PathVariable Long id)
	{
		chapterService.deleteChapter(id);
	}
	
	
	@PostMapping("/{chapterId}/story-beats")
	public StoryBeatAnalysisDto analyzeChapter(@PathVariable Long chapterId,
											   @Valid @RequestBody(required= false)StoryBeatRequestDto request) 
	{
		Chapter chapter = chapterService.getChapterById(chapterId);
		String text = chapter.getChapterText();
		
		if(request != null && request.chapterText() !=null && !request.chapterText().isBlank()) {
			text = request.chapterText();
		}
		
		if(text == null || text.isBlank()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This chapter has no text. Add chapterText first.");
		}
		
		return storyBeatService.analyzeChapter(text);
	}
	
}

