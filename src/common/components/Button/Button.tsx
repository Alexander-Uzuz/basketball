import React,{FC} from 'react';
import styled, {css} from 'styled-components';
import Plus from 'assets/icons/PlusButton.svg';
import {IButton} from '../../interfaces/IButton';
import {Link, useNavigate} from 'react-router-dom';

interface Props extends IButton{
    text:string;
    type?:'submit' | 'button' | 'reset';
    onClick?:boolean;
    margin?:string;
}

export const Button:FC<Props> = ({text,type,onClick, ...props}) =>{
    const navigate = useNavigate();

    const handleBack = () => navigate(-1)


    return (
        <StyledButtonWrapper {...props}>
            {
                onClick ? <StyledButton onClick={handleBack} type={type ? type : 'submit'} {...props}>{text}</StyledButton> : <StyledButton type={type ? type : 'submit'} {...props}>{text}</StyledButton>
            }
        </StyledButtonWrapper>
    )
}




const StyledButtonWrapper = styled.div<{
    margin?:string;
}>`
    margin:${({margin}) => margin ? margin : '0'};
`

const StylesButton = css<IButton>`
    display:inline-block;
    position:relative;
    border-radius:4px;
    font-weight:${({theme}) => theme.fontWeight.medium};
    width:${({width}) => width ? width : '366px'};
    height:40px;
    background:${({background}) => background ? background : '#E4163A'};
    color:${({color}) => color ? color : '#FFFFFF'};
    border:${({border}) => border ? border : 'none'};
    cursor:${({disabled}) => disabled ? 'default' : 'pointer'};

    :hover{
        background:${({hover}) => hover ? hover : '#FF5761'};
    }

    :active{
        background:${({backgroundActive}) => backgroundActive ? backgroundActive : '#C60E2E'};
        border:${({borderActive}) => borderActive ? borderActive : 'none'};
        color:${({colorActive}) => colorActive ? colorActive : '#FFFFFF'};
    }

    :disabled{
        background:${({theme}) => theme.colors.lightestGrey1};
        color:${({theme}) => theme.colors.lightestGrey};
    }

    ${({plus}) => plus && css`
        :before{
            position:absolute;
            content: url("");
            width:9.33px;
            height:9.33px;
            top:10px;
            right:28px;
            background: url(${Plus});
        }
    `}
`

const StyledButton = styled.button`
    ${StylesButton}
`

const StyledLink = styled(Link)`
    ${StylesButton}
    text-decoration: none;
`






