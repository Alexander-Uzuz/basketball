import styled from "styled-components";
import {FC} from 'react';
import SearchIMG from 'assets/icons/search.svg';

const StyledSearchContainer = styled.div`
        position:relative;
        width:100%;

        :before{
        position:absolute;
        content:'';
        background:url(${SearchIMG}) no-repeat;
        width:16px;
        height:16px;
        right:15px;
        top:11.32px;
    }

`;

const StyledSearch = styled.input`
    display:block;
    width:100%;
    height:40px;
    background:${({theme}) => theme.colors.white};
    border: 0.5px solid #D1D1D1;
    box-sizing: border-box;
    border-radius: 4px;
    padding:8px;
    font-size:${({theme}) => theme.fontSizes.small};
    line-height:${({theme}) => theme.lineHeight.small};
    font-weight:${({theme}) => theme.fontWeight.medium};
    color:${({theme}) => theme.colors.grey};

    ::placeholder{
    font-size:${({theme}) => theme.fontSizes.small};
    line-height:${({theme}) => theme.lineHeight.small};
    font-weight:${({theme}) => theme.fontWeight.medium};
    color:${({theme}) => theme.colors.grey};
    }

    :focus{
        box-shadow: 0px 0px 5px #D9D9D9;
        outline:none;
    }
`;
interface Props{
    value:string;
    onChange:any;
}

export const Search:FC<Props> = ({value, onChange}) =>{
    return(
        <StyledSearchContainer>
            <StyledSearch placeholder="Search..." value={value} onChange={onChange}/>
        </StyledSearchContainer>
    )
}