//@ts-ignore
import resizer from 'move-rotate-resizer';
import useElementsStore from '../store/elements';

class DefineElement {
    target: string;

    constructor(target: string) {
        this.target = target;
        this.draggable();
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
