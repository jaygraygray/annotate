// @ts-nocheck
import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import rough from "../../node_modules/roughjs/bundled/rough.cjs";
import { trackMousePosition }  from './Mouse';
import { BehaviorSubject } from "rxjs";
import { Aquedux } from "aquedux";
import { clear } from "console";
import { Shape, ShapesRenderer, STARTING_SHAPE } from './ShapesRenderer';




export const App = (props) => {
  // const rootSvgNode = useRef()
  const rootSvgNode = document.getElementById("svg-root");
  const shapeRef = useRef({});
  shapeRef.current.len = 40; // can set default size of shapes in preferences
  const drawState = useRef({});
  const [allShapes, setAllShapes] = useState<Shape[]>([STARTING_SHAPE]);
  const [activeShapeId, setActiveShapeId] = useState<number>(0);
  const { x, y } = trackMousePosition();
  const [currentPhase, setCurrentPhase] = useState<string>("place");
  const $coords = useMemo(() => new BehaviorSubject({ x: 0, y: 0 }), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleDraw)
    return () => {
      window.removeEventListener("mousemove", handleDraw);
    }
  }, [activeShapeId, currentPhase])

  useEffect(() => {
    if (currentPhase === "save") {
        setActiveShapeId(null)
        setCurrentPhase("place")
    }
  }, [currentPhase])

  const handleDraw = useCallback((e) => {
    if (currentPhase === "draw") {
      const { clientX, clientY } = e;
      $coords.next({ x: clientX, y: clientY })
      if (drawState.current) {
        if (drawState.current.isDrawing) {
          let shape = allShapes[0]; // ... targetting the 0 index always gives you most recently created item 
          const { html } = generateNodeHtml(shape.originX, shape.originY, $coords.value.x);
          shape.html = html;
          let allShapesCopy = allShapes;
          allShapesCopy[activeShapeId] = shape;
          setAllShapes(allShapesCopy)
        } else {
          setAllShapes(allShapes)
        }
      }
    }
  }, [$coords, activeShapeId, currentPhase]);



  const generateNodeHtml = (x, y, length) => {
    if (rootSvgNode.current) {
      const rc = rough.svg(rootSvgNode.current);
      let node = rc.rectangle(x, y, length, 20);
      const width = node.getBoundingClientRect().width;
      const height = node.getBoundingClientRect().height;
      console.log(">>>", height);
      return {
        html: node.outerHTML,
        width,
        height,
        node
      }
    }
    return "";
  }

  // position is ONLY being set to draw the shape
  const drawShape = useCallback((e) => {
    if (drawState.current) {
      if (currentPhase === "place") {
        const { clientX, clientY } = e;
        const { html, height, width, node } = generateNodeHtml(clientX, clientY, shapeRef.current.len);
        const id = activeShapeId + 1;
        const shape = {
          html,
          ref: null,
          id,
          x: clientX,
          y: clientY,
          originX: clientX,
          originY: clientY,
          height,
          width,
          node,
        };
        setActiveShapeId(id);
        setAllShapes([shape, ...allShapes]);
        setCurrentPhase("draw");
      }
  
      if (currentPhase === "draw") {
        drawState.current.isDrawing = false;
        console.log(">>> and we saved")
        // here is where we need to redraw the shape, redraw from
        // 100vh && 100vw to match only dimensions of <g> tag
        setCurrentPhase("save")
      }
    }
  }, [drawState.current.isDrawing, activeShapeId, allShapes, currentPhase]);


  const handleOnMouseUp = useCallback((e) => {
    if (drawState.current) {
      if (!drawState.current.isDrawing) {
        drawState.current.isDrawing = true;
      }
    }
  }, [])

  const setActiveShape = (e) => {
    // console.log(">>>e", e.currentTarget.id);
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }} ref={rootSvgNode}>
      <Aquedux.div
        onMouseDown={drawShape}
        onMouseUp={handleOnMouseUp}
      >
        <ShapesRenderer
          shapes={allShapes}
          setActiveShape={setActiveShape}
          
        />
      </Aquedux.div>
    </div>
    
  );
}