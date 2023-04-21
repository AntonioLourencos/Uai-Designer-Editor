import Konva from 'konva';
import Environment from './environment';
import useElementsStore, { ElementD, ElementType, defaultShapes } from '../store/elements';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import useFocusStore from '../store/focus';

class Trigger extends Environment {
    layer: Layer;
    stage: Stage;

    constructor() {
        super();
        this.stage = this.initStage();
        this.layer = this.newLayer();
        this.shapeSelection();
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
            const newElement: ElementD = events.newValue;
            if (newElement.action == 'create') {
                const shape = this.insertShape({ type: newElement.type });
            }
        });
    }

    newLayer() {
        const layer = new Konva.Layer({
            name: 'first-layer',
            id: "0",
        });

        return layer;
    }

    insertShape(props: { type: ElementType }) {
        let defaultProps = {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            fill: '#487392',
            draggable: true,
        };
        let shape;

        switch (props.type) {
            case 'circle':
                shape = new Konva.Circle({
                    ...defaultProps,
                    name: 'shape'
                });
            break;
            case 'rectangle':
            default:
                shape = new Konva.Rect({
                    ...defaultProps,
                    name: 'shape'
                });
        }
        this.layer.add(shape);

        this.stage.add(this.layer);

        return shape;
    }

    shapeSelection() {
        // insert transform rotate, resize
        const tr = new Konva.Transformer();
        this.layer.add(tr);

        tr.nodes([]);

        let selectionRectangle = new Konva.Rect({
            fill: '#D9EAF6',
            stroke: '#0D99FF',
            visible: false,
            strokeWidth: 1,
        });
        this.layer.add(selectionRectangle);

        // blur events
        useFocusStore().$subscribe((mutation, value) => {
            const focusedEl = value.lastFocusElement as HTMLDivElement;
            if(focusedEl.id != 'environment') {
                const isCanvas = focusedEl.classList.contains('konvajs-content') || focusedEl.localName == 'canvas';
                if(!isCanvas) {
                    tr.nodes([]);
                    selectionRectangle.visible(false);
                }
            }
        });

        var x1: number, y1: number, x2, y2;
        this.stage.on('mousedown touchstart', (e) => {
          // do nothing if we mousedown on any shape
          if (e.target !== this.stage) {
            return;
          }
          e.evt.preventDefault();
          x1 = this.stage.getPointerPosition()!.x;
          y1 = this.stage.getPointerPosition()!.y;
          x2 = this.stage.getPointerPosition()!.x;
          y2 = this.stage.getPointerPosition()!.y;
  
          selectionRectangle.visible(true);
          selectionRectangle.width(0);
          selectionRectangle.height(0);
        });
  
        this.stage.on('mousemove touchmove', (e) => {
          // do nothing if we didn't start selection
          if (!selectionRectangle.visible()) {
            return;
          }
          e.evt.preventDefault();
          x2 = this.stage.getPointerPosition()!.x;
          y2 = this.stage.getPointerPosition()!.y;
  
          selectionRectangle.setAttrs({
            x: Math.min(x1, x2),
            y: Math.min(y1, y2),
            width: Math.abs(x2 - x1),
            height: Math.abs(y2 - y1),
          });
        });
  
        this.stage.on('mouseup touchend', (e) => {
          // do nothing if we didn't start selection
          if (!selectionRectangle.visible()) {
            return;
          }
          e.evt.preventDefault();
          // update visibility in timeout, so we can check it in click event
          setTimeout(() => {
            selectionRectangle.visible(false);
          });
  
          var shapes = this.stage.find('.shape');
          var box = selectionRectangle.getClientRect();
          var selected = shapes.filter((shape) =>
            Konva.Util.haveIntersection(box, shape.getClientRect())
          );
          tr.nodes(selected);
        });
  
        // clicks should select/deselect shapes
        const stageRef = this.stage;
        this.stage.on('mousedown click tap', function (e) {
          // if we are selecting with rect, do nothing
          if (selectionRectangle.visible()) {
            return;
          }

  
          if (e.target === stageRef) {
            tr.nodes([]);
            return;
          }
  
          // do nothing if clicked NOT on our rectangles
          if (!e.target.hasName('shape')) {
            return;
          }
  
          // do we pressed shift or ctrl?
          const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
          const isSelected = tr.nodes().indexOf(e.target) >= 0;
  
          if (!metaPressed && !isSelected) {
            // if no key pressed and the node is not selected
            // select just one
            tr.nodes([e.target]);
          } else if (metaPressed && isSelected) {
            // if we pressed keys and node was selected
            // we need to remove it from selection:
            const nodes = tr.nodes().slice(); // use slice to have new copy of array
            // remove node from array
            nodes.splice(nodes.indexOf(e.target), 1);
            tr.nodes(nodes);
          } else if (metaPressed && !isSelected) {
            // add the node into selection
            const nodes = tr.nodes().concat([e.target]);
            tr.nodes(nodes);
          }
        });
    }
}

export default Trigger;
