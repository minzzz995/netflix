import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext'; // 다크모드 컨텍스트 사용

const Homepage = () => {
  const { isDarkMode } = useDarkMode(); // 다크모드 상태 가져오기

  return (
    <div className={isDarkMode ? 'page-content-dark' : 'page-content-light'}>
      Homepage
    </div>
  );
};

export default Homepage;
