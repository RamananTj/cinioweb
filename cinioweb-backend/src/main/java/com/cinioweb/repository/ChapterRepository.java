package com.cinioweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinioweb.entity.Chapter;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {
	List<Chapter> findByBookId(Long bookId);
}
