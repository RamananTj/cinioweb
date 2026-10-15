package com.cinioweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cinioweb.entity.Scene;
import com.cinioweb.repository.SceneRepository;

@Service
public class SceneService {
	private SceneRepository sceneRepository;
	
	public SceneService(SceneRepository sceneRepository) {
	this.sceneRepository = sceneRepository;	
	}
	
	public List<Scene> getAllScenes()
	{
		return sceneRepository.findAll();
	}
	
	public List<Scene> getScenesByChapterId(Long chapterId) {
	    return sceneRepository.findByChapterId(chapterId);
	}
	
	public Scene getSceneById(Long id)
	{
		return sceneRepository.findById(id).orElse(null);
	}
	
	public Scene createScene(Scene scene)
	{
		return sceneRepository.save(scene);
	}
	
	public void deleteScene(Long id)
	{
		sceneRepository.deleteById(id);
	}
}
