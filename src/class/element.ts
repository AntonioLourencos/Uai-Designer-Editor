//@ts-ignore
import resizer from 'move-rotate-resizer';

class DefineElement {
    target: Element;

    constructor(target: Element) {
        this.target = target;
        this.draggable();
    }

    draggable() {
        resizer.add(this.target, {
            minWidth: 5,
            minHeight: 5,
        });
    }
}

export default DefineElement;
