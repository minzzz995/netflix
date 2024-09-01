import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import Alert from 'react-bootstrap/Alert';
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>; // Loading 상태에서 로딩 메시지 표시
  }

  if (isError) {
    return <Alert variant='danger'>{error.message}</Alert>; // Error 상태에서 에러 메시지 표시
  }

  if (!data || !data.results || data.results.length === 0) {
    return <h1>No data available</h1>; // 데이터가 없을 때 처리
  }

  const firstMovie = data.results[0];

  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2${firstMovie.poster_path})`
      }}
      className='banner'
    >
      <div className='text-white banner-text-area'>
        <h1>{firstMovie.title}</h1>
        <p>{firstMovie.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
