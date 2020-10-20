import * as React from "react";
export interface HelloWorldProps {
  userName: string;
  lang: string;
}
export const App = (props: HelloWorldProps) => (
  <h1>
    I AM AN APPLE PIE 
  </h1>
);