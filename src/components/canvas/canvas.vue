<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useElementsStore from '../../store/elements';
import { onUpdated } from 'vue';
import DefineElement from '../../class/element';

const elementsStore = useElementsStore();
const {elements} = storeToRefs(elementsStore);

onUpdated(() => {
    const index = elements.value.length - 1;
    const lastElement = elements.value[index];
    const selector = `.paper .element.${lastElement.type}[data-id="${index}"]`;
    new DefineElement(selector);
})

</script>

<template>
    <div id="canvas">
        <div class="paper">
            <template v-for="(item, index) in elements" :key="index">
                <div class="element" :class="item.type" :data-id="index"></div>
            </template>
        </div>
    </div>
</template>
