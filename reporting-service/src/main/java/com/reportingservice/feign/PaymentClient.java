package com.reportingservice.feign;

import com.reportingservice.dto.PaymentDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "payment-service")
public interface PaymentClient {

    @GetMapping("/payments")
    List<PaymentDTO> getAllPayments();
}
