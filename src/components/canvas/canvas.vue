<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useElementsStore from '../../store/elements';
import { computed, onMounted, ref } from 'vue';
import TriggerEvents from '../../class/triggers';
import useFocusStore from '../../store/focus';
import useStatusStore from '../../store/status';

const environment = ref<Element | undefined>(undefined);

const focusStore = useFocusStore();
const statusStore = useStatusStore();
const paintMode = computed(() => statusStore.paint.paintMode);

const elementsStore = useElementsStore();
const { elements } = storeToRefs(elementsStore);

onMounted(() => {
    if (environment.value) {
        new TriggerEvents(environment.value as HTMLDivElement);
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
    <div id="environment" ref="environment" :onclick="setFocus">
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
