class Trigger {
    paper: HTMLDivElement;
    canvas: HTMLDivElement;

    constructor(canvas: HTMLDivElement) {
        this.canvas = canvas;
        this.paper = canvas.querySelector('.paper') as HTMLDivElement;
        this.scale();
    }
    scale() {
        this.canvas.addEventListener('mousewheel', (event) => {
            console.log('Scale event');
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
                max: 1.04004
            }
            newScale = Math.max(defineScales.min, Math.min(defineScales.max, newScale));

            // Apply the new zoom scale to the element
            console.log(currentScale);
            this.paper.style.transform = `scale(${newScale})`;
        });
    }
}

export default Trigger;
