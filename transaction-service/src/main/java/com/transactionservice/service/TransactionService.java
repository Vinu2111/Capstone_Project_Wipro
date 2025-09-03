package com.transactionservice.service;

import com.transactionservice.dto.AccountDTO;
import com.transactionservice.dto.TransactionDTO;
import com.transactionservice.entity.Transaction;
import com.transactionservice.feign.AccountClient;
import com.transactionservice.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository repository;
    private final AccountClient accountClient;

    @Transactional
    public Transaction create(TransactionDTO dto) {
        // Verify account exists
        AccountDTO account = accountClient.getAccountById(dto.getAccountId());
        if (account == null) {
            throw new RuntimeException("Account not found!");
        }

        // Balance validation
        if ("DEBIT".equalsIgnoreCase(dto.getType()) && account.getBalance() < dto.getAmount()) {
            throw new RuntimeException("Insufficient balance!");
        }

        // Update balance in Account Service
        if ("DEBIT".equalsIgnoreCase(dto.getType())) {
            account.setBalance(account.getBalance() - dto.getAmount());
        } else if ("CREDIT".equalsIgnoreCase(dto.getType())) {
            account.setBalance(account.getBalance() + dto.getAmount());
        }
        accountClient.updateAccount(account.getId(), account);

        // Save transaction
        Transaction transaction = Transaction.builder()
                .accountId(dto.getAccountId())
                .amount(dto.getAmount())
                .type(dto.getType())
                .description(dto.getDescription())
                .timestamp(LocalDateTime.now())
                .build();

        return repository.save(transaction);
    }

    @Transactional
    public void transfer(Long sourceAccountId, Long targetAccountId, Double amount) {
        // Source account check
        AccountDTO source = accountClient.getAccountById(sourceAccountId);
        if (source == null) throw new RuntimeException("Source account not found!");
        if (source.getBalance() < amount) throw new RuntimeException("Insufficient balance!");

        // Target account check
        AccountDTO target = accountClient.getAccountById(targetAccountId);
        if (target == null) throw new RuntimeException("Target account not found!");

        // Debit source
        source.setBalance(source.getBalance() - amount);
        accountClient.updateAccount(source.getId(), source);
        repository.save(Transaction.builder()
                .accountId(sourceAccountId)
                .amount(amount)
                .type("DEBIT")
                .description("Transfer to account " + targetAccountId)
                .timestamp(LocalDateTime.now())
                .build());

        // Credit target
        target.setBalance(target.getBalance() + amount);
        accountClient.updateAccount(target.getId(), target);
        repository.save(Transaction.builder()
                .accountId(targetAccountId)
                .amount(amount)
                .type("CREDIT")
                .description("Transfer from account " + sourceAccountId)
                .timestamp(LocalDateTime.now())
                .build());
    }

    public List<Transaction> getByAccount(Long accountId) {
        return repository.findByAccountId(accountId);
    }

    public List<Transaction> getAll() {
        return repository.findAll();
    }
}
