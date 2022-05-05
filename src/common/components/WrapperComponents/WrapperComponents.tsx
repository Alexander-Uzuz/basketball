import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { Header, Navbar } from "common/components";
import { useAppSelector } from "core/redux/store/hooks";
import { RootState } from "core/redux/store/rootReducer";
import { Outlet, useLocation } from "react-router-dom";

type Props = {};

export const WrapperComponents: FC<Props> = () => {
  const name = useAppSelector((state: RootState) => state.user.user.name);
  const [active, setActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setActive(false);
  }, [location]);

  const handleBurger = () => {
    setActive(!active);

  };

  return (
    <>
      <MainWrapper>
        <HeaderContainer>
          <Header handleBurger={handleBurger} name={name} />
        </HeaderContainer>
        <Wrapper>
          <NavbarContainer active={active}>
            <Navbar active={active} name={name} />
          </NavbarContainer>
          <WrapperOutlet>
            <Content>
              <Outlet />
            </Content>
          </WrapperOutlet>
        </Wrapper>
        <NavbarWrapperMobile display={active ? "block" : "none"} />
      </MainWrapper>
    </>
  );
};

const MainWrapper = styled.div`
  width:100%;
`;

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  @media ${({ theme }) => theme.media.tablet} {
    padding: 16px 12px 0;
  }
`;
const WrapperOutlet = styled.div`
  margin-left: 140px;
  padding: 80px 0 32px;
  @media ${({ theme }) => theme.media.tablet} {
    padding-top: 62px;
    margin: 0;
  }
`;

const Wrapper = styled.div`
  background: ${({theme}) => theme.colors.lightestGrey1};
`;

export const HeaderContainer = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
`;
export const NavbarContainer = styled.div<{ active: boolean }>`
  position: fixed;
  z-index: 9;
  margin-top: 80px;
  height: calc(100% - 80px);
  @media ${({ theme }) => theme.media.tablet} {
    width: 50%;
    margin-top: 62px;
    height: calc(100% - 62px);
    transition: all 0.3s linear;
    transform: translateX(-100%);
    ${({ active }) =>
      active &&
      `
    transition: all .3s linear;
    transform: translateX(0);
  
`}
  }
`;

export const NavbarWrapperMobile = styled.div<{ display: "block" | "none" }>`
  @media ${({ theme }) => theme.media.tablet} {
    position: fixed;
    display: ${({ display }) => display};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`;

// const WrapperOutlet = styled.div`
//   width:100%;
//   height:100%;
//   background: ${({ theme }) => theme.colors.lightestGrey1};
// `;
