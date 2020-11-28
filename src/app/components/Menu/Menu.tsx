// @ts-nocheck
import React, { useEffect, useState, useCallback } from 'react';
import PieMenu, { Slice } from 'react-pie-menu';
import { ThemeProvider, css } from 'styled-components';
import { StarIcon } from '../../icons';
import * as styles from './Menu.style';

const theme = {
  pieMenu: {
    container: styles.container,
    list: css``,
    item: css`
      font-family: sans-serif;
      border: 1px solid #cfe7fa
    `,
    center: styles.center,
  },
  slice: {
    container: styles.slice,
    contentContainer: css``,
    content: css``,
  }
}


const PieMenuThemed = (props) => (
  <ThemeProvider theme={theme}>
    <PieMenu {...props} />
  </ThemeProvider>
)

const Menu =  ({ x, y, onClick }) => { 

  const handleClick = () => {
    // pass handler from app to close menu
  }

  if (x !== 0 && y !== 0) {
    return (
      <PieMenuThemed
        radius='125px' 
        centerRadius='30px'
        centerX={`${x + 4}px`}
        centerY={`${y}px`}
      >
       
        <Slice onSelect={onClick}>
          Line
        </Slice>
        <Slice onSelect={onClick}>
        <StarIcon width={25} height={25} fill="pink" />
        </Slice>
        <Slice onSelect={onClick}>
          Highlighter
        </Slice>
        <Slice onSelect={onClick}>
          Star
        </Slice>
      </PieMenuThemed>
    );
  }
  return null;
}

export default Menu;