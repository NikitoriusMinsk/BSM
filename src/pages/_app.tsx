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
import { trpc } from "src/utils/trpc";

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

export default trpc.withTRPC(MyApp);
