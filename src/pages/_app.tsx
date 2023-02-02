// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import "@styles/date-picker-reset.css";
import "@styles/globals.css";
import MainLayout from "../components/layout/MainLayout";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import useWindowSize from "src/utils/useWindowSize";
import MobileLayout from "@components/layout/MobileLayout";

function MyApp(appProps: AppProps<{ session: Session }>) {
	const {
		Component,
		pageProps: { session, ...pageProps },
	} = appProps;

	const { width } = useWindowSize();
	const router = useRouter();
	const noLayoutRoutes = [
		"/sign-in",
		"/sign-up",
		"/forgot-password",
		"/reset-password",
	];

	function getLayout(): ReactElement {
		if (noLayoutRoutes.includes(router.asPath.split("?")[0] ?? "")) {
			return <Component {...pageProps} />;
		}

		if (width <= 768) {
			return (
				<MobileLayout>
					<Component {...pageProps} />
				</MobileLayout>
			);
		}

		return (
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		);
	}

	return <SessionProvider session={session}>{getLayout()}</SessionProvider>;
}

const getBaseUrl = () => {
	if (typeof window !== "undefined") {
		return "";
	}
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
	config({ ctx }) {
		/**
		 * If you want to use SSR, you need to use the server's full URL
		 * @link https://trpc.io/docs/ssr
		 */
		const url = `${getBaseUrl()}/api/trpc`;

		return {
			url,
			transformer: superjson,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: false,
})(MyApp);
