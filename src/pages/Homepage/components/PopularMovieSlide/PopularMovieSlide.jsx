import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'; // usePopularMoviesQuery 훅 경로
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard'; // MovieCard 컴포넌트 경로
import "./PopularMovieSlide.style.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  }
};

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
      <h3>Popular Movies</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass='movie-slider p-1'
        containerClass='carousel-container'
        responsive={responsive}
      >
        {data.results.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
}

export default PopularMovieSlide;
