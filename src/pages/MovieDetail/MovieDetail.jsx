import React, { useState } from 'react';
import { useDarkMode } from '../../context/DarkModeContext'; // 다크모드 컨텍스트 사용
import { Badge, Button, Modal } from 'react-bootstrap'; // Modal 추가
import './MovieDetail.style.css';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useMovieReviewsQuery } from '../../hooks/useMovieReviews';
import { useMovieRecommendationsQuery } from '../../hooks/useMovieRecommendations'; // 추천 영화 훅 추가
import { useMovieVideosQuery } from '../../hooks/useMovieVideos'; // 영화 예고편 훅 추가
import Carousel from 'react-multi-carousel'; // 슬라이더 라이브러리
import 'react-multi-carousel/lib/styles.css'; // 슬라이더 스타일
import recommendResponsive from '../../constants/recommendResponsive'; // responsive import
import YouTube from 'react-youtube'; // react-youtube 추가

const MovieDetail = () => {
  
  const { isDarkMode } = useDarkMode(); // 다크모드 상태 가져오기
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 영화 상세 정보
  const { data: movie, isLoading: isMovieLoading, isError: isMovieError } = useMovieDetailQuery(id);

  // 영화 리뷰 정보
  const { data: reviews, isLoading: isReviewsLoading, isError: isReviewsError } = useMovieReviewsQuery(id);
  
  // 추천 영화 정보
  const { data: recommendations, isLoading: isRecommendationsLoading, isError: isRecommendationsError } = useMovieRecommendationsQuery(id);
  
  // 영화 예고편 정보
  const { data: videos, isLoading: isVideosLoading } = useMovieVideosQuery(id);

  // Modal 팝업 관리
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const handleShowModal = () => setShowTrailerModal(true);
  const handleCloseModal = () => setShowTrailerModal(false);
  
  // 각 리뷰별로 "Read more" 상태를 관리
  const [expandedReviews, setExpandedReviews] = useState({});
  
  // 전체 리뷰 확장 상태 관리 (기본적으로 3개까지만 표시)
  const [showAllReviews, setShowAllReviews] = useState(false);

  // "Read more" 버튼 클릭 시 실행되는 함수
  const handleReadMore = (reviewId) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId], // 클릭된 리뷰의 상태를 토글
    }));
  };

  // 리뷰 전체 보이기/감추기 상태 변경
  const handleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews); // 전체 리뷰 확장 상태를 토글
  };

  if (isMovieLoading) return <h1>Loading movie details...</h1>;
  if (isMovieError) return <h1>Error loading movie details</h1>;

  const genres = movie.genres.map(genre => (
      <Badge key={genre.id} bg="danger" className="genre-badge">{genre.name}</Badge>
  ));

  // 리뷰를 3개까지만 보여주고, "Read more" 상태에 따라 나머지 리뷰를 표시
  const reviewsToShow = showAllReviews ? (reviews || []).slice(0) : (reviews || []).slice(0, 3);

  // 유튜브 예고편 영상 ID
  const trailer = videos?.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  const videoOptions = {
    width: '100%', // modal 크기에 맞춰 width를 100%로 설정
    height: '390',
    playerVars: {
      autoplay: 1,
    },
  };

  // 추천 영화 클릭 시 해당 영화 detail page로 이동
  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`); // 클릭된 영화의 ID로 페이지 이동
  };

  return (
    <div className={isDarkMode ? 'page-content-dark' : 'page-content-light'}>
        {/* 영화 기본정보 섹션 */}
        <div className="movie-detail-container">
            {/* 포스터 이미지 */}
            <div
                className="movie-poster"
                style={{
                    backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`,
                }}
            ></div>

            {/* 영화 정보 */}
            <div className="movie-info">
                <div className="genres">{genres}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h1>{movie.title}</h1>
                    {/* 예고편 보기 버튼 */}
                    <Button variant="danger" onClick={handleShowModal}>
                        예고편 보기
                    </Button>
                </div>                
                <p>{movie.tagline}</p>

                <div className="movie-stats">
                    <div className="rating">
                        <span>⭐ {movie.vote_average}</span>
                        <span>👥 {movie.vote_count}</span>
                    </div>
                </div>

                <p className="overview">{movie.overview}</p>

                {/* 영화 예산, 수익, 개봉일, 상영시간 */}
                <div className="movie-budget">
                    <div className="budget-item">
                        <Badge bg="danger" className="budget-badge">Budget</Badge>
                        <span>${movie.budget.toLocaleString()}</span>
                    </div>
                    <div className="budget-item">
                        <Badge bg="danger" className="budget-badge">Revenue</Badge>
                        <span>${movie.revenue.toLocaleString()}</span>
                    </div>
                    <div className="budget-item">
                        <Badge bg="danger" className="budget-badge">Release Date</Badge>
                        <span>{movie.release_date}</span>
                    </div>
                    <div className="budget-item">
                        <Badge bg="danger" className="budget-badge">Runtime</Badge>
                        <span>{movie.runtime} min</span>
                    </div>
                </div>
            </div>
        </div>

        {/* 예고편 섹션 */}
        <Modal className={isDarkMode ? 'modal-dark' : 'modal-light'} show={showTrailerModal} onHide={handleCloseModal} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>예고편 보기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!trailer && isVideosLoading ? (
                    <p>Loading trailer...</p>
                ) : trailer ? (
                    <YouTube videoId={trailer.key} opts={videoOptions} />
                ) : (
                    <p>No trailer available</p>
                )}
            </Modal.Body>
        </Modal>

        {/* 리뷰 섹션 */}
        <div className={isDarkMode ? 'reviews-section-dark' : 'reviews-section-light'}>
          <div className="reviews-section">
              <h2>Reviews</h2>
              {isReviewsLoading ? (
                  <p>Loading reviews...</p>
              ) : isReviewsError ? (
                  <p>Error loading reviews</p>
              ) : reviews.length === 0 ? (
                  <p>No reviews available for this movie.</p>
              ) : (
                  <div className="reviews-list">
                    {reviewsToShow.map((review) => {
                        const isExpanded = expandedReviews[review.id]; // 리뷰가 확장되었는지 여부
                        const reviewContent = isExpanded ? review.content : `${review.content.substring(0, 150)}...`;

                        return (
                            <div key={review.id} className="review-card">
                                <h4 className="review-author">{review.author}</h4>
                                <p
                                    className="review-content"
                                    style={{
                                        maxHeight: isExpanded ? 'none' : '100px',
                                        overflow: isExpanded ? 'visible' : 'hidden',
                                    }}
                                >
                                    {reviewContent}
                                </p>
                                <button className="read-more" onClick={() => handleReadMore(review.id)}>
                                    {isExpanded ? 'Show less' : 'Read more'}
                                </button>
                            </div>
                        );
                    })}

                      {/* 전체 리뷰가 3개 이상일 경우 "Show more/less" 버튼 표시 */}
                      {reviews.length > 3 && (
                          <button className="read-more" onClick={handleShowAllReviews}>
                              {showAllReviews ? 'Show less reviews' : 'Read more reviews'}
                          </button>
                      )}
                  </div>
              )}
          </div>
        </div>

        {/* 추천 영화 섹션 */}
        <div className={isDarkMode ? 'recommendations-section-dark' : 'recommendations-section-light'}>
          <div className="recommendations-section">
              <h2>Recommended Movies</h2>
              {isRecommendationsLoading ? (
                  <p>Loading recommendations...</p>
              ) : isRecommendationsError ? (
                  <p>Error loading recommendations</p>
              ) : recommendations.length === 0 ? (
                  <p>No recommendations available for this movie.</p>
              ) : (
                  <Carousel responsive={recommendResponsive} infinite={true} centerMode={true} itemClass="carousel-item-padding-20-px">
                      {recommendations.map((movie) => (
                          <div
                              key={movie.id}
                              className="recommended-movie-card"
                              onClick={() => handleMovieClick(movie.id)} // 영화 클릭 시 이동
                              style={{ cursor: 'pointer' }} // 클릭 가능한 스타일 추가
                          >
                              <img
                                  src={`https://media.themoviedb.org/t/p/w200${movie.poster_path}`}
                                  alt={movie.title}
                                  className="recommended-movie-poster"
                              />
                              <h4 className="recommended-movie-title">{movie.title}</h4>
                          </div>
                      ))}
                  </Carousel>
              )}
          </div>
        </div>
    </div>
  );
};

export default MovieDetail;
