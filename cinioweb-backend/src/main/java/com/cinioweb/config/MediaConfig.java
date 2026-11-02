package com.cinioweb.config;

import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MediaConfig implements WebMvcConfigurer {

    @Value("${cinioweb.upload-dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        String location = Path.of(uploadDir) // uploadDir = "uploads/character_avatar.jpg"
                .toAbsolutePath()
                .normalize()
                .toUri()	//converts a file system Path into a URI - /home/user/uploads into file:///home/user/uploads
                .toString();

        //http://localhost:8080/media/uploads/character_avatar.jpg
        registry.addResourceHandler("/media/**")  //** act as wild card - allows subpath
                .addResourceLocations(location);
    }
}