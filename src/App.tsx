import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "core/redux/store/hooks";
import { RootState } from "core/redux/store/store";
import { fetchTeams } from "modules/teams/TeamThunk";
import {SignIn, SignUp} from 'modules/authorization/pages';
import {AddPlayer, DetailsPlayer, CardPlayers} from 'modules/players/pages';
import {AddTeam,CardTeams,DetailsTeam} from 'modules/teams/pages';
import { WrapperComponents, NotFound } from "common/components";
import {RequireAuth} from 'common/hooks/RequireAuth';
import {playersSelectors} from 'modules/players/PlayersSlice';
import { teamsSelectors } from "modules/teams/TeamReducer";



function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.user.user.token);
  const players:any = useAppSelector(playersSelectors.selectAll);
  const teams:any = useAppSelector(teamsSelectors.selectAll);
  const teamsOptions = useAppSelector((state:RootState) => state.teams.teamsOptions);

  // useEffect(() => {
  //   if(token){
  //     dispatch(fetchTeams({ token: token}));
  //   }


  // }, [token]);
  
  
  // useEffect(() =>{
  //   if(token){
  //     dispatch(fetchGetOptions({token}))
  //   }
  // },[teams])




  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/signIn" />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<WrapperComponents />}>
          <Route path="cardTeams/addTeam" element={
            <RequireAuth><AddTeam teams={teams}/></RequireAuth>
          } />
          <Route path="cardTeams/addTeam/:id" element={
            <RequireAuth><AddTeam teams={teams}/></RequireAuth>
          } />
          <Route path="cardPlayers/addPlayer" element={
            <RequireAuth><AddPlayer players={players} teams={teams} teamsOptions={teamsOptions}/></RequireAuth>
          } />
          <Route path="cardPlayers/addPlayer/:id" element={
            <RequireAuth><AddPlayer players={players} teams={teams} teamsOptions={teamsOptions}/></RequireAuth>
          } />
          <Route path="cardTeams" element={
            <RequireAuth><CardTeams teams={teams} /></RequireAuth>
          } />
          <Route
            path="cardPlayers"
            element={
              <RequireAuth><CardPlayers teams={teams} teamsOptions={teamsOptions}/></RequireAuth>
            }
          />
          <Route
            path="cardPlayers/:id"
            element={
              <RequireAuth><DetailsPlayer/></RequireAuth>
            }
          />
          <Route
            path="cardTeams/:id"
            element={
              <RequireAuth><DetailsTeam/></RequireAuth>
            }
          />
        </Route>
        <Route path="/not-found-404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found-404" />} />
      </Routes>
    </>
  );
}

export default App;
