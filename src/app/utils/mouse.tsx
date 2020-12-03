import { useEffect, useRef } from "react";

function trackMousePosition() {
  const mousePad = useRef({ x: 0, y: 0 });

  const track = (e) => {
    const { clientX, clientY } = e;
    if (mousePad.current) {
      mousePad.current.x = clientX,
      mousePad.current.y = clientY;
    }
  }
  useEffect(() => {
    window.addEventListener("mousemove", track);
    return () => {
      window.removeEventListener("mousemove", track);
    } 
  })

  return mousePad.current;
}

export { trackMousePosition }