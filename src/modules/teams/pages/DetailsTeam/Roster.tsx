import React, { FC } from "react";
import styled, { css } from "styled-components";
import Player from "assets/images/PlayerCardIMG.png";
import { IPlayer } from "api/players/IPlayersRequest";
import {get_current_age} from 'common/helpers/getCurrentAge'

type Props = {
  players: IPlayer[];
};

export const Roster: FC<Props> = ({ players }) => {
  return (
    <RosterWrapper>
      <RosterContainer>
        <RosterTitle>Roster</RosterTitle>
        <RosterFlex>
          <RosterFlexLeft>
            <RosterNumber>#</RosterNumber>
            <RosterTextHeader>Player</RosterTextHeader>
          </RosterFlexLeft>
          <RosterFlexRight>
            <RosterTextHeader>Height</RosterTextHeader>
            <RosterTextHeader>Weight</RosterTextHeader>
            <RosterTextHeader>Age</RosterTextHeader>
          </RosterFlexRight>
        </RosterFlex>
        {players.map((player) => {
          return (
            <RosterFlex key={player.id}>
              <RosterFlexLeft>
                <RosterNumber>{player.number}</RosterNumber>
                <RosterFlexLeft>
                  <RosterPlayerImg src={player.avatarUrl} />
                  <RosterPlayerLeftContainer>
                    <RosterPlayerLeftName>{player.name}</RosterPlayerLeftName>
                    <RosterPlayerLeftPosition>
                      {player.position}
                    </RosterPlayerLeftPosition>
                  </RosterPlayerLeftContainer>
                </RosterFlexLeft>
              </RosterFlexLeft>
              <RosterFlexRight>
                <RosterTextHeader>{player.height}</RosterTextHeader>
                <RosterTextHeader>{player.weight}kg</RosterTextHeader>
                <RosterTextHeader>{get_current_age(player.birthday)}</RosterTextHeader>
              </RosterFlexRight>
            </RosterFlex>
          );
        })}
      </RosterContainer>
    </RosterWrapper>
  );
};

const RosterWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 0.5px solid #9c9c9c;
  box-sizing: border-box;
  border-radius: 10px;
  margin:24px 0;

  @media ${({theme}) => theme.media.tablet}{
    border-radius: 0px;
    margin:16px 0;
  }


`;

const RosterContainer = styled.div``;

const RosterTitle = styled.h2`
  padding: 14px 43px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  line-height: ${({ theme }) => theme.lineHeight.medium};
`;

const RosterFlexStyled = css`
  display: flex;
  align-items: center;
`;

const RosterFlex = styled.div`
  ${RosterFlexStyled}
  justify-content: space-between;
  padding: 6px 32px;
  border-top:0.5px solid #9C9C9C;
`;


const RosterFlexLeft = styled.div`
  ${RosterFlexStyled}
`;

const RosterFlexRight = styled.div`
  ${RosterFlexStyled}
  justify-content: space-between;
  width: 250px;

  
  @media ${({theme}) => theme.media.laptop}{
    display:none;
  }
`;

const StyledText = css`
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const RosterTextHeader = styled.p<{
  margin?: string;
}>`
  ${StyledText};
  line-height: ${({ theme }) => theme.lineHeight.small};
  margin: ${({ margin }) => (margin ? margin : "0")};
`;

const RosterNumber = styled.p`
  ${StyledText}
  line-height: ${({ theme }) => theme.lineHeight.small};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 40px;
  margin-right: 30px;
`;

const RosterText = styled.p`
  ${StyledText}
  line-height: 19px;
`;

const RosterPlayerImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
`;

const RosterPlayerLeftContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const RosterPlayerLeftName = styled.h3`
  ${StyledText}
  line-height: ${({ theme }) => theme.lineHeight.small};
`;

const RosterPlayerLeftPosition = styled.p`
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.lightestGrey};
`;
