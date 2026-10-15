package com.cinioweb.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cinematic_configs")
public class CinematicConfig {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String emotion;
	private String environment;
	private String background;
	private String particles;
	private String camera;
	private String textAnimation;
	private String music;
	private String transition;
	
	@OneToOne
	@JoinColumn(name = "scene_id")
	private Scene scene;
	
	public CinematicConfig() {
	
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmotion() {
		return emotion;
	}

	public void setEmotion(String emotion) {
		this.emotion = emotion;
	}

	public String getEnvironment() {
		return environment;
	}

	public void setEnvironment(String environment) {
		this.environment = environment;
	}

	public String getBackground() {
		return background;
	}

	public void setBackground(String background) {
		this.background = background;
	}

	public String getParticles() {
		return particles;
	}

	public void setParticles(String particles) {
		this.particles = particles;
	}

	public String getCamera() {
		return camera;
	}

	public void setCamera(String camera) {
		this.camera = camera;
	}

	public String getTextAnimation() {
		return textAnimation;
	}

	public void setTextAnimation(String textAnimation) {
		this.textAnimation = textAnimation;
	}

	public String getMusic() {
		return music;
	}

	public void setMusic(String music) {
		this.music = music;
	}

	public String getTransition() {
		return transition;
	}

	public void setTransition(String transition) {
		this.transition = transition;
	}

	public Scene getScene() {
		return scene;
	}

	public void setScene(Scene scene) {
		this.scene = scene;
	}
	
	
}
