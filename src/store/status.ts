import { defineStore } from "pinia";
import { ref } from "vue";

type IMessage = string | null;

const useStatusStore = defineStore('status', () => {
    const message = ref<IMessage>(null);
    const isDrawing = ref<boolean>(false);

    function setMessage(action: IMessage) {
        message.value = action;
    }

    function toggleIsDrawing() {
        isDrawing.value = !isDrawing.value;
    }

    return {message, isDrawing, setMessage, toggleIsDrawing};
});

export default useStatusStore;