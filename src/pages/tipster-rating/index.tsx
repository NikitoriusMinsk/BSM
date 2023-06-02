import React, { useEffect, useState } from "react";
import styles from "@styles/pages/TipsterRating.module.css";
import { trpc } from "src/utils/trpc";
import Image from "next/image";
import Slider from "@components/ui/Slider";
import type { CurrentCompetition, Tipsters } from "src/types/queryTypes";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import { AnimatePresence, motion } from "framer-motion";
import Moment from "react-moment";
import BestBookmakers from "@components/ui/BestBookmakers";
import LiveMatches from "@components/ui/LiveMatches";
import Banner from "@components/ui/Banner";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TipsterModal from "@components/ui/TipsterModal";
import { PortalContext } from "src/utils/portalContext";
import { GetStaticProps, NextPage } from "next";
import TextField from "@components/ui/TextField";
import Dropdown from "@components/ui/Dropdown";
import usePortal from "src/utils/usePortal";
import { createColumnHelper } from "@tanstack/react-table";
import shortenNumber from "src/utils/shortenNumber";
import Table from "@components/ui/Table";
import dynamic from "next/dynamic";
import { HtmlPortalNode } from "react-reverse-portal";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "src/server/trpc/router/_app";
import { createContext } from "src/server/trpc/context";
import superjson from "superjson";
import TipsterInfo from "@components/ui/TipsterInfo";
import useWindowSize from "src/utils/useWindowSize";
import FilterModal from "@components/ui/FilterModal";
import DisaperingContainer from "@components/helpers/DisaperingContainer";

const InPortal = dynamic(async () => (await import("react-reverse-portal")).InPortal, {
	ssr: false,
});
const OutPortal = dynamic(async () => (await import("react-reverse-portal")).OutPortal, {
	ssr: false,
});

const SportItems = [
	{
		name: "Football",
		id: "1",
	},
	{
		name: "Baseball",
		id: "2",
	},
	{
		name: "Basketball",
		id: "3",
	},
	{
		name: "Box",
		id: "4",
	},
];

const TimeItems = [
	{
		name: "1-10 Months",
		id: "1",
	},
	{
		name: "1-5 Months",
		id: "2",
	},
	{
		name: "1-2 Months",
		id: "3",
	},
	{
		name: "1 Month",
		id: "4",
	},
];

const columnHelper = createColumnHelper<inferArrayElementType<Tipsters>>();

const columns = [
	columnHelper.display({
		id: "index",
		header: "#",
		cell: (props) =>
			props.row.index === 0 ? (
				<div>
					<Image
						src="/icons/crown-violet.svg"
						height={24}
						width={24}
						alt=""
					/>
				</div>
			) : (
				props.row.index + 1
			),
		enableSorting: false,
	}),
	columnHelper.accessor((row) => ({ ...row }), {
		id: "user",
		cell: (info) => {
			return <TipsterInfo {...info.getValue()} />;
		},
		header: () => <span>Tipster</span>,
		enableSorting: false,
	}),
	columnHelper.accessor("form", {
		cell: (info) => (
			<div className={styles.dots}>
				{info.getValue().map((value, index) => {
					return value ? (
						<div
							key={`table_dot_${index}_${info.row.index}`}
							className={`${styles.dot} ${styles.win}`}
						/>
					) : (
						<div
							key={`table_dot_${index}_${info.row.index}`}
							className={`${styles.dot} ${styles.lose}`}
						/>
					);
				})}
			</div>
		),
		header: () => <span>Form</span>,
		enableSorting: false,
	}),
	columnHelper.accessor("betCount", {
		cell: (info) => info.getValue(),
		header: () => <span>Bets</span>,
	}),
	columnHelper.accessor("winrate", {
		cell: (info) => info.getValue() * 100 + "%",
		header: () => <span>Hitrates</span>,
	}),
	columnHelper.accessor("roi", {
		cell: (info) =>
			info.getValue() > 0 ? (
				<span className={`${styles.roi} ${styles.positive}`}>
					{info.getValue()}
				</span>
			) : (
				<span className={`${styles.roi} ${styles.negative}`}>
					{info.getValue()}
				</span>
			),
		header: () => <span>ROI</span>,
	}),
];

const mobileColumns = [
	columnHelper.display({
		id: "index",
		header: "#",
		cell: (props) =>
			props.row.index === 0 ? (
				<div>
					<Image
						src="/icons/crown-violet.svg"
						height={24}
						width={24}
						alt=""
					/>
				</div>
			) : (
				props.row.index + 1
			),
		enableSorting: false,
	}),
	columnHelper.accessor((row) => ({ ...row }), {
		id: "user",
		cell: (info) => {
			return <TipsterInfo {...info.getValue()} />;
		},
		header: () => <span>Tipster</span>,
		enableSorting: false,
	}),
	columnHelper.accessor("roi", {
		cell: (info) =>
			info.getValue() > 0 ? (
				<span className={`${styles.roi} ${styles.positive}`}>
					{info.getValue()}
				</span>
			) : (
				<span className={`${styles.roi} ${styles.negative}`}>
					{info.getValue()}
				</span>
			),
		header: () => <span>ROI</span>,
	}),
];

const TipsterRating: NextPage = () => {
	const { data: tipsters, isLoading: tipstersLoading } =
		trpc.tipsters.getAll.useQuery();
	const { data: bookmakers, isLoading: bookmakersLoading } =
		trpc.bookmakers.getTop.useQuery();
	const { data: liveMatches, isLoading: liveMatchesLoading } =
		trpc.matches.getAllLive.useQuery();
	const { data: currentCompetition, isLoading: currentCompetitionLoading } =
		trpc.competitions.getCurrent.useQuery();
	const portalNode = usePortal();
	const { width } = useWindowSize();

	if (
		tipstersLoading ||
		bookmakersLoading ||
		liveMatchesLoading ||
		currentCompetitionLoading
	) {
		return <div>Loading...</div>;
	}

	if (!tipsters || !bookmakers || !liveMatches || !currentCompetition) {
		return <div>Error...</div>;
	}

	return (
		<>
			<PortalContext.Provider value={{ portalNode: portalNode }}>
				{portalNode && <OutPortal node={portalNode} />}
				<div className={styles.mainBlock}>
					<VerifiedTipsters
						tipsters={tipsters}
						portalNode={portalNode}
					/>
				</div>
				{/* <div className={styles.mainColumn}> */}
				<div
					id={styles.tableContainer}
					className={styles.sideMargin}
				>
					<div className={styles.controls}>
						<TextField
							placeholder="Search for tipsters"
							icon="/icons/search.svg"
						/>
						{width > 1024 ? (
							<div className={styles.dropdowns}>
								<Dropdown
									items={SportItems}
									label="Sport:"
									onSelect={() => { }}
									minWidth={200}
								/>
								<Dropdown
									items={TimeItems}
									label="Tipsters by:"
									onSelect={() => { }}
									minWidth={250}
								/>
								<button>Clear</button>
							</div>
						) : (
							<FilterModal
								onApply={() => { }}
								portalNode={portalNode}
								filters={[
									{
										key: "months",
										type: "buttons",
										label: "Tipster by month",
										items: [
											{ id: 1, label: "All" },
											{ id: 2, label: "1-10 Months" },
											{ id: 3, label: "10-100 Months" },
											{ id: 4, label: "100+ Months" },
										],
									},
									{
										key: "sports",
										type: "singleChoice",
										label: "Choose sport",
										items: [
											{
												id: 1,
												label: "All",
												image: "/icons/star-black.svg",
											},
											{
												id: 2,
												label: "Football",
												image: "/icons/star-black.svg",
											},
											{
												id: 3,
												label: "Basketball",
												image: "/icons/star-black.svg",
											},
											{
												id: 4,
												label: "Rugby",
												image: "/icons/star-black.svg",
											},
											{
												id: 5,
												label: "Badminton",
												image: "/icons/star-black.svg",
											},
											{
												id: 6,
												label: "Baseball",
												image: "/icons/star-black.svg",
											},
										],
									},
								]}
							/>
						)}
					</div>
					<Table
						data={tipsters}
						columns={width > 600 ? columns : mobileColumns}
						sortable={true}
					/>
				</div>
				<div
					id={styles.wideBanner}
					className={styles.sideMargin}
				>
					<Banner
						image={"/images/banner-placeholder-1.png"}
						height={width > 600 ? 200 : 400}
					/>
				</div>
				<div
					id={styles.tips}
					className={styles.sideMargin}
				>
					<PageTips />
				</div>
				{/* </div> */}
				<DisaperingContainer
					className={styles.sideColumn}
					condition={width <= 768}
				>
					<div
						id={styles.timer}
						className={styles.sideMargin}
					>
						<CountdownTimer {...currentCompetition} />
					</div>
					<div
						id={styles.bookmakers}
						className={styles.sideMargin}
					>
						<BestBookmakers bookmakers={bookmakers} />
					</div>
					<div
						id={styles.liveMatches}
						className={styles.sideMargin}
					>
						<LiveMatches matches={liveMatches} />
					</div>
					<div
						id={styles.tallBanner}
						className={styles.sideMargin}
					>
						<Banner
							image="/images/banner-placeholder-2.png"
							height={463}
						/>
					</div>
				</DisaperingContainer>
			</PortalContext.Provider>
		</>
	);
};

const VerifiedTipsters: React.FC<{
	tipsters: Tipsters;
	portalNode: HtmlPortalNode | null;
}> = (props) => {
	const { tipsters } = props;
	const { width } = useWindowSize();

	function sliceIntoChunks(arr: Tipsters, chunkSize: number) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}

	function getArrowOffset(width: number) {
		switch (true) {
			case width >= 1920:
				return undefined;
			case width >= 1440:
				return {
					offset: { next: { side: -60 }, prev: { side: -60 } },
				};
			case width >= 1366:
				return {
					offset: { next: { side: -60 }, prev: { side: -60 } },
				};
			case width >= 1280:
				return {
					offset: { next: { side: -50 }, prev: { side: -50 } },
				};
			default:
				return undefined;
		}
	}

	function getTipsterCount(width: number) {
		switch (true) {
			case width >= 1920:
				return 3;
			case width >= 1440:
				return 3;
			case width >= 1366:
				return 3;
			case width >= 1280:
				return 3;
			case width >= 1024:
				return 2;
			case width >= 768:
				return 2;
			case width >= 320:
				return 1;
			default:
				return 3;
		}
	}

	return (
		<div className={styles.verifiedTipsters}>
			<div className={styles.verifiedTipstersBackground}>
				<Image
					src="/images/stadium-background.png"
					fill
					alt=""
					style={{
						objectFit: "cover",
					}}
				/>
			</div>
			<h2 className={styles.verifiedTipstersTitle}>Optimo.com Verified Tipsters</h2>
			<span className={styles.verifiedTipstersSubtitle}>
				Betting on sports can be really profitable if you have the right knowledge
				in place. Following betting tipsters is certainly wise decision as it
				helps you leverage their expertise and analyses in your favor. Here you
				can find and follow verified by us tipsters. By starting to follow some of
				the betting experts you will receive optional notification each time they
				post a new betting tip on the site.
			</span>
			<div className={styles.verifiedTipstersSlider}>
				<Slider
					showArrows={width >= 1280}
					loop={true}
					arrowOptions={getArrowOffset(width)}
					autoPlay={false}
				>
					{sliceIntoChunks(tipsters, getTipsterCount(width)).map(
						(tipstersChunk, index) => (
							<div
								className={styles.tipsterSlide}
								key={`tipster_slide_${index}`}
							>
								{tipstersChunk.map((tipster, index) => (
									<TipsterCard
										key={`tipster_slide_item_${index}`}
										{...tipster}
									/>
								))}
							</div>
						)
					)}
				</Slider>
			</div>
		</div>
	);
};

const TipsterCard: React.FC<inferArrayElementType<Tipsters>> = (props) => {
	const { avgProfit, image, name, subscriptionCost, winrate, sport } = props;
	const [following, setFollowing] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const { width } = useWindowSize();

	return (
		<>
			<PortalContext.Consumer>
				{({ portalNode }) =>
					portalNode && (
						<InPortal node={portalNode}>
							<AnimatePresence initial={false}>
								{modalOpen && (
									<TipsterModal
										{...props}
										onClose={() => setModalOpen(false)}
									/>
								)}
							</AnimatePresence>
						</InPortal>
					)
				}
			</PortalContext.Consumer>
			<div className={styles.tipsterCard}>
				<div className={styles.mainInfo}>
					<div className={styles.avatar}>
						<Image
							src={image}
							height={80}
							width={80}
							alt=""
						/>
						<span>{name}</span>
					</div>
					<div className={styles.info}>
						<div className={styles.header}>
							<div className={styles.sport}>
								<Image
									src={sport.image}
									height={34}
									width={34}
									alt=""
								/>
								<span>Top {sport.name} Tipster</span>
							</div>
							<button onClick={() => setFollowing(!following)}>
								<Image
									src={
										following
											? "/icons/following.svg"
											: "/icons/follow.svg"
									}
									height={20}
									width={20}
									alt=""
								/>
								{width >= 1920 ?? (
									<span>{following ? "Following" : "Follow"}</span>
								)}
							</button>
						</div>
						<div className={styles.stats}>
							<div>
								<h4>Hit rate</h4>
								<span>{winrate * 100}%</span>
							</div>
							<div>
								<h4>Avg. Mothly Profit</h4>
								<span>$ {avgProfit}</span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.subscriptionInfo}>
					<div>
						<h4>$ {subscriptionCost}/MO</h4>
						<span>How to subscribe?</span>
					</div>
					<button onClick={() => setModalOpen(!modalOpen)}>Subscribe</button>
				</div>
			</div>
		</>
	);
};

const CountdownTimer: React.FC<CurrentCompetition> = (props) => {
	const { endsOn, startedOn } = props;
	const [progress, setProgress] = useState(
		((new Date().getTime() - startedOn.getTime()) /
			(endsOn.getTime() - startedOn.getTime())) *
		100
	);
	const { width } = useWindowSize();

	function calculateProgress() {
		const currentTime = new Date().getTime();
		const startTime = startedOn.getTime();
		const targetTime = endsOn.getTime();
		const res = ((currentTime - startTime) / (targetTime - startTime)) * 100;
		setProgress(res);
	}

	useEffect(() => {
		const timer = setInterval(calculateProgress, 60000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className={styles.timer}>
			<div className={styles.background}>
				<Image
					src="/images/competition-timer-background.png"
					fill
					alt=""
					style={{
						objectFit: "cover",
					}}
				/>
			</div>
			<div className={styles.header}>
				<h3>Free Tipster Competition</h3>
				<span>Left before the end of the tournament</span>
			</div>
			<div className={styles.progress}>
				{width > 768 || width <= 600 ? (
					<CircularProgressbarWithChildren
						value={progress}
						maxValue={100}
						counterClockwise
						styles={{
							path: {
								strokeLinecap: "round",
								strokeWidth: "4px",
								stroke: "#2CD114",
							},
							trail: {
								strokeWidth: "1px",
								stroke: "#FFFFFF80",
							},
						}}
					>
						<Moment
							className={styles.time}
							duration={new Date()}
							date={endsOn}
							format={"DD : hh : mm"}
						/>
						<div className={styles.timeHint}>
							<span>Days</span>
							<span>Hours</span>
							<span>Minutes</span>
						</div>
					</CircularProgressbarWithChildren>
				) : (
					<div>
						<Moment
							className={styles.time}
							duration={new Date()}
							date={endsOn}
							format={"DD : hh : mm"}
						/>
						<div className={styles.timeHint}>
							<span>Days</span>
							<span>Hours</span>
							<span>Minutes</span>
						</div>
					</div>
				)}
			</div>
			<div className={styles.rules}>
				<span>Take a tour of competition rules</span>
				<button>Learn More</button>
			</div>
		</div>
	);
};

const PageTips: React.FC = () => {
	return (
		<div className={styles.tips}>
			<div className={styles.block}>
				<h2>7 Reasons to Follow Our Betting Tips and Predictions</h2>
				<ol>
					<li>
						In today’s high paced world is really important to ensure that we
						use our time efficiently. In order to win regularly from sports
						betting, you definitely have to commit a lot of time in
						researching, building data models and know what is happening with
						each team or player. This indeed is very challenging and only a
						very few people are successful with that. By following betting
						tips provided by experts you are using their knowledge in your
						favour while not spending any time on doing the hard work. It
						won’t be crazy if we assume that by betting with the right
						information and tips in our hands we are increasing our chance of
						winning quite significantly. Therefore, this is our reason number
						1 why to follow betting tips.
					</li>
					<li>
						If you are willing to commit the hard work and be the person who
						knows a certain sport in depth this is great you will not need
						betting tips for your chosen sport. But if you are treating sports
						betting as an investment there is a huge chance that you will want
						to see your betting portfolio well diversified meaning that you
						should bet on more than one sport. Therefore, you will need again
						an expert who will provide you with well researched betting tips
						on different sports. Certainly, this is the right way to build
						sustainable portfolio by using your own knowledge and leverage
						other people’s expertise. This is reason number 2 why it is wise
						to use betting tips as part of your betting activities.
					</li>
					<li>
						Take calculated risk. Sports betting is not about gambling, it is
						about making educated decisions that will likely result in long
						term profits. By following betting tips, you are ensuring to
						always be informed when placing your bets and reduce the risk
						factor to the very minimum. At the end of the day, betting is a
						game of chances but it is always good to know the odds are in your
						favour and betting tips are the tool that will help you achieve
						that.
					</li>
				</ol>
			</div>
			<div className={styles.block}>
				<h2>How to Turn Our Sports Betting Tips to Profit?</h2>
				<div>
					<span>
						Sports betting is a hugely popular way to increase the amount of
						fun you have when you watch your favourite sports. Alongside this,
						while we would not recommend trying to make sports betting a
						second source of income as it can be a fickle hobby, it is
						entirely possible to make a good profit from betting on your
						favourite sports.
					</span>
					<span>
						To do this, you need to be supremely disciplined when you come to
						betting. Many bettors will look to employ strategies when they
						bet, such as only backing or avoiding specific markets or teams,
						they will only wager on certain events and will likely stay away
						from betting tips that are too short or too long.
					</span>
					<span>
						With regard to sports betting odds, it is always important to
						understand what the odds mean. For example, an odds-on bet means
						that a side is likely to win that particular game or event, while
						very long odds mean the chances of the bet coming off a very
						lower. With a long odds bet offers a big potential return but a
						huge risk to your wager amount, and a short odds bet offering a
						safer path but with a smaller return, many bettors will look to
						play somewhere in the middle of this, in an area where the
						potential risk and reward and weight together well.
					</span>
					<span>
						Importantly, if you are not overly confident when it comes to
						betting on your own, then you can wager on our sports betting tips
						and betting predictions to help swell your wins. You can then use
						these sports betting tips at home on your laptop or on the move on
						your phone, whilst utilising a bookmaker’s betting app is also a
						great way to keep up to date with the biggest games.
					</span>
					<span>
						The use of betting calculators alongside using strong money
						management is vital to ensure you stay in profit when it comes to
						betting. When it comes to your money management, we recommend that
						you set limits for yourself when it comes to depositing, whilst
						you should not only ever bet huge amounts of money all in one bet.
						You can also track your performance in betting too, with this
						showing you where and when you are losing/gaining money.
					</span>
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = createProxySSGHelpers({
		router: appRouter,
		ctx: await createContext(),
		transformer: superjson,
	});

	await ssg.tipsters.getAll.prefetch();
	await ssg.bookmakers.getTop.prefetch();
	await ssg.matches.getAllLive.prefetch();
	await ssg.competitions.getCurrent.prefetch();

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 60,
	};
};

export default TipsterRating;
