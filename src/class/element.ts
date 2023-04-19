//@ts-ignore
import resizer from 'move-rotate-resizer';
import useElementsStore from '../store/elements';
import convertCSSProperties from '../utils/convertCSSProperties';

class DefineElement {
    target: string;

    constructor(target: string) {
        this.target = target;
        this.draggable();
    }

    saveElementChanges(id: number, style: CSSStyleDeclaration) {
        const cssProperties = convertCSSProperties(style);
        useElementsStore().setElementStyle(id, cssProperties);
    }

    draggable() {
        const targetEl = document.querySelector(this.target) as HTMLDivElement;
        resizer.add(targetEl, {
            minWidth: 5,
            minHeight: 5,
        });
    }
}

export default DefineElement;
