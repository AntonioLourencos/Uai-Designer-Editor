<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import TriggerEvents from '../../class/triggers';
import useFocusStore from '../../store/focus';
import useStatusStore from '../../store/status';
import useElementsStore from '../../store/elements';

const focusStore = useFocusStore();
const statusStore = useStatusStore();
const elementStore = useElementsStore();
const paintMode = computed(() => statusStore.paint.paintMode);

onMounted(() => {
    const trigger = new TriggerEvents();
    elementStore.setStage(trigger.stage);
});

const setFocus = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    focusStore.setFocus(target);
};
</script>

<template>
    <div id="environment" ref="environment" :onclick="setFocus" tabindex="0" >
        <div class="paper">
            <div id="canvas" :style="paintMode ? { cursor: 'crosshair' } : {}"></div>
        </div>
    </div>
</template>
