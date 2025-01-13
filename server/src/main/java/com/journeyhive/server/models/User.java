package com.journeyhive.server.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Users")
public class User {
    @Id
    @Column(unique = true, nullable = false)
    private String id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String username;

    private String phoneNumber;

    private String picture;

    @ElementCollection
    @CollectionTable(name = "booked_tickets", joinColumns = @JoinColumn(name = "id"))
    private List<Long> bookedTickets;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
        this.id = UUID.randomUUID().toString().replace("-", "");
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.id = UUID.randomUUID().toString().replace("-", "");
    }
}