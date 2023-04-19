//@ts-ignore
import resizer from 'move-rotate-resizer';

class DefineElement {
    target: string;

    constructor(target: string) {
        this.target = target;
        this.draggable();
    }

    draggable() {
        const targetEl = document.querySelector(this.target) as HTMLDivElement;
        resizer.add(targetEl);
    }
}

export default DefineElement;
