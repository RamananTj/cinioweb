package com.cinioweb.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class PollinationsConfig {

	@Bean("pollinationsRestClient")
	public RestClient pollinationsRestClient(
			@Value("${pollinations.base-url}") String baseUrl,
			@Value("${pollinations.api-key}") String apiKey
			) {
		return RestClient.builder()
				.baseUrl(baseUrl)
				.defaultHeader("Authorization", "Bearer " + apiKey)
				.build();
	}
	
}
