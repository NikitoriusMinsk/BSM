import type { GetStaticProps, NextPage } from "next";
import styles from "@styles/pages/Live-Matches.module.css";
import React from "react";
import { trpc } from "src/utils/trpc";
import Filter from "@components/ui/Filter";
import Matches from "@components/ui/Matches";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "src/server/trpc/router/_app";
import { createContext } from "src/server/trpc/context";
import superjson from "superjson";

const LiveMatches: NextPage = () => {
	const { data: filters, isLoading: filtersLoading } =
		trpc.filters.getLeagues.useQuery();
	const { data: matches, isLoading: matchesLoading } =
		trpc.matches.getAllByLeague.useQuery();

	if (filtersLoading || matchesLoading) {
		return <div>Loading...</div>;
	}

	if (!filters || !matches) {
		return <div>Error</div>;
	}

	return (
		<>
			<div className={styles.sideColumn}>
				<Filter
					h3="Top Leagues"
					h2="Football Leagues"
					items={filters}
					onChange={() => {}}
				/>
			</div>
			<div className={styles.mainColumn}>
				<Matches
					leagues={matches}
					withLiveMatchesButton={false}
					withDatePicker={false}
				/>
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = createProxySSGHelpers({
		router: appRouter,
		ctx: await createContext(),
		transformer: superjson,
	});

	await ssg.filters.getLeagues.prefetch();
	await ssg.matches.getAllByLeague.prefetch();

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 60,
	};
};

export default LiveMatches;
