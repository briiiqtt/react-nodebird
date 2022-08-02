const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User" /* User (모델이름) -> users(소문자, 단수형) */,
    {
      //id : id는 기본적으로 들어있다.
      email: {},
      nickname: {},
      password: {},
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {};
  return User;
};
