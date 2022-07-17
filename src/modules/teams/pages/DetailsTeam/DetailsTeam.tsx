import { FC, useEffect } from "react";
import styled from "styled-components";
import { HeaderSection, AboutTeam } from "common/components";
import { IPlayer } from "api/players/IPlayersRequest";
import { useParams } from "react-router-dom";
import { Roster } from "./Roster";
import { useAppDispatch, useAppSelector } from "core/redux/store/hooks";
import { RootState } from "core/redux/store/store";
import { fetchDeleteTeam } from "../../TeamThunk";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { fetchPlayers } from "modules/players/PlayersThunk";
import { playersSelectors } from "modules/players/PlayersSlice";
import { fetchTeam } from "../../TeamThunk";
import { Spinner } from "common/components/Spinner/Spinner";

type Props = {};

export const DetailsTeam: FC<Props> = () => {
  const token = useAppSelector((state: RootState) => state.user.user);
  const players: any = useAppSelector(playersSelectors.selectAll);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const team = useAppSelector((state: RootState) => state.teams.team);
  const playersThisTeam = players.filter(
    (player: IPlayer) => player.team === Number(id)
  );

  useEffect(() => {
    dispatch(fetchPlayers({ token }));
    dispatch(fetchTeam({ id, token }));
  }, []);

  const handleDelete = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Are you sure you want to remove the team?",
      icon: "question",
      confirmButtonText: "Ok",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(fetchDeleteTeam({ id, token }));
        navigate("/cardTeams");
      }
    });
  };

  const handleChange = () => {
    navigate(`/cardTeams/addTeam/${id}`);
  };

  return (
    <>
      {team ? (
        <DetailsPlayerWrapper>
          <HeaderSection
            branch="Team"
            name={team ? team.name : ""}
            to="/cardTeams"
            details
            handleDelete={handleDelete}
            handleChange={handleChange}
          />
          <AboutTeam team={team} />
          {playersThisTeam.length ? <Roster players={playersThisTeam} /> : ""}
        </DetailsPlayerWrapper>
      ) : (
        <Spinner/>
      )}
    </>
  );
};

const DetailsPlayerWrapper = styled.div`
  margin: 32px 80px 0;

  @media ${({ theme }) => theme.media.tablet} {
    margin: 0;
  }
`;
