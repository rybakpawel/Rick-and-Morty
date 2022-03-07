import { ref } from "vue";

const validation = () => {
    const error = ref({
        message: "",
        item: ""
    });

    const formValidation = (data) => {
        const regex = /^[A-Za-z0-9" "]+$/

        if (data.title.length < 3 || data.title.length > 32) error.value = { 
            message: "The title must be more than 3 and less than 32 characters",
            item: "title"
        }
        else if (!data.title) error.value = { 
            message: "Please enter the title",
            item: "title"
        }
        else if (!regex.test(data.title)) error.value = {
            message: "Special characters cannot be used",
            item: "title"
        }
        else if (data.message.length > 256) error.value = { 
            message: "The message must be less than 256 characters",
            item: "message"
        } 
        else if (!data.message) error.value = { 
            message: "Please enter the message",
            item: "message"
        }
        else if (!data.character.name || data.character.name === "Pick a character") error.value = { 
            message: "Please select a character",
            item: "character"
        } 
        else {
            error.value = {
                message: "",
                item: "Pick a character"
            }
        }
    }
    return { error, formValidation}
}



export default validation