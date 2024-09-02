import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext'; // 다크모드 컨텍스트 사용
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide';

// 1. 배너 =>  popular영화를 들고와서 첫번쨰 아이템을 보여주기
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie

const Homepage = () => {
  const { isDarkMode } = useDarkMode(); // 다크모드 상태 가져오기

  console.log('Homepage mounted'); // Homepage 컴포넌트 마운트 확인

  return (
    <div className={isDarkMode ? 'page-content-dark' : 'page-content-light'}>
      <Banner />
      <PopularMovieSlide />
    </div>
  );
};

export default Homepage;
