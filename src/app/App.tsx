// @ts-nocheck
import React, { useRef, useEffect, useState } from "react";
import rough from "../../node_modules/roughjs/bundled/rough.cjs";
import { trackMousePosition }  from './Mouse';

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

  // track coordinates of mouse on screen
  // capture differences
  const handleDraw = (e) => {
    e.preventDefault();
    captureAnchor(e)
    const { clientX, clientY } = e;
    if (shapeRef.current && shapeRef.current.anchors) {
      
      console.log("x", x)
    }
  }



  // RECTANGLE:
  /**
   * 
   * @param x anchor point; set on click
   * @param y length: distance from x
   * @param z angle: angle from x
   * 
   */


  return (
    <>
      <div 
        style={{ height: "100vh", width: "100vw" }} 
        // onClick={placeShape} 
        onDrag={handleDraw}
        onDragStart={handleDraw}
        onMouseDown={placeShape}
        draggable={true}
      >
        <svg ref={svgRef} dangerouslySetInnerHTML={{ __html: html }} style={{ height: "100vh", width: "100vw" }} fill="none"></svg>
      </div>
    </>
  );
}