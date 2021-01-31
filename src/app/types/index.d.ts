

export type DrawState = "placing" | "drawing" | "saved" | "init";
export type ItemType = "drawn" | "placed" | "typed";

export type DrawnPayload = any;
export type PlacedPayload = any;
export type TypedPayload = any;

export interface Item {
  id: string;
  type?: ItemType;
  payload: DrawnPayload | PlacedPayload | TypedPayload;
}

export type ItemActions = {
  setActiveItem: () => void;
  setDrawState: (state: DrawState) => void;
}

export interface StageState {
  // determines behavior of stage
  drawState: DrawState;

  // list of items displayed
  items: Item[];

  // shape being currently transformed
  activeItem: Item | null;
}
