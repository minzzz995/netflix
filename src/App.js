import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppWrapper from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import Movies from './pages/Movies/Movies';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import NotFound from './pages/NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DarkModeProvider } from './context/DarkModeContext';

// 홈페이지 /
// 영화 전체 보여주는 페이지 /movies?q=
// 영화 디테일 페이지 /movies/:id
// 추천 영화 movies/:id/recommandation
// 리뷰 /movies/:id/reviews

function App() {
  return (
    <DarkModeProvider>
      <Routes>
        <Route path="/" element={<AppWrapper />}>
          <Route index element={<Homepage/>}/>
            <Route path="movies/">
              <Route index element={<Movies/>} />
              <Route path=":id" element={<MovieDetail />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound/>}/>
      </Routes>
    </DarkModeProvider>
  );
}


export default App;
