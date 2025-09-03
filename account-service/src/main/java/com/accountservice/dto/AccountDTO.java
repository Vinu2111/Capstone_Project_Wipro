package com.accountservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AccountDTO {
    private Long id;

    @NotBlank
    private String accountType;

    @NotNull
    private Double balance;

    @NotNull
    private Long customerId;
}
