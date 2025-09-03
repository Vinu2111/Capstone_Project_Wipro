package com.paymentservice.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long accountId;
    private Double amount;
    private String type;        // CREDIT or DEBIT
    private String description;
}
