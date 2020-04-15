<template>
  <div class="four-of-four">
    <h1>404</h1>
    <p>Sorry! We didn't find what you were looking for.</p>
    <p>Check out our <router-link to="/books">top books</router-link>.</p>
  </div>
</template>

<style lang="scss" scoped>
.four-of-four {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
