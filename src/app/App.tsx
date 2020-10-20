import * as React from "react";
import Rough, { Circle } from "react-rough"; 
export interface HelloWorldProps {
  userName: string;
  lang: string;
}
export const App = (props: HelloWorldProps) => (
  <h1>
    <Rough>
    <Circle
        x={200}
        y={60}
        diameter={100}
        fill="red"
        fillStyle="cross-hatch"
      />
    </Rough>
  </h1>
);