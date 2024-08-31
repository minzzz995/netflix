import React, { createContext, useContext, useState, useEffect  } from 'react';

// 다크모드 상태를 관리하는 Context 생성
const DarkModeContext = createContext();

// 다크모드 상태를 제공하는 Provider 컴포넌트
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    console.log('현재 Dark Mode 상태:', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// 다크모드 상태를 사용하기 위한 커스텀 훅
export const useDarkMode = () => useContext(DarkModeContext);
