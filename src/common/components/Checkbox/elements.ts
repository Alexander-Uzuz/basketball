import styled, { css } from "styled-components";

export const CheckboxLabel = styled.label``;

export const CheckboxContainer = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
`;

export const Icon = styled.svg`
  position: absolute;
  top: 3px;
  left: 0px;
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

interface ICheckbox {
  error?: boolean;
  checked?: boolean;
  disabled?:boolean;
}

export const StyledCheckbox = styled.div<ICheckbox>`
  display: inline-block;
  width: 12px;
  height: 12px;
  background: ${({ checked }) => (checked ? "#E4163A" : "#FFFFFF")};
  border-radius: 2px;
  transition: all 150ms;
  cursor:pointer;
  border: ${({checked}) => checked ?'1px solid #E4163A'  : '1px solid #9c9c9c'};
  ${HiddenCheckbox}:hover + & {
    border: 1px solid #e4163a;
  }
  ${HiddenCheckbox}:disabled + & {
    background:${({theme}) => theme.colors.lightestGrey};
    border:1px solid transparent;
  }
  ${({ error }) =>
    error &&
    css`
      border: 1px solid #ff768e;
    `}
  ${Icon} {
    visibility: ${({ checked }) => (checked ? "visible" : "hidden")};
  }
`;

export const CheckboxText = styled.span<ICheckbox>`
  font-weight:${({theme}) => theme.fontWeight.medium};
  font-size:${({theme}) => theme.fontSizes.small};
  line-height:${({theme}) => theme.lineHeight.small};
  color:${({disabled, error}) => disabled ? '#F6F6F6' : (error ? '#FF768E' : '#707070')};
  margin-left:10px;
`;