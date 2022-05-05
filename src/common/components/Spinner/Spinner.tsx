import React from 'react';
import SpinnerIcon from 'assets/icons/Spinner.svg';
import styled from 'styled-components';

type Props = {}

export const Spinner = (props: Props) => {
  return (
    <SpinnerContainer><img src={SpinnerIcon}/></SpinnerContainer>
  )
}

export const SpinnerContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height:100vh;
`