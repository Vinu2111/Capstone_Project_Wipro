package com.notificationservice.service;

import com.notificationservice.dto.NotificationDTO;
import com.notificationservice.entity.Notification;
import com.notificationservice.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository repository;

    public void saveNotification(NotificationDTO dto) {
        Notification notification = Notification.builder()
                .eventType(dto.getEventType())
                .message(dto.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        repository.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return repository.findAll();
    }
}
