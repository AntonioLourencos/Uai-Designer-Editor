<script setup lang="ts">
import './app.scss';
import CanvasComponent from './components/canvas/canvas.vue';
import TopComponent from './components/panels/top/top.vue';
import LeftComponent from './components/panels/left/left.vue';
import RightComponent from './components/panels/right/right.vue';
import BottomComponent from './components/panels/bottom/bottom.vue';
import useFocusStore from './store/focus';

const focusStore = useFocusStore();

focusStore.$subscribe((_, value) => {
  console.log(`New Focus detected:`, value.lastFocusElement)
});

</script>

<template>
    <div id="app">
        <div class="flexible">
          <LeftComponent />
          <div class="middle">
            <TopComponent />
            <CanvasComponent />
          </div>
          <RightComponent />
        </div>

        <BottomComponent />
    </div>
</template>
