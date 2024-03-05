package com.SpringGoogle.Calendarspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CalendarSpringApplication {

	public static void main(String[] args) {

		SpringApplication.run(CalendarSpringApplication.class, args);
	}

}
