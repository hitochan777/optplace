import React from "react";
import { NextPage } from "next";

import Layout from "../components/Layout";

const Error: NextPage = () => {
  return (
    <Layout>
      <p>エラーが発生しました。ログアウト後、再度ログインしてください。</p>
    </Layout>
  );
};

export default Error;
