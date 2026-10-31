package com.cinioweb.config;

import org.apache.hc.core5.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class BedrockConfig {

	@Bean("bedrockChatClient")
	public RestClient bedrockRestClient(
				@Value("${bedrock.api-key}") String apiKey,
				@Value("${bedrock.region}") String region
						)
	{
		return RestClient.builder()
				.baseUrl(
						"https://bedrock-runtime."
						+ region + ".amazonaws.com"						
						)
				.defaultHeader(
							HttpHeaders.AUTHORIZATION,
							"Bearer " + apiKey.trim()
						)
				.build();
	}
	
//    @Bean("bedrockChatClient")
//    public ChatClient bedrockChatClient(
//            @Qualifier("bedrockProxyChatModel")
//            BedrockProxyChatModel chatModel) {
//
//        return ChatClient.builder(chatModel).build();
//    }

}
