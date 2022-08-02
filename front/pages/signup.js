import Head from "next/head";
import { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Checkbox, Button } from "antd";
import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";
import { SIGN_UP_REQUEST } from "../reducers/user";

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput("");

  const [nickname, onChangeNickname] = useInput("");

  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onChanngePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const formStyle = useMemo(() => {
    return { padding: "10px" };
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    dispatch({ type: SIGN_UP_REQUEST, data: { email, password } });
  }, [password, passwordCheck, term]);

  const errorStyle = useMemo(() => {
    return { color: "red" };
  }, []);

  return (
    <>
      <AppLayout>
        <Head>
          <title>회원가입 | NodeBird</title>
        </Head>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
            <Input
              name="user-email"
              value={email}
              required
              onChange={onChangeEmail}
              type="email"
            />
          </div>
          <div>
            <label htmlFor="user-nickname">닉네임</label>
            <br />
            <Input
              name="user-nickname"
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input
              name="user-password"
              value={password}
              required
              type="password"
              onChange={onChangePassword}
            />
            {passwordError && (
              <div style={errorStyle}>비밀번호가 일치하지 않습니다</div>
            )}
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호확인</label>
            <br />
            <Input
              name="user-password-check"
              value={passwordCheck}
              required
              type="password"
              onChange={onChanngePasswordCheck}
            />
            {passwordError && (
              <div style={errorStyle}>비밀번호가 일치하지 않습니다</div>
            )}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              이용약관에 동의합니다
            </Checkbox>
            {termError && <div style={{ errorStyle }}>약관에 동의하세욥</div>}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};
export default Signup;
