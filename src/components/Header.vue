<template>
  <header class="header">
    <img :src="logo" alt="logo" class="logo" />
    <div class="nav">
      <router-link
        :to="{ name: 'NewMessage' }"
        class="nav__button"
        :class="{ 'nav__button--active': $route.path == '/' }"
      >
        New message
      </router-link>
      <router-link
        :to="{ name: 'History' }"
        class="nav__button nav__button--history"
        :class="{ 'nav__button--active': $route.path == '/history' }"
      >
        History
      </router-link>
    </div>
  </header>
</template>

<script>
import logo from "../assets/rick_morty.png";

export default {
  name: "Header",
  setup() {
    return { logo };
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  background-color: #f5f8fb;
  padding: 16px 20px;

  @media (min-width: 992px) {
    padding: 17px 220px;
  }

  .logo {
    width: 84px;

    @media (min-width: 992px) {
      width: 126px;
    }
  }

  .nav {
    display: flex;
    align-items: center;

    &__button {
      font-size: 16px;

      &--history {
        margin-left: 24px;

        @media (min-width: 992px) {
          margin-left: 20px;
        }
      }

      &--active {
        color: $lighter-blue;
      }
    }
  }
}
</style>