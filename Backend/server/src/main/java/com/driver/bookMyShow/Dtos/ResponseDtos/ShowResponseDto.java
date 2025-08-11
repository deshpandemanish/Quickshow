package com.driver.bookMyShow.Dtos.ResponseDtos;

import java.sql.Date;
import java.sql.Time;

import lombok.Data;

@Data
public class ShowResponseDto {
    private Integer showId;
    private String movieName;
    private String theaterName;
    private Date date;
    private Time time;
}
