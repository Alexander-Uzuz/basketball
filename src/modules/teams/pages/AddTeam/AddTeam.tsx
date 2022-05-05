import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "api/baseRequest";
import {downloadImage} from 'api/images/imagesRequest';
import { fetchAddTeam ,fetchChangeTeam} from "../../TeamThunk";
import { useAppDispatch, useAppSelector } from "core/redux/store/hooks";
import { RootState } from "core/redux/store/store";
import {ITeam} from 'api/teams/ITeamsRequest';
import { HeaderSection, AddPhoto, Input, Button } from "common/components";
import {schemaTeam } from './validation';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

type Props = {
  teams: ITeam[]
};

export const AddTeam: FC<Props> = ({teams}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {status} = useAppSelector((state:RootState) => state.teams);
  const {id} = useParams();
  const currentTeam = id ? teams.find(team => team.id === Number(id)) : undefined;

  const token = useAppSelector((state:RootState) => state.user.user.token);
  const { register,handleSubmit,formState: { errors } } = useForm<ITeam>({
    mode:'onBlur',
    resolver:yupResolver(schemaTeam),
    defaultValues:currentTeam,
  });
  const [photo,setPhoto] = useState('');

  useEffect(() => {currentTeam && setPhoto(currentTeam.imageUrl)},[])

  useEffect(() => {
    const MySwal = withReactContent(Swal)
    if(status === 'resolved' && currentTeam){
      MySwal.fire({
        title:'Team successfully modified',
        icon:'success',
        confirmButtonText:'Go to home screen',
      }).then(res =>{
        if(res.isConfirmed){
          navigate('/cardTeams')
        }
      })
    }
    if(status === 'resolved'){
      MySwal.fire({
        title:'Team added successfully',
        icon:'success',
        confirmButtonText:'Go to home screen'
      }).then(res =>{
        if(res.isConfirmed){
          navigate('/cardTeams')
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
          navigate('/cardTeams')
        }
      })
    }
  },[status])



  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) =>{
    (async function () {
      try {
        if(e.target && e.target.files){
          const fileImage = e.target.files[0];
          const formData = new FormData();
          formData.append('file', fileImage);
          const image = await downloadImage({
            formData,token
          });
          setPhoto(BASE_URL +  image);
        }
      } catch (e:any) {
        console.log(e.message);
      }
    })();
  }

  const onSubmit = async (data:ITeam) =>{
    const MySwal = withReactContent(Swal)
      const team = {
        team:{
          ...data,
          imageUrl:photo
        },
        token
      }

      if(currentTeam){
        team.team.id = currentTeam.id;
        dispatch(fetchChangeTeam(team))
      }else{
        dispatch(fetchAddTeam(team))  
      }
  }

  return (
    <AddTeamWrapper>
      <HeaderSection branch="Teams" name="Add new team" to='/cardTeams'/>
      <AddTeamContainer onSubmit={handleSubmit(onSubmit)}>
        <AddPhoto {...register('imageUrl')} onChange={handleAddPhoto} value={photo} errorMessage={errors.imageUrl?.message}/>
        <AddTeamInputsContainer>
        <Input id="IName" label="Name" name="name" register={register} errorMessage={errors.name?.message}/>
        <Input id="IDivision" label="Division" name="division" register={register} errorMessage={errors.division?.message}/>
        <Input id="IConference" label="Conference" name="conference" register={register} errorMessage={errors.conference?.message}/>
        <Input id="IYearOfFoundation" label="Year of foundation" name="foundationYear" register={register} errorMessage={errors.foundationYear?.message}/>
        <AddTeamButtonsContainer>
          <Button 
          text="Cancel" 
          type="button"
          width="171px"
          onClick
          color='#9C9C9C'
          background="#FFFFFF"
          border='1px solid #9C9C9C'
          hover="#D1D1D1"
          backgroundActive='#9C9C9C'
          borderActive='1px solid #707070'
          colorActive='#707070'
          />
          <Button
          text="Save"
          width="171px"
          />
        </AddTeamButtonsContainer>
        </AddTeamInputsContainer>
      </AddTeamContainer>
    </AddTeamWrapper>
  );
};

const AddTeamWrapper = styled.div`
  max-width: 1120px;
  margin: 32px auto 0;
  border:1px solid transparent;
  border-radius:10px;
  background: ${({theme}) => theme.colors.white};
`;

const AddTeamContainer = styled.form`
  display:flex;
  margin-top:48px;
  padding-left: 73px;
  padding-bottom:48px;

  @media ${({theme}) => theme.media.laptopL}{
    padding-left:0;
    flex-direction: column;
    align-items: center;
  }
`;

const AddTeamInputsContainer = styled.div``;

const AddTeamButtonsContainer = styled.div`
  width:366px;
  display: flex;
  justify-content: space-between;
`;
