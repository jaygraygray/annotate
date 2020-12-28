
export const hotKeyMap = {
  menuTrigger: "`",
  openLag: 800,
}

export const DEFAULT = "default";
export const CUSTOM = "custom";

type Hotkey = {
  name: string;         // internal reference
  label: string;        // UI display
  hotkeyValue: string[];      // actual hotkey
  description?: string; 
  type: typeof DEFAULT | typeof CUSTOM;     // if true, app sets value and cannot be edited. if false, is custom
}

const menuTrigger: Hotkey = {
  name: "menuTrigger",
  label: "Menu Trigger",
  hotkeyValue: ["Shift", "Tab", "Control"],
  description: "Open menu",
  type: CUSTOM,
};

const hide: Hotkey = {
  name: "hide",
  label: "Hide",
  hotkeyValue: ["Escape"],
  description: "Hide Settings.",
  type: DEFAULT,
};

export const defaultHotkeys: Hotkey[] = [
  menuTrigger,
  hide,
];
