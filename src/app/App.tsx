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

export const App = (props) => {
  const svgRef = useRef()
  const shapeRef = useRef({});
  shapeRef.current.len = 40; // can set default size of shapes in preferences
  const [html, setNode] = useState("");
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
    const html = generateNodeHtml(clientX, clientY, shapeRef.current.len);
    setNode(html);
  }

  const captureAnchor = (e) =>{
    const { clientX, clientY } = e;
    shapeRef.current.anchors = { originX: clientX, originY: clientY }
  }


  return (
    <Aquedux.div onMouseMove={handleDraw}>
      <div 
        style={{ height: "100vh", width: "100vw" }} 
        // onClick={placeShape} 
        // onDrag={handleDraw}
        onMouseDown={placeShape}
        draggable={true}
      >
        <svg ref={svgRef} dangerouslySetInnerHTML={{ __html: html }} style={{ height: "100vh", width: "100vw" }} fill="none"></svg>
      </div>
    </Aquedux.div>
    
  );
}