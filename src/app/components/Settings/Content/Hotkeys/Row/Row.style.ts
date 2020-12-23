import styled from "styled-components";

export const Description = styled.div`
  border-right: 1px solid #413E3A;
  min-width: 100px;
  padding-right: 50px;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: default;
`

export const HotkeyRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  height: 55px;
  border-radius: 6px;
  position: relative;
`

export const EditTrigger = styled.div`
  display: none;
`
export const KeysStyleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  &:hover {
    ${Description} {
      padding-right: 45px;
      padding-left: 5px;
    }
    div:first-of-type {
      display: none;
    }
    ${EditTrigger} {
      display: flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;
      height: 40px;
      cursor: pointer;
    }

  }
`


export const Change = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
  width: fit-content;
`