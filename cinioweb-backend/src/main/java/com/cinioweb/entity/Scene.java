package com.cinioweb.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity         
@Table(name = "scenes")
public class Scene {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String title;
	
	@Column(columnDefinition = "Text")
	private String content;
	
	private Integer sceneOrder;
	
	@ManyToOne
	@JoinColumn(name = "chapter_id")
	private Chapter chapter;
	
	@OneToOne(mappedBy = "scene")
	private CinematicConfig cinematicConfig;
	
	
	public Scene() {
	
	}
	
	public Scene( String title, String content,  Integer sceneOrder, Chapter chapter) {
		this.title = title;
		this.content = content;
		this.sceneOrder = sceneOrder;
		this.chapter = chapter;		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getSceneOrder() {
		return sceneOrder;
	}

	public void setSceneOrder(Integer sceneOrder) {
		this.sceneOrder = sceneOrder;
	}

	public Chapter getChapter() {
		return chapter;
	}

	public void setChapter(Chapter chapter) {
		this.chapter = chapter;
	}
	
	
	
}