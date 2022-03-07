<template>
    <form @submit.prevent="submitForm">
        <div class="wrapper">
            <label :class="{ error: error.item === 'title' }">Title</label>
            <input
                type="text"
                placeholder="Enter title here..."
                class="input"
                :class="{ 'input--error': error.item === 'title' }"
                v-model="form.title" />
            <p class="error error--message" v-if="error.item === 'title'">
                {{ error.message }}
            </p>
        </div>

        <div class="wrapper">
            <label :class="{ error: error.item === 'message' }">Message</label>
            <textarea
                placeholder="Enter message here..."
                class="input input--textarea"
                :class="{ 'input--error': error.item === 'message' }"
                v-model="form.message" />
            <p class="error error--message" v-if="error.item === 'message'">
                {{ error.message }}
            </p>
        </div>

        <div class="wrapper">
            <label :class="{ error: error.item === 'character' }">Character</label>
            <div class="input input--select" :class="{ 'input--error': error.item === 'character' }">
            <div class="input--select__option" @click="toggleList" :class="{ 'input--select__option--start': isActiveList }">
                {{ form.character.name }}
                <font-awesome-icon icon="angle-down" class="icon" v-if="!isActiveList" />
                <font-awesome-icon icon="angle-up" class="icon" v-if="isActiveList" />
            </div>
            <ul v-if="isActiveList">
                <li class="input--select__option"
                    v-for="char in charactersList"
                    :key="char.id"
                    @click="setCharacter(char)">
                    {{ char.name }}
                </li>
            </ul>
            </div>
            <p class="error error--message" v-if="error.item === 'character'">
                {{ error.message }}
            </p>
        </div>

        <button type="submit" class="send-button">Send</button>
    </form>
</template>

<script>
import { ref } from "vue";
import getCharacters from "../features/getCharacters";
import validation from "../features/validation";

export default {
    name: "NewMessageView",
    setup() {
        const { charactersList, loadCharacters } = getCharacters();
        const { error, formValidation } = validation();

        const form = ref({
            title: "",
            message: "",
            character: {
                name: "Pick a character",
                image: "",
            },
        date: "",
        });

        const isActiveList = ref(false);

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
            formValidation(form.value);

            if (!error.value.message) {
                const today = new Date();
                form.value.date = ("0" + today.getDate()).slice(-2) + "." + ("0" + (today.getMonth() + 1)).slice(-2) + "." + today.getFullYear();
                
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
            }
        };

        return {
            form,
            error,
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
                    position: relative;
                    padding: 10px 14px;
                    cursor: pointer;

                    &--start {
                        border-bottom: $light-grey solid 1px;
                    }

                    &:hover {
                        background-color: #f4f4f4;
                    }

                    .icon {
                        color: #7b8ba5;
                        position: absolute;
                        top: 0;
                        right: 0;
                        transform: translate(-14px, calc(50% + 5px));
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
        color: $error;

        &--message {
            font-size: 12px;
        }
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
    cursor: pointer;
}
</style>