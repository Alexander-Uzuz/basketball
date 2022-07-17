import React,{forwardRef} from 'react';
import AddIcon from 'assets/icons/addPhoto.svg';
import styled from 'styled-components';

type Props = {
  errorMessage:any;
  onChange:any;
  value?:string;
}

export const AddPhoto = forwardRef<HTMLInputElement, Props>(({errorMessage, onChange,value}, ref) => {



  return (
    <AddPhotoLabel>
      <AddPhotoIcon src={AddIcon}/>
      {value ? <AddPhotoImg src={value}/> : ''}
      <AddPhotoInput type='file' accept='image/*' ref={ref} onChange={onChange} />
      <AddPhotoError>{errorMessage}</AddPhotoError>
    </AddPhotoLabel>
  )
})


const AddPhotoLabel = styled.label`
  display:flex;
  justify-content: center;
  align-items: center;
  width:336px;
  height:261px;
  background:${({theme}) => theme.colors.lightGrey};
  opacity: 0.5;
  border-radius: 10px;
  margin-right: 136px;
  cursor:pointer;

  @media ${({theme}) => theme.media.laptopL}{
    margin-right:0;
    margin-bottom:30px;
  }

  @media ${({theme}) => theme.media.tablet}{
    width: 185px;
    height: 144px;
  }
`;

const AddPhotoIcon = styled.img`
  width:74px;
  z-index: 1;
  opacity: 0.7;
`;

const AddPhotoImg = styled.img`
  position: absolute;
  z-index: 0;
  max-width: 250px;
  max-height: 260px;
  object-fit: contain;
  @media ${({theme}) => theme.media.tablet}{
    width: 185px;
    height: 144px;
  }
`;

const AddPhotoInput = styled.input`
  display:none;
`;



const AddPhotoError = styled.span``

