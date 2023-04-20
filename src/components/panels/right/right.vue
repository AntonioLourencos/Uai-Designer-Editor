<script setup lang="ts">
import useFocusStore from '../../../store/focus';

const focusStore = useFocusStore();

const setFocus = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    focusStore.setFocus(target);
}
</script>

<template>
    <div class="right panel" :onclick="setFocus">
        right
    </div>
</template>