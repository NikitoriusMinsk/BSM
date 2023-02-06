import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: "/sign-in",
	},
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			credentials: {
				email: { label: "Email", type: "text", placeholder: "E-mail" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const user = {
					id: "1",
					name: "John Doe",
					email: "johndoe@john.com",
				};
				if (
					credentials?.email === "qwe@qwe.qwe" &&
					credentials?.password === "qwerty"
				) {
					// handle user auth here
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	debug: process.env.NODE_ENV === "development",
	secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
