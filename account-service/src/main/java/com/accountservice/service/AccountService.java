package com.accountservice.service;

import com.accountservice.dto.AccountDTO;
import com.accountservice.dto.CustomerDTO;
import com.accountservice.entity.Account;
import com.accountservice.feign.CustomerClient;
import com.accountservice.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository repository;
    private final CustomerClient customerClient;

    public Account create(AccountDTO dto) {
        // Validate customer exists via Feign
        CustomerDTO customer = customerClient.getCustomerById(dto.getCustomerId());
        if (customer == null) {
            throw new RuntimeException("Customer not found!");
        }

        Account account = Account.builder()
                .accountNumber("ACC-" + System.currentTimeMillis())
                .accountType(dto.getAccountType())
                .balance(dto.getBalance())
                .customerId(dto.getCustomerId())
                .build();

        return repository.save(account);
    }

    public List<Account> getAll() {
        return repository.findAll();
    }

    public Account getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
    }

    public List<Account> getByCustomerId(Long customerId) {
        return repository.findByCustomerId(customerId);
    }

    public Account update(Long id, AccountDTO dto) {
        Account account = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        account.setAccountType(dto.getAccountType());
        account.setBalance(dto.getBalance());
        account.setCustomerId(dto.getCustomerId());

        return repository.save(account);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
