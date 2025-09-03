package com.transactionservice.controller;

import com.transactionservice.dto.TransactionDTO;
import com.transactionservice.entity.Transaction;
import com.transactionservice.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService service;

    // Create CREDIT/DEBIT
    @PostMapping
    public Transaction create(@RequestBody TransactionDTO dto) {
        return service.create(dto);
    }

    // Transfer
    @PostMapping("/transfer")
    public String transfer(@RequestParam Long sourceAccountId,
                           @RequestParam Long targetAccountId,
                           @RequestParam Double amount) {
        service.transfer(sourceAccountId, targetAccountId, amount);
        return "✅ Transfer of " + amount + " from account " + sourceAccountId + " to " + targetAccountId + " successful.";
    }

    // Get by account
    @GetMapping("/account/{accountId}")
    public List<Transaction> getByAccount(@PathVariable Long accountId) {
        return service.getByAccount(accountId);
    }

    // Get all
    @GetMapping
    public List<Transaction> getAll() {
        return service.getAll();
    }
}
