package com.cinioweb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cinioweb.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
	 // Filters the query to only return the record if it is a PremiumUser
    @Query("SELECT u FROM User u WHERE u.id = :id AND TYPE(u) = PremiumUser")
    Optional<User> findPremiumUserById(@Param("id") Long id);
    
    @Query("SELECT u FROM User u WHERE TYPE(u) = PremiumUser")
    List<User> findAllPremiumUsers();
}
