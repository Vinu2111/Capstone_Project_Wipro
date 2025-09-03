package com.notificationservice.consumer;

import com.notificationservice.dto.NotificationDTO;
import com.notificationservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationConsumer {

    private final NotificationService service;

    @KafkaListener(topics = "notification-topic", groupId = "notification-group")
    public void consume(NotificationDTO dto) {
        System.out.println("📩 Notification received: " + dto);
        service.saveNotification(dto);
    }
}
