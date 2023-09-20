import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env.mjs";
import superjson from "superjson";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "@/server/trpc/root";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
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

				const ssg = createServerSideHelpers({
					router: appRouter,
					ctx: { session: null },
					transformer: superjson,
				});

				try {
					const data = await ssg.auth.authUser.fetch({
						password: credentials.password,
						username: credentials.email,
					});

					return {
						id: data.userId,
						userId: data.userId,
						partyId: data.partyId,
						name: `${data.fistName} ${data.lastName}`,
						email: data.email,
						nickname: data.nickname,
						image: data.avatarLink,
						tokens: {
							accessToken: data.accessToken,
							accessTokenExpires:
								new Date().getTime() + parseInt(data.expiresIn) * 1000,
							refreshToken: data.refreshToken,
							refreshTokenExpires:
								new Date().getTime() +
								parseInt(data.refreshExpiresIn) * 1000,
						},
					};
				} catch (err) {
					return null;
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user, trigger, session }) => {
			if (user && (trigger === "signIn" || trigger === "signUp")) {
				return {
					accessToken: user.tokens.accessToken,
					accessTokenExpires: user.tokens.accessTokenExpires,
					refreshToken: user.tokens.refreshToken,
					refreshTokenExpires: user.tokens.refreshTokenExpires,
					user: {
						email: user.email,
						userId: user.userId,
						partyId: user.partyId,
						name: user.name,
						nickname: user.nickname,
						image: user.image,
					},
				};
			}

			if (trigger === "update") {
				return {
					...token,
					user: { ...token.user, ...session },
				};
			}

			return token;
		},
		session: async ({ session, token, trigger }) => {
			if ((token && session.user) || trigger === "update") {
				session.user = {
					tokens: {
						accessToken: token.accessToken,
						accessTokenExpires: token.accessTokenExpires,
						refreshToken: token.refreshToken,
						refreshTokenExpires: token.refreshTokenExpires,
					},
					id: token.user.userId,
					email: token.user.email,
					userId: token.user.userId,
					partyId: token.user.partyId,
					name: token.user.name,
					nickname: token.user.nickname,
					image: token.user.image,
				};
			}
			return session;
		},
	},
	debug: process.env.NODE_ENV === "development",
	secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
