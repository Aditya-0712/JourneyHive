package com.journeyhive.server.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Tickets")
public class Ticket {
    @Id
    @Column(nullable = false, unique = true, length = 7)
    private String id;

    @Column(nullable = false)
    private String ticketName;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private int ticketPrice;

    @Column(nullable = false)
    private String duration;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClassName className;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private String arrivalTime;

    @Column(nullable = false)
    private String destinationTime;

    @Column(nullable = false)
    private int numberOfStops;

    @Column(nullable = false)
    private String stationName;

    @Column(nullable = false)
    private String terminal;

    @Column(nullable = false)
    private int platformNumber;

    @Column(nullable = false)
    private String features;

    public void setId() {
        this.id = UUID.randomUUID().toString().replace("-", "").substring(0, 7).toUpperCase();
    }
}