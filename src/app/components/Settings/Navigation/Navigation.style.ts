import styled, { css } from "styled-components";

export const Navigation = styled.ul`
font-family: "JetBrains";
margin-top: 0;
list-style-type: none;
padding: 0;

> * {
  &:first-child {
    pointer-events: none;
    padding-top: 50px;
  }

  &:first-child:hover {
    pointer-events: none;
  }
`; 

const activeCss = css`
  background: #151310;
  border-top: 1px solid #413E3A;
  border-bottom: 1px solid #413E3A;
  border-right: 2px solid #151310;
  border-radius: inherit;
  pointer-events: none;
`

type NavItemStyleProps = {
  active: boolean;
}

export const NavItem = styled.li`
  padding-bottom: 15px;
  padding-top: 15px;
  padding-left: 32px;
  border: 1px solid rgb(0,0,0,0);
  margin: 0;
  width: 83%;
  position: relative;
  &:hover {
    cursor: pointer;
    &::after {
      width: 110px;
      height: 3px;
      background: white;
      position: absolute;
      top: 40px;
      left: 33px;
      content: " ";
    }
  }
  ${(props: NavItemStyleProps) => props.active ? activeCss : null}
`;

/*

&:hover {

}


*/