import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "core/redux/store/hooks";
import { RootState } from "core/redux/store/store";
import { fetchTeams } from "modules/teams/TeamThunk";
import { SignIn, SignUp } from "modules/auth/pages";
import { AddPlayer, DetailsPlayer, CardPlayers } from "modules/players/pages";
import { AddTeam, CardTeams, DetailsTeam } from "modules/teams/pages";
import { WrapperComponents, NotFound } from "common/components";
import { RequireAuth } from "common/hooks/RequireAuth";
import { playersSelectors } from "modules/players/PlayersSlice";
import { teamsSelectors } from "modules/teams/TeamSlice";

function App() {
  const players: any = useAppSelector(playersSelectors.selectAll);
  const teams: any = useAppSelector(teamsSelectors.selectAll);
  const teamsOptions = useAppSelector(
    (state: RootState) => state.teams.teamsOptions
  );


  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/signIn" />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<WrapperComponents />}>
          <Route path="/" element={<RequireAuth />}>
            <Route
              path="/cardTeams/addTeam"
              element={<AddTeam teams={teams} />}
            />
            <Route
              path="/cardTeams/addTeam/:id"
              element={<AddTeam teams={teams} />}
            />
            <Route
              path="/cardPlayers/addPlayer"
              element={
                <AddPlayer
                  players={players}
                  teams={teams}
                  teamsOptions={teamsOptions}
                />
              }
            />
            <Route
              path="/cardPlayers/addPlayer/:id"
              element={
                <AddPlayer
                  players={players}
                  teams={teams}
                  teamsOptions={teamsOptions}
                />
              }
            />
            <Route path="/cardTeams" element={<CardTeams teams={teams} />} />
            <Route
              path="/cardPlayers"
              element={
                <CardPlayers teams={teams} teamsOptions={teamsOptions} />
              }
            />
            <Route path="/cardPlayers/:id" element={<DetailsPlayer />} />
            <Route path="/cardTeams/:id" element={<DetailsTeam />} />
          </Route>
        </Route>
        <Route path="/not-found-404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found-404" />} />
      </Routes>
    </>
  );
}

export default App;
