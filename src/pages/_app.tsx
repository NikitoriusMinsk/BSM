import { SessionProvider } from "next-auth/react";
import "@styles/date-picker-reset.css";
import "@styles/globals.css";
import MainLayout from "../components/layout/MainLayout";
import { ReactElement, createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import useWindowSize from "src/utils/useWindowSize";
import MobileLayout from "@components/layout/MobileLayout";
import { trpc } from "src/utils/trpc";
import Moment from "react-moment";
import "moment-timezone";

export const LastSportContext = createContext<{ name: string; id: number }>({
	name: "Football",
	id: 1,
});

function MyApp(appProps: AppProps<{ session: Session }>) {
	const {
		Component,
		pageProps: { session, ...pageProps },
	} = appProps;

	const { width } = useWindowSize();
	const router = useRouter();
	const [lastSport, setLastSport] = useState<{ name: string; id: number }>({
		name: "Football",
		id: 1,
	});
	const { data: sports } = trpc.navigation.getSports.useQuery();
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

	useEffect(() => {
		Moment.startPooledTimer(5000);

		router.query.sport &&
			setLastSport(
				sports?.find((sport) => sport.name === router.query.sport) ?? {
					name: "Football",
					id: 1,
				}
			);
	}, [router.query.sport]);

	return (
		<SessionProvider session={session}>
			<LastSportContext.Provider value={lastSport}>
				{getLayout()}
			</LastSportContext.Provider>
		</SessionProvider>
	);
}

export default trpc.withTRPC(MyApp);
