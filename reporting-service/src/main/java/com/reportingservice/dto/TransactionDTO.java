package com.reportingservice.dto;

import lombok.Data;

@Data
public class TransactionDTO {
    private Long id;
    private Long accountId;
    private Double amount;
    private String type; // CREDIT, DEBIT
    private String description;
}
