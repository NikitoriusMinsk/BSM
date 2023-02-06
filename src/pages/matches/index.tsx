import React, { useState } from "react";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import styles from "@styles/pages/Matches.module.css";
import { trpc } from "src/utils/trpc";
import BestBookmakers from "@components/ui/BestBookmakers";
import Banner from "@components/ui/Banner";
import Filter from "@components/ui/Filter";
import DatePicker from "@components/ui/DatePicker";
import LiveMatches from "@components/ui/LiveMatches";
import Matches from "@components/ui/Matches";
import NestedFilter from "@components/ui/NestedFilter";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "src/server/trpc/router/_app";
import { createContext } from "src/server/trpc/context";
import superjson from "superjson";

const MatchesPage: NextPage = () => {
	const { data: tips, isLoading: tipsLoading } = trpc.tips.getAll.useQuery();
	const { data: matches, isLoading: matchesLoading } =
		trpc.matches.getAllByLeague.useQuery();
	const { data: bookmakers, isLoading: bookmakersLoading } =
		trpc.bookmakers.getTop.useQuery();
	const { data: leagues, isLoading: leaguesLoading } =
		trpc.filters.getLeaguesByCountry.useQuery();
	const { data: sports, isLoading: sportsLoading } =
		trpc.filters.getSports.useQuery();
	const { data: liveMatches, isLoading: liveMatchesLoading } =
		trpc.matches.getAllLive.useQuery();

	if (
		tipsLoading ||
		bookmakersLoading ||
		leaguesLoading ||
		sportsLoading ||
		liveMatchesLoading ||
		matchesLoading
	) {
		return <div>Loading...</div>;
	}

	if (!tips || !liveMatches || !bookmakers || !leagues || !sports || !matches) {
		return <div>Error...</div>;
	}

	return (
		<>
			<div className={styles.sideCol}>
				<div className={styles.filters}>
					<DatePicker onChange={() => {}} />
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
			</div>
			<div className={styles.mainColumn}>
				<div className={styles.banner}>
					<Banner
						height={200}
						image="/images/banner-placeholder-1.png"
					/>
				</div>
				<div className={styles.predictions}>
					<Matches
						leagues={matches}
						withDatePicker={false}
					/>
				</div>
				<div className={styles.sideColumn}>
					<LiveMatches matches={liveMatches} />
					<Banner
						height={463}
						image="/images/banner-placeholder-2.png"
					/>
					<BestBookmakers bookmakers={bookmakers} />
				</div>
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
