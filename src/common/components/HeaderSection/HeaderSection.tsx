import React,{FC} from 'react';
import styled,{css} from 'styled-components';
import { Link } from "react-router-dom";
import Change from 'assets/icons/change.svg';
import Delete from 'assets/icons/delete.svg';



type Props = {
    branch:string;
    to:string;
    name:string;
    id?:number;
    details?:boolean;
    handleDelete?:() => void;
    handleChange?:() => void;
}

export const HeaderSection:FC<Props> = ({branch,to,name,id,handleDelete,handleChange, ...props}) => {


  return (
    <HeaderSectionWrapper>
    <HeaderSectionContainer>
      <HeaderSectionInfo>
        <HeaderSectionInfoBranch to={to}>{branch}</HeaderSectionInfoBranch>
        <HeaderSectionSlash>/</HeaderSectionSlash>
        <HeaderSectionInfoName>{name}</HeaderSectionInfoName>
      </HeaderSectionInfo>
      <HeaderSectionSetting {...props}>
          <HeaderSectionSettingImg margin='0 20px 0 0' src={Change} onClick={handleChange}/>
          <HeaderSectionSettingImg src={Delete} onClick={handleDelete}/>
      </HeaderSectionSetting>
    </HeaderSectionContainer>
  </HeaderSectionWrapper>
  )
}

const HeaderSectionWrapper = styled.header`
  background: ${({theme}) => theme.colors.white};
  box-sizing: border-box;
  border:1px solid transparent;
  border-radius: 10px 10px 0 0;
  padding: 0 35px;
  width:100%;
  height: 69px;

  @media ${({theme}) => theme.media.tablet}{
    padding:0 16px;
  }
`;

const HeaderSectionContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderSectionText = css`
  font-size:${({theme}) => theme.fontSizes.small};
  line-height:${({theme}) => theme.lineHeight.small};
  color: ${({theme}) => theme.colors.red};
  font-weight:${({theme}) => theme.fontWeight.medium};
`;

const HeaderSectionInfo = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderSectionInfoBranch = styled(Link)`
  ${HeaderSectionText}
  text-decoration: none;
`;

const HeaderSectionInfoName = styled.h3`
  ${HeaderSectionText}
`;

const HeaderSectionSlash = styled.span`
  color: ${({theme}) => theme.colors.lightGrey};
  margin: 0 4px;
`;

const HeaderSectionSetting = styled.div<{
    details?:boolean;
}>`
    display:${({details}) => details ? 'block' : 'none'};
`;

const HeaderSectionSettingEdit = styled.a`
  margin-right: 24px;
`;


const HeaderSectionSettingImg = styled.img<{
  margin?:string;
}>`
  margin:${({margin}) => margin ? margin : '0'};
  cursor: pointer;
`;