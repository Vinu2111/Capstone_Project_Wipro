package com.auditservice.dto;

import lombok.Data;

@Data
public class TransactionDTO {
    private Long id;
    private Long accountId;
    private Double amount;
    private String type;
    private String description;
}
