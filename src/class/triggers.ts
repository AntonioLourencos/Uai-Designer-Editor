import Konva from 'konva';
import Environment from './environment';
import useElementsStore, { ElementD, ElementType } from '../store/elements';
import { Layer } from 'konva/lib/Layer';

class Trigger extends Environment {
    stage;

    constructor() {
        super();
        this.stage = this.initStage();
        this.listenEvents();
    }
    
    initStage() {
        const stage = new Konva.Stage({
            container: '#canvas',
            width: this.canvas.offsetWidth,
            height: this.canvas.offsetHeight,
        });

        return stage;
    }

    listenEvents() {
        useElementsStore().$subscribe((mutation, value) => {
            const events = mutation.events as any;
            const newElement : ElementD = events.newValue;
            const key = events.key;
            if(newElement.action == 'create') {
                const layer = this.newLayer(newElement, key);
                const shape = this.insertShape({layer, type: newElement.type});
                console.log(shape)
            }
        });
    }

    newLayer(key: any, newElement: ElementD) {
        const layer = new Konva.Layer({
            name: newElement.type,
            id: key
        });

        return layer;
    }

    insertShape(props: {layer: Layer, type: ElementType}) {
        let shape;
        
        switch(props.type) {
            case 'rectangle':
            default:
            shape = new Konva.Rect({
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                fill: '#487392',
            });
        }
        props.layer.add(shape);
        this.stage.add(props.layer);

        return shape;
    }
    
}

export default Trigger;
