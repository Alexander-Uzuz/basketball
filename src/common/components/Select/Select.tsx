import React, { FC } from "react";
import styled from "styled-components";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { customStyles } from "./customStyles";
import { ISelectOption } from "common/constants/Select/ISelectOption";

const animatedComponents = makeAnimated();

type Props = {
  options: ISelectOption[];
  isMulti?: boolean;
  pagesSize?: boolean;
  defaultValue?: ISelectOption;
  onChange?: any;
  menuPlacement?: "top";
  value?: ISelectOption;
  error?: string;
  id?: string;
  label?: string;
};


export const Select: FC<Props> = ({
  options,
  isMulti,
  pagesSize,
  defaultValue,
  onChange,
  menuPlacement,
  value,
  error,
  id,
  label,
  ...props
}) => {
  return (
    <SelectContainer>
      {label && <SelectTitle>{label}</SelectTitle>}
      <ReactSelect
        inputId={id}
        styles={customStyles}
        value={value}
        menuPlacement={menuPlacement}
        classNamePrefix="Select"
        isMulti={isMulti}
        options={options}
        defaultValue={defaultValue}
        onChange={onChange}
        components={animatedComponents}
        maxMenuHeight={250}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#D1D1D1',
          },
        })}
        {...props}
      />
      {error && <SelectError>{error}</SelectError>}
    </SelectContainer>
  );
};

const SelectContainer = styled.div<{
  margin?: string;
}>`
  margin: ${({ margin }) => (margin ? margin : "0")};
`;

const SelectTitle = styled.h4`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.lineHeight.small};
  margin-bottom: 4px;
`;

const SelectError = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.smallest};
  line-height: ${({ theme }) => theme.lineHeight.small};
  color: ${({ theme }) => theme.colors.lightRed};
  margin-bottom: 24px;
`;
