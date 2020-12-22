
export const hotKeyMap = {
  menuTrigger: "`",
  openLag: 800,
}

const DEFAULT = "default";
const CUSTOM = "custom";

type Hotkey = {
  name: string;         // internal reference
  label: string;        // UI display
  value: string[];      // actual hotkey
  description?: string; 
  type: typeof DEFAULT | typeof CUSTOM;     // if true, app sets value and cannot be edited. if false, is custom
}

const menuTrigger: Hotkey = {
  name: "menuTrigger",
  label: "Menu Trigger",
  value: ["`"],
  description: "Opens menu",
  type: CUSTOM,
};

const hide: Hotkey = {
  name: "hide",
  label: "Hide",
  value: ["Escape"],
  description: "Hides Settings. Hides shape or drawing",
  type: DEFAULT,
};

export const defaultHotkeys: Hotkey[] = [
  menuTrigger,
  hide
];

