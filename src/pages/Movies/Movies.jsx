import React, { useState } from 'react';
import { useDarkMode } from '../../context/DarkModeContext'; // 다크모드 컨텍스트 사용
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Alert, Container } from "react-bootstrap";
import MovieCard from '../../common/MovieCard/MovieCard';
import { Row, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

// 1. nav바에서 클릭해서 온 경우 -> popularMovie 보여주기
// 2. keyword를 입력해서 온 경우 -> keyword와 관련된 영화들을 보여줌

// 3. 페이지네이션 설치
// 4. page state 생성
// 5. 페이지네이션 클릭할 때마다 page바꿔주기
// 6. page값이 바뀔때마다 useSearchMovie에 page까지 넣어서 fetch

const Movies = () => {
  const { isDarkMode } = useDarkMode(); // 다크모드 상태 가져오기

  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useSearchMovieQuery({keyword, page});
  
  const handlePageClick=({selected})=>{
    setPage(selected+1);
  }
  
  console.log("ddd", data);

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

  return (
    <div className={isDarkMode ? 'page-content-dark' : 'page-content-light'}>
        <Container>
            <Row>
                <Col lg={4} xs={12}>
                {" "}
                필터{" "}
                </Col>
                <Col lg={8} xs={12}>
                    <Row>
                        {data?.results.map((movie, index) => (
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
