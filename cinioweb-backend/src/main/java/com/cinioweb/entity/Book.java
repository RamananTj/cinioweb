package com.cinioweb.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "books")
public class Book {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private  Long id;
	
	private String title;
	
	private String description;
	
	private String author;
	
	@OneToMany(mappedBy = "book")
	@JsonIgnore
	private List<Chapter> chapters;
	
	public Book() {
	
	}
	
	public Book(String title, String description, String author ) {
		this.title = title; 
		this.description = description;
		this.author = author;
	}
	
	//getters
	public Long getId()
	{
		return id;
	}
	public String getTitle()
	{
		return title;
	}
	public String getDescr()
	{
		return description;
	}
	public String getAuthor()
	{
		return author;
	}
	
	//setters
	public void setId(long id)
	{
		this.id = id;
	}
	public void setTitle(String title)
	{
		this.title = title;
	}
	public void setDescr(String description)
	{
		this.description = description;
	}
	public void setAuthor(String author)
	{
		this.author = author;
	}
	
}
