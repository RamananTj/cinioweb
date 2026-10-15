package com.cinioweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cinioweb.entity.Book;
import com.cinioweb.entity.User;
import com.cinioweb.repository.IUserService;
import com.cinioweb.repository.UserRepository;

@Service("oldUserService")
public class UserService implements IUserService{

	private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }    
	
	@Override
	public User getUserDetails(Long id) {
		return userRepository.findById(id).orElseThrow();
	}
	
	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();  
	}

}
