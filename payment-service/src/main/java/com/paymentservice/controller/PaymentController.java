package com.paymentservice.controller;

import com.paymentservice.dto.PaymentDTO;
import com.paymentservice.entity.Payment;
import com.paymentservice.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService service;

    @PostMapping
    public Payment makePayment(@RequestBody PaymentDTO dto) {
        return service.makePayment(dto);
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return service.getById(id);
    }
}
