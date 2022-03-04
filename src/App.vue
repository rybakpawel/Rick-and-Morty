<template>
  <Header />
  <router-view />
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Source Sans Pro", Arial, sans-serif;
  color: $darker-blue;

  a {
    text-decoration: none;
  }
}
</style>
