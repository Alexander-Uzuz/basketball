import { FC, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { INavBarLinkTitle } from "common/interfaces/INavbar";
import { useLocation } from "react-router-dom";
import { ReactComponent as Person } from "assets/icons/person.svg";
import { ReactComponent as GroupPerson } from "assets/icons/group_person.svg";
import { ReactComponent as LogOut } from "assets/icons/logOut.svg";
import { useAppDispatch } from "core/redux/store/hooks";
import { removeUser } from "modules/authorization/authorizationSlice";
import ProfileMobile from "assets/icons/ProfileMobile.svg";

interface Props {
  active: boolean;
  name: string | null;
}

export const Navbar: FC<Props> = ({ active, name }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const str = location.pathname;
  const regexp = /players/i;

  const activeIcon = regexp.test(str);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    dispatch(removeUser());
  };

  return (
    <>
      <NavbarWrapper transition={active} display={active ? "block" : "none"}>
        <NavbarContainer>
          <NavbarTopContainer>
            <NavbarUserContainer>
              <NavbarUserImg src={ProfileMobile} />
              <NavbarUserTitle>{name}</NavbarUserTitle>
            </NavbarUserContainer>
            <NavbarLinkContainer>
              <NavbarLink to="/cardTeams">
                <GroupPerson
                  fill={
                    !activeIcon
                      ? "var(--light-red)"
                      : "var(--light-grey)"
                  }
                />
                <NavbarLinkTitle
                  className={
                    !activeIcon
                      ? "active"
                      : ""
                  }
                >
                  Teams
                </NavbarLinkTitle>
              </NavbarLink>
              <NavbarLink to="/cardPlayers">
                <Person
                  fill={
                    activeIcon
                      ? "var(--light-red)"
                      : "var(--light-grey)"
                  }
                />
                <NavbarLinkTitle
                  className={
                    activeIcon
                      ? "active"
                      : ""
                  }
                >
                  Players
                </NavbarLinkTitle>
              </NavbarLink>
            </NavbarLinkContainer>
          </NavbarTopContainer>
          <NavbarLink to="/SignIn" onClick={handleSignOut} className="NavTop">
            <LogOut />
            <NavbarLinkTitle color="var(--lightestRed)">
              Sign Out
            </NavbarLinkTitle>
          </NavbarLink>
        </NavbarContainer>
      </NavbarWrapper>
    </>
  );
};


export const NavbarWrapper = styled.aside<{
  display: "block" | "none";
  transition:boolean;
}>`
  display:block;
  background: ${({ theme }) => theme.colors.white};
  text-align: center;
  padding: 0 42px 32px;
  z-index: 99;
  height: 100%;
  @media ${({ theme }) => theme.media.tablet} {
    display:block;
    text-align: left;
    position: absolute;
    left: 0px;
    top: 0;
    padding: 0 0 32px;
    width:100%;
    transform: ${({transition}) => !transition ? 'translateX(-100%)' : 'translateX(0px)'};
    transition: all .3s linear;
  }
`;

export const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const NavbarTopContainer = styled.div`
`;

export const NavbarUserContainer = styled.div`
  display: none;
  align-items: center;
  width: 181px;
  padding: 20px;
  border-bottom: 0.5px solid #9c9c9c;
  @media ${({ theme }) => theme.media.tablet} {
    display: flex;
    width:100%;
  }
`;

export const NavbarUserImg = styled.img`
  margin-right: 12px;
`;

export const NavbarUserTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.lineHeight.small};
  color: ${({ theme }) => theme.colors.darkGrey};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${({ theme }) => theme.media.tablet} {
    align-items:flex-start;
  }
`;

export const NavbarLink = styled(Link)`
  display: inline-block;
  margin-top: 40px;
  text-decoration: none;
  @media ${({ theme }) => theme.media.tablet} {
    display: flex;
    justify-content: flex-start;
    margin-left:20px;
  }
`;

export const NavbarLinkImg = styled.img``;

export const NavbarLinkTitle = styled.h3<INavBarLinkTitle>`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.fontSizes.smallest};
  line-height: 150%;
  font-weight: ${({theme}) => theme.fontWeight.medium};
  width: 48px;
  color: ${({ color }: INavBarLinkTitle) => (color ? color : "#D1D1D1")};
  &.active {
    color: ${({ theme }) => theme.colors.lightRed};
  }
  @media ${({ theme }) => theme.media.tablet} {
    margin-left: 8px;
  }
`;

export const NavbarWrapperMobile = styled.div<{ display: "block" | "none" }>`
  @media ${({ theme }) => theme.media.tablet} {
    display: ${({ display }) => display};
    top: 63px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`;