<template>
  <div class="home">
    <MovieList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MovieList from '@/components/MovieList.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    MovieList,
  },
});
</script>

<style scoped>
.home {
  padding: 2rem;
}
</style>