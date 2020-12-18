import React from "react";
import * as Styles from "./Content.style";

type ContentProps = {
  activeIndex: number;
}

type ContentItem = {
  index: number;
  label: string;
  body: string | React.ReactNode;
}

const contentItems: ContentItem[] = [
  {
    index: 0,
    label: "Settings",
    body: <div>qqq0</div>
  },
  {
    index: 1,
    label: "Hotkeys",
    body: <div>qq1</div>
  },
  {
    index: 2,
    label: "Arrow",
    body: <div>qq2</div>
  },
  {
    index: 3,
    label: "Line",
    body: <div>qqq3</div>
  },
  {
    index: 4,
    label: "Account",
    body: <div>qqq4</div>
  },
  {
    index: 5,
    label: "Help",
    body: <div>qqq5</div>
  },
];

const ContentItem = ({ index, children }) => {
  return (
    <Styles.ContentItem key={index}>{children}</Styles.ContentItem>
  )
}

export const Content = ({
  activeIndex
}: ContentProps) => {
  // @ts-ignore
  const [item] = contentItems.filter(({ index }) => index === activeIndex);
  console.log(">>body", item)
  return (
    <div>
      {item.body}
    </div>
  )
}