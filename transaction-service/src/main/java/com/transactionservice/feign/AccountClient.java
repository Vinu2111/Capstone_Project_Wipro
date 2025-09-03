package com.transactionservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import com.transactionservice.dto.AccountDTO;

@FeignClient(name = "account-service")
public interface AccountClient {

    @GetMapping("/accounts/{id}")
    AccountDTO getAccountById(@PathVariable("id") Long id);

    @PutMapping("/accounts/{id}")
    AccountDTO updateAccount(@PathVariable("id") Long id, @RequestBody AccountDTO account);
}
