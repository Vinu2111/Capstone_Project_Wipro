package com.paymentservice.dto;

import lombok.Data;

@Data
public class AccountDTO {
    private Long id;
    private String accountNumber;
    private String accountType;  // ✅ match Account Entity
    private Double balance;
    private Long customerId;
}
