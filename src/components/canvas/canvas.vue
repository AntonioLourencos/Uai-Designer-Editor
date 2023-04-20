<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useElementsStore from '../../store/elements';
import { computed, onMounted, ref } from 'vue';
import TriggerEvents from './triggers';
import DefineElement from '../../class/element';
import useFocusStore from '../../store/focus';
import useStatusStore from '../../store/status';

const canvas = ref<Element | undefined>(undefined);

const focusStore = useFocusStore();
const statusStore = useStatusStore();
const paintMode = computed(() => statusStore.paint.paintMode);

const elementsStore = useElementsStore();
const { elements } = storeToRefs(elementsStore);

elementsStore.$subscribe((mutation, value) => {
    value.elements.forEach((element, index) => {
        const elementEl = document.querySelector(`.paper .element.${element.type}[data-id="${index}"]`) as Element;
        new DefineElement(elementEl);
    });
});

onMounted(() => {
    if (canvas.value) {
        new TriggerEvents(canvas.value as HTMLDivElement);
    }
});

const setSelectedElement = (e: MouseEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    let id = target.localName == 'textarea' ? (target.offsetParent as HTMLDivElement).dataset.id : target?.dataset?.id;
    useElementsStore().setSelectedElement(id);
};

const setFocus = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    focusStore.setFocus(target);
};
</script>

<template>
    <div id="canvas" ref="canvas" :onclick="setFocus">
        <div class="paper">
            <!-- :style="{ display: paintMode ? 'block' : 'none' }" -->
            <canvas :style="{cursor: paintMode ? 'crosshair' : 'auto'}"> </canvas>
            <template v-for="(item, index) in elements" :key="index">
                <div
                    class="element"
                    :class="[item.type]"
                    :data-id="index"
                    :onmousedown="setSelectedElement"
                    :onclick="setSelectedElement"
                    :style="{ ...item.style, zIndex: index + 1 }"
                >
                    <textarea v-if="item.type == 'text'" :value="item.text"> </textarea>
                </div>
            </template>
        </div>
    </div>
</template>
