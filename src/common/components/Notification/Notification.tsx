import styled from "styled-components";
import { FC } from "react";

const StyledNotificationContainer = styled.div`
  width:100%;

  @media ${({ theme }) => theme.media.laptopM} {
    display:flex;
    justify-content:center;
    position:absolute;
    top:82px;
  }
`;

const StyledNotification = styled.div<{
  right?: string;
  top?: string;
}>`
  position: absolute;
  right: ${({ right }) => (right ? right : "36px")};
  top: ${({ top }) => (top ? top : "36px")};
  width: 470px;
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.lightRed};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 16px;
  line-height: 24px;

  @media ${({ theme }) => theme.media.laptopM} {
    position:static;
    width:316px;
    text-align:center;
  }
`;

interface Props {
  errorText: string;
  top?: string;
  left?: string;
}

export const Notification: FC<Props> = ({ errorText }, ...props) => {
  return (
    <StyledNotificationContainer>
      <StyledNotification {...props}>{errorText}</StyledNotification>
    </StyledNotificationContainer>
  );
};
