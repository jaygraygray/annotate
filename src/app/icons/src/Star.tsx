import React, { FC, SVGProps } from "react";
import { Icon, IconProps } from "../Icon";

const Star: FC<SVGProps<SVGElement>> = ({
  width = 100,
  height = 100,
  fill = "#000",
}: IconProps) => {
  return (
    <Icon
      width={width}
      height={height}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.075 475.075" fill={fill}>
        <defs/>
        <path d="M475.075 186.573c0-7.043-5.328-11.42-15.992-13.135L315.766 152.6 251.529 22.694c-3.614-7.804-8.281-11.704-13.99-11.704-5.708 0-10.372 3.9-13.989 11.704L159.31 152.6 15.986 173.438C5.33 175.153 0 179.53 0 186.573c0 3.999 2.38 8.567 7.139 13.706l103.924 101.068L86.51 444.096c-.381 2.666-.57 4.575-.57 5.712 0 3.997.998 7.374 2.996 10.136 1.997 2.766 4.993 4.142 8.992 4.142 3.428 0 7.233-1.137 11.42-3.423l128.188-67.386 128.197 67.386c4.004 2.286 7.81 3.423 11.416 3.423 3.819 0 6.715-1.376 8.713-4.142 1.992-2.758 2.991-6.139 2.991-10.136 0-2.471-.096-4.374-.287-5.712l-24.555-142.749 103.637-101.068c4.956-4.949 7.427-9.519 7.427-13.706z"/>
      </svg>
    </Icon>
  )
}

export default Star;