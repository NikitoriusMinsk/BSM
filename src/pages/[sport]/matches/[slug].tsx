import type {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage,
} from "next";
import Head from "next/head";
import styles from "@styles/pages/MatchSummary.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MatchSummaryPage from "@components/match-summary/MatchSummaryPage";
import MatchTennisBasketPage from "@components/match-summary/MatchTennisBasketPage";
import OddsPage from "@components/match-summary/OddsPage";
import H2HPage from "@components/match-summary/H2HPage";
import StandingsPage from "@components/match-summary/StandingsPage";
import PredictionsPage from "@components/match-summary/PredictionsPage";
import BookmakersPage from "@components/match-summary/BookmakersPage";
import NewsPage from "@components/match-summary/NewsPage";
import PagesSlider from "@components/ui/match-summary/PagesSlider";
import LiveMatchesExpanded from "@components/ui/LiveMatchesExpanded";
import { trpc } from "src/utils/trpc";
import superjson from "superjson";
import { matchSchema } from "src/server/trpc/utils/DTOSchemas";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { AppRouter, appRouter } from "@/server/trpc/root";

import { inferRouterOutputs } from "@trpc/server";

const pages = [
	{
		id: 1,
		name: "Match",
	},
	{
		id: 2,
		name: "Odds",
	},
	{
		id: 3,
		name: "H2H",
	},
	{
		id: 4,
		name: "Standings",
	},
	{
		id: 5,
		name: "Predictions",
	},
	{
		id: 6,
		name: "News",
	},
	{
		id: 7,
		name: "Bookmakers",
	},
];

const MatchSummary: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
	props
) => {
	const { match, type } = props;
	const router = useRouter();
	const [selectedPage, setSelectedPage] = useState(0);
	const [selectedPageComponent, setSelectedPageComponent] = useState(
		<MatchSummaryPage />
	);

	const { data: liveMatches, isLoading: liveMatchesLoading } =
		trpc.matches.getAllLive.useQuery();

	useEffect(() => {
		switch (selectedPage) {
			case 0:
				if (type == "tennis" || type == "basketball")
					setSelectedPageComponent(<MatchTennisBasketPage type={type} />);
				else setSelectedPageComponent(<MatchSummaryPage />);
				break;
			case 1:
				setSelectedPageComponent(<OddsPage />);
				break;
			case 2:
				setSelectedPageComponent(<H2HPage />);
				break;
			case 3:
				setSelectedPageComponent(<StandingsPage />);
				break;
			case 4:
				setSelectedPageComponent(<PredictionsPage />);
				break;
			case 5:
				setSelectedPageComponent(<NewsPage />);
				break;
			case 6:
				setSelectedPageComponent(<BookmakersPage />);
				break;
		}
	}, [selectedPage]);

	if (liveMatchesLoading) {
		return <div>Loading...</div>;
	}

	if (!liveMatches) {
		return <div>Error</div>;
	}

	return (
		<>
			<Head>
				<title>Optimo Match Summary</title>
				<meta
					name="description"
					content="Optimo betting social media. Match summary"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<main className={styles.main}>
				<div className={styles.matchPreview}>
					<Image
						//test img link
						src={
							type == "tennis"
								? "/testimg/tennis.jpg"
								: type == "basketball"
								? "/testimg/basketball.jpg"
								: "/testimg/football.jpg"
						}
						fill
						style={{ objectFit: "cover" }}
						alt=""
					/>
					<div className={styles.matchInfo}>
						<div className={styles.matchHeader}>
							<div
								className={styles.buttonBack}
								onClick={() => router.back()}
							>
								<Image
									src="/icons/arrow-narrow-left.svg"
									width={24}
									height={24}
									alt=""
								/>
							</div>
							<div className={styles.championship}>
								<span className={styles.country}>Country</span>
								<span className={styles.tournament}>Tournament - 1</span>
							</div>
						</div>
						<div className={styles.matchData}>
							<div className={styles.club}>
								<div className={styles.clubLogo}>
									<Image
										src="/testimg/club1.png"
										width={60}
										height={60}
										style={{
											objectFit: "contain",
											objectPosition: "center center",
										}}
										alt=""
									/>
								</div>
								<span>Club 1</span>
							</div>
							<div className={styles.result}>
								<span className={styles.score}>1 : 2</span>
								<div className={styles.currentTime}>
									<span>1ST HALF</span>
									<span>42:44</span>
								</div>
							</div>
							<div className={styles.club}>
								<div className={styles.clubLogo}>
									<Image
										src="/testimg/club2.png"
										width={60}
										height={60}
										style={{
											objectFit: "contain",
											objectPosition: "center center",
										}}
										alt=""
									/>
								</div>
								<span>Club 2</span>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.matchStatPages}>
					<PagesSlider>
						{type == "tennis" || type == "basketball" ? (
							<>
								{pages.slice(0, 3).map((page, index) => (
									<span
										className={`${styles.page} ${
											index == selectedPage && styles.pageActive
										}`}
										onClick={() => setSelectedPage(index)}
										key={page?.id}
										aria-label={page?.name}
									>
										{page?.name}
										{index == selectedPage && (
											<motion.div
												className={styles.pageUnderline}
												layoutId="pageUnderline"
											/>
										)}
									</span>
								))}
								<span
									className={`${styles.page} ${
										4 == selectedPage && styles.pageActive
									}`}
									onClick={() => setSelectedPage(4)}
									aria-label={"Predictions"}
								>
									Predictions
									{4 == selectedPage && (
										<motion.div
											className={styles.pageUnderline}
											layoutId="pageUnderline"
										/>
									)}
								</span>
							</>
						) : (
							pages.map((page, index) => (
								<span
									className={`${styles.page} ${
										index == selectedPage && styles.pageActive
									}`}
									onClick={() => setSelectedPage(index)}
									key={page?.id}
									aria-label={page?.name}
								>
									{page?.name}
									{index == selectedPage && (
										<motion.div
											className={styles.pageUnderline}
											layoutId="pageUnderline"
										/>
									)}
								</span>
							))
						)}
					</PagesSlider>
					<AnimatePresence exitBeforeEnter>
						<motion.div
							key={selectedPage ? selectedPage : "empty"}
							initial={{ y: 10, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -10, opacity: 0 }}
							transition={{ duration: 0.2, ease: "easeInOut" }}
						>
							{selectedPageComponent}
						</motion.div>
					</AnimatePresence>
				</div>
			</main>
			<div className={styles.sideBar}>
				<LiveMatchesExpanded matches={liveMatches} />
			</div>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async (context) => {
	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: { session: null },
		transformer: superjson,
	});

	const data = await ssg.pageGeneration.getSportWithMatches.fetch();

	return {
		fallback: "blocking",
		paths: data
			.map((sport) => {
				return sport.matches.map((match) => {
					return {
						params: {
							sport: sport.name,
							slug: match,
						},
					};
				});
			})
			.flat(),
	};
};

export const getStaticProps: GetStaticProps<{
	type: string;
	match: inferRouterOutputs<AppRouter>["pageGeneration"]["getMatchBySlug"];
}> = async (context) => {
	const { params } = context;

	const { slug, sport } = params as { sport: string; slug: string };

	const ssg = createServerSideHelpers({
		router: appRouter,
		ctx: { session: null },
		transformer: superjson,
	});

	const data = await ssg.pageGeneration.getMatchBySlug.fetch({
		slug,
	});

	return {
		props: {
			type: sport || "default",
			match: data,
		},
	};
};

export default MatchSummary;
