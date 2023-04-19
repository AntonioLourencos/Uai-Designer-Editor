<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import './layers.scss';
import Sortable from 'sortablejs';
import useElementsStore from '../../../store/elements';

const elementsStore = useElementsStore();
const elements = computed(() => elementsStore.elements)
const listRef = ref(null);

onMounted(() => {
    if (listRef.value) {
        new Sortable(listRef.value, {
            animation: 100,
        });
    }
});

const selectElement = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const findElement = document.querySelector(`.element[data-id="${target.dataset.elementidx}"]`)
    if(findElement) {
        (findElement as HTMLButtonElement).dispatchEvent(new Event('mousedown'));
        console.log(findElement)
    }
}
</script>

<template>
    <div class="layers">
        <h4 style="text-align: center; font-weight: 500">Camadas</h4>
        <div class="list" ref="listRef" >
            <li v-for="(item, index) in elements" :data-elementidx="index" :key="index" :onclick="selectElement">
                {{ item.type }}
            </li>
        </div>
    </div>
</template>
