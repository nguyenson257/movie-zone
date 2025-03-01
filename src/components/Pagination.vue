<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
      Previous
    </button>
    <button v-for="page in visiblePages" :key="page" :class="{ active: page === currentPage }"
      @click="changePage(page)">
      {{ page }}
    </button>
    <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Pagination',
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    maxVisiblePages: {
      type: Number,
      default: 5,
    },
  },
  emits: ['page-change'],
  setup(props, { emit }) {
    const totalPages = computed(() =>
      Math.ceil(props.totalItems / props.itemsPerPage)
    );

    const visiblePages = computed(() => {
      const range = [];
      const half = Math.floor(props.maxVisiblePages / 2);
      let start = Math.max(props.currentPage - half, 1);
      const end = Math.min(start + props.maxVisiblePages - 1, totalPages.value);

      if (end - start + 1 < props.maxVisiblePages) {
        start = Math.max(end - props.maxVisiblePages + 1, 1);
      }

      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    });

    const changePage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        emit('page-change', page);
      }
    };

    return {
      totalPages,
      visiblePages,
      changePage,
    };
  },
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.pagination button {
  margin: 0 0.25rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
}

.pagination button.active {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>