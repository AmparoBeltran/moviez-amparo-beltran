<script setup>
const runtimeConfig = useRuntimeConfig();
const { id } = useRoute().params;

const { data: movie } = await useFetch(
  `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=en-US`,
  {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${runtimeConfig.public.apiSecretBearer}`,
    },
  }
);

const { data: similar } = await useFetch(
  `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${movie.value.genres[0].id}`,
  {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${runtimeConfig.public.apiSecretBearer}`,
    },
  }
);

const similarMovies = similar.value.results.filter((_, i) => i < 15);

const crewMap = movie.value.credits.crew.reduce((acc, member) => {
  if (acc[member.name]) {
    acc[member.name].push(member.job);
  } else {
    acc[member.name] = [member.job];
  }
  return acc;
}, {});

const directorWriter = Object.entries(crewMap).find(
  ([_, jobs]) => jobs.includes("Director") && jobs.includes("Writer")
)?.[0];

const director = movie.value.credits.crew.find(
  (member) => member.job === "Director" && member.name !== directorWriter
)?.name;
const writer = movie.value.credits.crew.find(
  (member) => member.job === "Writer" && member.name !== directorWriter
)?.name;

const crew = {
  "Director/Writer": directorWriter,
  Director: director,
  Writer: writer,
};

const minutes = movie.value.runtime % 60;
const hours = (movie.value.runtime - minutes) / 60;
</script>

<template>
  <div>
    <NuxtLayout>
      <main>
        <NuxtLink to="/" class="back-home-navigation">
          <img src="/images/chevron-back.svg" alt="back to movies" />
          <span class="back">Back to movies</span>
        </NuxtLink>
        <div class="movie-overview-container">
          <img
            :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
            :alt="`${movie.title}`"
          />
          <section class="content">
            <p class="title">{{ movie.title }}</p>
            <div class="movie-meta-container">
              <div class="rating">
                <img src="/images/star.svg" alt="star" />
                <p>{{ Math.round(movie.vote_average * 10) }}%</p>
              </div>
              <div class="info">
                <div class="movie-details">
                  <div class="age">
                    <span>{{ !movie.adult ? "15" : "18" }}</span>
                  </div>
                  <span>{{ movie.release_date.split("-")[0] }}</span>
                  <span>{{ hours }}H&nbsp;{{ minutes }}M</span>
                </div>
                <div class="genres">
                  <template v-for="genre in movie.genres">
                    <span class="genre">{{ genre.name }}</span>
                  </template>
                </div>
              </div>
            </div>
            <div class="movie-overview">
              <h1 class="overview-title">Overview</h1>
              <p class="overview">{{ movie.overview }}</p>
            </div>
            <div class="team-container">
              <template v-for="[position, name] in Object.entries(crew)">
                <template v-if="!!name">
                  <span class="job">{{ position }}</span>
                  <span class="name">{{ name }}</span>
                </template>
              </template>
            </div>
          </section>
        </div>
      </main>
      <section class="similar-movies-container">
        <h3 class="similar-movies-title">
          More {{ movie.genres[0].name }} Movies
        </h3>
        <div class="movies-grid">
          <div v-for="movie in similarMovies">
            <MovieCard :movie="movie" />
          </div>
        </div>
      </section>
    </NuxtLayout>
  </div>
</template>

<style scoped>
main {
  display: flex;
  grid-area: content;
  flex-direction: column;
}

.movie-overview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-7);
  padding-block: var(--spacing-6);
}

.back-home-navigation {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  align-self: flex-start;
}

.back-home-navigation > .back {
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
}

.back:hover {
  color: var(--white-50);
}

.movie-overview-container > img {
  border-radius: var(--movie-card-radius);
  border: 1px solid var(--night-40);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.6);
  width: 300px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.movie-meta-container,
.team-container {
  border-top: 1px solid var(--night-40);
  border-bottom: 1px solid var(--night-40);
}

.movie-meta-container,
.team-container {
  padding: var(--spacing-4) 0;
}

.movie-meta-container,
.info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.movie-details,
.genres {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.movie-details {
  gap: var(--spacing-4);
  font-size: 0.75rem;
}

.genres {
  gap: var(--spacing-3);
}

.age {
  display: flex;
  padding: var(--spacing-1) var(--spacing-2);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-4);
  border-radius: 4px;
  background: var(--night-40);
}

.genre {
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  padding: var(--spacing-1) var(--spacing-3);
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: var(--movie-genre-pill);
  border: 1px solid var(--azure-blue-50);
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
}

.rating {
  display: flex;
  gap: var(--spacing-1);
  font-size: 1.25rem;
}

.movie-overview {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.team-container {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: var(--spacing-10);
  row-gap: var(--spacing-2);
  padding-block: var(--spacing-4);
}

.overview-title {
  color: var(--white-50);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.overview {
  font-size: 1.25rem;
  font-style: italic;
  font-weight: 400;
  line-height: 150%;
}

.job {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--white-50);
  max-width: 150px;
}

.name {
  font-size: 0.875rem;
}

.movies-grid {
  display: flex;
  overflow-x: scroll;
  column-gap: var(--spacing-6);
  padding-right: var(--spacing-7);
}

.similar-movies-container {
  grid-area: similar;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.similar-movies-title {
  font-size: 1.125rem;
  font-weight: 600;
}

@media (min-width: 640px) {
  .movie-meta-container,
  .info {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
}

@media (min-width: 960px) {
  .movie-overview-container {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--spacing-16);
  }

  .title {
    font-size: 3rem;
  }

  .movie-overview-container > img {
    min-width: 400px;
  }
}
</style>
