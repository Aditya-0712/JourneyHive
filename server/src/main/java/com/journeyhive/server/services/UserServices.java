package com.journeyhive.server.services;

import com.journeyhive.server.models.User;
import com.journeyhive.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServices {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean register(User user) {
        if (!userRepository.findByEmail(user.getEmail()).isEmpty()) {
            return false;
        }

        User newUser = new User(user.getEmail(), passwordEncoder.encode(user.getPassword()));
        if (user.getPicture() == null) {
            newUser.setPicture("/maps/account.svg");
        } else {
            newUser.setPicture(user.getPicture());
        }
        userRepository.save(newUser);
        return true;
    }

    public boolean login(User user) {
        List<User> fetchUser= userRepository.findByEmail(user.getEmail());
        if (fetchUser.isEmpty()) {
            return false;
        }

        return passwordEncoder.matches(user.getPassword(), fetchUser.getFirst().getPassword());
    }
}
