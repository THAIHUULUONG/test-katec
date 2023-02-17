import styled from "styled-components";

const Span = styled.span`
  visibility: hidden;
  width: 100px;
  background: #0d6efd;
  color: #fff;
  font-weight: 600;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 150%;
  left: 50%;
  margin-left: -60px;
  &:after {
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`;

const ToolTipText = styled.div`
  position: relative;
  display: inline-block;
  &:hover span{
    visibility: visible;
  }
`;

interface Props {
  children?: string | JSX.Element | JSX.Element[]
  toolTipText?: string | JSX.Element | JSX.Element[]
  // any props that come into the component
}

const Tooltip = ({ children, toolTipText }: Props) => (
  <ToolTipText>
    {children}
    <Span>{toolTipText}</Span>
  </ToolTipText>
);

export default Tooltip;
