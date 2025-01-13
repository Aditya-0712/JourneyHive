package com.journeyhive.server.services;

import com.journeyhive.server.models.Booking;
import com.journeyhive.server.models.Ticket;
import com.journeyhive.server.repositories.BookingRepository;
import com.journeyhive.server.repositories.TicketRepository;
import com.journeyhive.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookingServices {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    private com.journeyhive.server.models.User getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        String email = user.getUsername();
        List<com.journeyhive.server.models.User> users = userRepository.findByEmail(email);
        return users.getFirst();
    }

    public boolean addBooking(String id, int quantity, String fullName, String phoneNumber) {
        Random random = new Random();

        com.journeyhive.server.models.User userEntity = getUser();
        String email = userEntity.getEmail();

        Ticket ticket = ticketRepository.findById(id).orElse(null);
        if (ticket == null) {return false;}

        Booking booking = new Booking(email, fullName, phoneNumber, quantity, ticket);

        int randomInt = random.nextInt(90) + 10;
        StringBuilder seats = new StringBuilder();
        for (int i = 0; i < quantity; i++) {
            seats.append(randomInt++);
            seats.append(", ");
        }

        booking.setSeatNumbers(seats.toString());
        bookingRepository.save(booking);

        userEntity.getBookedTickets().add(booking.getBookingId());
        userRepository.save(userEntity);

        return true;
    }

    public List<Map<String, Object>> getAllBookings() {
        com.journeyhive.server.models.User userEntity = getUser();

        List<Long> bookingIds = userEntity.getBookedTickets();

        List<Map<String, Object>> bookings = new ArrayList<>();

        for (Long bookingId : bookingIds) {
            Map<String, Object> booking = new HashMap<>();

            Booking bookingEntity = bookingRepository.findById(bookingId).orElse(null);

            if (bookingEntity != null) {
                Ticket ticket = bookingEntity.getTicket();

                booking.put("booking", bookingEntity);
                booking.put("ticket", ticket);
            }

            bookings.add(booking);
        }

        return bookings;
    }

    public void deleteBooking(Long bookingId) {
        com.journeyhive.server.models.User userEntity = getUser();

        userEntity.getBookedTickets().remove(bookingId);
        bookingRepository.deleteById(bookingId);
    }
}
