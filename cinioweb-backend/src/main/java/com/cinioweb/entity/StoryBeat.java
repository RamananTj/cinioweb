//package com.cinioweb.entity;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//import jakarta.persistence.UniqueConstraint;
//
//@Entity
//@Table(name = "story_beats",
//		uniqueConstraints =  {
//				@UniqueConstraint(
//						name = "uk_chapter_beat_order",
//						columnNames = {"chapter_id", "beat_order"}
//						)
//		})
//public class StoryBeat {
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
//	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "chapter_id", nullable = false)
//	private Chapter chapter;
//	
//	@Column(name="beat_order", nullable = false)
//	private int beatOrder;
//	
//	@Column(columnDefinition = "LONGTEXT")
//	private String sourceText;
//	
//	@Column(columnDefinition = "TEXT")
//	private String action;
//	
//	@Column(columnDefinition = "TEXT")
//	private String emotionalShift;
//	
//	@Column(columnDefinition = "TEXT")
//	private String narrativePurpose;
//	
//	@Column(name = "character_name")
//	private List<String> characters = new ArrayList<>();  // <> empty angle brackets - diamond operator (Java 7) - java looks at the left side of assignment and automatically assign IT INSIDE arrayList. Here String from List<String> will be assigned as type for ArrayList<>
//	
//	private String location;
//	
//	private String timeContext;
//	
//	// Image-generation information
//	
//
//	
//}
