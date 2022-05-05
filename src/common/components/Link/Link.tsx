import {FC} from 'react';
import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";


interface Props{
    className?:string;
    to:string;
    text:string;
}

export const Link:FC<Props> = ({className,text,to,...props}) =>{
    return(
        <StyledLink to={to} {...props} className={className ? className : ''}>{text}</StyledLink>
    )
}


export const StyledLink = styled(LinkR)`
font-weight:${({theme}) => theme.fontWeight.medium};
font-size:${({theme}) => theme.fontSizes.small};
line-height: 19px;
text-decoration-line: underline;
color:${({theme}) => theme.colors.red};

&.disabled{
    pointer-events: none;
    color:${({theme}) => theme.colors.lightestGrey};
}
`;