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

import com.cinioweb.entity.Scene;
import com.cinioweb.service.SceneService;

@RestController
@RequestMapping("/api/scenes")
@CrossOrigin(origins = "http://localhost:5173")
public class SceneController {

	private final SceneService sceneService;
	
	public SceneController(SceneService sceneService) {
		this.sceneService = sceneService;
	}
	
	@GetMapping
	public List<Scene>getAllScenes() {
		return sceneService.getAllScenes();
	}
	
	@GetMapping("/chapter/{chapterId}")
	public List<Scene> getScenesByChapterId(@PathVariable Long chapterId) {
	    return sceneService.getScenesByChapterId(chapterId);
	}
	
	@GetMapping("/{id}")
	public Scene getSceneById(@PathVariable Long id) {
		return sceneService.getSceneById(id);
	}
	
	@PostMapping
	public Scene createScene(@RequestBody Scene scene)
	{
		return sceneService.createScene(scene);
	}
	
	@DeleteMapping("/{id}")
	public void deleteScene(@PathVariable Long id)
	{
		sceneService.deleteScene(id);
	}
	
	
}
