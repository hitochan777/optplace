import React from "react";
import { getSession, providers, signIn } from "next-auth/client";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  providers: any;
}

const SignIn: NextPage<Props> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const returnObj = { props: { providers: await providers() } };
  if (session) {
    returnObj["redirect"] = {
      destination: "/",
      permanent: false,
    };
  }
  return returnObj;
};

export default SignIn;
