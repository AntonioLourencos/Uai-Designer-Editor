//@ts-ignore
import html2svg from 'html2svg';

class Conversions {

    static HTML2SVG(element: Element) {
        html2svg(element, (svg) => {
            console.log(svg)
        });
    }
    
}

export default Conversions;