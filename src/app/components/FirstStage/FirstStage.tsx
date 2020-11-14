import React from "react";

type Props = {
  id: string;
}

const FirstStage = ({ id }: Props) => <div id={id}>I'm a default state</div>

export default FirstStage;