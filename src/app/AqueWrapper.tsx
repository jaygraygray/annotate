import React, { useMemo, useCallback } from "react";
import { BehaviorSubject } from "rxjs";
import { Aquedux } from "aquedux";
// import { map } from "rxjs/operators";


export const AqueWrapper = ({ children }) => {
  const $coords = useMemo(() => new BehaviorSubject({ x: 0, y: 0 }), []);

  const handleDraw = useCallback((e) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    $coords.next({ x: clientX, y: clientY })  
  }, [$coords])

  console.log(">>", $coords.value.x)
  return (
    <Aquedux.div onMouseMove={handleDraw}>
      <>{$coords.value.x}</>
      <>{children}</>
    </Aquedux.div>
  )
}