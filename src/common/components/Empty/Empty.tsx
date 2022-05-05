import React, { FC } from "react";
import styled from "styled-components";

type Props = {
  src: string;
  name: string;
};

export const Empty: FC<Props> = ({ src, name }) => {
  return (
      <EmptyWrapper>
        <EmptyContainer>
          <EmptyImages src={src} />
          <EmptyTitle>Empty here</EmptyTitle>
          <EmptyText>Add new {name} to continue</EmptyText>
        </EmptyContainer>
      </EmptyWrapper>
  );
};

// const EmptyGrid = styled.div`
//     display:grid;
//     grid-template-columns: 1fr 1fr 1fr 1fr;
//     grid-template-rows:1fr 1fr 1fr 1fr 1fr 1fr;
// `

const EmptyWrapper = styled.div`
  height:100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyContainer = styled.div`
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.white};
  padding: 48px 118px;
  text-align: center;

  @media ${({ theme }) => theme.media.tablet} {
    padding: 12px 36px;
  }

  @media ${({ theme }) => theme.media.tablet} {
    padding: 0;
    width: 100%;
  }
`;

const EmptyImages = styled.img`
  margin-bottom: 48px;

  @media ${({ theme }) => theme.media.tablet} {
    margin-bottom: 24px;
    width: 225px;
    height: 225px;
  }
`;

const EmptyTitle = styled.h1`
  font-weight: 800;
  font-size: 36px;
  line-height: 49px;
  color: ${({ theme }) => theme.colors.lightestRed};
  margin-bottom: 24px;

  @media ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.medium};
    line-height: ${({ theme }) => theme.lineHeight.medium};
    margin-bottom: 45px;
  }
`;

const EmptyText = styled.p`
  font-size: 24px;
  line-height: 33px;
  color: ${({ theme }) => theme.colors.grey};

  @media ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.small};
    line-height: ${({ theme }) => theme.lineHeight.small};
    margin-bottom: 45px;
  }
`;
