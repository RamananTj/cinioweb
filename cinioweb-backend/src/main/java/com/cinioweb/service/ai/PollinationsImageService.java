package com.cinioweb.service.ai;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class PollinationsImageService {
	private final RestClient restClient;
	private final String model;
	private final Path uploadDirectory;
	
	public PollinationsImageService(
			@Qualifier("pollinationsRestClient") RestClient restClient, 
			@Value("${pollinations.image-model}") String model,
			@Value("${cinioweb.upload-dir}") String uploadDir) {		
		this.restClient = restClient;
		this.model = model;
		this.uploadDirectory = Path.of(uploadDir).toAbsolutePath().normalize();
	}
	
	public String generateImage(String prompt, String assetType) {
		try {
			Files.createDirectories(uploadDirectory);
			
			byte[] imageBytes = restClient.get().uri(uriBuilder -> uriBuilder
																	.path("/image/{prompt}")
																	.queryParam("model", model)
																	.build(prompt)
					).accept(MediaType.IMAGE_JPEG,
							 MediaType.IMAGE_PNG)  //IMAGE_GIF
					.retrieve()
					.body(byte[].class);
			
			 if (imageBytes == null || imageBytes.length == 0) {
	                throw new IllegalStateException("Pollinations returned an empty image");
	            }
			 
			 // This simple version stores generated files as JPG.
	            String fileName = assetType + "_" + UUID.randomUUID() + ".jpg";

	            Path filePath = uploadDirectory.resolve(fileName).normalize();	// .resolve() - combines the base directory path (uploadDirectory) with the newly generated file name (fileName). For example, if your directory is /uploads and the file is photo_123.jpg, it joins them into /uploads/photo_123.jpg. 
	            // .normalize() - prevents Path Traversal vulnerabilities - . (current directory) , .. (parent directory)

	            if (!filePath.startsWith(uploadDirectory)) {
	                throw new IllegalArgumentException("Invalid file path");
	            }

	            Files.write(filePath, imageBytes);

	            return "/media/" + fileName;
		}catch (IOException e) {
            throw new RuntimeException("Unable to save generated image", e);
        }
	}
	
}
