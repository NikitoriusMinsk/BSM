import { GetStaticProps, NextPage } from "next";
import React, {
	ChangeEvent,
	ChangeEventHandler,
	useMemo,
	useState,
	VoidFunctionComponent,
} from "react";
import styles from "@styles/pages/AddTip.module.css";
import Image from "next/image";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Matches, Sports } from "src/types/queryTypes";
import { trpc } from "src/utils/trpc";
import debounce from "src/utils/debounce";
import { PortalContext } from "src/utils/portalContext";
import { AnimatePresence, motion } from "framer-motion";
import DateInput from "@components/ui/DatePicker";
import usePortal from "src/utils/usePortal";
import dynamic from "next/dynamic";
import superjson from "superjson";
import { createSSGHelpers } from "@trpc/react/ssg";
import { appRouter } from "src/server/router";
import { createContext } from "src/server/router/context";

const InPortal = dynamic(
	async () => (await import("react-reverse-portal")).InPortal,
	{ ssr: false }
);
const OutPortal = dynamic(
	async () => (await import("react-reverse-portal")).OutPortal,
	{ ssr: false }
);

// TODO
// fix prop drilling

const AddTip: NextPage = () => {
	const { data: sports, isLoading: sportsLoading } = trpc.useQuery([
		"filters.getSports",
	]);
	const [step, setStep] = useState(1);
	const portalNode = usePortal();

	if (sportsLoading) {
		return <div>Loading...</div>;
	}

	if (!sports) {
		return <div>Error...</div>;
	}

	return (
		<>
			<PortalContext.Provider value={{ portalNode: portalNode }}>
				{portalNode && <OutPortal node={portalNode} />}
				<div className={styles.mainBlock}>
					<div className={styles.background}>
						<Image
							src="/images/add-tip-background.png"
							fill
							alt=""
							style={{
								objectFit: "cover",
							}}
						/>
					</div>
					<div className={styles.content}>
						<h2>OPTIMO</h2>
						<div className={styles.progress}>
							<div className={styles.progressBarContainer}>
								<CircularProgressbarWithChildren
									value={step}
									maxValue={2}
									styles={{
										path: {
											strokeWidth: "10px",
											stroke: "#7F3FFC",
										},
										trail: {
											strokeWidth: "9px",
											stroke: "#FFFFFF",
										},
									}}
									className={styles.progressBar}
								>
									<span className={styles.progressText}>
										<b>1</b>/2
									</span>
								</CircularProgressbarWithChildren>
							</div>
							<div className={styles.stepText}>
								<span>Find Event</span>
								<span>Use the search bar</span>
							</div>
							<SearchBar sports={sports} />
						</div>
					</div>
					<span className={styles.disclaimer}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Etiam nisi quam, pretium imperdiet erat nec, malesuada
						scelerisque arcu. Proin quis varius orci. Donec ut
						suscipit orci.
					</span>
				</div>
			</PortalContext.Provider>
		</>
	);
};

const SearchBar: React.FC<{ sports: Sports }> = (props) => {
	const { sports } = props;
	const [searchValue, setSearchValue] = useState<string>("");
	const [selectedSports, setSelectedSports] = useState<string[]>([]);
	const { data: searchResults, refetch } = trpc.useQuery([
		"matches.search",
		{ searchString: searchValue },
	]);

	function handleSearch(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		if (value === "") return;
		setSearchValue(value);
		refetch();
	}

	return (
		<div className={styles.searchBarContainer}>
			<div className={styles.filterContainer}>
				<Filter
					sports={sports}
					onChange={(ids) => setSelectedSports(ids)}
					defaultSelected={selectedSports}
				/>
			</div>
			<input
				className={styles.searchBar}
				placeholder="Search for match"
				onChange={debounce(handleSearch, 1000)}
			/>
			{searchResults && (
				<div className={styles.results}>
					{searchResults.map(
						({ sport, date, teams, league }, index) => (
							<div
								key={`result_${index}`}
								className={styles.result}
							>
								<div className={styles.league}>
									<Image
										src={sport.image}
										height={24}
										width={24}
										alt=""
									/>
									<div className={styles.info}>
										<span>{sport.name}</span>
										<span>{league}</span>
									</div>
								</div>
								<div className={styles.time}>{date}</div>
								<div className={styles.teams}>
									<div className={styles.images}>
										{teams.map(({ image }, index) => (
											<div
												key={`team_image_${index}`}
												className={styles.image}
											>
												<Image
													src={image}
													height={36}
													width={36}
													alt=""
												/>
											</div>
										))}
									</div>
									<div className={styles.names}>
										{teams.map(({ name }, index) => (
											<span
												className={styles.name}
												key={`team_name_${index}`}
											>
												{name}
											</span>
										))}
									</div>
								</div>
							</div>
						)
					)}
				</div>
			)}
			<button className={styles.searchButton}>
				<Image
					src="/icons/search-white.svg"
					height={24}
					width={24}
					alt=""
				/>
			</button>
		</div>
	);
};

const Filter: React.FC<{
	sports: Sports;
	onChange: (ids: string[]) => void;
	defaultSelected: string[];
}> = (props) => {
	const { sports, onChange, defaultSelected } = props;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<PortalContext.Consumer>
				{({ portalNode }) =>
					portalNode && (
						<InPortal node={portalNode}>
							<AnimatePresence initial={false}>
								{isOpen && (
									<FilterModal
										sports={sports}
										onClose={() => setIsOpen(false)}
										onChange={(ids) => onChange(ids)}
										defaultSelected={defaultSelected}
									/>
								)}
							</AnimatePresence>
						</InPortal>
					)
				}
			</PortalContext.Consumer>
			<div
				onClick={() => setIsOpen(!isOpen)}
				className={`${styles.filter} ${isOpen && styles.open}`}
			>
				<Image
					src={
						isOpen ? "/icons/filter-white.svg" : "/icons/filter.svg"
					}
					height={24}
					width={24}
					alt=""
				/>
				Filter
			</div>
		</>
	);
};

const ModalVariants = {
	open: {
		opacity: [0, 1],
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
	closed: {
		opacity: [1, 0],
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
};

const FilterModal: React.FC<{
	sports: Sports;
	onClose: () => void;
	onChange: (ids: string[]) => void;
	defaultSelected: string[];
}> = (props) => {
	const { sports, onClose, onChange, defaultSelected } = props;
	const [selectedItems, setSelectedItems] =
		useState<string[]>(defaultSelected);

	function handleSelect(id: string) {
		if (selectedItems.includes(id)) {
			setSelectedItems(selectedItems.filter((item) => item !== id));
			onChange(selectedItems.filter((item) => item !== id));
		} else {
			setSelectedItems([...selectedItems, id]);
			onChange([...selectedItems, id]);
		}
	}

	function handleClear() {
		setSelectedItems([]);
		onChange([]);
	}

	return (
		<motion.div
			className={styles.filterModal}
			variants={ModalVariants}
			initial="closed"
			animate="open"
			exit="closed"
		>
			<div className={styles.modal}>
				<div className={styles.header}>
					<h4>Filter</h4>
					<div
						className={styles.close}
						onClick={onClose}
					>
						<Image
							src="/icons/close.svg"
							height={24}
							width={24}
							alt=""
						/>
					</div>
				</div>
				<div className={styles.block}>
					<h5>CHOOSE SPORT</h5>
					<div className={styles.sports}>
						{sports.map(({ name, id }) => (
							<div
								className={styles.sport}
								onClick={() => handleSelect(id)}
								key={`sport_${id}`}
							>
								<span>{name}</span>
								<input
									type={"checkbox"}
									checked={selectedItems.includes(id)}
									readOnly
								/>
							</div>
						))}
					</div>
				</div>
				<div className={styles.block}>
					<h5>CHOOSE DATE</h5>
					<DateInput onChange={() => {}} />
				</div>
				<div className={styles.buttons}>
					<button
						className={styles.clear}
						onClick={handleClear}
					>
						Clear
					</button>
					<button
						className={styles.apply}
						onClick={onClose}
					>
						Apply
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = createSSGHelpers({
		router: appRouter,
		ctx: await createContext(),
		transformer: superjson,
	});

	await ssg.prefetchQuery("filters.getSports");

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 60,
	};
};

export default AddTip;
