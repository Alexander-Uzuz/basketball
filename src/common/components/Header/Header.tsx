import React,{FC, useState} from 'react';
import styled from "styled-components";
import Profile from 'assets/icons/profileDesc.svg';
import Logo from 'assets/icons/logoBasket.svg'

import { useAppSelector } from 'core/redux/store/hooks';
import { RootState } from 'core/redux/store/store';
import Burger from 'assets/icons/menu.svg';


interface Props{
    handleBurger:() => void;
    name:string | null;
}

export const Header:FC<Props> = ({handleBurger, name}) =>{

    return (
        <StyledHeader>
            <HeaderBurger onClick={handleBurger} src={Burger}/>
            <HeaderContainer>
                <HeaderLogo src={Logo}/>
                <HeaderUser>{name}</HeaderUser>
            </HeaderContainer>
        </StyledHeader>
    )
}

export const StyledHeader = styled.header`
    position:relative;
    box-shadow: 0px 1px 10px rgba(209, 209, 209, 0.5);
    background:${({theme}) => theme.colors.white};
    order:999;
    @media ${({theme}) => theme.media.tablet}{
        z-index:3;
        position:relative;
    }
`;

export const HeaderContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    height:80px;
    padding:0px 50px;
    margin:0px auto;

    @media ${({theme}) => theme.media.tablet}{
        height:62px;
        justify-content: center;
    }
`

export const HeaderBurger = styled.img`
    display:none;
    @media ${({theme}) => theme.media.tablet}{
        cursor:pointer;
        display:block;
        position:absolute;
        left:15px;
        top:19px;
    }
`;

export const HeaderLogo = styled.img`
    @media ${({theme}) => theme.media.tablet}{
        width:137px;
        height:34px;
  }
`;

export const HeaderUser = styled.h2`
    position:relative;
    padding-right:48px;
    cursor:pointer;
    :before{
        position:absolute;
        content:'';
        width:30px;
        height:30px;
        background:url(${Profile});
        right:0;
        top:0;
    }

    @media ${({theme}) => theme.media.tablet}{
        display:none;
    }
`;
