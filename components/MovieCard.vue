<script setup>
const { movie } = defineProps(["movie"]);
</script>
<template>
  <NuxtLink :to="`/detail/${movie.id}`" class="card">
    <img
      :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
      :alt="`${movie.title}`"
    />
    <p class="title">{{ movie.title }}</p>
    <div class="rating">
      <img src="/images/star.svg" alt="star" />
      <p>{{ Math.round(movie.vote_average * 10) }}%</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 140px;
  gap: var(--spacing-3);
  flex: 1 0 0;
}

.card > img {
  border-radius: var(--movie-card-radius);
  border: 1px solid var(--night-40, #282a2e);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.6);
  width: 100%;
}

.title {
  font-size: 1rem;
  font-weight: 700;
}

.card:hover > .title {
  color: var(--white-50);
}

.rating {
  display: flex;
  gap: var(--spacing-1);
}
</style>
