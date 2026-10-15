package com.cinioweb.repository;

import java.util.List;

import com.cinioweb.entity.User;

public interface IUserService {
	User getUserDetails(Long id);
	List<User> getAllUsers();
}
