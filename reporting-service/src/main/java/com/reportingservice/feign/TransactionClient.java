package com.reportingservice.feign;

import com.reportingservice.dto.TransactionDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "transaction-service")
public interface TransactionClient {

    @GetMapping("/transactions")
    List<TransactionDTO> getAllTransactions();
}
