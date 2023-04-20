<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useElementsStore from '../../store/elements';
import { onMounted, onUpdated, ref, watch } from 'vue';
import TriggerEvents from './triggers';
import DefineElement from '../../class/element';

const canvas = ref<Element | undefined>(undefined);

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
    let id = (target.localName == 'textarea') ? (target.offsetParent as HTMLDivElement).dataset.id : target?.dataset?.id;
    useElementsStore().setSelectedElement(id);
};
</script>

<template>
    <div id="canvas" ref="canvas">
        <div class="paper">
            <template v-for="(item, index) in elements" :key="index">
                <div class="element" :class="[item.type]" :data-id="index" :onmousedown="setSelectedElement" :onclick="setSelectedElement" :style="{...item.style, zIndex: (index + 1)}">
                    <textarea v-if="item.type == 'text'" :value="item.text">
                    </textarea>
                </div>
            </template>
        </div>
    </div>
</template>
