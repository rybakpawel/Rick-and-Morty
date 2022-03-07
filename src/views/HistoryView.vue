<template>
    <div class="card" v-for="(message, i) in messages" :key="i">
        <h2 class="card__title">{{ message.title }}</h2>
        <div class="card__details">
            <img :src="message.character.image" :alt="message.character.name" />
            <div>
                <p>Sent to {{ message.character.name }}</p>
                <p>Date: {{ message.date }}</p>
            </div>
        </div>
        <p class="card__message">
            {{ message.message }}
        </p>
    </div>
</template>

<script>
export default {
    name: "HistoryView",
    setup() {
        const messages = JSON.parse(localStorage.getItem("messages"));

        return { messages };
    },
};
</script>

<style lang="scss">
.card {
    margin-bottom: 24px;
    padding: 0 24px;
    text-align: left;
    border-radius: 8px;
    box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.03);

    @media (min-width: 992px) {
        margin-bottom: 36px;
    }

    &__title {
        padding: 24px 0;
        font-size: 14px;
        font-weight: 600;
    }

    &__details {
        display: flex;
        align-items: center;
        font-size: 14px;

        img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-right: 16px;
        }
    }

    &__message {
        padding: 20px 0;
    }
}
</style>