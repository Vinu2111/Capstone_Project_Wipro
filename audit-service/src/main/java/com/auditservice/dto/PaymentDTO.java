package com.auditservice.dto;

import lombok.Data;

@Data
public class PaymentDTO {
    private Long id;
    private Long fromAccountId;
    private Long toAccountId;
    private Double amount;
    private String status;
    private String description;
}
