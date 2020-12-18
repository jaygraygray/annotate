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

type NavItemProps = {
  index: number;
  children: React.ReactNode[];
  activeIndex: number;
  setActiveIndex(index: number): void;
}

const NavItem = ({ index, children, setActiveIndex, activeIndex }: NavItemProps) => {
  const handleSetActiveContentIndex = useCallback(() => {
    setActiveIndex(index);
  }, [index]);
  return (
    <Styles.NavItem onClick={handleSetActiveContentIndex} active={activeIndex === index} >
      {children}
    </Styles.NavItem>
  )
}

const renderNavItems = (navItems, setActiveIndex, activeIndex) => (
  navItems.map(({ label, index }) =>
    <NavItem
      key={index}
      index={index}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}>
        {label}
    </NavItem>
  )
)

export const Navigation = ({
  activeIndex,
  setActiveIndex,
}: NavigationProps) => {
  return (
    <Styles.Navigation>
      {renderNavItems(navItems, setActiveIndex, activeIndex)}
    </Styles.Navigation>
  );
}