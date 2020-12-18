import React, { useCallback } from "react";
import { SettingsIcon } from "../../../icons";
import * as Styles from "./Navigation.style";

type NavigationProps = {
  activeIndex: number;
  setActiveIndex(index: number): void;
}

type NavItem = {
  index: number;
  label: string | React.ReactNode;
}

const navItems: NavItem[] = [
  {
    index: 0,
    label: <SettingsIcon width={25} height={25} />,
  },
  {
    index: 1,
    label: "Hotkeys",
  },
  {
    index: 2,
    label: "Arrow",
  },
  {
    index: 3,
    label: "Line",
  },
  {
    index: 4,
    label: "Account",
  },
  {
    index: 5,
    label: "Help",
  },
];


const NavItem = ({ index, children, setActiveIndex }) => {
  const handleSetActiveContentIndex = useCallback(() => {
    setActiveIndex(index);
  }, [index])
  return (
    <Styles.NavItem onClick={handleSetActiveContentIndex}>
      {children}
    </Styles.NavItem>
  )
}

const renderNavItems = (navItems, setActiveIndex) => (
  navItems.map(item => <NavItem index={item.index} setActiveIndex={setActiveIndex}>{item.label}</NavItem>)
)

export const Navigation = ({
  activeIndex = 0,
  setActiveIndex,
}: NavigationProps) => {
  return (
    <Styles.Navigation>
      {renderNavItems(navItems, setActiveIndex)}
    </Styles.Navigation>
  );
}