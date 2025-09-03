package com.paymentservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PaymentDTO {
    private Long id;

    @NotNull
    private Long accountId;

    @NotNull
    private Double amount;

    @NotNull
    private String method;   // CARD, UPI, NETBANKING

    private String description;
}
