import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../settingMode/Button';

/**
 * 템블릿 적용
 */

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

import styles from "./loginPageUi.js";
import image from "./bg7.jpg";
import GridContainer from "../grid/GridContainer.js";
import GridItem from "../grid/GridItem.js";
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";
import CardFooter from "../Card/CardFooter.js";
import CustomInput from "../CustomInput/CustomInput.js";


/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  login: '로그인',
  register: '회원가입'
};

/*
 * 에러를 보여줍니다
 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.675rem;
  margin-top: 1rem;
`;


const useStyles = makeStyles(styles);

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const text = textMap[type];
  const classes = useStyles();
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >

        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                {/* <form className={classes.form}> */}
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Sign In</h4>
                  </CardHeader>
                  <p className={classes.divider}>Just Be haveit</p>

                  <form onSubmit={onSubmit}>
                    <CardBody>
                      <CustomInput
                        labelText="ID"
                        value={form.userName}
                        id="userName"
                        onChange={onChange}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        value={form.password}
                        id="password"
                        onChange={onChange}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                      {type === 'register' && (
                        <>
                          <CustomInput
                            labelText="new-Password"
                            id="passwordConfirm"
                            type="password"
                            value = {form.passwordConfirm}
                            onChange={onChange}
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                          <CustomInput
                            labelText="eamil"
                            id="email"
                            onChange={onChange}
                            value={form.email}
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                          <CustomInput
                            labelText="nickName"
                            id="nickName"
                            onChange={onChange}
                            value={form.nickName}
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </>
                      )}
                      {error && <ErrorMessage>{error}</ErrorMessage>}
                      <ButtonWithMarginTop cyan fullWidth style={{ marginTop: '1rem', backgroundColor: '#A43EB8' }}>
                        {text}
                      </ButtonWithMarginTop>
                    </CardBody>
                    {console.log("zzz"+form)};
                  </form>
                    

                  <CardFooter className={classes.cardFooter}>
                    {type === 'login' ? (
                      <Link to="/register" style={{ color: 'black' }}>
                        Go to Sing up
                    </Link>
                    )
                      : (
                        <Link to="/" style={{ color: 'black' }}>
                          Go to Sing in
                      </Link>
                      )}
                  </CardFooter>
                {/* </form> */}
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
};

export default AuthForm;