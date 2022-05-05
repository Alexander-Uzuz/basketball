import styled, {css} from 'styled-components';
import { IButton } from 'common/interfaces/IButton';
import Plus from 'assets/icons/plus.svg';


export const StyledButtonWrapper = styled.div<{
    margin?:string;
}>`
    margin:${({margin}) => margin ? margin : '0'};
`
    /* padding:${({padding}) => padding ? padding : '10px 159px'}; */

export const StyledButton = styled.button<IButton>`
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




