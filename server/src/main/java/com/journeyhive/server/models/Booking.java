package com.journeyhive.server.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private String seatNumbers;

    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false, referencedColumnName = "id")
    private Ticket ticket;

    public Booking(String email, String fullName, String phoneNumber, int quantity, Ticket ticket) {
        this.email = email;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.quantity = quantity;
        this.ticket = ticket;
    }
}
