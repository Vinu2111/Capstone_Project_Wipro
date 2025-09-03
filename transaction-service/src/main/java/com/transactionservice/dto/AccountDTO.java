package com.transactionservice.dto;

import lombok.Data;

@Data
public class AccountDTO {
    private Long id;
    private String accountNumber;
    private String accountType;
    private Double balance;
    private Long customerId;
}
