import React, { FC } from "react";
import {IPlayer} from 'api/players/IPlayersRequest';
import styled from "styled-components";
import { Link } from "react-router-dom";

type Props = {
  player:IPlayer
};

export const CardPlayer: FC<Props> = ({player}) => {


  return (
    <CardWrapper to={`/cardPlayers/${player.id}`}>
      <CardTop>
        <CardTopImg src={player.avatarUrl} />
      </CardTop>
      <CardBottom>
        <CardBottomTitle>{player.name} 
            <CardBottomTitleSpan>#{player.number}</CardBottomTitleSpan>
        </CardBottomTitle>
        <CardBottomSubTitle>{player.position}</CardBottomSubTitle>
      </CardBottom>
    </CardWrapper>
  );
};



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
    align-items: flex-end;
    justify-content: center;
    height:280px; 
    width:100%;
    background: linear-gradient(121.57deg, #707070 1.62%, #393939 81.02%);

    @media ${({theme}) => theme.media.laptop}{
      height:200px;
    }

    @media ${({theme}) => theme.media.tablet}{
      height:160px;
    }

    @media ${({theme}) => theme.media.mobileXL}{
      height:107px;
    }
`;

export const CardTopImg = styled.img`
    width:274px;
    height:207px;

    @media ${({theme}) => theme.media.laptopL}{
      width:75%;
      height:73%;
    }

    @media ${({theme}) => theme.media.laptopM}{
      width:64%;
      height:87%;
    }  

    @media ${({theme}) => theme.media.tablet}{
      width:80%;
      height:94%;
    }  


    @media ${({theme}) => theme.media.mobileXL}{
      width:59%;
      height:94%;
    }

    @media ${({theme}) => theme.media.mobileL}{
      width:75%;
      height:92%;
    }

`;

export const CardBottom = styled.div`
    width:100%;
     /* width: 364px; */
    height: 100px; 
    background: ${({theme}) => theme.colors.darkGrey};
    text-align: center;

    @media ${({theme}) => theme.media.tablet}{
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

    @media ${({theme}) => theme.media.tablet}{
      font-size:${({theme}) => theme.fontSizes.small};
      line-height:${({theme}) => theme.lineHeight.small};
      margin-top:18px;
      margin-bottom:6px;
    }
`;

export const CardBottomTitleSpan = styled.span`
    margin-left:6px;
    color:${({theme}) => theme.colors.lightRed};
`

export const CardBottomSubTitle = styled.p`
    font-weight:${({theme}) => theme.fontWeight.medium};
    font-size:${({theme}) => theme.fontSizes.small};
    line-height:${({theme}) => theme.lineHeight.small};
    color:${({theme}) => theme.colors.lightGrey};

    @media ${({theme}) => theme.media.tablet}{
      font-size:${({theme}) => theme.fontSizes.smallest};
      line-height:${({theme}) => theme.lineHeight.smallest};
      margin-bottom:12px;
    }
`