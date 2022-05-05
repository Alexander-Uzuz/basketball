import styled, {css} from 'styled-components';
import Plus from 'assets/icons/PlusButton.svg';
import React,{FC} from 'react';
import {IButton} from '../../interfaces/IButton';
import {Link} from 'react-router-dom';

interface Props extends IButton{
    text:string;
    to:string;
    justifyself?:string;

}

export const ButtonAdd:FC<Props> = ({text,to, ...props}) =>{
    return (
        <StyledButtonWrapper to={to} {...props}>
            <StyledButtonText>{text}</StyledButtonText>
            <ButtonImg src={Plus}/>
        </StyledButtonWrapper>
    )
}


export const StyledButtonWrapper = styled(Link)<IButton>`
    display:flex;
    align-items: center;
    text-decoration: none;
    padding-left: 24px;
    position:relative;
    border-radius:4px;
    font-weight:${({theme}) => theme.fontWeight.medium};
    width:104px;
    height:40px;
    background:${({theme}) => theme.colors.red};
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
    margin:${({margin}) => margin ? margin : '0'};
    justify-self:${({justifyself}) => justifyself ? justifyself : 'auto'};

    @media ${({theme}) => theme.media.laptopM}{
    justify-self: auto;
    justify-content: center;
    width:100%;
    padding-left:0;
  }
`;

export const StyledButtonText = styled.p`
    margin-right:11px;
`

// export const StyledButton = styled(Link)<IButton>`


//          :before{
//             position:absolute;
//             content: url("");
//             width:9.33px;
//             height:9.33px;
//             top:15px;
//             right:30px;
//             background: url(${Plus});
//          }
// `;

const ButtonImg = styled.img``;


