package com.cinioweb.service;

import com.cinioweb.repository.ChapterRepository;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cinioweb.entity.Chapter;

@Service
public class ChapterService {
	private final ChapterRepository chapterRepository;
	
	public ChapterService(ChapterRepository chapterRepository) {
		this.chapterRepository = chapterRepository;
	}
	
	public List<Chapter> getAllChapters() {
		return chapterRepository.findAll();
	}
	
	public List<Chapter> getChaptersByBookId(Long bookId)
	{
		return chapterRepository.findByBookId(bookId);
	}
	
	public Chapter getChapterById(Long id) {
		return chapterRepository.findById(id).orElse(null);
	}
	
	public Chapter createChapter(Chapter chapter)
	{
		return chapterRepository.save(chapter);
	}
	
	public void deleteChapter(Long id) {
		chapterRepository.deleteById(id);
	}
	
	
}
