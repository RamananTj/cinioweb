package com.cinioweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinioweb.entity.Scene;

public interface SceneRepository extends JpaRepository<Scene, Long>{
	List<Scene> findByChapterId(Long chapterId);
}
