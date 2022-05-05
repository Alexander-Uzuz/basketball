import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { HeaderSection, AboutPlayer,Loading } from "common/components";
import { IPlayer } from "api/players/IPlayersRequest";
import { useParams } from "react-router-dom";
import { get_current_age } from "common/helpers/getCurrentAge";
import { useAppDispatch, useAppSelector } from "core/redux/store/hooks";
import { RootState } from "core/redux/store/store";
import { fetchDeletePlayer, fetchPlayer } from "../../PlayersThunk";
import { useNavigate } from "react-router-dom";
import { ITeam } from "api/teams/ITeamsRequest";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Spinner } from "common/components/Spinner/Spinner";

type Props = {
};

export const DetailsPlayer: FC<Props> = () => {
  const token = useAppSelector((state: RootState) => state.user.user);
  const { player } = useAppSelector((state: RootState) => state.players);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();


  useEffect(() => {
    dispatch(fetchPlayer({ token, id }));
  }, []);

  const handleDelete = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Are you sure you want to remove the player?",
      icon: "question",
      confirmButtonText: "Ok",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(fetchDeletePlayer({ id, token:token.token }));
        navigate("/cardPlayers");
      }
    });
  };

  const handleChange = () => {
    navigate(`/cardPlayers/addPlayer/${id}`);
  };

  return (
    <>
    {
      player ?
      <DetailsPlayerWrapper>
      <HeaderSection
        branch="Player"
        name={player ? player.name : ""}
        to="/cardPlayers"
        details
        id={Number(id)}
        handleDelete={handleDelete}
        handleChange={handleChange}
      />
      <AboutPlayer
        player={player}
        getCurrentAge={get_current_age}
      />
    </DetailsPlayerWrapper>    
    : <Spinner/>
    }
    </>
  );
};

const DetailsPlayerWrapper = styled.div`
  margin: 32px 80px 0;
  @media ${({ theme }) => theme.media.tablet} {
    margin: 16px 0 0 0;
    border-top: 0.5px solid #9c9c9c;
  }
`;
