export interface Movie {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  thumb_url: string;
  poster_url: string;
  year: number;
  modified: {
    time: string;
  };
  tmdb: {
    type: string;
    id: string;
    season: number | null;
    vote_average: number;
    vote_count: number;
  };
  imdb: {
    id: string;
  };
}

export interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export interface ApiResponse {
  status: boolean;
  items: Movie[];
  pathImage: string;
  pagination: Pagination;
}


// Định nghĩa interface cho chi tiết phim
export interface MovieDetail {
  status: boolean;
  msg: string;
  movie: {
    tmdb: {
      type: string;
      id: string;
      season: number | null;
      vote_average: number;
      vote_count: number;
    };
    imdb: {
      id: string;
    };
    created: {
      time: string;
    };
    modified: {
      time: string;
    };
    _id: string;
    name: string;
    slug: string;
    origin_name: string;
    content: string;
    type: string;
    status: string;
    thumb_url: string;
    poster_url: string;
    is_copyright: boolean;
    sub_docquyen: boolean;
    chieurap: boolean;
    trailer_url: string;
    time: string;
    episode_current: string;
    episode_total: string;
    quality: string;
    lang: string;
    notify: string;
    showtimes: string;
    year: number;
    view: number;
    actor: string[];
    director: string[];
    category: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
    country: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  };
  episodes: Array<{
    server_name: string;
    server_data: Array<{
      name: string;
      slug: string;
      filename: string;
      link_embed: string;
      link_m3u8: string;
    }>;
  }>;
}