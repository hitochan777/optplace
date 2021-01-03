import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import { userInfo } from "os";

const options: InitOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, _user, account) {
      if (account) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, user) {
	  session.accessToken = (user as any).accessToken;
      return session;
	},
  },
};

export default (req, res) => NextAuth(req, res, options);
