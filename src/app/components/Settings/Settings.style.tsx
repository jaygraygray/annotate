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

  svg {
    fill: #fff;
  }
`

export const Body = styled.div`
  border-radius: 30px;
  width: 700px;
  height: 450px;
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

export const AppInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #747474;
  font-size: 10px;
  font-family: Arial;
  padding-left: 32px;
  width: 150px;

  div {
    margin-top: 6px;
  }

  a {
    color: #747474;
  }

  a:hover {
    color: #fff;
  }
`;
