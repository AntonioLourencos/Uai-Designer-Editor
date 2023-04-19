class Trigger {
    paper: HTMLDivElement;
    canvas: HTMLDivElement;

    constructor(canvas: HTMLDivElement) {
        this.canvas = canvas;
        this.paper = canvas.querySelector('.paper') as HTMLDivElement;
        this.disableDefaultBrowserZoom();
        this.scale();
        this.positionPaper();
    }

    disableDefaultBrowserZoom() {

        document.addEventListener('keydown', function (e) {
            if (
                true &&
                e.ctrlKey &&
                //@ts-ignore
                (e.keyCode == '61' || e.keyCode == '107' || e.keyCode == '173' || e.keyCode == '109' || e.keyCode == '187' || e.keyCode == '189')
            ) {
                e.preventDefault();
            }
        });
        document.addEventListener(
            'wheel',
            function (e) {
                if (true && e.ctrlKey) {
                    e.preventDefault();
                }
            },
            {
                passive: false,
            },
        );
    }

    positionPaper() {
        // Get the HTML elements to add the mouse event listeners to
        const draggableElement = this.paper;
        const containerElement = this.canvas;

        // Define the initial position of the draggable element
        let offsetX = 0;
        let offsetY = 0;

        // Add mouse event listeners to the draggable element
        draggableElement.addEventListener('mousedown', (event) => {
            // Record the starting mouse position
            offsetX = event.clientX - draggableElement.offsetLeft;
            offsetY = event.clientY - draggableElement.offsetTop;

            // Set the draggable element to be positioned absolutely
            draggableElement.style.position = 'absolute';
        });

        draggableElement.addEventListener('mousemove', (event) => {
            // Check if the mouse button is pressed
            if (event.buttons === 1) {
                // Calculate the new position of the draggable element
                const newX = event.clientX - offsetX;
                const newY = event.clientY - offsetY;

                // Set the position of the draggable element
                draggableElement.style.left = `${newX}px`;
                draggableElement.style.top = `${newY}px`;
            }
        });

        draggableElement.addEventListener('mouseup', (event) => {
            // Get the position of the draggable element relative to the container
            const containerRect = containerElement.getBoundingClientRect();
            const draggableRect = draggableElement.getBoundingClientRect();
            const relativeX = draggableRect.left - containerRect.left;
            const relativeY = draggableRect.top - containerRect.top;

            // Set the position of the draggable element relative to the container
            draggableElement.style.position = 'relative';
            draggableElement.style.left = `${relativeX}px`;
            draggableElement.style.top = `${relativeY}px`;
        });
    }

    scale() {
        this.canvas.addEventListener('mousewheel', (event) => {
            if ((event as WheelEvent).ctrlKey) {
                console.log('Scale event', event);
                // Get the current zoom scale
                let currentScale = parseFloat(this.paper.style.transform.replace('scale(', '').replace(')', ''));
                if (isNaN(currentScale)) {
                    currentScale = 1;
                }
                // Calculate the new zoom scale based on the direction of the scroll
                let newScale = (event as WheelEvent).deltaY > 0 ? currentScale * 0.8 : currentScale * 1.2;

                // define min max scale
                const defineScales = {
                    min: 0.5,
                    max: 1.04004,
                };
                newScale = Math.max(defineScales.min, Math.min(defineScales.max, newScale));

                // Apply the new zoom scale to the element
                console.log(currentScale);
                this.paper.style.transform = `scale(${newScale})`;
            }
        });
    }
}

export default Trigger;
