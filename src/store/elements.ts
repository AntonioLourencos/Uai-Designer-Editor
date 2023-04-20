import { defineStore } from "pinia";
import { CSSProperties, ref } from "vue";

interface ElementD {
    type: ElementType
    style?: CSSProperties;
    text?: string;
}

type ElementType = 'rectangle' | 'line' | 'text' | 'circle';

const useElementsStore = defineStore('elements', () => {
    const elements = ref<ElementD[]>([]);
    const selectedElementIdx = ref<string | undefined>(undefined);

    function resetElements() {
        elements.value = [];
    }

    function getElement(index: number) {
        const idx = elements.value.findIndex((el, i) => i == index);
        if(idx >= 0) {
            return {
                then: (callback: Function) => {
                    callback(elements.value[idx]);
                },
            }
        }
    }

    function setSelectedElement(index: string | undefined) {
        selectedElementIdx.value = index;
    }
    
    function insertElement(action: ElementD) {
        elements.value.push(action);
    }

    function removeElement(index: number) {
        getElement(index)?.then((element: ElementD) => {
            elements.value.splice(index, 1)
        });
    }

    function setElementStyle(index: number, style: CSSProperties) {
        getElement(index)?.then((element: ElementD) => {
            element.style = style;
        })
    }

    return {elements, selectedElementIdx, insertElement, removeElement, setSelectedElement, setElementStyle, resetElements}
});

export type {ElementD, ElementType};
export default useElementsStore;