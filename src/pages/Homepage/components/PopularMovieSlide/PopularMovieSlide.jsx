import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'; // usePopularMoviesQuery 훅 경로
import Alert from 'react-bootstrap/Alert';
import {responsive} from "../../../../constants/responsive"
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';

const PopularMovieSlide = () => {
    console.log('PopularMovieSlide mounted');
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

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
  console.log('Popular movies data:', data);

  return (
    <div>
      <MovieSlider title='Popular Movies' movies={data.results} responsive={responsive}/>
    </div>
  );
}

export default PopularMovieSlide;
