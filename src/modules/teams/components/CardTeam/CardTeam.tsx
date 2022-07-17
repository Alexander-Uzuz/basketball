import {FC} from 'react';
import styled from "styled-components";
import {ITeam} from 'api/teams/ITeamsRequest';
import {Link} from 'react-router-dom';

type Props = {
  team:ITeam
}

export const CardTeam:FC<Props> = ({team}) => {


  return (
    <CardWrapper to={`/cardTeams/${team.id}`}>
        <CardTop>
            <CardTopImg src={team.imageUrl}/>
        </CardTop>
        <CardBottom>
            <CardBottomTitle>{team.name}</CardBottomTitle>
            <CardBottomSubTitle>Year of foundation: {team.foundationYear}</CardBottomSubTitle>
        </CardBottom>
    </CardWrapper>
  )
}



export const CardWrapper = styled(Link)`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    text-decoration: none;
`;

export const CardTop = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    width:100%;
    height:280px;
    background: linear-gradient(121.57deg, #707070 1.62%, #393939 81.02%);

    @media ${({theme}) => theme.media.mobileXL}{
      height:107px;
    }
`;

export const CardTopImg = styled.img`
    width:150px;
    height:150px;

    @media ${({theme}) => theme.media.mobileXL}{
      width:41%;
      height:49%;
      object-fit: contain;
    }
`;

export const CardBottom = styled.div`
    width:100%;
    height: 100px;
    background:${({theme}) => theme.colors.darkGrey};   
    text-align: center;

    @media ${({theme}) => theme.media.mobileXL}{
      height:auto;
    }
`;

export const CardBottomTitle = styled.h3`
    font-weight:${({theme}) => theme.fontWeight.medium};   
    font-size:${({theme}) => theme.fontSizes.medium};   
    line-height:${({theme}) => theme.lineHeight.medium};   
    color:${({theme}) => theme.colors.white};   
    margin-top: 24px;
    margin-bottom: 12px;

    @media ${({theme}) => theme.media.mobileXL}{
      font-size:${({theme}) => theme.fontSizes.small};
      line-height:${({theme}) => theme.lineHeight.small};
      margin-top:18px;
      margin-bottom:6px;
    }
`;

export const CardBottomSubTitle = styled.p`
    font-weight:${({theme}) => theme.fontWeight.medium};   
    font-size:${({theme}) => theme.fontSizes.small};   
    line-height:${({theme}) => theme.lineHeight.small};   
    color:${({theme}) => theme.colors.lightGrey};     
    
    @media ${({theme}) => theme.media.mobileXL}{
      font-size:${({theme}) => theme.fontSizes.smallest};
      line-height:${({theme}) => theme.lineHeight.smallest};
      margin-bottom:12px;
    }
`;