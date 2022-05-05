import { BaseSyntheticEvent, FC, useState } from "react";
import styled from "styled-components";
import { IInput, IInputWrapper } from "common/interfaces/IInput";
import CloseEye from "assets/icons/CloseEye.svg";
import OpenEye from 'assets/icons/OpenEye.svg';

interface Props {
  id: string;
  label: string;
  closeEye?: boolean;
  register?:any;
  errorMessage?:any;
  name?:string;
  type?:'date' | 'file' | 'checkbox' | 'radio' | 'password';
  width?:string;
  value?:string;
  onChange?:any;
}

export const Input: FC<Props> = ({ id, label, closeEye, register,name,errorMessage, type,value,onChange, ...props }) => {
  const [passwordShow, setPasswordShow] = useState(false);

  const handlePasswordShow = () =>{
    setPasswordShow(!passwordShow)
  }

  return (
      <ComponentWrapper>
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
        <StyledInputWrapper closeEye={closeEye ? closeEye : false} {...props}>
          <StyledInput 
          id={id} 
          placeholder="" 
          type={closeEye ? (passwordShow ? 'text' : 'password') : (type ? type : 'text')} 
          {...register(name)}
          value={value && value}
          onChange={value && onChange}          
          />
          {
            closeEye && <StyledInputEye onClick={handlePasswordShow} src={passwordShow ? OpenEye : CloseEye}/>
          }
        </StyledInputWrapper>
        <IInputError>{errorMessage}</IInputError>
      </ComponentWrapper>
  );
};



export const ComponentWrapper = styled.div`
  margin-bottom: 24px;
`;

export const StyledInputWrapper = styled.div<IInputWrapper>`
  position: relative;
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "40px")};
`;

export const StyledInputEye = styled.img`
  cursor: pointer;
  position: absolute;
  right:12px;
  top:12px;
`;

export const StyledLabel = styled.label`
  display: block;
  font-size:${({theme}) => theme.fontSizes.small};
  line-height:${({theme}) => theme.lineHeight.small};
  font-weight:${({theme}) => theme.fontWeight.medium};
  color:${({theme}) => theme.colors.grey};
  margin-bottom: 8px;
`;

export const StyledInput = styled.input<IInput>`
  position: relative;
  width: 100%;
  height: 100%;
  background:${({theme}) => theme.colors.lightestGrey1};
  border: ${({ error }) => (error ? "1px solid #FF768E" : "none")};
  padding: 8px 14px 8px 12px;
  color:${({theme}) => theme.colors.darkGrey};
  font-size:${({theme}) => theme.fontSizes.small};
  line-height:${({theme}) => theme.lineHeight.small};
  font-weight:${({theme}) => theme.fontWeight.medium};
  border-radius: 4px;

  :hover {
    background: var(--lightest-grey);
  }

  :focus {
    box-shadow: 0px 0px 5px #d9d9d9;
    background:${({theme}) => theme.colors.lightestGrey1};
    border: none;
    outline: none;
  }

  :disabled {
    color:${({theme}) => theme.colors.lightestGrey1};
  }
`;

export const IInputError = styled.span`
  position:absolute;
  font-weight: ${({theme}) => theme.fontWeight.medium};
  font-size:${({theme}) => theme.fontSizes.smallest};
  line-height: ${({theme}) => theme.lineHeight.small};
  color:${({theme}) => theme.colors.lightRed};
`
