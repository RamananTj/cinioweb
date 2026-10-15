package com.cinioweb.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinioweb.entity.Chapter;
import com.cinioweb.service.ChapterService;

@RestController
@RequestMapping("/api/chapters")
@CrossOrigin(origins = "http://localhost:5173")
public class ChapterController {
	private final ChapterService chapterService;
	
	public ChapterController(ChapterService chapterService) {
		this.chapterService = chapterService;		
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
	
	
	
}

