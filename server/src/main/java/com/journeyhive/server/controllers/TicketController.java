package com.journeyhive.server.controllers;

import com.journeyhive.server.DTO.CustomResponse;
import com.journeyhive.server.models.Ticket;
import com.journeyhive.server.services.TicketServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TicketController {
    @Autowired
    private TicketServices ticketServices;

    @PostMapping("/api/v1/tickets")
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketServices.createTicket(ticket);
    }

    @GetMapping("/api/v1/tickets")
    public List<Ticket> getAllTickets() {
        return ticketServices.getAllTickets();
    }

    @GetMapping("/api/v1/tickets/{id}")
    public ResponseEntity<?> getTicketById(@PathVariable("id") String id) {
        Ticket ticket = ticketServices.getTicket(id);

        if (ticket == null) {
            return new ResponseEntity<>(new CustomResponse("Does not exist", false), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(ticket, HttpStatus.OK);
    }
}