package com.driver.bookMyShow.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.driver.bookMyShow.Dtos.RequestDtos.BookingDto;
import com.driver.bookMyShow.Dtos.RequestDtos.BookingRequest;
import com.driver.bookMyShow.Services.BookingService;



@RestController
@RequestMapping("/booking")
public class BookingController {
	
    private final BookingService bookingService;
    
    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/bookSeats")
    public ResponseEntity<String> bookSeats(@RequestBody BookingRequest request) {
        // TODO: Validate request, check seat availability, save booking, etc.
        System.out.println("Received booking request: " + request);

        return ResponseEntity.ok("Seats booked successfully");
    }
    
    @PostMapping("/bookings")
    public ResponseEntity<String> saveBooking(@RequestBody BookingDto bookingDto) {
        bookingService.saveBooking(bookingDto);
        return ResponseEntity.ok("Booking saved");
    }

}
