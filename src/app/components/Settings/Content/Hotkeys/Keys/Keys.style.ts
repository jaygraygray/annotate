import styled from "styled-components";

export const KeyContainer = styled.div`
  display: flex;
  cursor: default;
  width: 100%;
  height: 40px;
  div { 
    background: #34322F;
    border-radius: 6px;
    padding: 12px 8px;
    font-family: Courier New;
    min-width: 30px;
    display: flex;
    justify-content: center;
    font-size: 14px;
    margin-left: 32px;
    position: relative;
  }

  div::after {
    position: absolute;
    content: "+";
    left: 60px;
  }

  div:first-of-type {
    margin-left: 0;
  }

  div:last-of-type::after {
    content: "";
  }
`