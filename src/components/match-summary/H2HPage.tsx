import styles from "../../styles/components/match-summary/H2HPage.module.css";
import Image from "next/image";
import React, { useRef, useEffect, useState, MutableRefObject, useMemo } from "react";
import H2HFilter from "@components/ui/match-summary/H2HFilter";
import { motion } from "framer-motion";
import { useDraggable } from "react-use-draggable-scroll";
import useWindowSize from "src/utils/useWindowSize";
import { trpc } from "src/utils/trpc";
import { useRouter } from "next/router";
import { matchH2HSchema, matchSchema } from "src/server/trpc/utils/DTOSchemas";
import Moment from "react-moment";

enum Pages {
	Overall = "Overall",
	Team1 = "Team1",
	Team2 = "Team2",
}

const H2HPage: React.FC = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	// const { events } = useDraggable(sliderRef);

	const router = useRouter();
	const { data, isLoading } = trpc.matches.getMatchH2H.useQuery({
		matchCountPerTeam: 10,
		matchId: parseInt(router.query.id as string),
	});
	const [currentPage, setCurrentPage] = useState(Pages.Overall);
	const memoizedPage = useMemo(() => {
		if (!data) return;

		switch (currentPage) {
			case Pages.Overall:
				return (
					<>
						<MatchesBlock
							matches={data.team1.overAll}
							title={`Last Matches - ${data.team1.teamName}`}
							winner={"0"}
						/>
						<MatchesBlock
							matches={data.team2.overAll}
							title={`Last Matches - ${data.team2.teamName}`}
							winner={"1"}
						/>
						<MatchesBlock
							matches={data.h2h}
							title="Head-To-Head Matches"
						/>
					</>
				);
			case Pages.Team1:
				return (
					<>
						<MatchesBlock
							matches={data.team1.homeMatches}
							title={`Home Matches - ${data.team1.teamName}`}
							winner={"0"}
						/>
						<MatchesBlock
							matches={data.team1.awayMatches}
							title={`Away Matches - ${data.team1.teamName}`}
							winner={"0"}
						/>
					</>
				);
			case Pages.Team2:
				return (
					<>
						<MatchesBlock
							matches={data.team1.homeMatches}
							title={`Home Matches - ${data.team2.teamName}`}
							winner={"1"}
						/>
						<MatchesBlock
							matches={data.team1.awayMatches}
							title={`Away Matches - ${data.team2.teamName}`}
							winner={"1"}
						/>
					</>
				);
		}
	}, [currentPage, data]);

	if (isLoading) {
		return <>Loading...</>;
	}

	if (!data) {
		return <>Error!</>;
	}

	return (
		<div className={styles.pageContainer}>
			<div
				className={styles.filter}
				// {...events}
				ref={sliderRef}
			>
				<H2HFilter
					items={[
						{
							id: "Overall",
							name: "Overall",
						},
						{
							id: "Team1",
							name: `${data.team1.teamName} - Home`,
						},
						{
							id: "Team2",
							name: `${data.team2.teamName} - Away`,
						},
					]}
					onSelect={({ id }) => setCurrentPage(id as Pages)}
				/>
			</div>
			<div className={styles.matches}>{memoizedPage}</div>
		</div>
	);
};

interface MatchesBlockProps {
	// have to hack this like that because our backend creates new DTOs for everything and none of them intersect eachanother 😎👍
	matches: (typeof matchH2HSchema._type)["h2h"][number][];
	title: string;
	winner?: "0" | "1";
}

const MatchesBlock: React.FC<MatchesBlockProps> = (props) => {
	const { matches, title, winner } = props;
	const [seeMore, setSeeMore] = useState(false);
	const { width } = useWindowSize();

	const listVariants = {
		open: {
			height: "100%",
		},
		close: {
			height:
				matches.length > 2
					? width <= 600
						? 276
						: 234
					: matches.length == 2
					? width <= 600
						? 184
						: 156
					: width <= 600
					? 92
					: 78,
		},
	};

	return (
		<div className={styles.matchesBlock}>
			<span className={styles.blockTitle}>{title}</span>
			<motion.div
				className={styles.matchesList}
				variants={listVariants}
				animate={seeMore ? "open" : "close"}
				initial={"close"}
				transition={{ duration: 0.2, ease: "easeInOut" }}
			>
				{matches.map((item) => {
					const matchWinner =
						item.teams[0]?.score! > item.teams[1]?.score! ? 0 : 1;
					const isDraw = item.teams[0]?.score! === item.teams[1]?.score!;

					return (
						<div
							key={item.matchId}
							className={styles.match}
						>
							<div className={styles.matchData}>
								<div className={styles.dateChamp}>
									<Moment
										format="DD.MM.YYYY"
										className={styles.date}
									>
										{item.date}
									</Moment>
									<div className={styles.champ}>
										<div className={styles.champLogo}>
											<Image
												src={
													item.leagueLogo ?? "/placeholder.png"
												}
												width={24}
												height={24}
												style={{ objectFit: "contain" }}
												alt=""
											/>
										</div>
										<span className={styles.champName}>
											{item.leagueName}
										</span>
									</div>
								</div>
								<div className={styles.dateChampMobile}>
									<div className={styles.champLogo}>
										<Image
											src={item.leagueLogo ?? "/placeholder.png"}
											width={24}
											height={24}
											style={{ objectFit: "contain" }}
											alt=""
										/>
									</div>
									<div className={styles.champ}>
										<span className={styles.champName}>
											{item.leagueName}
										</span>
										<Moment
											format="DD.MM.YYYY"
											className={styles.date}
										>
											{item.date}
										</Moment>
									</div>
								</div>
								<div className={styles.teams}>
									<div className={styles.teamsLogos}>
										<div className={styles.teamLogo}>
											<Image
												src="/testimg/club1.png"
												width={20}
												height={20}
												style={{ objectFit: "contain" }}
												alt=""
											/>
										</div>
										<div className={styles.teamLogo}>
											<Image
												src="/testimg/club2.png"
												width={20}
												height={20}
												style={{ objectFit: "contain" }}
												alt=""
											/>
										</div>
									</div>
									<div className={styles.teamsNames}>
										<span
											className={
												matchWinner === 0
													? styles.winner
													: undefined
											}
										>
											{item.teams[0]?.teamName}
										</span>
										<span
											className={
												matchWinner === 1
													? styles.winner
													: undefined
											}
										>
											{item.teams[1]?.teamName}
										</span>
									</div>
								</div>
							</div>
							<div className={styles.matchResult}>
								<div className={styles.score}>
									<span
										className={
											matchWinner === 0 ? styles.winner : undefined
										}
									>
										{item.teams[0]?.score}
									</span>
									<span
										className={
											matchWinner === 1 ? styles.winner : undefined
										}
									>
										{item.teams[1]?.score}
									</span>
								</div>
								<div className={styles.line} />
								{!winner ? (
									<div className={styles.result} />
								) : isDraw ? (
									<div className={styles.resultDraw} />
								) : winner === matchWinner.toString() ? (
									<div className={styles.resultWin} />
								) : (
									<div className={styles.resultLose} />
								)}
							</div>
						</div>
					);
				})}
			</motion.div>
			{!seeMore && matches.length > 3 && (
				<span
					className={styles.seeMore}
					onClick={() => setSeeMore(true)}
				>
					See more
					<Image
						src="/icons/chevron-down.svg"
						width={24}
						height={24}
						style={{ objectFit: "contain" }}
						alt=""
					/>
				</span>
			)}
		</div>
	);
};

export default H2HPage;
