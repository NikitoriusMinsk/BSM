import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface User {
		id: string;
		name: string;
		nickname: string;
		email: string;
		token: string;
		expiresAt: number;
		refreshToken: string;
		refreshExpiresAt: number;
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
	interface JWT {
		/** OpenID ID Token */
		idToken?: string;
		refreshToken?: string;
		refreshExp?: number;
	}
}
