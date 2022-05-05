import { FC } from "react";
import styled from "styled-components";
import { ITeam } from "api/teams/ITeamsRequest";



interface Props{
  team:ITeam | undefined; 
}

export const AboutTeam:FC<Props> = ({team}) => {
  return (
      <AboutTeamWrapper>
      <AboutTeamContainer>
        <AboutTeamLogo src={team?.imageUrl} />
        <AboutTeamContent>
          <AboutTeamHeadTitle>{team?.name}</AboutTeamHeadTitle>
          <AboutTeamInfo>
            <AboutTeamInfoBlock>
              <AboutTeamInfoItem>
                <AboutTeamTitle>Year of foundation</AboutTeamTitle>
                <AboutTeamText>{team?.foundationYear}</AboutTeamText>
              </AboutTeamInfoItem>
              <AboutTeamInfoItem>
                <AboutTeamTitle>Conference</AboutTeamTitle>
                <AboutTeamText>{team?.conference}</AboutTeamText>
              </AboutTeamInfoItem>
            </AboutTeamInfoBlock>
            <AboutTeamInfoBlock>
              <AboutTeamInfoItem>
                <AboutTeamTitle>Division</AboutTeamTitle>
                <AboutTeamText>{team?.division}</AboutTeamText>
              </AboutTeamInfoItem>
            </AboutTeamInfoBlock>
          </AboutTeamInfo>
        </AboutTeamContent>
      </AboutTeamContainer>
    </AboutTeamWrapper>
  );
};




const AboutTeamWrapper = styled.div`
  background: linear-gradient(276.45deg, #707070 0%, #393939 100.28%);
  border-radius: 0px 0px 10px 10px;
  padding: 65px 0;

  @media ${({theme}) => theme.media.laptopM}{
    padding:48px 15px 0 15px;
  }
`;

const AboutTeamContainer = styled.div`
  display: flex;
  align-items: center;

  @media ${({theme}) => theme.media.laptopM}{
    flex-direction: column;
    align-items:center;
  }
`;

const AboutTeamLogo = styled.img`
  width: 210px;
  height: 210px;
  margin: 0 122px;
  object-fit: contain;

  @media ${({theme}) => theme.media.laptopM}{
    width:143px;
    height:112px;
    margin:0 0 46px;
  }
`;

const AboutTeamContent = styled.div`
    @media ${({theme}) => theme.media.laptopM}{
      text-align:center;
  }
`;

const AboutTeamHeadTitle = styled.h1`
  font-size:${({theme}) => theme.fontSizes.biggest};
  line-height:${({theme}) => theme.lineHeight.biggest};
  color:${({theme}) => theme.colors.white};
  margin-bottom: 40px;

  @media ${({theme}) => theme.media.tablet}{
    font-size:${({theme}) => theme.fontSizes.medium};
    line-height:${({theme}) => theme.lineHeight.medium};
  }
`;

const AboutTeamInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media ${({theme}) => theme.media.laptopM}{
      flex-direction:column;
  }
`;

const AboutTeamInfoBlock = styled.div`
  margin-right:40px;

  @media ${({theme}) => theme.media.laptopM}{
      margin:0;
  }
`;

const AboutTeamInfoItem = styled.div`
  margin-bottom: 54px;

  @media ${({theme}) => theme.media.tablet}{
    margin-bottom:32px;
  }
`;

const AboutTeamTitle = styled.h3`
  font-size:${({theme}) => theme.fontSizes.biggest};
  line-height:${({theme}) => theme.lineHeight.biggest};
  color:${({theme}) => theme.colors.white};
  font-weight:${({theme}) => theme.fontWeight.bold}; 
  margin-bottom: 8px;

  @media ${({theme}) => theme.media.tablet}{
    font-size:${({theme}) => theme.fontSizes.medium};
    line-height:${({theme}) => theme.lineHeight.medium};
  }
`;

const AboutTeamText = styled.p`
  font-size: ${({theme}) => theme.fontSizes.medium};
  line-height:${({theme}) => theme.lineHeight.medium};
  color:${({theme}) => theme.colors.white};
  font-weight: ${({theme}) => theme.fontWeight.medium};

  @media ${({theme}) => theme.media.tablet}{
    font-size:15px;
    line-height:${({theme}) => theme.lineHeight.medium};
  }
`;