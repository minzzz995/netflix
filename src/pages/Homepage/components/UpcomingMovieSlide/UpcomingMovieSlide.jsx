import React from "react";
import { Alert } from "react-bootstrap";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import {responsive} from "../../../../constants/responsive";

const UpcomingMoiveSlide = () => {

    console.log('UpcomingMoiveSlide mounted');
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Alert variant='danger'>{error.message}</Alert>;
  }

  if (!data || !data.results || data.results.length === 0) {
    return <h1>No popular movies found.</h1>;
  }

    // 디버깅: 데이터 확인
    console.log('Upcoming movies data:', data);
  return (
    <div className="UpcomingMoiveSlide text-white">
      <MovieSlider
        title={"Upcoming Movies"}
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMoiveSlide;