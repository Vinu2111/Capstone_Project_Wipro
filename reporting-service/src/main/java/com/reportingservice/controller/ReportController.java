package com.reportingservice.controller;

import com.reportingservice.entity.Report;
import com.reportingservice.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService service;

    @PostMapping("/transactions")
    public Report generateTransactionReport() {
        return service.generateTransactionReport();
    }

    @PostMapping("/payments")
    public Report generatePaymentReport() {
        return service.generatePaymentReport();
    }

    @GetMapping
    public List<Report> getAllReports() {
        return service.getAllReports();
    }
}
