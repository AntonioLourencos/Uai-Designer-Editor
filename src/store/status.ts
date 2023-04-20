import { defineStore } from "pinia";
import { ref } from "vue";

type IMessage = string | null;

const useStatusStore = defineStore('status', () => {
    const message = ref<IMessage>(null);

    function setMessage(action: IMessage) {
        message.value = action;
    }

    return {message, setMessage};
});

export default useStatusStore;