package com.paymentservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long accountId;
    private Double amount;
    private String method;      // e.g., CARD, UPI, NETBANKING
    private String status;      // PENDING, SUCCESS, FAILED
    private String description;
    private LocalDateTime timestamp;
}
