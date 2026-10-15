package com.cinioweb.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinioweb.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
	Optional<Book> findByTitle(String title);
}
