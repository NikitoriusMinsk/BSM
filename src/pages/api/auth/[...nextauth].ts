import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "../../../env/server.mjs";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "src/server/trpc/router/_app";
import { createContext } from "src/server/trpc/context";
import superjson from "superjson";

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: "/sign-in",
		newUser: "/sign-up",
	},
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			credentials: {
				email: { label: "Email", type: "text", placeholder: "E-mail" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				if (!credentials) return null;

				const ssg = createProxySSGHelpers({
					router: appRouter,
					ctx: await createContext(),
					transformer: superjson,
				});

				try {
					const data = await ssg.auth.authUser.fetch({
						password: credentials.password,
						username: credentials.email,
					});

					return {
						id: data.userId,
						name: `${data.fistName} ${data.lastName}`,
						email: data.email,
						nickname: data.nickname,
						token: data.accessToken,
						refreshToken: data.refreshToken,
						expiresAt: new Date().getTime() / 1000 + parseInt(data.expiresIn),
						refreshExpiresAt:
							new Date().getTime() / 1000 + parseInt(data.refreshExpiresIn),
						image: data.avatarLink,
					};
				} catch (err) {
					return null;
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.exp = user.expiresAt;
				token.idToken = user.token;
				token.refreshToken = user.refreshToken;
				token.refreshExp = user.refreshExpiresAt;
			}

			return token;
		},
	},
	debug: process.env.NODE_ENV === "development",
	secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
