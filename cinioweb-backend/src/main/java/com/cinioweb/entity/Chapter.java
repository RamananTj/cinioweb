package com.cinioweb.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "chapters")
public class Chapter {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String title;
	
	private Integer chapterOrder;
	
	@ManyToOne
	@JoinColumn(name = "book_id")
	private Book book; 
	
	@OneToMany(mappedBy = "chapter")
	@JsonIgnore
	private List<Scene> scenes;
	
	public Chapter() {
		
	}
	
	public Chapter(String title, Integer chapterOrder, Book book) {
			this.title = title;
			this.chapterOrder = chapterOrder;
			this.book = book;
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

	public Integer getChapterOrder() {
		return chapterOrder;
	}

	public void setChapterOrder(Integer chapterOrder) {
		this.chapterOrder = chapterOrder;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}
	
	
}
