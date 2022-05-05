import React, { FC, useState, useCallback, useEffect, BaseSyntheticEvent } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { select_position } from "common/constants/Select/SelectPosition";
import {
  getSelectTeams,
} from "common/constants/Select/SelectTeams";
import { ISelectOption } from "common/constants/Select/ISelectOption";
import { ITeam } from "api/teams/ITeamsRequest";
import { downloadImage } from "api/images/imagesRequest";
import { findIdTeams } from "./findIdTeams";
import { BASE_URL } from "api/baseRequest";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import {
  HeaderSection,
  AddPhoto,
  Input,
  Button,
  Select,
} from "common/components";
import { schemaTeam, IPlayer } from "./validation";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "core/redux/store/hooks";
import { fetchAddPlayer, fetchChangePlayer } from "../../PlayersThunk";
import { RootState } from "core/redux/store/store";

type Props = {
  players:IPlayer[];
  teams:ITeam[],
  teamsOptions:ITeam[];
};


export const AddPlayer: FC<Props> = ({ teams,players,teamsOptions }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {error, status} = useAppSelector((state:RootState) => state.players);
  const token = useAppSelector((state: RootState) => state.user.user.token);
  const {id} = useParams();
  const currentPlayer:any = id ? players.find((player:any) => player.id === Number(id)) : undefined;
  const [photo, setPhoto] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [birthday, setBirthday] = useState(currentPlayer ? currentPlayer.birthday.slice(0,10) : '');
  const [positionOptions,setPositionOptions] = useState<ISelectOption[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IPlayer>({
    mode: "onBlur",
    resolver: yupResolver(schemaTeam),
    defaultValues:currentPlayer
  });


  useEffect(() => {currentPlayer && setPhoto(currentPlayer.avatarUrl)},[])

  useEffect(() => {
    const MySwal = withReactContent(Swal)
    if(status === 'resolved' && currentPlayer){
      MySwal.fire({
        title:'Player successfully modified',
        icon:'success',
        confirmButtonText:'Go to home screen',
      }).then(res =>{
        if(res.isConfirmed){
          navigate('/cardPlayers')
        }
      })
    }
    if(status === 'resolved'){
      MySwal.fire({
        title:'Player added successfully',
        icon:'success',
        confirmButtonText:'Go to home screen'
      }).then(res =>{
        if(res.isConfirmed){
          navigate('/cardPlayers')
        }
      })
    }
    if(status === 'rejected'){
      MySwal.fire({
        title:'Server error',
        icon:'error',
        confirmButtonText: 'Ok'
      }).then(res =>{
        if(res.isConfirmed){
          navigate('/cardPlayers')
        }
      })
    }
  },[status]);

  useEffect(() => {
    (async function () {
      let selectOption = await select_position(token);
      setPositionOptions(selectOption);
   }());
  },[])


  const handleAddPhoto = useCallback((e: any) => {
    (async function () {
      try {
        if (e.target && e.target.files) {
          const fileImage = e.target.files[0];
          const formData = new FormData();
          formData.append("file", fileImage);
          const image = await downloadImage({
            formData,
            token,
          });
          setPhoto(BASE_URL + image);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    })();
  }, []);


  const onSubmit = async (data: any) => {
  
    const id = findIdTeams(teamsOptions, data.team);
    let player = {
      ...data,
      avatarUrl: photo,
      team:id
    };
    if (teams && data && !currentPlayer) {
      console.log(player,'player');
      console.log(token,'token')
      dispatch(fetchAddPlayer({ player, token }));
    }

    if(teams && data && currentPlayer){
      player.id = currentPlayer.id;
      player.birthday = player.birthday.slice(0,10);
      dispatch(fetchChangePlayer({player, token}))
    }
  };

  return (
    <AddPlayerWrapper>
      <HeaderSection branch="Players" name="Add new player" to="/cardPlayers" />
      {errorMessage ? <h1>{errorMessage}</h1> : ""}
      <AddPlayerContainer onSubmit={handleSubmit(onSubmit)}>
        <AddPhoto
          {...register("avatarUrl")}
          value={photo}
          onChange={handleAddPhoto}
          errorMessage={errors.avatarUrl?.message}
        />
        <AddPlayerInputsContainer>
          <Input
            id="IName"
            label="Name"
            name="name"
            register={register}
            errorMessage={errors.name?.message}
          />
          <Controller
            control={control}
            name="position"
            rules={{ required: "This field is required" }}
            render={({ field: { onChange, value } }) => (
              <Select
                label="Position"
                id="PositionSelect"
                options={positionOptions}
                error={errors.position?.message}
                value={positionOptions.find((option) => option.value === value)}
                onChange={(value: ISelectOption) => onChange(value.value)}
              />
            )}
          />
          <Controller
            control={control}
            name="team"
            rules={{ required: "This field is required" }}
            render={({ field: { onChange, value } }) => (
              <Select
                label="Teams"
                id="TeamsSelect"
                options={getSelectTeams(teamsOptions)}
                defaultValue={currentPlayer && getSelectTeams(teamsOptions).find((option) => option.value == currentPlayer.team)}
                error={errors.team?.message}
                value={getSelectTeams(teamsOptions).find((option) => option.label === value)}
                onChange={(value: ISelectOption) => onChange(value.value)}
              />
            )}
          />
          <AddPlayerMiniInputsWrapper>
            <Input
              width="171px"
              id="IHeight"
              label="Height(cm)"
              name="height"
              register={register}
              errorMessage={errors.height?.message}
            />
            <Input
              width="171px"
              id="IWeight"
              label="Weight(kg)"
              name="weight"
              register={register}
              errorMessage={errors.weight?.message}
            />
          </AddPlayerMiniInputsWrapper>
          <AddPlayerMiniInputsWrapper>
            <Input
              width="171px"
              type="date"
              id="IBirtnday"
              label="Birtnday"
              name="birthday"
              value={currentPlayer && birthday}
              onChange={(event:BaseSyntheticEvent) => setBirthday(event.target.value)}
              register={register}
              errorMessage={errors.birthday?.message}
            />
            <Input
              width="171px"
              id="INumber"
              label="Number"
              name="number"
              register={register}
              errorMessage={errors.number?.message}
            />
          </AddPlayerMiniInputsWrapper>
          <AddPlayerButtonsContainer>
            <Button
              text="Cancel"
              type="button"
              onClick
              width="171px"
              color="#9C9C9C"
              background="#FFFFFF"
              border="1px solid #9C9C9C"
              hover="#D1D1D1"
              backgroundActive="#9C9C9C"
              borderActive="1px solid #707070"
              colorActive="#707070"
            />
            <Button
              text="Save"
              width="171px"
            />
          </AddPlayerButtonsContainer>
        </AddPlayerInputsContainer>
      </AddPlayerContainer>
    </AddPlayerWrapper>
  );
};

const AddPlayerWrapper = styled.div`
  width: 1120px;
  margin: 32px auto 0;
  border: 1px solid transparent;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};

  @media ${({theme}) => theme.media.laptopL}{
    width:100%;
  }
`;

const AddPlayerContainer = styled.form`
  display: flex;
  margin-top: 48px;
  padding-left: 73px;
  padding-bottom: 48px;

  @media ${({theme}) => theme.media.laptopL}{
    padding-left:0;
    flex-direction: column;
    align-items: center;
  }
`;

const AddPlayerInputsContainer = styled.div`
  .css-1mdp78e-container{
    margin-bottom:24px;
  }
`;

const AddPlayerButtonsContainer = styled.div`
  width: 366px;
  display: flex;
  justify-content: space-between;
`;

const AddPlayerMiniInputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
