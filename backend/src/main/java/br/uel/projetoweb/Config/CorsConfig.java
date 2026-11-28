package br.uel.projetoweb.Config;

import lombok.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/api/∗∗")
                        .allowedOrigins(
                                "http://localhost:8080",
                                "http://192.168.3.85:8080" //http://<IP−DO−COMPUTADOR>:8081
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                                        .allowedHeaders("∗");
            }
        };
    }
}
