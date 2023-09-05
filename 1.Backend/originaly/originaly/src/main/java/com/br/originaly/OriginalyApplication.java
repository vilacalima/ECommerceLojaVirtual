package com.br.originaly;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@EntityScan("com.br.originaly.model")
public class OriginalyApplication {

	public static void main(String[] args) {
		SpringApplication.run(OriginalyApplication.class, args);
	}

}
