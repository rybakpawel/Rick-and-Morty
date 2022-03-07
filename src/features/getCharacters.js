import { ref } from "vue";

const getCharacters = () => {
    const charactersList = ref([]);

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

    return { charactersList, loadCharacters}
}

export default getCharacters;

