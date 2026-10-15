package com.cinioweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cinioweb.entity.CinematicConfig;
import com.cinioweb.repository.CinematicConfigRepository;

@Service
public class CinematicConfigService {
	private final CinematicConfigRepository cinematicConfigRepository;
	
	public CinematicConfigService(CinematicConfigRepository cinematicConfigRepository) {
		this.cinematicConfigRepository = cinematicConfigRepository;	
	}
	
	public List<CinematicConfig> getAllConfigs() {
		return cinematicConfigRepository.findAll();
	}
	
	public CinematicConfig getCinematicConfigBySceneId(Long sceneId) {
	    return cinematicConfigRepository.findBySceneId(sceneId).orElse(null);
	}
	
	public CinematicConfig getConfigById(Long id) {
		return cinematicConfigRepository.findById(id).orElse(null);
	}
	
	public CinematicConfig createConfig(CinematicConfig config) {
		return cinematicConfigRepository.save(config);
	}
	
	public CinematicConfig updateConfig(Long id, CinematicConfig config) {
		CinematicConfig existing = cinematicConfigRepository.findById(id).orElse(null);
		if(existing == null)
			return null;
		
		existing.setEmotion(config.getEmotion());
		existing.setEnvironment(config.getEnvironment());
		existing.setBackground(config.getBackground());
		existing.setParticles(config.getParticles());
		existing.setCamera(config.getCamera());
		existing.setTextAnimation(config.getTextAnimation());
		existing.setMusic(config.getMusic());
		existing.setTransition(config.getTransition());
		
		return cinematicConfigRepository.save(existing);
	}
	
	
	public void deleteConfig(Long id) {
		cinematicConfigRepository.deleteById(id);
	}
}
