package com.driver.bookMyShow.Dtos.RequestDtos;


import java.util.List;

import lombok.Data;

@Data
public class BookingDto {
    private String userName;
    private List<String> seats;
    private String paymentId;
    private String orderId;
}

