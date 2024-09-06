import React from "react";
import { Alert } from "react-bootstrap";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies"; // 올바른 경로
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Alert variant='danger'>{error.message}</Alert>;
  }

  if (!data || !data.results || data.results.length === 0) {
    return <h1>No popular movies found.</h1>;
  }

  return (
    <div className="TopRatedMovieSlide text-white">
      <MovieSlider
        title={"Top Rated Movies"}
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default TopRatedMovieSlide;
