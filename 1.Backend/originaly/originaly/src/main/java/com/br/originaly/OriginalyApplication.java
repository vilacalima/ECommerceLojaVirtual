package com.br.originaly;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@EntityScan(basePackages = "com.br.originaly.model")
@EnableConfigurationProperties
public class OriginalyApplication {

	public static void main(String[] args) {
		SpringApplication.run(OriginalyApplication.class, args);
	}

}
