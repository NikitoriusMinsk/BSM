import React, { useState } from "react";
import { GetStaticProps, NextPage } from "next";
import styles from "@styles/pages/Predictions.module.css";
import { trpc } from "src/utils/trpc";
import {
	MostTips,
	Predictions as PredictionsType,
	Sports,
} from "src/types/queryTypes";
import Slider from "@components/ui/Slider";
import MatchTipsCard from "@components/ui/MatchTipsCard";
import Image from "next/image";
import BestBookmakers from "@components/ui/BestBookmakers";
import Banner from "@components/ui/Banner";
import Filter from "@components/ui/Filter";
import Predictions from "@components/ui/Predictions";
import TextField from "@components/ui/TextField";
import DatePicker from "@components/ui/DatePicker";
import { createSSGHelpers } from "@trpc/react/ssg";
import { appRouter } from "src/server/router";
import { createContext } from "src/server/router/context";
import superjson from "superjson";

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
	const [limit, setLimit] = useState<number>(3);
	const [previousPredictions, setPreviousPredictions] =
		useState<PredictionsType | null>(null);
	const { data: tips, isLoading: tipsLoading } = trpc.useQuery([
		"tips.getAll",
	]);
	const { data: bookmakers, isLoading: bookmakersLoading } = trpc.useQuery([
		"bookmakers.getTop",
	]);
	const { data: leagues, isLoading: leaguesLoading } = trpc.useQuery([
		"filters.getLeagues",
	]);
	const { data: sports, isLoading: sportsLoading } = trpc.useQuery([
		"filters.getSports",
	]);
	const { data: predictions, isLoading: predictionsLoading } = trpc.useQuery(
		["predictions.getAll", { limit: limit }],
		{
			onSuccess: (data) => setPreviousPredictions(data),
		}
	);

	if (tipsLoading || bookmakersLoading || leaguesLoading || sportsLoading) {
		return <div>Loading...</div>;
	}

	if (!tips || !bookmakers || !leagues || !sports) {
		return <div>Error...</div>;
	}

	return (
		<>
			<div className={styles.mainBlock}>
				<TipsSlider tips={tips} />
			</div>
			<div className={styles.mainColumn}>
				<div className={styles.filters}>
					<h4>Filter</h4>
					<div className={styles.search}>
						<TextField
							placeholder="Search"
							icon="/icons/search.svg"
						/>
						<button>Reset</button>
					</div>
					<h5>SORT BY</h5>
					<SortButtons
						items={SortItems}
						onChange={() => {}}
					/>
					<h5>Date</h5>
					<DatePicker onChange={() => {}} />
					<h5>Type</h5>
					<SortButtons
						items={TypeItems}
						onChange={() => {}}
					/>
					<Filter
						items={leagues}
						h3="CHOOSE LEAGUE"
						onChange={() => {}}
					/>
				</div>
				<div className={styles.predictions}>
					<SportsSider
						sports={[
							{ name: "All", image: "", id: "0" },
							...sports,
						]}
						onChange={() => {}}
					/>
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
			</div>
			<div className={styles.sideColumn}>
				<BestBookmakers bookmakers={bookmakers} />
				<Banner
					height={463}
					image="/images/banner-placeholder-2.png"
				/>
			</div>
		</>
	);
};

const TipsSlider: React.FC<{ tips: MostTips }> = (props) => {
	const { tips } = props;
	const _tips = sliceIntoChunks(tips, 4);

	function sliceIntoChunks(arr: MostTips, chunkSize: number) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}

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
					autoPlay={true}
					showArrows={true}
					arrowOptions={{
						offset: {
							next: {
								top: -48,
								side: 100,
							},
							prev: {
								top: -48,
								side: "calc(100% - 170px)",
							},
						},
						size: {
							height: 30,
							width: 30,
						},
					}}
				>
					{_tips.map((tipsChunk, index) => (
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
			setSelectedItems(
				selectedItems.filter((item) => item !== id && item !== "0")
			);
			onChange(selectedItems.filter((item) => item !== id));
		} else {
			setSelectedItems([
				...selectedItems.filter((item) => item !== "0"),
				id,
			]);
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
			setSelectedItems(
				selectedItems.filter((item) => item !== id && item !== "0")
			);
			onChange(selectedItems.filter((item) => item !== id));
		} else {
			setSelectedItems([
				...selectedItems.filter((item) => item !== "0"),
				id,
			]);
			onChange([...selectedItems, id]);
		}
	}

	return (
		<div className={styles.filterButtons}>
			{items.map(({ id, name }) => (
				<button
					key={`sort_button_${id}_${name}`}
					onClick={() => handleSelect(id)}
					className={
						selectedItems.includes(id) ? styles.active : undefined
					}
				>
					{name}
				</button>
			))}
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = createSSGHelpers({
		router: appRouter,
		ctx: await createContext(),
		transformer: superjson,
	});

	await ssg.prefetchQuery("tips.getAll");
	await ssg.prefetchQuery("bookmakers.getTop");
	await ssg.prefetchQuery("filters.getLeagues");
	await ssg.prefetchQuery("filters.getSports");
	await ssg.prefetchQuery("predictions.getAll", { limit: 3 });

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 60,
	};
};

export default PredictionsPage;
