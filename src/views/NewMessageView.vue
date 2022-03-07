<template>
  <form @submit.prevent="submitForm">
    <div class="wrapper">
      <label>Title</label>
      <input
        type="text"
        placeholder="Enter title here..."
        class="input"
        v-model="form.title"
      />
      <p class="error" v-if="error">error</p>
    </div>

    <div class="wrapper">
      <label>Message</label>
      <textarea
        placeholder="Enter message here..."
        class="input input--textarea"
        v-model="form.message"
      />
      <p class="error" v-if="error">error</p>
    </div>

    <div class="wrapper">
      <label>Character</label>
      <div class="input input--select">
        <div
          class="input--select__option input--select__option--start"
          @click="toggleList"
        >
          {{ form.character.name }}
          <font-awesome-icon
            icon="angle-down"
            class="icon"
            v-if="!isActiveList"
          />
          <font-awesome-icon icon="angle-up" class="icon" v-if="isActiveList" />
        </div>
        <ul v-if="isActiveList">
          <li
            class="input--select__option"
            v-for="char in charactersList"
            :key="char.id"
            @click="setCharacter(char)"
          >
            {{ char.name }}
          </li>
        </ul>
      </div>
      <p class="error" v-if="error">error</p>
    </div>

    <button type="submit" class="send-button">Send</button>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "NewMessageView",
  setup() {
    const form = ref({
      title: "",
      message: "",
      character: {
        name: "Pick a character",
        image: "",
      },
      date: "",
    });

    const charactersList = ref([]);
    const isActiveList = ref(false);
    const error = ref(false);

    const loadCharacters = async () => {
      try {
        const res = await fetch("https://rickandmortyapi.com/api/character");
        if (!res.ok) throw Error("There is no data.");
        const data = await res.json();
        charactersList.value = data.results;
      } catch (err) {
        error.value = err.message;
      }
    };

    loadCharacters();

    const toggleList = () => {
      isActiveList.value = !isActiveList.value;
    };

    const setCharacter = (char) => {
      form.value.character = {
        name: char.name,
        image: char.image,
      };
      isActiveList.value = !isActiveList.value;
    };

    const submitForm = () => {
      const today = new Date();
      form.value.date =
        today.getDate() +
        "." +
        (today.getMonth() + 1) +
        "." +
        today.getFullYear();
      const stored = JSON.parse(localStorage.getItem("messages"));
      if (stored) {
        stored.push(form.value);
        localStorage.setItem("messages", JSON.stringify(stored));
      } else {
        const messages = [];
        messages.push(form.value);
        localStorage.setItem("messages", JSON.stringify(messages));
      }

      Object.keys(form.value).forEach((key) => {
        if (key === "character") return null;
        form.value[key] = "";
      });
      form.value.character = {
        name: "Pick a character",
        image: "",
      };
    };

    return {
      form,
      charactersList,
      isActiveList,
      toggleList,
      setCharacter,
      submitForm,
    };
  },
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 28px;

  .input {
    font-family: inherit;
    margin: 12px 0 10px 0;
    padding: 10px 14px;
    border: $light-grey solid 1px;
    border-radius: 8px;

    label {
      .error {
        color: $error;
      }
    }

    &--textarea {
      height: 148px;
    }

    &--select {
      padding: 0;

      ul {
        max-height: 200px;
        overflow: scroll;
      }

      &__option {
        padding: 10px 14px;

        &--start {
          position: relative;
          border-bottom: $light-grey solid 1px;

          .icon {
            color: #7b8ba5;
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(-14px, calc(50% + 5px));
          }
        }

        &:hover {
          background-color: #f4f4f4;
        }
      }
    }

    &--error {
      border-color: $error;
    }

    &::placeholder {
      opacity: 0.5;
    }

    &:focus {
      outline: none;
    }
  }

  .error {
    font-size: 12px;
    color: $error;
  }
}

.send-button {
  display: block;
  width: 90px;
  height: 38px;
  margin: 0 0 31px auto;
  font-size: 16px;
  color: #fafffd;
  background-color: $lighter-blue;
  border: none;
  border-radius: 19px;
}
</style>