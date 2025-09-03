package com.notificationservice.dto;

import lombok.Data;

@Data
public class NotificationDTO {
    private String eventType;
    private String message;
}
