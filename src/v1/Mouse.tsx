import { useEffect, useState } from "react";

function trackMousePosition() {
  const [mousePad, updateMousePad] = useState({ x: 0, y: 0 });

  // can use this to pass properties and methods
  // along with the mouse event
  const track = (e) => {
    const { clientX, clientY } = e;
    updateMousePad({ x: clientX, y: clientY })
  }
  useEffect(() => {
    window.addEventListener("mousemove", track);
    return () => {
      window.removeEventListener("mousemove", track);
    } 
  })
  return mousePad;
}

export { trackMousePosition }