package com.driver.bookMyShow.Dtos.ResponseDtos;

import java.sql.Date;

import com.driver.bookMyShow.Enums.Genre;
import com.driver.bookMyShow.Enums.Language;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovieResponseDto {

    private Integer id;
    private String movieName;
    private Integer duration;
    private Double rating;
    private Date releaseDate;
    private Genre genre;
    private Language language;
}
