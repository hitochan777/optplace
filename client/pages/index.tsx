import Layout from "../components/Layout";

import { GetServerSideProps, NextPage } from "next";
import { getSession, providers, useSession } from "next-auth/client";
import SearchWidget from "../components/SearchWidget";
import SignInForm from "../components/SignInForm";

interface Props {
  providers: any;
}

const Home: NextPage<Props> = ({ providers }) => {
  const [session] = useSession();

  return (
    <Layout>
      <div className="well">
        出発地から複数の目的地への費用、距離を出して比較することができます。
        {!session && (
          <>
            <br />
            使用するにはGoogleアカウントでログインしてください。
          </>
        )}
      </div>
      {session && <SearchWidget />}
      {!session && <SignInForm providers={providers} />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return { props: { session, providers: await providers() } };
};

export default Home;
