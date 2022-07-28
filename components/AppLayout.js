import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";

import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`
  .ant-row{
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col:first-child {
    padding-left: 0 !imporatant;
  }

  .ant-col:last-child {
    padding-left: 0 !imporatant;
  }
`;

const AppLayout = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const searchInputStyle = useMemo(() => {
    return { verticalAlign: "middle" };
  }, []);

  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item key={1}>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key={2}>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key={3}>
          {/* <Input.Search enterButton style={{ verticalAlign: "middle" }} /> */}
          <SearchInput enterButton style={searchInputStyle} />
        </Menu.Item>
        <Menu.Item key={4}>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        {isLoggedIn ? (
          <UserProfile /*setIsLoggedIn={setIsLoggedIn}*/ />
        ) : (
          <LoginForm /*setIsLoggedIn={setIsLoggedIn}*/ />
        )}
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://github.com/briiiqtt"
            target="_blank"
            rel="noreferrer noopener"
          >
            기더부
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
