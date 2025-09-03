package com.auditservice.service;

import com.auditservice.dto.PaymentDTO;
import com.auditservice.dto.TransactionDTO;
import com.auditservice.entity.AuditLog;
import com.auditservice.feign.PaymentClient;
import com.auditservice.feign.TransactionClient;
import com.auditservice.repository.AuditRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final TransactionClient transactionClient;
    private final PaymentClient paymentClient;
    private final AuditRepository repository;

    public void logTransactions() {
        List<TransactionDTO> transactions = transactionClient.getAllTransactions();
        transactions.forEach(t -> {
            AuditLog log = AuditLog.builder()
                    .action("TRANSACTION")
                    .details("Transaction: " + t.getType() + " of " + t.getAmount())
                    .timestamp(LocalDateTime.now())
                    .build();
            repository.save(log);
        });
    }

    public void logPayments() {
        List<PaymentDTO> payments = paymentClient.getAllPayments();
        payments.forEach(p -> {
            AuditLog log = AuditLog.builder()
                    .action("PAYMENT")
                    .details("Payment: " + p.getAmount() + " from " + p.getFromAccountId() + " to " + p.getToAccountId())
                    .timestamp(LocalDateTime.now())
                    .build();
            repository.save(log);
        });
    }

    public List<AuditLog> getAllLogs() {
        return repository.findAll();
    }
}
