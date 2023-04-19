<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue';
import { ElementType } from '../../../store/elements';
import useElementsStore from '../../../store/elements';
const ctxMenu = ref<number | undefined>(undefined);

onMounted(() => {
    defineCtxMenuPosition();
    defineCtxMenuOnClick();
});

function defineCtxMenuPosition() {
    const topHeight = document.querySelector('.top.panel')?.clientHeight;
    const ctxMenus = document.querySelectorAll('.ctx-menu');
    ctxMenus.forEach(ctxMenu => {
        (ctxMenu as HTMLDivElement).style.setProperty('top', `${topHeight ?? 40}px`);
    })
}

function defineCtxMenuOnClick() {
    const buttons = document.querySelectorAll('.top .button.icon');
    const ctxMenus = document.querySelectorAll('.ctx-menu');

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            ctxMenu.value = ctxMenu.value == undefined ? index : index;
        });   
    });

    ctxMenus.forEach(ctxMenuEl => {
        (ctxMenuEl as HTMLDivElement).addEventListener('click', () => {
            ctxMenu.value = undefined;
        })
    })
    
}

function insertShape(type: ElementType) {
    switch(type) {
        case 'rectangle':
            useElementsStore().insertElement({type: 'rectangle'});
        break;
    }
}
</script>

<template>
    <div class="top panel">
        <a href="/">
            <div class="logo">Uai Designer Editor</div>
        </a>
        <div class="buttons">
            <div class="button icon" title="Inserir forma">
                <i class="fa-solid fa-shapes"></i>
            </div>
            <div class="button icon" title="Inserir texto">
                <img src="assets/icons/Text.svg" draggable="false" />
            </div>

            <div class="ctx-menu" :style="{display: ctxMenu == 0 ? 'block' : 'none'}">
                <li :onclick="() => insertShape('rectangle')">Retângulo</li>
                <li>Linha</li>
            </div>

            <div class="ctx-menu" :style="{display: ctxMenu == 1 ? 'block' : 'none'}">
                <li>Inserir texto</li>
            </div>
        </div>
    </div>
</template>
