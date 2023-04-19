import interact from 'interactjs';

class DefineElement {
    target: string;

    constructor(target: string) {
        this.target = target;
        this.draggable();
    }

    draggable() {
        const parent = document.querySelector(this.target)?.parentNode;
        const position = { x: 0, y: 0 };
        interact(this.target).draggable({
            modifiers: [
                interact.modifiers.restrict({
                    restriction: parent as any,
                    endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                }),
            ],
            listeners: {
                move(event) {
                    position.x += event.dx;
                    position.y += event.dy;

                    event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
                },
            },
        });
    }
}

export default DefineElement;
