<script setup lang="ts">
import domtoimage from 'dom-to-image';
import { onMounted, ref } from 'vue';
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
    ctxMenus.forEach((ctxMenu) => {
        (ctxMenu as HTMLDivElement).style.setProperty('top', `${topHeight ?? 40}px`);
    });
}

function defineCtxMenuOnClick() {
    const buttons = document.querySelectorAll('.top .button.icon');
    const ctxMenus = document.querySelectorAll('.ctx-menu');

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // if clicked on the same menu, then close
            if (ctxMenu.value != undefined && index == ctxMenu.value) {
                ctxMenu.value = undefined;
            } else {
                ctxMenu.value = index;
            }
        });
    });

    ctxMenus.forEach((ctxMenuEl) => {
        (ctxMenuEl as HTMLDivElement).addEventListener('click', () => {
            ctxMenu.value = undefined;
        });
    });
}

class CtxMenuOptions {
    static insertShape(type: ElementType) {
        switch (type) {
            case 'rectangle':
                useElementsStore().insertElement({ type: 'rectangle' });
                break;
        }
    }

    static exportPng() {
        const paper = document.querySelector('.paper') as Element;
        domtoimage.toPng(paper)
            .then(response => {
                const link = document.createElement('a');
                link.download = `UAIDesign_${Date.now()}.png`;
                link.href = response;
                link.click()
                console.log(response)
            })
            .catch(err => console.log(err));
    }
}
</script>

<template>
    <div class="top panel">
        <a href="/">
            <div class="logo">Uai Design Editor</div>
        </a>
        <div class="buttons">
            <div class="button icon" title="Inserir forma">
                <i class="fa-solid fa-shapes"></i>
            </div>
            <div class="button icon" title="Inserir texto">
                <img src="assets/icons/Text.svg" draggable="false" />
            </div>
            <div class="button icon" title="Exportar">
                <i class="fas fa-download"></i>
            </div>

            <div class="ctx-menu" :style="{ display: ctxMenu == 0 ? 'block' : 'none' }">
                <li :onclick="() => CtxMenuOptions.insertShape('rectangle')">Retângulo</li>
                <li>Linha</li>
            </div>

            <div class="ctx-menu" :style="{ display: ctxMenu == 1 ? 'block' : 'none' }">
                <li>Inserir texto</li>
            </div>

            <div class="ctx-menu" :style="{ display: ctxMenu == 2 ? 'block' : 'none' }">
                <li :onclick="() => CtxMenuOptions.exportPng()">Exportar PNG</li>
            </div>
        </div>
    </div>
</template>
