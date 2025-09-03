package com.paymentservice.service;

import com.paymentservice.dto.PaymentDTO;
import com.paymentservice.entity.Payment;
import com.paymentservice.feign.AccountClient;
import com.paymentservice.dto.AccountDTO;
import com.paymentservice.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository repository;
    private final AccountClient accountClient;

    @Transactional
    public Payment makePayment(PaymentDTO dto) {
        // Verify account exists
        AccountDTO account = accountClient.getAccountById(dto.getAccountId());
        if (account == null) {
            throw new RuntimeException("Account not found!");
        }

        // Create initial payment with PENDING status
        Payment payment = Payment.builder()
                .accountId(dto.getAccountId())
                .amount(dto.getAmount())
                .method(dto.getMethod())
                .status("PENDING")
                .description(dto.getDescription())
                .timestamp(LocalDateTime.now())
                .build();

        payment = repository.save(payment);

        // Mock processing: debit from account
        if (account.getBalance() < dto.getAmount()) {
            payment.setStatus("FAILED");
            return repository.save(payment);
        }

        account.setBalance(account.getBalance() - dto.getAmount());
        accountClient.updateAccount(account.getId(), account);

        payment.setStatus("SUCCESS");
        return repository.save(payment);
    }

    public List<Payment> getAll() {
        return repository.findAll();
    }

    public Payment getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Payment not found"));
    }
}
