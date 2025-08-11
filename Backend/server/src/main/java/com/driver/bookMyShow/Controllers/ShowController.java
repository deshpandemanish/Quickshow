package com.driver.bookMyShow.Controllers;

import com.driver.bookMyShow.Dtos.RequestDtos.ShowEntryDto;
import com.driver.bookMyShow.Dtos.RequestDtos.ShowSeatEntryDto;
import com.driver.bookMyShow.Dtos.RequestDtos.ShowTimingsDto;
import com.driver.bookMyShow.Dtos.ResponseDtos.ShowResponseDto;
import com.driver.bookMyShow.Dtos.ResponseDtos.TheaterResponseDto;
import com.driver.bookMyShow.Models.Show;
import com.driver.bookMyShow.Repositories.ShowRepository;
import com.driver.bookMyShow.Services.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/show")
public class ShowController {

    @Autowired
    private ShowService showService;

    @PostMapping("/addNew")
    public ResponseEntity<String> addShow(@RequestBody ShowEntryDto showEntryDto) {
        try {
            String result = showService.addShow(showEntryDto);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/associateSeats")
    public ResponseEntity<String> associateShowSeats(@RequestBody ShowSeatEntryDto showSeatEntryDto) {
        try {
            String result = showService.associateShowSeats(showSeatEntryDto);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

//    @CrossOrigin(origins = "http://localhost:5173")
//    @GetMapping("/showTimingsOnDate")
//    public ResponseEntity<List<Time>> showTimingsOnDate(ShowTimingsDto showTimingsDto) {
//        try {
//            List<Time> result = showService.showTimingsOnDate(showTimingsDto);
//            return new ResponseEntity<>(result, HttpStatus.FOUND);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        }
//    }
//    
//    @CrossOrigin(origins = "http://localhost:5173")
//    @PostMapping("/showTimingsOnDate")
//    public ResponseEntity<List<Time>> showTimingsOnDate(@RequestBody ShowTimingsDto showTimingsDto) {
//        try {
//            List<Time> result = showService.showTimingsOnDate(showTimingsDto);
//            return new ResponseEntity<>(result, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        }
//    }
    
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/showTimingsOnDate")
    public ResponseEntity<?> showTimingsOnDate(@RequestBody ShowTimingsDto showTimingsDto) {
        try {
            List<Time> timings = showService.showTimingsOnDate(showTimingsDto);
            if (timings.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No show timings found for the given date and movie.");
            }
            return ResponseEntity.ok(timings);
        } catch (Exception e) {
            // Optional: log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error fetching show timings: " + e.getMessage());
        }
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/showsByDate")
    public ResponseEntity<?> getShowsByDate(@RequestParam("date") String dateStr) {
        try {
            Date date = Date.valueOf(dateStr); // Format: yyyy-MM-dd
            List<ShowResponseDto> shows = showService.getShowsByDate(date);

            if (shows.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No shows found for the given date.");
            }

            return ResponseEntity.ok(shows);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid date format. Use yyyy-MM-dd.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching shows.");
        }
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/showsByDate/{movieId}")
    public ResponseEntity<?> getShowsByDateAndMovie(
            @PathVariable Long movieId,
            @RequestParam("date") String dateStr) {
        try {
            Date date = Date.valueOf(dateStr); // Format: yyyy-MM-dd
            List<ShowResponseDto> shows = showService.getShowsByDateAndMovie(date, movieId);

            if (shows.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No shows found for this movie on the given date.");
            }

            return ResponseEntity.ok(shows);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid date format. Use yyyy-MM-dd.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching shows.");
        }
    }

  
    @GetMapping("/movieHavingMostShows")
    public ResponseEntity<String> movieHavingMostShows() {
        try {
            String movie = showService.movieHavingMostShows();
            return new ResponseEntity<>(movie, HttpStatus.FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/theaterByShow/{showId}")
    public ResponseEntity<?> getTheaterByShowId(@PathVariable Long showId) {
        try {
            TheaterResponseDto theaterDto = showService.getTheaterByShowId(showId);

            if (theaterDto == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No theater found for this show.");
            }

            return ResponseEntity.ok(theaterDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching theater.");
        }
    }

}
