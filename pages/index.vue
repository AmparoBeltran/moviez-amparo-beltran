<script setup>
import "~/assets/css/styles.css";

const runtimeConfig = useRuntimeConfig();
console.log({ runtimeConfig });
const { data: movies } = await useFetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${runtimeConfig.public.apiSecretBearer}`,
    },
  }
);
</script>
<template>
  <div>
    <NuxtLayout>
      <section class="movies-grid">
        <div v-for="movie in movies.results">
          <MovieCard :movie="movie" />
        </div>
      </section>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.movies-grid {
  --poster-grid-size: 140px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--poster-grid-size), 1fr));
  grid-column: 2 / span 1;
  row-gap: var(--spacing-12);
  column-gap: var(--spacing-6);
  justify-content: center;
}

@media (min-width: 960px) {
  .movies-grid {
    --poster-grid-size: 180px;
  }
}
</style>
