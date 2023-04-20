import Banner from "@components/ui/Banner";
import type { GetStaticProps, NextPage } from "next";
import styles from "@styles/pages/Home.module.css";
import Slider from "@components/ui/Slider";
import Image from "next/image";
import { useSession } from "next-auth/react";
import BestBookmakers from "@components/ui/BestBookmakers";
import LiveMatches from "@components/ui/LiveMatches";
import Filter from "@components/ui/Filter";
import Predictions from "@components/ui/Predictions";
import { MostTips, Tipsters } from "src/types/queryTypes";
import MatchTipsCard from "@components/ui/MatchTipsCard";
import Matches from "@components/ui/Matches";
import Link from "next/link";
import { appRouter } from "src/server/trpc/router/_app";
import { createContext } from "src/server/trpc/context";
import superjson from "superjson";
import useWindowSize from "src/utils/useWindowSize";
import ArrayToChunks from "src/utils/ArrayToChunks";
import { trpc } from "src/utils/trpc";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import DisaperingContainer from "@components/helpers/DisaperingContainer";

const Home: NextPage = () => {
	const { data: session } = useSession();
	const { data: bookmakers, isLoading: bookmakersLoading } =
		trpc.bookmakers.getTop.useQuery();
	const { data: filters, isLoading: filtersLoading } =
		trpc.filters.getLeagues.useQuery();
	const { data: predictions, isLoading: predictionsLoading } =
		trpc.predictions.getAll.useQuery();
	const { data: liveMatches, isLoading: liveMatchesLoading } =
		trpc.matches.getAllLive.useQuery();
	const { data: matches, isLoading: matchesLoading } =
		trpc.matches.getAllByLeague.useQuery();
	const { data: tips, isLoading: tipsLoading } = trpc.tips.getAll.useQuery();
	const { data: tipsters, isLoading: tipstersLoading } =
		trpc.tipsters.getAll.useQuery();
	const { width } = useWindowSize();

	if (
		bookmakersLoading ||
		filtersLoading ||
		predictionsLoading ||
		liveMatchesLoading ||
		tipsLoading ||
		tipstersLoading ||
		matchesLoading
	) {
		return <div>Loading...</div>;
	}

	if (
		!bookmakers ||
		!filters ||
		!predictions ||
		!liveMatches ||
		!tips ||
		!tipsters ||
		!matches
	) {
		return <div>Error</div>;
	}

	return (
		<>
			<div id={`${styles.slider}`}>
				<Slider
					autoPlay={true}
					loop={true}
				>
					{[1, 2, 3, 4, 5].map((i) => (
						<Slide key={`slide_${i}`} />
					))}
				</Slider>
			</div>
			<div
				id={styles.mostTips}
				className={styles.sideMargin}
			>
				<MostTips tips={tips} />
			</div>
			<div
				id={styles.wideBanner}
				className={styles.sideMargin}
			>
				<Banner
					height={width > 425 ? 200 : 420}
					image="/images/banner-placeholder-1.png"
				/>
			</div>
			<div
				id={styles.matchesFilters}
				className={styles.sideMargin}
			>
				<Filter
					h3="Top Leagues"
					h2="Football Leagues"
					items={filters}
					onChange={(id) => {}}
				/>
				<Filter
					h3="Leagues"
					items={filters}
					onChange={(id) => {}}
				/>
			</div>
			<div id={styles.matches}>
				<Matches
					leagues={matches}
					h2={"Top Matches"}
					h3={"Today"}
				/>
				<Predictions
					leagues={predictions}
					h2="Best Predictions"
					h3="Today"
				/>
			</div>
			<DisaperingContainer
				className={styles.sideColumn}
				condition={true}
			>
				<>
					{!session && (
						<div id={styles.signUp}>
							<SignUpPropose />
						</div>
					)}
					<div id={styles.topTipsters}>
						<TopTipsters tipsters={tipsters} />
					</div>
					<div id={styles.liveMatches}>
						<LiveMatches matches={liveMatches} />
					</div>
					<div id={styles.tallBanner}>
						<Banner
							height={width >= 1024 ? 900 : width >= 768 ? 463 : 250}
							image="/images/banner-placeholder-2.png"
						/>
					</div>
					<div id={styles.bookmakers}>
						<BestBookmakers bookmakers={bookmakers} />
					</div>
				</>
			</DisaperingContainer>
		</>
	);
};

const Slide: React.FC = () => {
	return (
		<div className={styles.slide}>
			<div className={styles.slideBackground}>
				<Image
					src="/images/slide-background-placeholder.png"
					alt="slide-background"
					fill
					style={{
						objectFit: "cover",
					}}
				/>
			</div>
			<div className={styles.slideTimer}>
				<div className={styles.timerElement}>
					<span className={styles.timerElementValue}>13 </span>
					<span className={styles.timerElementLabel}>day</span>
				</div>
				:
				<div className={styles.timerElement}>
					<span className={styles.timerElementValue}>13</span>
					<span className={styles.timerElementLabel}>hr</span>
				</div>
				:
				<div className={styles.timerElement}>
					<span className={styles.timerElementValue}>13</span>
					<span className={styles.timerElementLabel}>min</span>
				</div>
				:
				<div className={styles.timerElement}>
					<span className={styles.timerElementValue}>13</span>
					<span className={styles.timerElementLabel}>sec</span>
				</div>
			</div>
			<div className={styles.slideSummary}>
				<div className={styles.slideSummaryTitle}>
					<span className={styles.slideSummaryTitleCountry}>Germany</span>
					<span className={styles.slideSummaryTitleLeague}>Bunes League</span>
				</div>
				<div className={styles.slideSummaryTeams}>
					<div className={styles.slideSummaryTeam}>
						<span className={styles.slideSummaryTeamName}>
							Eintracht Frankfurt
						</span>
						<div className={styles.slideSummaryTeamImage}>
							<Image
								src="/images/team-1-placeholder.svg"
								alt="Eintracht Frankfurt"
								width={36}
								height={36}
							/>
						</div>
					</div>
					VS
					<div className={styles.slideSummaryTeam}>
						<div className={styles.slideSummaryTeamImage}>
							<Image
								src="/images/team-2-placeholder.svg"
								alt="Bayern Munich"
								width={36}
								height={36}
							/>
						</div>
						<span className={styles.slideSummaryTeamName}>Bayern Munich</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const SignUpPropose: React.FC = () => {
	return (
		<div className={styles.signUpPropose}>
			<h2>Join with us!</h2>
			<span>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry.
				Lorem Ipsum has been the industry's standard dummy text ever since the
				1500s, when an unknown printer took a galley of type and scrambled it to
				make a type specimen book.
			</span>
			<Link
				href="/sign-up"
				legacyBehavior
			>
				<button>Sign Up</button>
			</Link>
		</div>
	);
};

const TopTipsters: React.FC<{ tipsters: Tipsters }> = (props) => {
	const { tipsters } = props;

	return (
		<div className={styles.topTipsters}>
			<h2 className={styles.topTipstersTitle}>Top Tipsters</h2>
			<div className={styles.topTipstersList}>
				<div className={styles.topThreeTipsters}>
					{tipsters.slice(0, 3).map((tipster, index) => (
						<div
							className={styles.topTipster}
							key={`tipster_${index}`}
						>
							<div className={styles.topTipsterImage}>
								<Image
									src={tipster.image}
									alt={tipster.name}
									width={65}
									height={65}
								/>
							</div>
							<div className={styles.topTipsterInfo}>
								<span className={styles.topTipsterName}>
									{tipster.name}
								</span>
								<div className={styles.topTipsterWinrate}>
									<span className={styles.winrateLabel}>Winrate</span>
									<span className={styles.winratePercent}>
										{tipster.winrate * 100}%
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className={styles.topTipstersOther}>
					{tipsters.slice(3, 8).map((tipster, index) => (
						<div
							className={styles.topOther}
							key={`tipster_${index + 4}`}
						>
							<div className={styles.otherContent}>
								<div className={styles.otherIndex}> {index + 4} </div>
								<div className={styles.otherInfo}>
									<div className={styles.topOtherImage}>
										<Image
											src={tipster.image}
											alt={tipster.name}
											width={30}
											height={30}
										/>
									</div>
									<span className={styles.topTipsterName}>
										{" "}
										{tipster.name}{" "}
									</span>
								</div>
							</div>
							<div className={styles.topOtherWinrate}>
								Winrate {tipster.winrate * 100}%
							</div>
						</div>
					))}
				</div>
				<a className={styles.topTipstersMore}>See All</a>
			</div>
		</div>
	);
};

const MostTips: React.FC<{ tips: MostTips }> = (props) => {
	const { tips } = props;
	const { width } = useWindowSize();

	return (
		<div className={styles.mostTips}>
			<h2>Most Tips</h2>
			<Slider
				swipable={true}
				showPagination={false}
				autoPlay={true}
				loop={true}
			>
				{ArrayToChunks(tips, width <= 425 ? 1 : width <= 768 ? 2 : 3).map(
					(chunk, index) => (
						<div
							className={styles.mostTipsList}
							key={index}
						>
							{chunk.map((tip, index) => (
								<MatchTipsCard
									{...tip}
									key={`tip_${index}`}
								/>
							))}
						</div>
					)
				)}
			</Slider>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = createProxySSGHelpers({
		router: appRouter,
		ctx: await createContext(),
		transformer: superjson,
	});

	await ssg.bookmakers.getTop.prefetch();
	await ssg.filters.getLeagues.prefetch();
	await ssg.predictions.getAll.prefetch();
	await ssg.matches.getAllLive.prefetch();
	await ssg.matches.getAllByLeague.prefetch();
	await ssg.tips.getAll.prefetch();
	await ssg.tipsters.getAll.prefetch();

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 60,
	};
};

export default Home;
