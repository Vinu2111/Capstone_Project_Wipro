package com.transactionservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TransactionDTO {
    private Long id;

    @NotNull
    private Long accountId;

    @NotNull
    private Double amount;

    @NotNull
    private String type; // CREDIT or DEBIT

    private String description;
}
