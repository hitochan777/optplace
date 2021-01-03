import React from "react";
import { signIn } from "next-auth/client";

interface Props {
  providers: any;
}

const SignInForm: React.FC<Props> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name} className="flex justify-center">
          <button onClick={() => signIn(provider.id)}>
            {provider.name}でログイン
          </button>
        </div>
      ))}
    </>
  );
};

export default SignInForm;
