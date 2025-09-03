package com.notificationservice.controller;

import com.notificationservice.entity.Notification;
import com.notificationservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService service;

    @GetMapping
    public List<Notification> getAll() {
        return service.getAllNotifications();
    }
}
