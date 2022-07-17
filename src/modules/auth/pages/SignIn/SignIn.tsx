import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "core/redux/store/hooks";
import { fetchUser } from "../../authThunk";
import { RootState } from "core/redux/store/store";
import styled from "styled-components";
import Background from 'assets/icons/BackgroundSignIn.svg';
import { Input, Button, Link, Notification } from "common/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSignIn, ISignIn } from "./validation";
import { Spinner } from "common/components/Spinner/Spinner";


type Props = {};

export const SignIn: FC<Props> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {user,error, loading} = useAppSelector((state:RootState) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
    mode: "onSubmit",
    resolver: yupResolver(schemaSignIn),
  });

  useEffect(() => {
    if(user.token){
     localStorage.setItem('user',JSON.stringify(user))
     navigate('/cardTeams')
    }
  },[user.token])

  const onSubmit = (data: ISignIn) => dispatch(fetchUser(data))
  

  return (
    <>
      {
        !loading ? 
        <SignInWrapper>
        {
          error ? <Notification errorText={error}/> : ''
        }
        <SignInContainer>
          <SignInLeftContainer>
            <SignInLeftContent>
              <SignInTitle>Sign In</SignInTitle>
              <SignInForm onSubmit={handleSubmit(onSubmit)}>
                <Input
                  id="ILogin"
                  label="Login"
                  register={register}
                  name="login"
                  errorMessage={errors.login?.message}
                />
                <Input
                  type="password"
                  id="IPassword"
                  label="Password"
                  register={register}
                  name="password"
                  closeEye
                  errorMessage={errors.password?.message}
                />
                <Button type="submit" text="Sign In" margin="0px 0px 24px 0px" width="100%"/>
              </SignInForm>
              <StyledMember>
                <StyledMemberText>Not a member yet?</StyledMemberText>
                <Link to="/signUp" text="Sign up" />
              </StyledMember>
            </SignInLeftContent>
          </SignInLeftContainer>
          <SignInRightContainer></SignInRightContainer>
        </SignInContainer>
      </SignInWrapper>
        : <Spinner/>
      }
    </>
  );
};





export const SignInWrapper = styled.div``;

export const SignInContainer = styled.div`
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${({theme}) => theme.media.laptopM}{
    justify-content: center;
  }
`;

export const SignInLeftContainer = styled.div`
    min-height:100vh;
    margin-left:120px;
    width:40%;
    display:flex;
    flex-direction:column;
    justify-content: center;

    @media ${({theme}) => theme.media.laptopM}{
    margin-left:0;
    width:366px;
  }

  @media ${({theme}) => theme.media.mobileL}{
    width:327px;
  }
`;

export const SignInLeftContent = styled.div`
  width:366px;
  @media ${({theme}) => theme.media.laptopM}{
    width: 100%;
  }
`;

export const SignInRightContainer = styled.div`
  width:60%;
  min-height: 100vh;
  background: url(${Background}),#F5FBFF;
  background-repeat: no-repeat;
  background-position: center center;

  @media ${({theme}) => theme.media.laptopM}{
    display:none;
  }
`

export const SignInForm = styled.form``;

export const SignInTitle = styled.h1`
    font-size:var(--fs-title);
    line-height:var(--lh-title);
    color:var(--blue);
    margin-bottom:32px;

    @media ${({theme}) => theme.media.laptopM}{
    text-align: center;
  }
`;

export const StyledMember = styled.div`
  text-align: center;
`;

export const StyledMemberText = styled.p`
  display:inline;
  font-weight: var(--fw-medium);
  font-size:var(--fs-sm);
  line-height: var(--lh-sm);
  color:var(--grey);
`;
