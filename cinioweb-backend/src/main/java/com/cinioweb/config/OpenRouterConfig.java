package com.cinioweb.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenRouterConfig {

	@Bean("openRouterChatClient")
	public ChatClient openRouterChatClient(@Qualifier("openAiChatModel") OpenAiChatModel chatModel ) {
		return ChatClient.builder(chatModel).build();	//constructs a ChatClient instance 
	}
	
}
