import { defineStore } from "pinia";
import { ref } from "vue";

interface ElementD {
    type: ElementType
}

type ElementType = 'rectangle' | 'line';

const useElementsStore = defineStore('elements', () => {
    const elements = ref<ElementD[]>([]);
    const selectedElementIdx = ref<string | undefined>(undefined);

    function setSelectedElement(index: string | undefined) {
        selectedElementIdx.value = index;
    }
    
    function insertElement(action: ElementD) {
        elements.value.push(action);
    }

    function removeElement(elementIdx: number) {
        const idx = elements.value.findIndex((el, i) => i == elementIdx);
        if(idx >= 0) {
            elements.value.splice(idx, 1)
        }
    }

    return {elements, selectedElementIdx, insertElement, removeElement, setSelectedElement}
});

export type {ElementD, ElementType};
export default useElementsStore;