import { defineStore } from "pinia";
import { ref } from "vue";

const useFocusStore = defineStore('focus', () => {
    const lastFocusElement = ref<HTMLElement | undefined>(undefined);

    function setFocus(element: HTMLElement) {
        lastFocusElement.value = element;
    }

    return {lastFocusElement, setFocus};
});

export default useFocusStore;