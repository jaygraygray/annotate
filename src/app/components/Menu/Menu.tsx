// @ts-nocheck
import React, { useEffect, useState, useCallback } from 'react';
import PieMenu, { Slice } from 'react-pie-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Menu =  ({ x, y }) => { 

  const handleClick = () => {
    // pass handler from app to close menu
  }

  if (x !== 0 && y !== 0) {
    console.log(x, y)
    return (
      <PieMenu 
        radius='125px' 
        centerRadius='30px'
        centerX={`${x}px`}
        centerY={`${y}px`}
      >
        {/* Contents */}
        <Slice><FontAwesomeIcon icon="home" size="2x" /></Slice>
        <Slice onSelect={() => window.open('https://www.facebook.com', '_blank')}>
          <FontAwesomeIcon icon="facebook-f" size="2x" />
        </Slice>
        <Slice onSelect={() => window.open('https://www.twitter.com', '_blank')}>
          <FontAwesomeIcon icon="twitter" size="2x" />
        </Slice>    
      </PieMenu>
    );
  }
  return null;
}

export default Menu;