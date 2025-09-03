package com.accountservice.dto;

import lombok.Data;

@Data
public class CustomerDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String address;
}
