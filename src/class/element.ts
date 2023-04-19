import interact from 'interactjs';

class DefineElement {
    target: string;

    constructor(target: string) {
        this.target = target;
        this.draggable();
        this.resizable();
    }

    resizable() {
        interact(this.target).resizable({
            modifiers: [
                interact.modifiers.snap({
                    targets: [interact.snappers.grid({ x: 10, y: 10 })],
                    range: Infinity,
                    relativePoints: [{ x: 0, y: 0 }],
                    offset: 'start',
                }),
                interact.modifiers.restrict({
                    restriction: 'parent',
                    endOnly: true,
                    elementRect: { left: 0, right: 1, top: 0, bottom: 1 },
                }),
            ],
            listeners: {
                move: function (event) {
                    let { x, y } = event.target.dataset;

                    x = (parseFloat(x) || 0) + event.deltaRect.left;
                    y = (parseFloat(y) || 0) + event.deltaRect.top;

                    Object.assign(event.target.style, {
                        width: `${event.rect.width}px`,
                        height: `${event.rect.height}px`,
                    });

                    Object.assign(event.target.dataset, { x, y });
                },
            },
            edges: { left: true, right: true, bottom: true, top: true },
        });
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
