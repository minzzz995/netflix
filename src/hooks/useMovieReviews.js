import { useQuery } from "@tanstack/react-query";
import api from "../utils/api"; // 기존 API 유틸 사용

const fetchMovieReviews = (id) => {
    return api.get(`/movie/${id}/reviews`);
};

export const useMovieReviewsQuery = (id) => {
    return useQuery({
        queryKey: ['movie-reviews', id],
        queryFn: () => fetchMovieReviews(id),
        select: (result) => result.data.results, // 리뷰 데이터를 선택
    });
};
