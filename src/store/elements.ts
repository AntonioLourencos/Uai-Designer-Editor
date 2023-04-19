import { defineStore } from "pinia";
import { ref } from "vue";

interface ElementD {
    type: ElementType
}

type ElementType = 'rectangle' | 'line';

const useElementsStore = defineStore('elements', () => {
    const elements = ref<ElementD[]>([]);
    const selectedElement = ref<Element | undefined>(undefined);

    function setSelectedElement() {
        
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

    return {elements, insertElement, removeElement}
});

export type {ElementD, ElementType};
export default useElementsStore;