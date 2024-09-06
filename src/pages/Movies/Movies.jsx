import React, { useState } from 'react';
import { useDarkMode } from '../../context/DarkModeContext'; // 다크모드 컨텍스트 사용
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Alert, Container, Dropdown } from "react-bootstrap";
import MovieCard from '../../common/MovieCard/MovieCard';
import { Row, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './Movies.style.css'; // CSS 파일 임포트

// 장르 필터 목록 추가
const genresList = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const Movies = () => {
  const { isDarkMode } = useDarkMode(); // 다크모드 상태 가져오기

  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null); // 선택된 장르 상태 추가
  const [sortOrder, setSortOrder] = useState(null); // 정렬 상태 추가 (높은순, 낮은순)

  const { data, isLoading, isError, error } = useSearchMovieQuery({keyword, page});
  
  const handlePageClick = ({selected}) => {
    setPage(selected + 1);
  }

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  }

  const handleSortChange = (order) => {
    setSortOrder(order); // 정렬 기준 변경
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Alert variant='danger'>{error.message}</Alert>;
  }

  if (!data || !data.results || data.results.length === 0) {
    alert('검색결과가 없습니다.');
    return null; 
  }

  // 선택된 장르로 영화 필터링
  let filteredMovies = selectedGenre
    ? data.results.filter(movie => movie.genre_ids.includes(selectedGenre))
    : data.results;

  // 정렬 기준에 따라 영화 정렬
  if (sortOrder === 'popularity_high') {
    filteredMovies = filteredMovies.sort((a, b) => b.popularity - a.popularity); // 인기도 높은순
  } else if (sortOrder === 'popularity_low') {
    filteredMovies = filteredMovies.sort((a, b) => a.popularity - b.popularity); // 인기도 낮은순
  }

  return (
    <div className={isDarkMode ? 'page-content-dark' : 'page-content-light'}>
        <Container className="container">
            <Row>
                {/* 왼쪽 장르 및 정렬 필터 섹션 */}
                <Col lg={4} xs={12}>
                    <h4>장르 선택</h4>
                    <Dropdown>
                      <Dropdown.Toggle variant="danger" id="dropdown-basic">
                        {selectedGenre 
                          ? genresList.find(genre => genre.id === selectedGenre)?.name 
                          : "Select Genre"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {genresList.map(genre => (
                          <Dropdown.Item
                            key={genre.id}
                            onClick={() => handleGenreClick(genre.id)}
                          >
                            {genre.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>

                    <h4 className="mt-3">정렬 기준</h4>
                    <Dropdown>
                      <Dropdown.Toggle variant="danger" id="sort-dropdown">
                        {sortOrder === 'popularity_high' 
                          ? "인기도 높은순" 
                          : sortOrder === 'popularity_low'
                          ? "인기도 낮은순"
                          : "정렬 기준 선택"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSortChange('popularity_high')}>
                          인기도 높은순
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange('popularity_low')}>
                          인기도 낮은순
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                </Col>

                {/* 오른쪽 영화 리스트 섹션 */}
                <Col lg={8} xs={12}>
                    <Row>
                        {filteredMovies.map((movie, index) => (
                            <Col key={index} lg={4} xs={12}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                    </Row>
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={data?.total_pages}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={page - 1}
                    />
                </Col>
            </Row>
        </Container>
    </div>
  );
};

export default Movies;
