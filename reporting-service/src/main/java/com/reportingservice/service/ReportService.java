package com.reportingservice.service;

import com.reportingservice.dto.PaymentDTO;
import com.reportingservice.dto.TransactionDTO;
import com.reportingservice.entity.Report;
import com.reportingservice.feign.PaymentClient;
import com.reportingservice.feign.TransactionClient;
import com.reportingservice.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final TransactionClient transactionClient;
    private final PaymentClient paymentClient;
    private final ReportRepository repository;

    public Report generateTransactionReport() {
        List<TransactionDTO> transactions = transactionClient.getAllTransactions();
        String details = "Transactions Report: total " + transactions.size();

        Report report = Report.builder()
                .reportType("TRANSACTION")
                .details(details)
                .generatedAt(LocalDateTime.now())
                .build();

        return repository.save(report);
    }

    public Report generatePaymentReport() {
        List<PaymentDTO> payments = paymentClient.getAllPayments();
        String details = "Payments Report: total " + payments.size();

        Report report = Report.builder()
                .reportType("PAYMENT")
                .details(details)
                .generatedAt(LocalDateTime.now())
                .build();

        return repository.save(report);
    }

    public List<Report> getAllReports() {
        return repository.findAll();
    }
}
