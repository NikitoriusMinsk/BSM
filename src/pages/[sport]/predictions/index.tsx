import React, { useState, useRef, useContext } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import styles from "@styles/pages/Predictions.module.css";
import { trpc } from "src/utils/trpc";
import { MostTips, Predictions as PredictionsType, Sports } from "src/types/queryTypes";
import Slider from "@components/ui/Slider";
import MatchTipsCard from "@components/ui/MatchTipsCard";
import Image from "next/image";
import BestBookmakers from "@components/ui/BestBookmakers";
import Banner from "@components/ui/Banner";
import Filter from "@components/ui/Filter";
import Predictions from "@components/ui/Predictions";
import TextField from "@components/ui/TextField";
import DatePicker from "@components/ui/DatePicker";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "src/server/trpc/router/_app";
import { createContext } from "src/server/trpc/context";
import superjson from "superjson";
import ArrayToChunks from "src/utils/ArrayToChunks";
import useWindowSize from "src/utils/useWindowSize";
import FilterModal from "@components/ui/FilterModal";
import dynamic from "next/dynamic";
import usePortal from "src/utils/usePortal";
import { PortalContext } from "src/utils/portalContext";
import LeaguesMobileBlocksFilter from "@components/ui/LeaguesMobileBlocksFilter";
import { LastSportContext } from "src/pages/_app";

const OutPortal = dynamic(async () => (await import("react-reverse-portal")).OutPortal, {
	ssr: false,
});

const SortItems = [
	{
		name: "Upcoming",
		id: "1",
	},
	{
		name: "Most",
		id: "2",
	},
	{
		name: "Multiple",
		id: "3",
	},
];

const TypeItems = [
	{
		name: "All",
		id: "0",
	},
	{
		name: "Free",
		id: "1",
	},
	{
		name: "Paid",
		id: "2",
	},
];

const PredictionsPage: NextPage = () => {
	const sport = useContext(LastSportContext);
	const [limit, setLimit] = useState<number>(3);
	const [previousPredictions, setPreviousPredictions] =
		useState<PredictionsType | null>(null);
	const { data: tips, isLoading: tipsLoading } = trpc.tips.getAll.useQuery();
	const { data: bookmakers, isLoading: bookmakersLoading } =
		trpc.bookmakers.getTop.useQuery();
	const { data: leagues, isLoading: leaguesLoading } = trpc.filters.getLeagues.useQuery(
		{ page: 0, size: 20, sportId: sport.id }
	);
	const { data: sports, isLoading: sportsLoading } = trpc.filters.getSports.useQuery();
	const { data: predictions, isLoading: predictionsLoading } =
		trpc.predictions.getAll.useQuery(
			{ limit: limit },
			{
				onSuccess: (data) => setPreviousPredictions(data),
			}
		);
	const { width } = useWindowSize();
	const portalNode = usePortal();

	if (tipsLoading || bookmakersLoading || leaguesLoading || sportsLoading) {
		return <div>Loading...</div>;
	}

	if (!tips || !bookmakers || !leagues || !sports) {
		return <div>Error...</div>;
	}

	return (
		<>
			<PortalContext.Provider value={{ portalNode }}>
				{portalNode && <OutPortal node={portalNode} />}
				<div className={styles.mainBlock}>
					<TipsSlider tips={tips} />
				</div>
				<div className={styles.mainColumn}>
					<div className={styles.filtersMobile}>
						<LeaguesMobileBlocksFilter
							items={leagues.content}
							onChange={() => {}}
						/>
						<div className={styles.filtersBlockMobile}>
							<TextField
								placeholder="Search"
								icon="/icons/search.svg"
								shouldShrink={width <= 768 ? true : false}
							/>
							<div className={styles.dateMobile}>
								<DatePicker onChange={() => {}} />
							</div>
							<div className={styles.filterBtnMobile}>
								<FilterModal
									onApply={() => {}}
									portalNode={portalNode}
									filters={[
										{
											key: "sortBy",
											type: "buttons",
											label: "Sort By",
											customClass: styles.tipsterFilter,
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
											customClass: styles.tipsterFilter,
											items: [
												{ id: 1, label: "All" },
												{ id: 2, label: "Free" },
												{ id: 3, label: "Paid" },
											],
										},
										{
											key: "sport",
											type: "singleChoiceSeparatePage",
											label: "Choose Sport",
											customClass: styles.sportFilter,
											items: [
												{ id: 0, label: "All" },
												{ id: 1, label: "Football" },
												{ id: 2, label: "Basketball" },
												{ id: 3, label: "Badminton" },
											],
										},
										{
											key: "country",
											type: "multipleChoiceSeparatePage",
											label: "By Country",
											customClass: styles.sportFilter,
											items: [
												{ id: 0, label: "All" },
												{ id: 1, label: "Georgia" },
												{ id: 2, label: "Armenia" },
												{ id: 3, label: "Turkey" },
											],
										},
									]}
								/>
							</div>
							<button className={styles.resetBtnM}>Reset</button>
						</div>
					</div>
					<div className={styles.filters}>
						<div className={styles.filterBlock}>
							<h4>Filter</h4>
							<div className={styles.search}>
								<TextField
									placeholder="Search"
									icon="/icons/search.svg"
								/>
								<button>Reset</button>
							</div>
						</div>
						<div className={styles.filterBlock}>
							<h5>SORT BY</h5>
							<SortButtons
								items={SortItems}
								onChange={() => {}}
							/>
						</div>
						<div className={styles.filterBlock}>
							<h5>Date</h5>
							<DatePicker onChange={() => {}} />
						</div>
						<div className={styles.filterBlock}>
							<h5>Type</h5>
							<SortButtons
								items={TypeItems}
								onChange={() => {}}
							/>
						</div>
						<Filter
							items={leagues.content}
							h3="CHOOSE LEAGUE"
							onChange={() => {}}
						/>
					</div>
					<div className={styles.predictions}>
						{/* {width > 600 ? (
							<SportsSider
								sports={[
									{ name: "All", image: "", id: "0" },
									...sports,
								]}
								onChange={() => {}}
							/>
						) : (
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
						)} */}
						{predictions && !predictionsLoading ? (
							<Predictions leagues={predictions} />
						) : (
							previousPredictions && (
								<Predictions leagues={previousPredictions} />
							)
						)}
						<button
							className={styles.showMore}
							onClick={() => setLimit(limit + 3)}
						>
							Show more
						</button>
					</div>
					<div className={styles.bottom1024}>
						<Banner
							height={463}
							image="/images/banner-placeholder-2.png"
						/>
						<BestBookmakers bookmakers={bookmakers} />
					</div>
				</div>
				<div className={styles.sideColumn}>
					<Banner
						height={463}
						image="/images/banner-placeholder-2.png"
					/>
					<BestBookmakers bookmakers={bookmakers} />
				</div>
			</PortalContext.Provider>
		</>
	);
};

const TipsSlider: React.FC<{ tips: MostTips }> = (props) => {
	const { tips } = props;
	const { width } = useWindowSize();

	return (
		<div className={styles.tipsSlider}>
			<div className={styles.background}>
				<Image
					src="/images/stadium-background.png"
					fill
					alt=""
					style={{
						objectFit: "cover",
					}}
				/>
			</div>
			<h2>Most Popular</h2>
			<div className={styles.sliderContainer}>
				<Slider
					loop={true}
					swipable={true}
					autoPlay={true}
					showArrows={width > 768 ? true : false}
					arrowOptions={{
						offset: {
							next: {
								top: -54,
								side: width > 1440 ? 135 : width > 1024 ? 30 : 20,
							},
							prev: {
								top: -54,
								side:
									width > 1440
										? "calc(100% - 210px)"
										: width > 1024
										? "calc(100% - 100px)"
										: "calc(100% - 90px)",
							},
						},
						size: {
							height: 30,
							width: 30,
						},
					}}
				>
					{ArrayToChunks(
						tips,
						width <= 600 ? 1 : width <= 768 ? 2 : width <= 1366 ? 3 : 4
					).map((tipsChunk, index) => (
						<div
							className={styles.slide}
							key={`slide_${index}`}
						>
							{tipsChunk.map((tip, index) => (
								<MatchTipsCard
									{...tip}
									key={`tip_${index}`}
								/>
							))}
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
};

const SportsSider: React.FC<{
	sports: Sports;
	onChange: (ids: string[]) => void;
}> = (props) => {
	const { sports, onChange } = props;
	const _sports = sliceIntoChunks(sports, 5);
	const [selectedItems, setSelectedItems] = useState<string[]>(["0"]);

	function sliceIntoChunks(arr: Sports, chunkSize: number) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}

	function handleSelect(id: string) {
		if (id === "0") {
			setSelectedItems(["0"]);
			return;
		}
		if (selectedItems.includes(id)) {
			setSelectedItems(selectedItems.filter((item) => item !== id && item !== "0"));
			onChange(selectedItems.filter((item) => item !== id));
		} else {
			setSelectedItems([...selectedItems.filter((item) => item !== "0"), id]);
			onChange([...selectedItems, id]);
		}
	}

	return (
		<div className={styles.sportsSlider}>
			<h4>Sport</h4>
			<Slider
				showPagination={false}
				showArrows={true}
				arrowOptions={{
					offset: {
						next: {
							top: 0,
							side: 0,
						},
						prev: {
							top: 0,
							side: "calc(100% - 50px)",
						},
					},
					size: {
						height: 30,
						width: 30,
					},
					backgroundColor: "transparent",
					arrowColor: "dark",
				}}
			>
				{_sports.map((sportsChunk, slideIndex) => (
					<div
						className={styles.slide}
						key={`sports_slide_${slideIndex}`}
					>
						{sportsChunk.map(({ name, image, id }, index) => (
							<div
								className={`${styles.sport} ${
									selectedItems.includes(id) && styles.active
								}`}
								key={`sports_slide_${slideIndex}_item_${index}`}
								onClick={() => handleSelect(id)}
							>
								{image !== "" && (
									<div className={styles.image}>
										<Image
											src={image}
											alt={name}
											height={24}
											width={24}
										/>
									</div>
								)}
								<span className={styles.name}>{name}</span>
							</div>
						))}
					</div>
				))}
			</Slider>
		</div>
	);
};

interface SortButtonsProps {
	items: {
		name: string;
		id: string;
	}[];
	onChange: (ids: string[]) => void;
}

const SortButtons: React.FC<SortButtonsProps> = (props) => {
	const { items, onChange } = props;
	const [selectedItems, setSelectedItems] = useState<string[]>(["0"]);

	function handleSelect(id: string) {
		if (id === "0") {
			setSelectedItems(["0"]);
			return;
		}
		if (selectedItems.includes(id)) {
			setSelectedItems(selectedItems.filter((item) => item !== id && item !== "0"));
			onChange(selectedItems.filter((item) => item !== id));
		} else {
			setSelectedItems([...selectedItems.filter((item) => item !== "0"), id]);
			onChange([...selectedItems, id]);
		}
	}

	return (
		<div className={styles.filterButtons}>
			{items.map(({ id, name }) => (
				<button
					key={`sort_button_${id}_${name}`}
					onClick={() => handleSelect(id)}
					className={selectedItems.includes(id) ? styles.active : undefined}
				>
					{name}
				</button>
			))}
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		fallback: "blocking",
		paths: [],
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = createProxySSGHelpers({
		router: appRouter,
		ctx: await createContext(),
		transformer: superjson,
	});

	await ssg.tips.getAll.prefetch();
	await ssg.bookmakers.getTop.prefetch();
	await ssg.filters.getLeagues.prefetch({ page: 0, size: 20, sportId: 1 });
	await ssg.filters.getSports.prefetch();
	await ssg.predictions.getAll.prefetch({ limit: 3 });

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 60,
	};
};

export default PredictionsPage;
