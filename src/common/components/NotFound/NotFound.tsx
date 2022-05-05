import React, { FC } from "react";
import styled from "styled-components";
import NotFoundImg from "assets/icons/NotFound.svg";

type Props = {};

export const NotFound: FC<Props> = () => {
  return (
    <NotFoundWrapper>
      <NotFoundContainer>
        <NotFoundImage src={NotFoundImg} />
        <NotFoundTitle>Page not found</NotFoundTitle>
        <NotFoundText>
          Sorry, we can’t find what you’re looking for
        </NotFoundText>
      </NotFoundContainer>
    </NotFoundWrapper>
  );
};

const NotFoundWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height:100vh;
`;

const NotFoundContainer = styled.div`
  text-align: center;
  @media ${({theme}) => theme.media.tablet}{
    width:100%;
  }
`;

const NotFoundImage = styled.img`
  margin-bottom:48px;
  @media ${({theme}) => theme.media.tablet}{
    width:80%;
  }
`;

const NotFoundTitle = styled.h1`
  font-weight: 800;
  font-size: 36px;
  line-height: 49px;
  color:${({theme}) => theme.colors.lightRed};
  margin-bottom:24px;
`;

const NotFoundText = styled.p`
  font-size: 24px;
  line-height: 33px;
  color:${({theme}) => theme.colors.grey}
`;
