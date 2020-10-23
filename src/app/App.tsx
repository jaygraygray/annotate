// @ts-nocheck
import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import rough from "../../node_modules/roughjs/bundled/rough.cjs";
import { trackMousePosition }  from './Mouse';
import { AqueWrapper } from "./AqueWrapper";
import { BehaviorSubject } from "rxjs";
import { Aquedux } from "aquedux";
// import { map } from "rxjs/operators";

const Block = ({
  x, y, show
}) => { 
  return (
    <div 
      style={{ 
        width: "100px", 
        height: "100px", 
        backgroundColor: "black",
        position: "absolute",
        left: x,
        top: y,
      }}
    >
          asdf
    </div>
  )
}

const renderSvg = ({ ref, html }) => {
  return (
    <svg dangerouslySetInnerHTML={{ __html: html }} style={{ height: "100vh", width: "100vw" }} fill="none"></svg>
)
}
const STARTING_SHAPE = {
  ref: null,
  id: 0,
  html: '<g><path d="M274.8592750807396 251.5964654184976 C288.7958095456243 251.11656271549566, 305.18492680593687 249.2549961900494, 316.72542062524013 249.1081153700624 M275.99077731241823 249.11726204184464 C286.83283339386895 250.38557435200735, 298.6032975152597 250.15969809401665, 315.40110117238675 250.05091309365176 M316.3384652424646 249.23133859366285 C317.15503978514715 255.49702291199483, 317.48679293413073 257.57996927062305, 317.4489074515472 271.7659608722174 M316.8928248718076 249.951674994133 C315.8335896862064 257.6556624335152, 315.7710371413164 265.08024227121723, 315.18813882782496 269.6743296075615 M316.0405711217617 268.586896013751 C301.81914179481527 268.51106711396693, 288.32578694980145 270.0728885758363, 274.71314365615893 269.42043322121464 M315.9660373708978 270.7587515042916 C305.73940540163625 269.8694011577545, 295.28625066737817 270.8598597445351, 275.8659629443183 269.91808899696287 M277.2658755154944 268.03676517590293 C277.1006577147324 267.34275208015515, 276.27367731821727 262.13367063353024, 277.1913163311973 250.2426330569199 M276.35289141668557 270.3819697338008 C275.8343898836638 266.00783935688276, 275.78255011212576 259.2685873148404, 275.2842386059847 249.01816162700578" stroke="#000" stroke-width="1" fill="none"></path></g>',
}

type Shape = {
  id: string;
  html: string;
  ref: null;
}

export const App = (props) => {
  const svgRef = useRef()
  const shapeRef = useRef({});
  shapeRef.current.len = 40; // can set default size of shapes in preferences
  const [html, setNode] = useState("");
  const [allShapes, setAllShapes] = useState<Shape[]>([STARTING_SHAPE]);
  const { x, y } = trackMousePosition();

  // render shape on screen
  useEffect(() => {
    if (svgRef.current) {
      const rc = rough.svg(svgRef.current);
      let node = rc.rectangle(10, 150, 20, 20);
      setNode(node.outerHTML)
    }
  }, [svgRef])

  const $coords = useMemo(() => new BehaviorSubject({ x: 0, y: 0 }), []);

  const handleDraw = useCallback((e) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    $coords.next({ x: clientX, y: clientY })  
    if (svgRef.current) {
      
      const rc = rough.svg(svgRef.current);
      let node = rc.rectangle(10, 200, $coords.value.x, 35);
      setNode(node.outerHTML)
    }
  }, [$coords])


  const generateNodeHtml = (x, y, length) => {
    if (svgRef.current) {
      const rc = rough.svg(svgRef.current);
      let node = rc.rectangle(x, y, length, 20);
      return node.outerHTML;
    }
    return "";
  }


  const placeShape = (e) => {
    const { clientX, clientY } = e;
    if (shapeRef.current.len) {
      const html = generateNodeHtml(clientX, clientY, shapeRef.current.len);
      setNode(html);
    }
  }

  const anchorShape = useCallback((e) =>{
    const { clientX, clientY } = e;
    let id = "1"
    const shape = {
      html,
      ref: null,
      id,
    };
    setAllShapes([shape, ...allShapes])
  }, [html])

  return (
    <Aquedux.div onMouseMove={handleDraw}>
      <div 
        style={{ height: "100vh", width: "100vw" }} 
        onMouseDown={placeShape}
        onMouseUp={anchorShape}
        draggable={true}
      >
        <>
        <svg ref={svgRef}></svg>
        </>
        {allShapes.map(svg => renderSvg(svg))}
      </div>
    </Aquedux.div>
    
  );
}