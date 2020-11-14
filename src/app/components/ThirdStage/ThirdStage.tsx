import React from "react";

const ThirdStage = ({ onSelectItem, id }) => <div onClick={(e) => onSelectItem(e, id)} id={id}>shape is set</div>

export default ThirdStage;