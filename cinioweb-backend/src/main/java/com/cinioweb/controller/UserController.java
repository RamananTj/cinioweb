package com.cinioweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinioweb.entity.User;
import com.cinioweb.repository.IUserService;
//import com.cinioweb.repository.UserRepository;
//import com.cinioweb.service.UserService;


@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private final IUserService userService;

    // Swap between "oldUserService" and "newUserService" right here
    public UserController(@Qualifier("newUserService") IUserService userService) {
        this.userService = userService;
    }
	
    @GetMapping
    public List<User>getAllUsers()
    {
    	return userService.getAllUsers();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserDetails(id));
    }
}
