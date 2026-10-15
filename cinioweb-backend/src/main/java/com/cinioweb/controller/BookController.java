package com.cinioweb.controller;

import java.util.List;

//import org.hibernate.validator.constraints.ParameterScriptAssert;
import org.springframework.web.bind.annotation.*;

import com.cinioweb.entity.Book;
import com.cinioweb.service.BookService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

	private final BookService bookService;
		
	public BookController(BookService bookService) {
		this.bookService = bookService;
	}
	
	@GetMapping
	public List<Book> getAllBooks() {
		return bookService.getAllBooks();
	}
	   
	@GetMapping("/{id}")
	public Book getBookById(@PathVariable long id) {
		return bookService.getBookById(id);
	}
	
	@GetMapping("/bookname/{name}")
	public Book getBookByName(@PathVariable String name) {
		return bookService.getBookByName(name);  
	}
	
	@PostMapping
	public Book createBook(@RequestBody Book book)
	{
		return bookService.createBook(book);
	}
	
	@PutMapping("/{id}")
	public Book updateBook(@PathVariable Long id, @RequestParam String title, @RequestParam String author, @RequestParam String descr) {
		return bookService.updateBook(id, title, author, descr);
	}
	
	@PutMapping("/{id}/updateTitleOnly")
	public Book updateBook(@PathVariable Long id, @RequestParam String title) {
		return bookService.updateBook( id,  title)	;
	}		
	
	@PatchMapping("/{id}")
	public Book patchBook(@PathVariable Long id,
							@RequestParam(required = false) String title, 
							@RequestParam(required = false) String author, 
							@RequestParam(required = false) String descr)
	{
		return bookService.patchBook(id, title, author, descr);
	}
	
	@DeleteMapping("/{id}")
	public void deleteBook(@PathVariable long id)
	{
		bookService.deleteBook(id);
	}
	
}
