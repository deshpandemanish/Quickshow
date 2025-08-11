package com.driver.bookMyShow.Repositories;

import com.driver.bookMyShow.Models.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Optional;

public interface ShowRepository extends JpaRepository<Show, Integer> {
// origin changed by manish 
//    @Query(value = "select time from shows where date = :date and movie_id = :movieId and theater_id = :theaterId" , nativeQuery = true)
//    public List<Time> getShowTimingsOnDate(@Param("date")Date date, @Param("theaterId")Integer theaterId, @Param("movieId")Integer movieId);

	@Query(value = "SELECT time FROM shows WHERE date = :date AND movie_id = :movieId AND theater_id = :theaterId", nativeQuery = true)
	List<Time> getShowTimingsOnDate(@Param("date") Date date,
	                                @Param("movieId") Integer movieId,
	                                @Param("theaterId") Integer theaterId);

	
    @Query(value = "select movie_id from shows group by movie_id order by count(*) desc limit 1" , nativeQuery = true)
    public Integer getMostShowsMovie();

    @Query(value = "select * from shows where movie_id = :movieId" , nativeQuery = true)
    public List<Show> getAllShowsOfMovie(@Param("movieId")Integer movieId);
    
    @Query(value = "SELECT * FROM shows WHERE date = :date", nativeQuery = true)
    public List<Show> getShowsByDate(@Param("date") Date date);
    
    List<Show> findByDateAndMovieId(Date date, Long movieId);
    
    Optional<Show> findByShowId(Long showId); // ✅




}
