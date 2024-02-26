plugins {
	java
	id("org.springframework.boot") version "3.2.2"
	id("io.spring.dependency-management") version "1.1.4"
}

group = "com.Spring-Google"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_21
}

repositories {
	mavenCentral()
	google()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	implementation("com.google.api-client:google-api-client:1.35.2")
	implementation("com.google.oauth-client:google-oauth-client-jetty:1.34.1")
	implementation("com.google.apis:google-api-services-calendar:v3-rev20240111-2.0.0")
	implementation("com.fasterxml.jackson.core:jackson-core:2.13.0")
	implementation ("com.google.api-client:google-api-client-gson:1.34.1")
	implementation ("com.fasterxml.jackson.core:jackson-databind:2.14.2")


}

tasks.withType<Test> {
	useJUnitPlatform()
}