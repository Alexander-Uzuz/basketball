import { IDetailsPlayer } from "api/players/IPlayersRequest";
import React, { FC } from "react";
import styled from "styled-components";



interface Props{
  player:IDetailsPlayer;
  getCurrentAge:(date:string) => number;
}

export const AboutPlayer:FC<Props> = ({player, getCurrentAge}) => {

  return (
    <AboutPlayerWrapper>
      {/* <NavBarMobile></NavBarMobile> */}
      <AboutPlayerContainer>
        <AboutPlayerLogoContainer>
        <AboutPlayerLogo src={player?.avatarUrl} />
        </AboutPlayerLogoContainer>
        <AboutPlayerContent>
          <AboutPlayerHeadTitle>
            {player?.name}
            <AboutPlayerHeadTitleNumber>#{player?.number}</AboutPlayerHeadTitleNumber>
          </AboutPlayerHeadTitle>
          <AboutPlayerInfo>
            <AboutPlayerInfoBlock margin="0 60px 0 0">
              <AboutPlayerInfoItem>
                <AboutPlayerTitle>Position</AboutPlayerTitle>
                <AboutPlayerText>{player?.position}</AboutPlayerText>
              </AboutPlayerInfoItem>
              <AboutPlayerInfoItem>
                <AboutPlayerTitle>Height</AboutPlayerTitle>
                <AboutPlayerText>{player?.height}cm</AboutPlayerText>
              </AboutPlayerInfoItem>
              <AboutPlayerInfoItem>
                <AboutPlayerTitle>Age</AboutPlayerTitle>
                <AboutPlayerText>{getCurrentAge(player ? player.birthday : '')}</AboutPlayerText>
              </AboutPlayerInfoItem>
            </AboutPlayerInfoBlock>
            <AboutPlayerInfoBlock>
              <AboutPlayerInfoItem>
                <AboutPlayerTitle>Team</AboutPlayerTitle>
                <AboutPlayerText>{player.teamName}</AboutPlayerText>
              </AboutPlayerInfoItem>
              <AboutPlayerInfoItem>
                <AboutPlayerTitle>Weight</AboutPlayerTitle>
                <AboutPlayerText>{player?.weight}kg</AboutPlayerText>
              </AboutPlayerInfoItem>
            </AboutPlayerInfoBlock>
          </AboutPlayerInfo>
        </AboutPlayerContent>
      </AboutPlayerContainer>
    </AboutPlayerWrapper>
  );
};

const AboutPlayerWrapper = styled.div`
  position:relative;
  background: linear-gradient(276.45deg, #707070 0%, #393939 100.28%);
  border-radius: 0px 0px 10px 10px;
  padding-top:65px;
  padding-right:20px;
  width:100%;

  @media ${({theme}) => theme.media.laptopM}{
    padding:48px 15px 0 15px;
  }
`;

const AboutPlayerContainer = styled.div`
  display: flex;

  @media ${({theme}) => theme.media.laptopM}{
    flex-direction: column;
    align-items:center;
  }
`;

const AboutPlayerLogoContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
`;

const AboutPlayerLogo = styled.img`
    margin-right:56px;
    width:531px;
    height:401px;  
    object-fit: contain;

    @media ${({theme}) => theme.media.laptopM}{
      margin-right:0;
      margin-bottom:46px;
      width:274px;
      height:207px;
  }

  @media ${({theme}) => theme.media.mobileL}{
    width:143px;
    height:112px;
  }
`;

const AboutPlayerContent = styled.div`
    @media ${({theme}) => theme.media.laptopM}{
      text-align:center;
  }
`;

const AboutPlayerHeadTitle = styled.h1`
  font-size: var(--fs-title);
  line-height: var(--lh-title);
  color: var(--white);
  margin-bottom:40px;

  @media ${({theme}) => theme.media.mobileL}{
    font-size:${({theme}) => theme.fontSizes.medium};
    line-height:${({theme}) => theme.lineHeight.medium};
  }
`;

const AboutPlayerHeadTitleNumber = styled.span`
  color: ${({theme}) => theme.colors.lightRed};
  margin-left: 9px;
`;

const AboutPlayerInfo = styled.div`
  display: flex;
  justify-content:space-between;

  @media ${({theme}) => theme.media.mobileL}{
    flex-direction:column;
  }
`;

const AboutPlayerInfoBlock = styled.div<{
  margin?:string
}>`
  margin:${({margin}) => margin ? margin : '0'};

  @media ${({theme}) => theme.media.mobileL}{
    margin:0;
  }
`;

const AboutPlayerInfoItem = styled.div`
  margin-bottom: 54px;

  @media ${({theme}) => theme.media.mobileL}{
    margin-bottom:32px;
  }
`;

const AboutPlayerTitle = styled.h3`
  font-size:${({theme}) => theme.fontSizes.big};
  line-height:${({theme}) => theme.lineHeight.big};
  color: ${({theme}) => theme.colors.white};
  font-weight:${({theme}) => theme.fontWeight.bold};
  margin-bottom: 8px;
  @media ${({theme}) => theme.media.mobileL}{
    font-size:${({theme}) => theme.fontSizes.medium};
    line-height:${({theme}) => theme.lineHeight.medium};
  }
`;

const AboutPlayerText = styled.p`
  font-size: ${({theme}) => theme.fontSizes.medium};
  line-height:${({theme}) => theme.lineHeight.medium};
  color:${({theme}) => theme.colors.white};
  font-weight:${({theme}) => theme.fontWeight.medium};
  @media ${({theme}) => theme.media.mobileL}{
    font-size:15px;
    line-height:${({theme}) => theme.lineHeight.medium};
  }
`;

