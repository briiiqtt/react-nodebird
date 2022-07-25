import Head from "next/head";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const followerList = [
    { nickname: "ㅎㅇ" },
    { nickname: "ㅎㅇㅎㅇ" },
    { nickname: "ㅎㅇㅎㅇㅎㅇ" },
  ];
  const followingList = [
    { nickname: "ㅂㅇ" },
    { nickname: "ㅂㅇㅂㅇ" },
    { nickname: "ㅂㅇㅂㅇㅂㅇ" },
  ];

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};
export default Profile;
