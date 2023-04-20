import type { GetStaticProps, NextPage } from "next";
import styles from "@styles/pages/Live-Matches.module.css";
import React from "react";
import { trpc } from "src/utils/trpc";
import Filter from "@components/ui/Filter";
import Leagues from "@components/ui/Leagues";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "src/server/trpc/router/_app";
import { createContext } from "src/server/trpc/context";
import superjson from "superjson";
import TextField from "@components/ui/TextField";
import FilterModal from "@components/ui/FilterModal";
import { PortalContext } from "src/utils/portalContext";
import dynamic from "next/dynamic";
import usePortal from "src/utils/usePortal";

const OutPortal = dynamic(async () => (await import("react-reverse-portal")).OutPortal, {
	ssr: false,
});
const LiveMatches: NextPage = () => {
	const { data: filters, isLoading: filtersLoading } =
		trpc.filters.getLeagues.useQuery();
	const { data: matches, isLoading: matchesLoading } =
		trpc.matches.getAllByLeague.useQuery();
	const portalNode = usePortal();

	if (filtersLoading || matchesLoading) {
		return <div>Loading...</div>;
	}

	if (!filters || !matches) {
		return <div>Error</div>;
	}

	return (
		<>
			<PortalContext.Provider value={{ portalNode }}>
				{portalNode && <OutPortal node={portalNode} />}
				<div className={styles.sideColumn}>
					<Filter
						h3="Top Leagues"
						h2="Football Leagues"
						items={filters}
						onChange={() => {}}
					/>
				</div>
				<div className={styles.mainColumn}>
					<div className={styles.mobileFilters}>
						<TextField
							icon="/icons/search.svg"
							placeholder="Search"
						/>
						<FilterModal
							onApply={() => {}}
							portalNode={portalNode}
							filters={[
								{
									key: "sortBy",
									type: "buttons",
									label: "Sort By",
									items: [
										{ id: 1, label: "Upcoming" },
										{ id: 2, label: "Most" },
										{ id: 3, label: "Multiple" },
									],
								},
								{
									key: "type",
									type: "buttons",
									label: "Type",
									items: [
										{
											id: 1,
											label: "All",
										},
										{
											id: 2,
											label: "Free",
										},
										{
											id: 3,
											label: "Paid",
										},
									],
								},
								{
									key: "sport",
									type: "singleChoice",
									label: "Status",
									items: [
										{ id: 1, label: "Football" },
										{ id: 2, label: "Basketball" },
										{ id: 3, label: "Badminton" },
									],
								},
								{
									key: "country",
									type: "singleChoice",
									label: "Country",
									items: [
										{ id: 1, label: "Georgia" },
										{ id: 2, label: "Spain" },
										{ id: 3, label: "England" },
									],
								},
								{
									key: "league",
									type: "singleChoice",
									label: "League",
									items: [
										{ id: 1, label: "Premier League" },
										{ id: 2, label: "Ligue 1" },
										{ id: 3, label: "Bundesliga" },
									],
								},
								{
									key: "date",
									type: "date",
									label: "Date",
								},
							]}
						/>
					</div>
					<Leagues
						leagues={matches}
						withLiveMatchesButton={false}
						withDatePicker={false}
					/>
				</div>
			</PortalContext.Provider>
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
