package com.auditservice.controller;

import com.auditservice.entity.AuditLog;
import com.auditservice.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/audit")
@RequiredArgsConstructor
public class AuditController {

    private final AuditService service;

    @PostMapping("/transactions")
    public String logTransactions() {
        service.logTransactions();
        return "Transaction audit logs saved!";
    }

    @PostMapping("/payments")
    public String logPayments() {
        service.logPayments();
        return "Payment audit logs saved!";
    }

    @GetMapping
    public List<AuditLog> getAllLogs() {
        return service.getAllLogs();
    }
}
