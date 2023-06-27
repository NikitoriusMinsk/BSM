import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KeycloakProvider from "next-auth/providers/keycloak";
import { env } from "../../../env/server.mjs";
import { JWT } from "next-auth/jwt";

const isDev = process.env.NODE_ENV === "development";

const keycloak = KeycloakProvider({
	clientId: env.KEYCLOAK_CLIENT_ID,
	clientSecret: env.KEYCLOAK_CLIENT_SECRET,
	issuer: env.KEYCLOAK_ISSUER,
});

// this performs the final handshake for the keycloak
// provider, the way it's written could also potentially
// perform the action for other providers as well
async function doFinalSignoutHandshake(jwt: JWT) {
	const { provider, id_token } = jwt;

	try {
		// Add the id_token_hint to the query string
		const params = new URLSearchParams();
		params.append("id_token_hint", id_token);
		const { status, statusText } = await fetch(
			`${
				keycloak.options?.issuer
			}/protocol/openid-connect/logout?${params.toString()}`,
			{ method: "get" }
		);

		// The response body should contain a confirmation that the user has been logged out
		isDev && console.log("Completed post-logout handshake", status, statusText);
	} catch (e: any) {
		console.error("Unable to perform post-logout handshake", e);
	}
}

export const authOptions: NextAuthOptions = {
	providers: [keycloak],
	debug: isDev,
	secret: env.NEXTAUTH_SECRET,
	callbacks: {
		jwt: async ({ token, user, account, profile, isNewUser }) => {
			if (account) {
				// copy the expiry from the original keycloak token
				// overrides the settings in NextAuth.session
				token.exp = account.expires_at;
				token.id_token = account.id_token ?? "";
			}

			return token;
		},
	},
	events: {
		signOut: ({ session, token }) => {
			doFinalSignoutHandshake(token);
		},
	},
};

export default NextAuth(authOptions);
