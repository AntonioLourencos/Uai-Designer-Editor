import { defineStore } from "pinia";
import { ref } from "vue";

interface Element {
    type: 'rectangle' | 'line'
}

const useElementsStore = defineStore('elements', () => {
    const elements = ref<Element[]>([]);

    function insertElement(action: Element) {
        elements.value.push(action);
    }

    function removeElement(elementIdx: number) {
        const idx = elements.value.findIndex((el, i) => i == elementIdx);
        if(idx >= 0) {
            elements.value.splice(idx, 1)
        }
    }

    return {elements, insertElement, removeElement}
});

export type {Element};
export default useElementsStore;