<template>
  <h1 v-if="currentRoute === 'NewMessage'" class="title">Send a new message</h1>
  <h1 v-else-if="currentRoute === 'History'" class="title">Message history</h1>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "Title",

  setup() {
    const currentRoute = computed(() => {
      return useRoute().name;
    });

    const title = "Home page";
    return { title, currentRoute };
  },
};
</script>

<style lang="scss">
.title {
  font-size: 24px;
  max-width: 170px;
  margin: 32px 0;

  @media (min-width: 992px) {
    font-size: 36px;
    max-width: none;
  }
}
</style>