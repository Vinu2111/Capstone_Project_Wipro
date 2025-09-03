package com.accountservice.controller;

import com.accountservice.dto.AccountDTO;
import com.accountservice.entity.Account;
import com.accountservice.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService service;

    @PostMapping
    public Account create(@RequestBody AccountDTO dto) {
        return service.create(dto);
    }

    @GetMapping
    public List<Account> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Account getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/customer/{customerId}")
    public List<Account> getByCustomerId(@PathVariable Long customerId) {
        return service.getByCustomerId(customerId);
    }

    @PutMapping("/{id}")
    public Account update(@PathVariable Long id, @RequestBody AccountDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Account deleted successfully";
    }
}
