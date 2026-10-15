package com.cinioweb.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinioweb.entity.CinematicConfig;
import com.cinioweb.service.CinematicConfigService;

@RestController
@RequestMapping("/api/cinematic-configs")
@CrossOrigin(origins = "http://localhost:5173")
public class CinematicConfigController {
	private final CinematicConfigService cinematicConfigService; 
	
	public CinematicConfigController(CinematicConfigService cinematicConfigService) {
		this.cinematicConfigService = cinematicConfigService;	
	}
	
	@GetMapping
	public List<CinematicConfig> getAllConfigs(){
		return cinematicConfigService.getAllConfigs();
	}
	
	@GetMapping("/scene/{sceneId}")
	public CinematicConfig getCinematicConfigBySceneId(@PathVariable Long sceneId) {
	    return cinematicConfigService.getCinematicConfigBySceneId(sceneId);
	}
	
	@GetMapping("/{id}")
	public CinematicConfig getConfigById(@PathVariable Long id)	
	{
		return cinematicConfigService.getConfigById(id);
	}
	
	@PostMapping
	public CinematicConfig createConfig(@RequestBody CinematicConfig config) {
		return cinematicConfigService.createConfig(config);
	}
	
	@PutMapping("/{id}")
	public CinematicConfig updateConfig(@PathVariable Long id, @RequestBody CinematicConfig config) {
		return cinematicConfigService.updateConfig(id, config);
	}
	
	@DeleteMapping("/{id}")
	public void deleteConfig(@PathVariable Long id) {
		 cinematicConfigService.deleteConfig(id);
	}
}
