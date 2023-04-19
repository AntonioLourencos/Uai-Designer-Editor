<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useElementsStore from '../../store/elements';
import { onMounted, onUpdated, ref } from 'vue';
import TriggerEvents from './triggers';
import DefineElement from '../../class/element';

const canvas = ref<Element | undefined>(undefined);

const elementsStore = useElementsStore();
const { elements } = storeToRefs(elementsStore);

onUpdated(() => {
    const index = elements.value.length - 1;
    const lastElement = elements.value[index];
    const selector = `.paper .element.${lastElement.type}[data-id="${index}"]`;
    new DefineElement(selector);
});

onMounted(() => {
    if (canvas.value) {
        new TriggerEvents(canvas.value as HTMLDivElement);
    }
});

const setSelectedElement = (e: MouseEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    useElementsStore().setSelectedElement(target?.dataset?.id);
};
</script>

<template>
    <div id="canvas" ref="canvas">
        <div class="paper">
            <template v-for="(item, index) in elements" :key="index">
                <div class="element" :class="[item.type]" :data-id="index" :onmousedown="setSelectedElement" :onclick="setSelectedElement">
                    <textarea v-if="item.type == 'text'" :value="item.text">
                    </textarea>
                </div>
            </template>
        </div>
    </div>
</template>
