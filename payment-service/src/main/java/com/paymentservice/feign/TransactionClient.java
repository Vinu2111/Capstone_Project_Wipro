package com.paymentservice.feign;

import com.paymentservice.dto.PaymentRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "transaction-service")
public interface TransactionClient {

    @PostMapping("/transactions")
    void createTransaction(@RequestBody PaymentRequest request);
}
