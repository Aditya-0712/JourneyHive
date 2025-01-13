package com.journeyhive.server.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomResponse {
    private String message;
    private boolean success;
    private List<Map<String, Object>> data;

    public CustomResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }
}