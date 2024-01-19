<template>
  <header>
    <nav>
      <NuxtLink to="/">
        <img src="/images/site-logo.svg" alt="Site Logo" />
      </NuxtLink>
      <NuxtLink to="/" class="browse">Browse</NuxtLink>
    </nav>
  </header>
  <main>
    <slot />
  </main>
</template>

<style scoped>
header {
  background-color: var(--night-40);
}

nav {
  display: flex;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-7);
}

.browse {
  font-size: 1rem;
  font-weight: 700;
}

.browse:hover {
  color: var(--white-50);
}

main {
  max-width: 100vw;
  display: grid;
  grid-template-columns: var(--gutters) minmax(311px, 1248px) var(--gutters);
  grid-template-areas:
    ". content ."
    ". similar similar";
  padding-block: var(--spacing-12);
  row-gap: var(--spacing-6);
}

@media (min-width: 960px) {
  main {
    --gutters: var(--spacing-12);
  }
}

@media (min-width: 1024px) {
  nav {
    padding: var(--spacing-7) var(--spacing-12);
  }
}

@media (min-width: 1280px) {
  header {
    padding-inline: 100px;
  }

  nav {
    padding: var(--spacing-7) 0;
    max-width: 1248px;
    margin: 0 auto;
  }

  main {
    max-width: 100vw;
    margin: 0 auto;
    --gutters: 1fr;
  }
}
</style>
