import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import usePortal from "./PortalTest";

export type Shape = {
  id: number;
  html: string;
  ref: null | React.Ref<SVGElement>;
  x?: number;
  y?: number;
  originX: number;
  originY: number;
  node: any;
}

type Props = {
  shapes: Shape[];
  setActiveShape(): void;
}

export const ShapesDrawer = ({
  shapes,
  setActiveShape,
}: Props) => {
  const svgRef = useRef<any>({});

  useEffect(() => {
    if (svgRef.current) {
      // console.log(svgRef.current);
    }
  })

  // this layering strategy prevents click handlers
  // from being utilized
  const renderSvg = (svg, index, setActiveShape) => {
    // can position like this;
    // need to draw only necessary size of shape
    const {
      // node,
      html,
      // originX,
      // originY,
    } = svg;
    // dimensions of SVG
    // needs to be a box around 
    // the <g> element, nothing else
    return (
        <svg
          onClick={setActiveShape} 
          dangerouslySetInnerHTML={{ __html: html }}
          fill="none"
          key={`${index}+0`}
          id={index}
          ref={svgRef}
          style={{
            height: svgRef.current.height,
            width: svgRef.current.width,
            // top: originX,
            // left: originY,
            position: "fixed",
            top: 0,
            left: 0,
          }}
        />
    )
  }

  const target = usePortal("portal-root");
  return createPortal(
    shapes.map((svg, i) => renderSvg(svg, i, setActiveShape)),
    target
  );
}

export const STARTING_SHAPE: Shape = {
  ref: null,
  id: 0,
  html: '',
  // html: '<g><path d="M274.8592750807396 251.5964654184976 C288.7958095456243 251.11656271549566, 305.18492680593687 249.2549961900494, 316.72542062524013 249.1081153700624 M275.99077731241823 249.11726204184464 C286.83283339386895 250.38557435200735, 298.6032975152597 250.15969809401665, 315.40110117238675 250.05091309365176 M316.3384652424646 249.23133859366285 C317.15503978514715 255.49702291199483, 317.48679293413073 257.57996927062305, 317.4489074515472 271.7659608722174 M316.8928248718076 249.951674994133 C315.8335896862064 257.6556624335152, 315.7710371413164 265.08024227121723, 315.18813882782496 269.6743296075615 M316.0405711217617 268.586896013751 C301.81914179481527 268.51106711396693, 288.32578694980145 270.0728885758363, 274.71314365615893 269.42043322121464 M315.9660373708978 270.7587515042916 C305.73940540163625 269.8694011577545, 295.28625066737817 270.8598597445351, 275.8659629443183 269.91808899696287 M277.2658755154944 268.03676517590293 C277.1006577147324 267.34275208015515, 276.27367731821727 262.13367063353024, 277.1913163311973 250.2426330569199 M276.35289141668557 270.3819697338008 C275.8343898836638 266.00783935688276, 275.78255011212576 259.2685873148404, 275.2842386059847 249.01816162700578" stroke="#000" stroke-width="1" fill="none"></path></g>',
  node: null,
  originX: 0,
  originY: 0,
}