<script setup lang="ts">
import domtoimage from 'dom-to-image';
import { ElementType } from '../../../store/elements';
import useElementsStore from '../../../store/elements';
import { onMounted, ref } from 'vue';

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
            case 'text':
                useElementsStore().insertElement({ type: 'text', text: 'Insira seu texto...' });
                break;
        }
    }

    static export(type: 'svg' | 'png' | 'jpeg') {
        const paper = document.querySelector('.paper') as Element;

        // remove active element style
        document.querySelectorAll('.element').forEach((element) => {
            element.classList.remove('active');
        });

        switch (type) {
            case 'jpeg':
                domtoimage
                    .toJpeg(paper)
                    .then((response) => {
                        createLink(response, 'jpg');
                    })
                    .catch((err) => console.log(err));
                break;
            case 'svg':
                domtoimage
                    .toSvg(paper)
                    .then((response) => {
                        createLink(response, 'svg');
                    })
                    .catch((err) => console.log(err));
                break;
            case 'png':
            default:
                domtoimage
                    .toPng(paper)
                    .then((response) => {
                        createLink(response, 'png');
                    })
                    .catch((err) => console.log(err));
        }

        const createLink = (response: any, type: 'svg' | 'png' | 'jpg') => {
            const link = document.createElement('a');
            link.download = `UAIDesign_${Date.now()}.${type}`;
            link.href = response;
            link.click();
            console.log(response);
        };
    }
}
</script>

<template>
    <div class="buttons">
        <div class="left">
            <div class="button icon" title="Inserir forma">
                <i class="fa-solid fa-shapes"></i>
            </div>
            <div class="button icon" title="Inserir texto">
                <img src="assets/icons/Text.svg" draggable="false" />
            </div>
            
    
            <div class="ctx-menu" :style="{ display: ctxMenu == 0 ? 'block' : 'none' }">
                <li :onclick="() => CtxMenuOptions.insertShape('rectangle')">Retângulo</li>
            </div>
    
            <div class="ctx-menu" :style="{ display: ctxMenu == 1 ? 'block' : 'none' }">
                <li :onclick="() => CtxMenuOptions.insertShape('text')">Inserir texto</li>
            </div>
    
        </div>
        <div class="right">
            <div class="button icon" title="Exportar">
                <i class="fas fa-download"></i>
            </div>
            <div class="ctx-menu" :style="{ display: ctxMenu == 2 ? 'block' : 'none' }">
                <li :onclick="() => CtxMenuOptions.export('png')">Exportar PNG</li>
                <li :onclick="() => CtxMenuOptions.export('svg')">Exportar SVG</li>
                <li :onclick="() => CtxMenuOptions.export('jpeg')">Exportar JPEG</li>
            </div>
        </div>
    </div>
</template>
