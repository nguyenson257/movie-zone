<template>
  <div class="movie-list">
    <h1>Danh Sách Phim Mới Cập Nhật</h1>
    <div v-if="loading">Loading...</div>
    <div v-else class="movie-grid">
      <div v-for="movie in movies" :key="movie._id" class="movie-card" @click="goToMovieDetail(movie.slug)">
        <div class="movie-thumb-container">
          <img :src="getThumbnailUrl(movie.thumb_url)" :alt="movie.name" class="movie-thumb" />
        </div>
        <div class="movie-info">
          <h2>{{ movie.name }}</h2>
          <p>{{ movie.origin_name }} ({{ movie.year }})</p>
        </div>
      </div>
    </div>
    <Pagination :total-items="pagination.totalItems" :items-per-page="pagination.totalItemsPerPage"
      :current-page="pagination.currentPage" @page-change="handlePageChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import { fetchMovies } from '@/services/movieService';
import { Movie } from '@/models/movie';
import { getThumbnailUrl } from '@/utils/imageUtils';

export default defineComponent({
  name: 'MovieList',
  components: {
    Pagination,
  },
  setup() {
    const router = useRouter(); // Sử dụng useRouter
    const movies = ref<Movie[]>([]);
    const pagination = ref<Pagination>({
      totalItems: 0,
      totalItemsPerPage: 0,
      currentPage: 1,
      totalPages: 0,
    });
    const loading = ref(true);

    const loadMovies = async (page: number = 1) => {
      try {
        loading.value = true;
        const data = await fetchMovies(page);
        movies.value = data.items;
        pagination.value = data.pagination;
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        loading.value = false;
      }
    };

    const handlePageChange = (page: number) => {
      pagination.value.currentPage = page;
      loadMovies(page);
    };

    const goToMovieDetail = (slug: string) => {
      router.push({ name: 'MovieDetail', params: { slug } }); // Chuyển hướng đến trang chi tiết
    };

    onMounted(() => {
      loadMovies();
    });

    return {
      movies,
      pagination,
      loading,
      handlePageChange,
      getThumbnailUrl,
      goToMovieDetail, // Trả về hàm để sử dụng trong template
    };
  },
});
</script>

<style scoped>
.movie-list {
  padding: 2rem;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  /* 6 cột */
  gap: 1rem;
  /* Khoảng cách giữa các card */
}

.movie-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  color: #fff;
}

.movie-card:hover {
  transform: scale(1.05);
  /* Hiệu ứng zoom khi hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* Đổ bóng khi hover */
}

.movie-thumb-container {
  width: 100%;
  height: 200px;
  /* Chiều cao cố định cho thumbnail */
  overflow: hidden;
}

.movie-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Đảm bảo ảnh không bị méo */
  transition: transform 0.2s ease;
}

.movie-card:hover .movie-thumb {
  transform: scale(1.1);
  /* Hiệu ứng zoom ảnh khi hover */
}

.movie-info {
  padding: 1rem;
  text-align: center;
}

.movie-info h2 {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

.movie-info p {
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  color: #666;
}

.pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

@media (max-width: 1200px) {
  .movie-grid {
    grid-template-columns: repeat(4, 1fr);
    /* 4 cột trên màn hình nhỏ hơn */
  }
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
    /* 2 cột trên điện thoại */
  }
}

@media (max-width: 480px) {
  .movie-grid {
    grid-template-columns: repeat(1, 1fr);
    /* 1 cột trên điện thoại nhỏ */
  }
}
</style>