import React, { useState } from "react";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import styles from "@styles/pages/Matches.module.css";
import { trpc } from "src/utils/trpc";
import BestBookmakers from "@components/ui/BestBookmakers";
import Banner from "@components/ui/Banner";
import Filter from "@components/ui/Filter";
import DatePicker from "@components/ui/DatePicker";
import LiveMatches from "@components/ui/LiveMatches";
import Matches from "@components/ui/Leagues";
import NestedFilter from "@components/ui/NestedFilter";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "src/server/trpc/router/_app";
import { createContext } from "src/server/trpc/context";
import superjson from "superjson";
import useWindowSize from "src/utils/useWindowSize";
import dynamic from "next/dynamic";
import usePortal from "src/utils/usePortal";
import { PortalContext } from "src/utils/portalContext";
import TextField from "@components/ui/TextField";
import FilterModal from "@components/ui/FilterModal";
import DisaperingContainer from "@components/helpers/DisaperingContainer";
import LeaguesMobileBlocksFilter from "@components/ui/LeaguesMobileBlocksFilter";

const OutPortal = dynamic(async () => (await import("react-reverse-portal")).OutPortal, {
	ssr: false,
});

const MatchesPage: NextPage = () => {
	const { data: tips, isLoading: tipsLoading } = trpc.tips.getAll.useQuery();
	const { data: matches, isLoading: matchesLoading } =
		trpc.matches.getAllByLeague.useQuery();
	const { data: bookmakers, isLoading: bookmakersLoading } =
		trpc.bookmakers.getTop.useQuery();
	const { data: leagues, isLoading: leaguesLoading } =
		trpc.filters.getLeaguesByCountry.useQuery();
	const { data: filters, isLoading: filtersLoading } =
		trpc.filters.getLeagues.useQuery();
	const { data: sports, isLoading: sportsLoading } = trpc.filters.getSports.useQuery();
	const { data: liveMatches, isLoading: liveMatchesLoading } =
		trpc.matches.getAllLive.useQuery();
	const { width } = useWindowSize();
	const portalNode = usePortal();

	if (
		tipsLoading ||
		bookmakersLoading ||
		leaguesLoading ||
		sportsLoading ||
		liveMatchesLoading ||
		matchesLoading ||
		filtersLoading
	) {
		return <div>Loading...</div>;
	}

	if (
		!tips ||
		!liveMatches ||
		!bookmakers ||
		!leagues ||
		!sports ||
		!matches ||
		!filters
	) {
		return <div>Error...</div>;
	}

	return (
		<>
			<PortalContext.Provider value={{ portalNode }}>
				{portalNode && <OutPortal node={portalNode} />}
				<div className={styles.filters}>
					<div>
						<DatePicker onChange={() => {}} />
						<TextField
							icon="/icons/search.svg"
							placeholder="Search"
							shouldShrink={true}
						/>
					</div>
					<NestedFilter
						items={leagues}
						h3="BY COUNTRY"
						h2="Choose Matches"
						onChange={() => {}}
					/>
					<NestedFilter
						items={leagues}
						h3="OTHER COUNTRIES"
						onChange={() => {}}
						withClearButton={false}
						colapsible={true}
					/>
				</div>
				<div className={styles.banner}>
					<Banner
						height={width <= 425 ? 400 : 200}
						image="/images/banner-placeholder-1.png"
					/>
				</div>
				<div className={styles.mobileFilters}>
					<div>
						<TextField
							icon="/icons/search.svg"
							placeholder="Search"
						/>
						<DatePicker onChange={() => {}} />
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
							]}
						/>
						<button className={styles.clear}>Clear</button>
					</div>
					<LeaguesMobileBlocksFilter
						items={filters}
						onChange={() => {}}
					/>
				</div>
				<div className={styles.predictions}>
					<Matches
						leagues={matches}
						withDatePicker={false}
					/>
				</div>
				<DisaperingContainer
					className={styles.sideColumn}
					condition={false}
				>
					<LiveMatches matches={liveMatches} />
					<Banner
						height={463}
						image="/images/banner-placeholder-2.png"
					/>
					<BestBookmakers bookmakers={bookmakers} />
				</DisaperingContainer>
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

	await ssg.tips.getAll.prefetch();
	await ssg.matches.getAllByLeague.prefetch();
	await ssg.bookmakers.getTop.prefetch();
	await ssg.filters.getLeaguesByCountry.prefetch();
	await ssg.filters.getSports.prefetch();
	await ssg.matches.getAllLive.prefetch();

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 60,
	};
};

export default MatchesPage;
