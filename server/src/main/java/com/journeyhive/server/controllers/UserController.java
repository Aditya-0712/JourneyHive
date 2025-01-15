package com.journeyhive.server.controllers;

import com.journeyhive.server.DTO.CustomResponse;
import com.journeyhive.server.models.User;
import com.journeyhive.server.services.JwtServices;
import com.journeyhive.server.services.UserServices;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private UserServices userServices;

    @Autowired
    private JwtServices jwtServices;

    @PostMapping("/api/v1/register")
    public ResponseEntity<CustomResponse> register(@RequestBody User user) {
        return userServices.register(user)?new ResponseEntity<>(new CustomResponse("Account created successfully", true), HttpStatus.OK):new ResponseEntity<>(new CustomResponse("Email already registered", false), HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/api/v1")
    public ResponseEntity<CustomResponse> login(@RequestBody User user, HttpServletResponse response) {
        if (userServices.login(user)) {
            String token = jwtServices.generateToken(user);

            Cookie cookie = new Cookie("jh_jwt", token);
            cookie.setPath("/");
            cookie.setMaxAge(7 * 24 * 60 * 60);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);

            response.addCookie(cookie);

            return new ResponseEntity<>(new CustomResponse("Login successful", true), HttpStatus.OK);
        }

        return new ResponseEntity<>(new CustomResponse("Invalid username or password", false), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/api/v1/logout")
    public ResponseEntity<CustomResponse> logout(HttpServletResponse response) {
        SecurityContextHolder.clearContext();

        Cookie cookie = new Cookie("jh_jwt", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);

        response.addCookie(cookie);

        return new ResponseEntity<>(new CustomResponse("Logout successful", true), HttpStatus.OK);
    }
}