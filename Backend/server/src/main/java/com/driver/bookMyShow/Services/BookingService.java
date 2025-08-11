package com.driver.bookMyShow.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driver.bookMyShow.Dtos.RequestDtos.BookingDto;
import com.driver.bookMyShow.Models.Booking;
import com.driver.bookMyShow.Repositories.BookingRepository;

import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    /**
     * Saves a new booking before payment is completed.
     * Sets 'paid' to false by default.
     */
    public void saveBooking(BookingDto bookingDto) {
        Booking booking = new Booking();
        booking.setUserName(bookingDto.getUserName());
        booking.setSeats(bookingDto.getSeats());
        booking.setPaymentId(bookingDto.getPaymentId());
        booking.setOrderId(bookingDto.getOrderId());
        booking.setPaid(false); // default: unpaid

        bookingRepository.save(booking);
    }

    /**
     * Marks a booking as paid after Razorpay verification.
     * Updates paymentId and sets 'paid' to true.
     */
    public void markBookingAsPaid(String orderId, String paymentId) {
        Optional<Booking> optionalBooking = bookingRepository.findByOrderId(orderId);

        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();
            booking.setPaymentId(paymentId);
            booking.setPaid(true);

            bookingRepository.save(booking);
        } else {
            System.out.println("Booking not found for orderId: " + orderId);
        }
    }
}
