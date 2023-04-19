//@ts-ignore
import resizer from 'move-rotate-resizer';
import useElementsStore from '../store/elements';

class DefineElement {
    target: string;

    constructor(target: string) {
        this.target = target;
        this.draggable();
    }

    saveElementChanges(id: number, style: CSSStyleDeclaration) {
        const cssProperties: any = {};
        for (let i = 0; i < style.length; i++) {
            const propertyName = style[i];
            cssProperties[propertyName] = style.getPropertyValue(propertyName);
        }
        useElementsStore().setElementStyle(id, cssProperties);
    }

    draggable() {
        const targetEl = document.querySelector(this.target) as HTMLDivElement;
        resizer.add(targetEl, {
            minWidth: 5,
            minHeight: 5,
            onDragEnd: (e: DragEvent) => {
                const target = (e as any).evtTarget as HTMLDivElement;
                this.saveElementChanges(parseInt(target.dataset.id!), target.style);
            },
        });
    }
}

export default DefineElement;
