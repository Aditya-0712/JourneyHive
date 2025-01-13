package com.journeyhive.server.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OAuth2Controller {

    @GetMapping("/oauth2/failure")
    public void failure() {
        System.out.println("failure");
    }
}
