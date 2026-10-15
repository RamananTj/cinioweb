package com.cinioweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cinioweb.entity.Book;
import com.cinioweb.repository.BookRepository;

@Service
public class BookService {	

	private final BookRepository bookRepository;	
	
//	BookRepository bk = new BookRepository();
	
	public BookService(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}
	
	public List<Book> getAllBooks() {
		return bookRepository.findAll();  // findAll - list all instances of the type.
	}
	
	public Book getBookById(Long id) {
		return bookRepository.findById(id).orElse(null); 
	}
	
	public Book getBookByName(String title) {
		return bookRepository.findByTitle(title).orElse(null); 
	}
	
	public Book createBook(Book book) {
		return bookRepository.save(book);			
	}
	
	public Book updateBook(Long id, String title, String author, String descr) {
		Book book = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
		
		book.setTitle (title);
		book.setAuthor(author);
		book.setDescr(descr);
				
		return bookRepository.save(book);
	}
	
	public Book updateBook(Long id, String title) {
		Book book = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
		
		book.setTitle (title);
		
		return bookRepository.save(book);
	}
	
	public Book patchBook(Long id, String title, String author, String descr) {
		Book book = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
				
		 	if (title != null) {
		        book.setTitle(title);
		    }

		    if (author != null) {
		        book.setAuthor(author);
		    }

		    if (descr != null) {
		        book.setDescr(descr);
		    }
				
		return bookRepository.save(book);
	}
	
	public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
