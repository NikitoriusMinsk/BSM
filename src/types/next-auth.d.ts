import { DefaultSession } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface User {
		userId: string;
		partyId: number;
		name: string;
		nickname: string;
		email: string;
		tokens: {
			accessToken: string;
			accessTokenExpires: number;
			refreshToken: string;
			refreshTokenExpires: number;
		};
	}

	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session extends DefaultSession {
		user?: User & DefaultSession["user"];
	}
}
declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT extends DefaultJWT {
		/** OpenID ID Token */
		accessToken: string;
		accessTokenExpires: number;
		refreshToken: string;
		refreshTokenExpires: number;
		user: {
			userId: string;
			partyId: number;
			name: string;
			nickname: string;
			email: string;
		} & DefaultSession["user"];
	}
}
