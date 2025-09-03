package com.notificationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
@EnableKafka   // ✅ Enable Kafka Listeners (@KafkaListener)
@EnableFeignClients(basePackages = "com.notificationservice.feign") // (Optional, if later we add Feign Clients)
public class NotificationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);

		
    }
}
