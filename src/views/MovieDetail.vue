<template>
  <div class="movie-detail">
    <div v-if="loading">Loading...</div>
    <div v-else-if="movie">
      <div class="movie-header">
        <img :src="movie.poster_url" :alt="movie.name" class="movie-poster" />
        <div class="movie-info">
          <h1>{{ movie.name }}</h1>
          <p>{{ movie.origin_name }} ({{ movie.year }})</p>
          <p><strong>Thời lượng:</strong> {{ movie.time }}</p>
          <p><strong>Đạo diễn:</strong> {{ movie.director.join(', ') }}</p>
          <p><strong>Diễn viên:</strong> {{ movie.actor.join(', ') }}</p>
          <p><strong>Thể loại:</strong> {{movie.category.map(c => c.name).join(', ')}}</p>
          <p><strong>Quốc gia:</strong> {{movie.country.map(c => c.name).join(', ')}}</p>
        </div>
      </div>
      <div class="movie-content">
        <h2>Nội dung phim</h2>
        <div v-html="movie.content"></div>
      </div>
      <div class="movie-player">
        <h2>Xem phim</h2>
        <M3U8Player :key="playerKey" :src="videoSource" />
      </div>
      <div class="movie-episodes">
        <h2>Danh sách tập</h2>
        <div v-for="episode in movie.episodes" :key="episode.server_name">
          <h3>{{ episode.server_name }}</h3>
          <div class="episode-list">
            <button v-for="item in episode.server_data" :key="item.slug" target="_blank" class="episode-link"
              @click="changeEpisode(item.link_m3u8, item.name)">
              {{ item.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Không tìm thấy thông tin phim.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchMovieDetail } from '@/services/movieService';
import { MovieDetail } from '@/models/movie';
import M3U8Player from "@/components/M3U8Player.vue";

export default defineComponent({
  name: 'MovieDetail',
  components: {
    M3U8Player
  },
  setup() {
    const route = useRoute();
    const movie = ref<MovieDetail | null>(null);
    const loading = ref(true);
    const player = ref(null);
    const videoSource = ref<string>('');
    const playerKey = ref(0);

    onMounted(async () => {
      const slug = route.params.slug as string;
      try {
        const data = await fetchMovieDetail(slug);
        movie.value = data.movie;
        movie.value.episodes = data.episodes;

        // Lấy link_m3u8 đầu tiên từ danh sách tập phim
        if (data.episodes.length > 0 && data.episodes[0].server_data.length > 0) {
          videoSource.value = data.episodes[0].server_data[0].link_m3u8;
        }
      } catch (error) {
        console.error('Error fetching movie detail:', error);
      } finally {
        loading.value = false;
      }
    });

    onUnmounted(() => {
      if (player.value) {
        player.value.dispose(); // Dọn dẹp player khi component bị hủy
      }
    });

    const changeEpisode = (src: string, index) => {
      videoSource.value = src;
      playerKey.value = index;
    };

    return {
      movie,
      loading,
      videoSource,
      M3U8Player,
      changeEpisode,
      playerKey,
    };
  },
});
</script>

<style scoped>
.movie-detail {
  padding: 2rem;
}

.movie-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.movie-poster {
  width: 300px;
  height: auto;
  border-radius: 8px;
}

.movie-info {
  flex: 1;
}

.movie-info h1 {
  margin: 0;
  font-size: 2rem;
}

.movie-info p {
  margin: 0.5rem 0;
  color: #666;
}

.movie-content {
  margin-top: 2rem;
}

.movie-player {
  margin-top: 2rem;
}

.movie-episodes {
  margin-top: 2rem;
}

.movie-episodes h3 {
  margin: 1rem 0 0.5rem;
}

.episode-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.episode-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none;
  color: #42b983;
  background-color: #f9f9f9;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.episode-link:hover {
  background-color: #42b983;
  color: white;
}
</style>