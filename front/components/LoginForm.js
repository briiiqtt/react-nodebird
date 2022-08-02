import { useState, useCallback, useMemo } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";

const ButtonWrapper = styled.div`
  margin-top: 100px;
`;

const LoginForm = (/*{ setIsLoggedIn }*/) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { logInLoading } = useSelector((state) => state.user);

  const formStyle = useMemo(() => {
    return { padding: "10px" };
  }, []);

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    // setIsLoggedIn(true);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <Form onFinish={onSubmitForm}>
      <div style={formStyle}>
        <div>
          <label htmlFor="user-id">이메일</label>
          <br />
          <Input
            name="user-id"
            value={email}
            onChange={onChangeEmail}
            type="email"
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <ButtonWrapper>
          <div>
            <Button type="primary" htmlType="submit" loading={logInLoading}>
              로그인
            </Button>
            <Link href="/signup">
              <a>
                <Button>회원가입</Button>
              </a>
            </Link>
          </div>
        </ButtonWrapper>
      </div>
    </Form>
  );
};

export default LoginForm;
