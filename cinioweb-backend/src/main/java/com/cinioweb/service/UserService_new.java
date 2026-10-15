package com.cinioweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cinioweb.entity.User;
import com.cinioweb.repository.IUserService;
import com.cinioweb.repository.UserRepository;

@Service("newUserService")
public class UserService_new implements IUserService{

    private final UserRepository userRepository;

    public UserService_new(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUserDetails(Long id) {
        // New business logic (e.g., adding caching, validation, etc.)
        System.out.println("Executing new business logic logic...");
        return userRepository.findPremiumUserById(id)
                .orElseThrow(() -> new RuntimeException("Premium User not found with id: " + id));
    }
    
    @Override
	public List<User> getAllUsers() {
		return userRepository.findAllPremiumUsers();  
	}
}
