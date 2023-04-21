<script setup lang="ts">
import { computed } from 'vue';
import useFocusStore from '../../../../store/focus';

const focusStore = useFocusStore();
const shape = computed(() => focusStore.action!.shape!);
</script>

<template>
    <div class="textProperties">
        {{ shape.className }}
    </div>
</template>
