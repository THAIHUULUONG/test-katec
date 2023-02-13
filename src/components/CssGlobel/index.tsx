import styled from "styled-components";

export const Text = styled.div<{ frontSize: number, frontWeight?: number }>`
    font-size:  ${({ frontSize }) => frontSize}px;
    font-weight:  ${({ frontWeight }) => frontWeight};
`