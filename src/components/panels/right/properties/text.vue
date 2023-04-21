<script setup lang="ts">
import { computed } from 'vue';
import useFocusStore from '../../../../store/focus';

const focusStore = useFocusStore();
const shape = computed(() => focusStore.action!.shape!);

const changeText = (e: Event) => {
    const target = e.target as HTMLInputElement;
    shape.value.setAttr('text', target.value);
};
</script>

<template>
    <div class="textProperties">
        <div class="label">
            <h5>Alterar texto</h5>
            <input type="text" :value="shape.attrs.text" :onblur="changeText" :onkeyup="(e: KeyboardEvent) => {if(e.key == 'Enter') changeText(e)}" />
        </div>
    </div>
</template>
