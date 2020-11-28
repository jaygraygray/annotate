import React, { FC } from 'react';

export type IconProps = {
  width: number;
  height: number;
  fill?: string;
}

export const Icon: FC<IconProps> = ({
  width,
  height,
  children
}) => (
  <div
    style={{
      width: `${width}px`,
      height: `${height}px`,
    }}
  >
    {children}
  </div>
);
