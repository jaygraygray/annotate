import React from "react";
import { SettingsIcon } from "../../../icons";
import * as Styles from "./Navigation.style";

export const Navigation = () => (
  <Styles.Navigation>
    <Styles.NavItem><SettingsIcon width={25} height={25} /></Styles.NavItem>
    <Styles.NavItem>Hotkeys</Styles.NavItem>
    <Styles.NavItem>Arrow</Styles.NavItem>
    <Styles.NavItem>Line</Styles.NavItem>
    <Styles.NavItem>Account</Styles.NavItem>
    <Styles.NavItem>Help</Styles.NavItem>
  </Styles.Navigation>
)