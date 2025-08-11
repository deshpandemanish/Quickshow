package com.driver.bookMyShow.Dtos.RequestDtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Data
@Getter
@Setter
public class ShowTimingsDto {
    private Date date;
    private Integer theaterId;
    private Integer movieId;
}
