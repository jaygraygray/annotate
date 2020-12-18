import React from "react";
import { SettingsIcon } from "../../../icons";
import * as Styles from "./Navigation.style";

type NavigationProps = {
  activeIndex: number;
  setActiveIndex(index: number): void;
}

// type NavItem = {
//   index: number;
//   label: string | React.ReactNode;
// }

// const NavItems: NavItem[] = [
//   {
//     index: 0,
//     label: <SettingsIcon width={25} height={25} />
//   }
// ]

export const Navigation = (props: NavigationProps) => {
  console.log(">>NavigationProps", props);
  return (
    <Styles.Navigation>
      <Styles.NavItem><SettingsIcon width={25} height={25} /></Styles.NavItem>
      <Styles.NavItem>Hotkeys</Styles.NavItem>
      <Styles.NavItem>Arrow</Styles.NavItem>
      <Styles.NavItem>Line</Styles.NavItem>
      <Styles.NavItem>Account</Styles.NavItem>
      <Styles.NavItem>Help</Styles.NavItem>
    </Styles.Navigation>
  );
}