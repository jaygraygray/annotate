import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  position: relative;
  top: 0;
  left: 0;
  justify-content: center; 
`

export const Body = styled.div`
  border-radius: 30px;
  width: 700px;
  height: 400px;
  border-style: none;
  background: #151310;
  filter: drop-shadow(1px, 3px, 10px #000);
  color: #fff;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  position: relative;
`

export const Left = styled.div`
  color: #fff;
  border-radius: 30px 0 0 30px;
  background: #1F1C17;
  width: 200px;
  height: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0px;
  border-right: 1px solid #413E3A;
`;

export const Right = styled.div`
  flex-grow: 1;
`;

export const Navigation = styled.ul`
  margin-top: 0;
  list-style-type: none;
  font-family: sans serif;
  padding: 0;

  > * {
    &:first-child {
      padding-top: 50px;
    //   border-width: 1px;
    //   border-style: solid;
    //   border-image: 
    //   linear-gradient(
    //     to bottom, 
    //     rgba(0, 0, 0, 0),
    //     #413E3A
    //   ) 0 100%;
    // }
  }
`; 

export const NavItem = styled.li`
  padding-bottom: 18px;
  padding-top: 18px;
  padding-left: 32px;
  border: 2px solid rgb(0,0,0,0);
  margin: 0;
  width: 83%;

  &:hover {
    cursor: pointer;
    background: #151310;
    border-top: 1px solid #413E3A;
    border-bottom: 1px solid #413E3A;

  }

`;