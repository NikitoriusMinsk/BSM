import type { NextPage } from "next";
import Head from "next/head";
import styles from "@styles/pages/LeagueSummary.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GetServerSideProps } from "next";
import LeagueSummaryPage from "@components/league-summary/LeagueSummaryPage";
import ResultsPage from "@components/league-summary/ResultsPage";
import FixsturesPage from "@components/league-summary/FixsturesPage";
import StandingsPage from "@components/league-summary/StandingsPage";
import StandingsTennisBasketPage from "@components/league-summary/StandingsTennisBasketPage";
import ArchivePage from "@components/league-summary/ArchivePage";
import PagesSlider from "@components/ui/match-summary/PagesSlider";
import { trpc } from "src/utils/trpc";
import Leagues from "@components/ui/league-summary/Leagues";
import LeaguesMobileBlocksLinks from "@components/ui/LeaguesMobileBlocksLinks";
import { LastSportContext } from "src/pages/_app";

const pages = [
	{
		id: 1,
		name: "Summary",
	},
	{
		id: 2,
		name: "Results",
	},
	{
		id: 3,
		name: "Fixstures",
	},
	{
		id: 4,
		name: "Standings",
	},
	{
		id: 5,
		name: "Archive",
	},
];

const LeagueSummary: NextPage<{ type: string }> = ({ type }) => {
	const router = useRouter();
	const sport = useContext(LastSportContext);
	const [selectedPage, setSelectedPage] = useState(0);
	const [selectedPageComponent, setSelectedPageComponent] = useState(
		<LeagueSummaryPage />
	);
	const { data: leagues, isLoading: leaguesLoading } = trpc.filters.getLeagues.useQuery(
		{ page: 0, size: 20, sportId: sport.id }
	);

	useEffect(() => {
		switch (selectedPage) {
			case 0:
				setSelectedPageComponent(<LeagueSummaryPage />);
				break;
			case 1:
				setSelectedPageComponent(<ResultsPage />);
				break;
			case 2:
				setSelectedPageComponent(<FixsturesPage />);
				break;
			case 3:
				if (type == "tennis" || type == "basketball")
					setSelectedPageComponent(<StandingsTennisBasketPage />);
				else setSelectedPageComponent(<StandingsPage />);
				break;
			case 4:
				setSelectedPageComponent(<ArchivePage />);
				break;
		}
	}, [selectedPage]);

	if (!leagues) return <></>;

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
				<div className={styles.leaguePreview}>
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
					<div className={styles.leagueInfo}>
						<div className={styles.leagueHeader}>
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
						</div>
						<div className={styles.leagueData}>
							<div className={styles.leagueLogo}>
								<Image
									src="/images/league-placeholder.png"
									width={100}
									height={100}
									alt=""
								/>
							</div>
							<div className={styles.leagueFields}>
								<div className={styles.leagueTitle}>
									<span className={styles.leagueTitleName}>
										Premier League
									</span>
									<span className={styles.leagueTitleDate}>
										2022/2023
									</span>
								</div>
								<div className={styles.countryName}>
									<div className={styles.countryFlag}>
										<Image
											src="/icons/flags/en.svg"
											width={24}
											height={24}
											alt=""
										/>
									</div>
									<span className={styles.countryNameField}>
										United Kingdom
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.matchStatPages}>
					<PagesSlider>
						{pages.map((page, index) => (
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
				<Leagues
					h3="Top Leagues"
					items={leagues.content}
					showCount={false}
				/>
			</div>
			<div className={styles.leaguesMobile}>
				<span className={styles.leaguesMobileTitle}>Top Leagues</span>
				<LeaguesMobileBlocksLinks items={leagues.content} />
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			type: context.params?.id || "default",
		},
	};
};

export default LeagueSummary;
