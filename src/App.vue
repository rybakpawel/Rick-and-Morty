<template>
  <Header />
  <div class="content">
    <Title />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Title from "./components/Title.vue";

export default {
  name: "App",
  components: {
    Header,
    Title,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap");

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

  ul {
    list-style-type: none;
  }

  .content {
    max-width: 460px;
    margin: 0 20px;

    @media (min-width: 500px) {
      margin: 0 auto;
    }

    @media (min-width: 992px) {
      text-align: center;
    }
  }
}
</style>
