import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import styles from "@styles/pages/Live-Matches.module.css";
import React, { useContext } from "react";
import { trpc } from "src/utils/trpc";
import Filter from "@components/ui/Filter";
import Leagues from "@components/ui/Leagues";
import superjson from "superjson";
import TextField from "@components/ui/TextField";
import FilterModal from "@components/ui/FilterModal";
import { PortalContext } from "src/utils/portalContext";
import dynamic from "next/dynamic";
import usePortal from "src/utils/usePortal";
import LeaguesMobileBlocksFilter from "@components/ui/LeaguesMobileBlocksFilter";
import { LastSportContext } from "src/pages/_app";
import { createServerSideHelpers } from "@trpc/react-query/server";

import { appRouter } from "@/server/trpc/root";
import moment from "moment-timezone";

const OutPortal = dynamic(async () => (await import("react-reverse-portal")).OutPortal, {
	ssr: false,
});
const LiveMatches: NextPage = () => {
	const sport = useContext(LastSportContext);
	const { data: filters, isLoading: filtersLoading } = trpc.filters.getLeagues.useQuery(
		{
			page: 0,
			size: 20,
			sportId: sport.id,
		}
	);
	const { data: matches, isLoading: matchesLoading } =
		trpc.matches.getAllByLeague.useQuery({
			leagueId: [],
			page: 1,
			size: 20,
			sportId: sport.id,
			date: moment(new Date()).format("YYYY-MM-DD"),
		});
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
						items={filters.content}
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
					<div className={styles.leaguesMobile}>
						<LeaguesMobileBlocksFilter
							items={filters.content}
							onChange={() => {}}
						/>
					</div>
					<Leagues
						leagues={matches.content}
						withLiveMatchesButton={false}
						withDatePicker={false}
					/>
				</div>
			</PortalContext.Provider>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: { session: null },
		transformer: superjson,
	});

	const sports = await ssg.navigation.getSports.fetch();

	return {
		fallback: "blocking",
		paths: sports.map((sport) => {
			return {
				params: {
					sport: sport.name,
				},
			};
		}),
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: { session: null },
		transformer: superjson,
	});

	await ssg.filters.getLeagues.prefetch({ page: 0, size: 20, sportId: 1 });
	await ssg.matches.getAllByLeague.prefetch({
		leagueId: [],
		page: 1,
		size: 5,
		sportId: 1,
		date: moment(new Date()).format("YYYY-MM-DD"),
	});

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 60,
	};
};

export default LiveMatches;
