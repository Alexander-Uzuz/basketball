import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "core/redux/store/hooks";
import { fetchUserSignUp } from "../../authThunk";
import { RootState } from "core/redux/store/store";
import styled from "styled-components";
import Background from "assets/images/backgroundSignUp.svg";
import { Input, Button, Link, Checkbox, Notification } from "common/components";
import { IProfile } from "common/interfaces/IProfile";
import { schemaRegistration } from "./validation";
import { Spinner } from "common/components/Spinner/Spinner";

type Props = {};

export const SignUp: FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);
  const { user, error, loading } = useAppSelector(
    (state: RootState) => state.user
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfile>({
    mode: "onSubmit",
    resolver: yupResolver(schemaRegistration),
  });

  useEffect(() => {
    if (user.token) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/cardTeams");
    }
  }, [user.token]);

  const handleChecked = () => setChecked(!checked);

  const onSubmit = (data: IProfile) => {
    const { passwordConfirm, ...rest } = data;
    dispatch(fetchUserSignUp(rest));
  };

  return (
    <>
      {!loading ? (
        <SignUpWrapper>
          {error ? <Notification errorText={error} /> : ""}
          <SignUpContainer>
            <SignUpLeftContainer>
              <SignUpLeftContent>
                <SignUpTitle>Sign Up</SignUpTitle>
                <SignUpForm onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    id="IName"
                    label="Name"
                    register={register}
                    name="username"
                    errorMessage={errors.userName?.message}
                  />
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
                  <Input
                    type="password"
                    id="IPasswordAgain"
                    label="Enter your password again"
                    register={register}
                    name="passwordConfirm"
                    closeEye
                    errorMessage={errors.passwordConfirm?.message}
                  />
                  <SignUpAccept>
                    <Checkbox
                      checked={checked}
                      onChange={handleChecked}
                      text="I accept the agreement"
                    />
                  </SignUpAccept>
                  <Button
                    text="Sign Up"
                    margin="24px 0px 24px 0px"
                    width="100%"
                    disabled={!checked}
                  />
                </SignUpForm>
                <StyledMember>
                  <StyledMemberText>Not a member yet? </StyledMemberText>
                  <Link to="/signIn" text="Sign in" />
                </StyledMember>
              </SignUpLeftContent>
            </SignUpLeftContainer>
            <SignUpRightContainer />
          </SignUpContainer>
        </SignUpWrapper>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export const SignUpWrapper = styled.div``;

export const SignUpContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${({ theme }) => theme.media.laptopM} {
    justify-content: center;
  }
`;

export const SignUpLeftContainer = styled.div`
  min-height: 100vh;
  margin-left: 120px;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${({ theme }) => theme.media.laptopM} {
    margin-left: 0;
    width: 366px;
  }

  @media ${({ theme }) => theme.media.mobileL} {
    width: 327px;
  }
`;

export const SignUpLeftContent = styled.div`
  width: 366px;

  @media ${({ theme }) => theme.media.laptopM} {
    width: 100%;
  }
`;

export const SignUpRightContainer = styled.div`
  width: 60%;
  min-height: 100vh;
  background: url(${Background}), #f5fbff;
  background-repeat: no-repeat;
  background-position: center center;

  @media ${({ theme }) => theme.media.laptopM} {
    display: none;
  }
`;

export const SignUpForm = styled.form``;

export const SignUpTitle = styled.h1`
  font-size: var(--fs-title);
  line-height: var(--lh-title);
  color: var(--blue);
  margin-bottom: 32px;

  @media ${({ theme }) => theme.media.laptopM} {
    text-align: center;
  }
`;

export const StyledMember = styled.div`
  text-align: center;
`;

export const StyledMemberText = styled.p`
  display: inline;
  font-weight: var(--fw-medium);
  font-size: var(--fs-sm);
  line-height: var(--lh-sm);
  color: var(--grey);
`;

export const SignUpAccept = styled.div``;
