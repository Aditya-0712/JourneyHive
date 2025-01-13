package com.journeyhive.server.controllers;

import com.journeyhive.server.DTO.BookingRequest;
import com.journeyhive.server.DTO.CustomResponse;
import com.journeyhive.server.services.BookingServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class BookingController {
    @Autowired
    private BookingServices bookingServices;

    @PostMapping("/api/v1/bookTicket/{ticketId}")
    public ResponseEntity<CustomResponse> bookTicket(@PathVariable("ticketId") String ticketId, @RequestBody BookingRequest bookingRequest) {
        return bookingServices.addBooking(ticketId, bookingRequest.getQuantity(), bookingRequest.getFullName(), bookingRequest.getPhoneNumber())?new ResponseEntity<>(new CustomResponse("Booking successful", true), HttpStatus.OK):new ResponseEntity<>(new CustomResponse("Booking failed", false), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/api/v1/bookTicket")
    public ResponseEntity<CustomResponse> getBookingTicket() {
        List<Map<String, Object>> res = bookingServices.getAllBookings();
        return new ResponseEntity<>(new CustomResponse("Bookings fetched", true, res), HttpStatus.OK);
    }

    @DeleteMapping("/api/v1/bookTicket/{bookingId}")
    public ResponseEntity<CustomResponse> deleteBooking(@PathVariable("bookingId") Long bookingId) {
        bookingServices.deleteBooking(bookingId);
        return new ResponseEntity<>(new CustomResponse("Booking cancelled", true), HttpStatus.OK);
    }
}