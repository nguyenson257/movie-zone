// src/services/movieService.ts

import { type ApiResponse, type MovieDetail } from '@/models/movie';

const API_URL = 'https://ophim1.com/danh-sach/phim-moi-cap-nhat';
const MOVIE_DETAIL_URL = 'https://ophim1.com/phim';

export const fetchMovies = async (page: number = 1): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}?page=${page}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieDetail = async (slug: string): Promise<MovieDetail> => {
  try {
    const response = await fetch(`${MOVIE_DETAIL_URL}/${slug}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: MovieDetail = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie detail:', error);
    throw error;
  }
};