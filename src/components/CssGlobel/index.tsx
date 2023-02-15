import styled from "styled-components";

export const Text = styled.div<{ frontSize?: number, frontWeight?: number }>`
    font-size:  ${({ frontSize }) => frontSize}px;
    font-weight:  ${({ frontWeight }) => frontWeight};
`
    
export const Div = styled.div<{ width?: string, height?: string, background?: string, justifyContent?: string, alignItems?: string, flexDirection?: string, padding?: string, margin?: string}>`
    width:  ${({ width }) => width};
    height:  ${({ height }) => height};
    background:  ${({ background }) => background};
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection};
    justify-content: ${({ justifyContent }) => justifyContent};
    align-items: ${({ justifyContent }) => justifyContent};
    padding:  ${({ padding }) => padding};
    margin:  ${({ margin }) => margin};
`
export const FrameInput = styled.div<{ width?: string, height?: string, background?: string, justifyContent?: string, alignItems?: string, padding?: string, margin?: string}>`
    width:  ${({ width }) => width};
    height:  ${({ height }) => height};
    background:  ${({ background }) => background};
    display: flex;
    justify-content: ${({ justifyContent }) => justifyContent};
    align-items: ${({ justifyContent }) => justifyContent};
    border: 1px solid #050505aa;
    padding:  ${({ padding }) => padding};
    margin:  ${({ margin }) => margin};
    text-align: center;
    border-radius: 10px;
`
export const Input = styled.input`
  width: 90%;
  height: 100%;
  padding: 10px;
  border: none;
  outline: none;
`
export const Button = styled.button`
  width: 100px;
  height: 50px;
  appearance: button;
  backface-visibility: hidden;
  background-color: #405cf5;
  border-radius: 6px;
  border-width: 0;
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: -apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif;
  font-size: 100%;
  height: 44px;
  line-height: 1.15;
  margin: 12px 0 0;
  outline: none;
  overflow: hidden;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-transform: none;
  transform: translateZ(0);
  transition: all .2s,box-shadow .08s ease-in;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &:focus {
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px;
    }
  &:disabled {
  cursor: default;
    }
`