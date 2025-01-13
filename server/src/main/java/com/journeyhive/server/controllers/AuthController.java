package com.journeyhive.server.controllers;

import com.journeyhive.server.DTO.CustomResponse;
import com.journeyhive.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/api/v1/auth")
    public ResponseEntity<CustomResponse> auth() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return new ResponseEntity<>(new CustomResponse("User not logged in", false), HttpStatus.UNAUTHORIZED);
        }

        User user = (User) auth.getPrincipal();
        List<com.journeyhive.server.models.User> users = userRepository.findByEmail(user.getUsername());
        com.journeyhive.server.models.User userEntity = users.getFirst();

        List<Map<String, Object>> data = new ArrayList<>();
        Map<String, Object> pictureUrl = new HashMap<>();
        pictureUrl.put("url", userEntity.getPicture());
        data.add(pictureUrl);

        return new ResponseEntity<>(new CustomResponse(user.getUsername(), true, data), HttpStatus.OK);
    }
}