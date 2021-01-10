import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { session, getSession, providers } from "next-auth/client";

import SignInForm from "../components/SignInForm";

interface Props {
  providers: any;
}

const Error: NextPage<Props> = ({ providers }) => {
  return (
    <p>
      エラーが発生しました。ログアウト後、再度ログインしてください。
      {!session && <SignInForm providers={providers} />}
    </p>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return { props: { session, providers: await providers() } };
};

export default Error;
