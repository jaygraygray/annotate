import styled from "styled-components";


export const HotkeyRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  height: 55px;
  border-radius: 6px;
  position: relative;
`
export const Description = styled.div`
  border-right: 1px solid #413E3A;
  min-width: 100px;
  padding-right: 50px;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
`

export const Change = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
  width: fit-content;
`