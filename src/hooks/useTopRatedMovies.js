import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRated = async () => {
  return await api.get(`/movie/top_rated`)
}

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-top-rated"],
    queryFn: fetchTopRated,
    select: (result) => { return result.data }
  })
} 