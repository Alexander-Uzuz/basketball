import React, {
  FC,
  useEffect,
  useState,
  BaseSyntheticEvent,
  useMemo,
  useCallback,
  memo,
} from "react";
import styled from "styled-components";
import {
  Search,
  ButtonAdd,
  CardTeam,
  Paginate,
  Select,
  Empty,
} from "common/components";
import { optionsSize } from "common/components/Select/data";
import { ITeam } from "api/teams/ITeamsRequest";
import { useAppSelector, useAppDispatch } from "core/redux/store/hooks";
import { ISelectOption } from "common/constants/Select/ISelectOption";
import { RootState } from "core/redux/store/store";
import { fetchTeams } from "modules/teams/TeamThunk";
import WithoutTeam from "assets/icons/withoutTeams.svg";
import { Spinner } from "common/components/Spinner/Spinner";

type Props = {
  teams: ITeam[];
};

const CardTeamsInner: FC<Props> = ({ teams }) => {
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;
  const dispatch = useAppDispatch();
  const { count, status } = useAppSelector(
    (state: RootState) => state.teams
  );
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const handleSearchValue = useCallback((event: BaseSyntheticEvent) => {
    currentPage !== 1 && setCurrentPage(1);
    setSearchValue(event.target.value);
  },[]);
  const handlePageSize = useCallback((option: ISelectOption) =>
  setPageSize(Number(option.value)),[]);
  const handlePageChange = useCallback((({ selected }: { selected: number }) =>
  setCurrentPage(selected + 1)),[]);
  const pageCounts = useMemo(
    () => Math.ceil((count || 1) / pageSize),
    [count, pageSize]
  );



  useEffect(() => {
    const obj = { token: token.token, searchValue, currentPage, pageSize };

    dispatch(fetchTeams(obj));
  }, [searchValue,currentPage,pageSize]);

  return (
    <>
        <CardTeamsWrapper>
          <CardTeamsPanelTopWrapper>
            <Search value={searchValue} onChange={handleSearchValue} />
            <CardPacifer />
            <ButtonAdd
              text="Add"
              to="/cardTeams/addTeam"
              justifyself="flex-end"
            />
          </CardTeamsPanelTopWrapper>
          {teams.length ? (
            <CardTeamsCardsWrapper>
              {teams.map((team) => (
                <CardTeam key={team.id} team={team} />
              ))}
            </CardTeamsCardsWrapper>
          ) : status === "pending" ? (
            <CardTeamsOtherWrapper><Spinner /></CardTeamsOtherWrapper>
          ) : (
            <CardTeamsOtherWrapper><Empty src={WithoutTeam} name="teams" /></CardTeamsOtherWrapper>
          )}
          <CardTeamsPanelBottomWrapper>
            <Paginate
              pageCount={pageCounts}
              initialPage={currentPage - 1}
              onChange={handlePageChange}
            />
            <Select
              options={optionsSize}
              defaultValue={optionsSize[0]}
              menuPlacement="top"
              onChange={handlePageSize}
            />
          </CardTeamsPanelBottomWrapper>
        </CardTeamsWrapper>
    </>
  );
};

export const CardTeams = memo(CardTeamsInner);

const CardTeamsWrapper = styled.div`
  margin: 32px 80px;
  height: 100%;
  display: grid;
  grid-template-rows: 40px 1fr 40px;
  grid-gap: 32px;

  @media ${({ theme }) => theme.media.laptopM} {
    grid-template-rows: 96px 1fr 40px;
    grid-gap: 22px;
  }

  @media ${({ theme }) => theme.media.laptopM} {
    margin: 16px 15px;
  }

  @media ${({theme}) => theme.media.mobileL}{
    margin:16px 0;
  }
`;

const CardPacifer = styled.div`
  @media ${({ theme }) => theme.media.laptopM} {
    display: none;
  }
`;

const CardTeamsPanelTopWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;

  .css-wsvdi7-container {
    width: 100%;
  }

  @media ${({ theme }) => theme.media.laptop} {
    grid-template-rows: 1fr 1fr;
  }

  @media ${({ theme }) => theme.media.laptopM} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 16px;
  }
`;
const CardTeamsCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 24px;

  @media ${({ theme }) => theme.media.laptopM} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap:12px;
  }

`;

const CardTeamsOtherWrapper = styled.div``;

const CardTeamsPanelBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  flex: 0 0 auto;

  .css-wsvdi7-container {
    width: 100%;
  }

  .Select__control.css-1adevlx-control {
    width: 88px;

    @media ${({ theme }) => theme.media.laptopM} {
      width: 100%;
    }

    @media ${({ theme }) => theme.media.tablet} {
      width: 60px;
      height: 28px;
    }
  }

  .Select__control--is-focused {
    width: 88px;
  }
`;
