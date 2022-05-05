import React, {
  BaseSyntheticEvent,
  FC,
  useState,
  useMemo,
  useEffect,
} from "react";
import styled from "styled-components";
import {
  Search,
  ButtonAdd,
  CardPlayer,
  Paginate,
  Select,
  Empty,
  Loading,
} from "common/components";
import {
  getSelectTeams,
} from "common/constants/Select/SelectTeams";
import { IPlayer } from "api/players/IPlayersRequest";
import { ITeam } from "api/teams/ITeamsRequest";
import { optionsSize } from "common/components/Select/data";
import { ISelectOption } from "common/constants/Select/ISelectOption";
import { useAppDispatch, useAppSelector } from "core/redux/store/hooks";
import { RootState } from "core/redux/store/rootReducer";
import { getPlayers } from "api/players/playersRequest";
import { fetchPlayers, fetchChangePlayer } from "../../PlayersThunk";
import WithoutPlayers from "assets/icons/withoutPlayers.svg";
import {playersSelectors} from 'modules/players/PlayersSlice';
import {fetchGetOptions} from 'modules/teams/TeamThunk'
import { Spinner } from "common/components/Spinner/Spinner";

type Props = {
  teams: ITeam[];
  teamsOptions:ITeam[];
};

export const CardPlayers: FC<Props> = ({ teams, teamsOptions }) => {
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;
  const { count, loading, status } = useAppSelector(
    (state: RootState) => state.players
  );

  const players = useAppSelector(playersSelectors.selectAll);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [teamsSearch, setTeamsSearch] = useState("");


  useEffect(() =>{
    if(token){
      dispatch(fetchGetOptions({token:token.token}))
    }
  },[teams]) 

  const handleTeamSearch = (options: ISelectOption[]) => {
    const teamsId:string[] = []

    options.forEach(option => teamsId.push(`&TeamIds=${option.value}`))

    setTeamsSearch(teamsId.join(""));
  };


  const handleSearchValue = (event: BaseSyntheticEvent) => {
    setSearchValue(event.target.value);
  };
  const handlePageSize = (option: ISelectOption) => {
    setPageSize(Number(option.value));
  }
  const pageCounts = useMemo(
    () => Math.ceil((count || 1) / pageSize),
    [count, pageSize]
  );
  const handlePageChange = ({ selected }: { selected: number }) =>
    setCurrentPage(selected + 1);

  useEffect(() => {
    const obj = { token, searchValue, currentPage, pageSize, teamsSearch };
    dispatch(fetchPlayers(obj));
  }, [searchValue, currentPage, pageSize, teamsSearch]);


  return (
    <>
        <CardPlayerWrapper>
          <CardPlayersPanelTopWrapper>
            <Search value={searchValue} onChange={handleSearchValue} />
            <Select
              options={getSelectTeams(teamsOptions)}
              isMulti
              onChange={handleTeamSearch}
            />
            <ButtonAdd text="Add" to="/cardPlayers/addPlayer" justifyself="end" />
          </CardPlayersPanelTopWrapper>
          {players.length ? (
            <CardPlayersCardsWrapper>
              {players &&
                players.map((player:any) => (
                  <CardPlayer key={player.id} player={player} />
                ))}
            </CardPlayersCardsWrapper>
          ) : (
            (status === 'pending' ? <CardPlayerOtherWrapper><Spinner/></CardPlayerOtherWrapper>  : <CardPlayerOtherWrapper><Empty src={WithoutPlayers} name="players" /></CardPlayerOtherWrapper>)
          )}
          <CardPlayersPanelBottomWrapper>
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
          </CardPlayersPanelBottomWrapper>
        </CardPlayerWrapper>
      
    </>
  );
};

const CardPlayerWrapper = styled.div`
  margin: 32px 80px;
  height: 100%;
  display: grid;
  grid-template-rows: 40px 1fr 40px;
  grid-gap: 32px;

  @media ${({ theme }) => theme.media.laptopM} {
    grid-template-rows: 168px 1fr 40px;
    margin: 16px 15px;
  }
`;

const CardPlayersPanelLeftTopWrapper = styled.div`
  /* display:flex;
  align-items: center; */
`;

const CardPlayersPanelTopWrapper = styled.div`
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;

  .css-wsvdi7-container {
    width: 100%;
  }

  @media ${({ theme }) => theme.media.laptopM} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;
const CardPlayersCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows:1fr 1fr;
  grid-gap: 24px;

  @media ${({ theme }) => theme.media.laptopM} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows:1fr 1fr 1fr;
    grid-gap:12px;
  }
`;

const CardPlayerOtherWrapper = styled.div``;

const CardPlayersPanelBottomWrapper = styled.div`
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
  }

  .Select__control--is-focused {
    width: 88px;
  }
`;
