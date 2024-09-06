import { useQuery } from '@tanstack/react-query';
import api from '../utils/api'; // API 호출 유틸리티

const fetchMovieVideos = (id) => {
  return api.get(`/movie/${id}/videos`);
};

export const useMovieVideosQuery = (id) => {
  return useQuery({
    queryKey: ['movie-videos', id],
    queryFn: () => fetchMovieVideos(id),
    select: (result) => result.data.results, // 비디오 데이터를 가져옴
  });
};
