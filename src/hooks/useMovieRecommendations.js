import { useQuery } from '@tanstack/react-query';
import api from '../utils/api'; // API 호출을 위한 유틸리티

const fetchMovieRecommendations = (id) => {
    return api.get(`/movie/${id}/recommendations`);
};

export const useMovieRecommendationsQuery = (id) => {
    return useQuery({
        queryKey: ['movie-recommendations', id],
        queryFn: () => fetchMovieRecommendations(id),
        select: (result) => result.data.results, // 추천 영화 목록을 선택
    });
};
