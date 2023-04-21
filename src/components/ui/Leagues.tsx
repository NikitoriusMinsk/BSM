import React, { useState } from "react";
import styles from "@styles/components/ui/Leagues.module.css";
import Image from "next/image";
import { MatchesByLeague } from "src/types/queryTypes";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import { motion } from "framer-motion";
import { MatchStatus } from "src/types/matchStatus";
import Moment from "react-moment";

interface MatchesInfoProps {
	leagues: MatchesByLeague;
	h3?: string;
	h2?: string;
	withLiveMatchesButton?: boolean;
	withDatePicker?: boolean;
	mode?: "live" | "odds" | "stats";
}

type LeagueType = inferArrayElementType<MatchesByLeague>;
type MatchType = inferArrayElementType<inferArrayElementType<MatchesByLeague>["matches"]>;

const Leagues: React.FC<MatchesInfoProps> = (props) => {
	const {
		leagues,
		h2,
		h3,
		withLiveMatchesButton = true,
		withDatePicker = true,
		mode,
	} = props;

	return (
		<div className={styles.container}>
			{(h2 || h3) && (
				<div className={styles.titles}>
					{h3 && <h3>{h3}</h3>}
					{h2 && <h2>{h2}</h2>}
				</div>
			)}
			{leagues.map((league, leagueIndex) => (
				<League
					league={league}
					withDatePicker={withDatePicker}
					withLiveMatchesButton={withLiveMatchesButton}
					mode={mode}
					key={`league_${leagueIndex}`}
				/>
			))}
		</div>
	);
};

const League: React.FC<{
	league: LeagueType;
	withLiveMatchesButton: boolean;
	withDatePicker: boolean;
	mode?: "live" | "odds" | "stats";
}> = (props) => {
	const { league, withDatePicker, withLiveMatchesButton, mode } = props;
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [modeState, setModeState] = useState(mode || "odds");

	function nextDate() {
		const _date = new Date(
			selectedDate.getFullYear(),
			selectedDate.getMonth(),
			selectedDate.getDate() + 1
		);
		setSelectedDate(_date);
	}

	function prevDate() {
		const _date = new Date(
			selectedDate.getFullYear(),
			selectedDate.getMonth(),
			selectedDate.getDate() - 1
		);
		setSelectedDate(_date);
	}

	return (
		<div className={styles.league}>
			<div className={styles.leagueDescription}>
				<div className={styles.leagueWrapper}>
					<div className={styles.image}>
						<Image
							src={league.image}
							height={38}
							width={38}
							alt={league.name}
						/>
					</div>
					<div className={styles.titles}>
						<span>
							{league.country} • {league.sport.name}
						</span>
						<span>{league.name}</span>
					</div>
				</div>
				<div className={styles.matchesOptions}>
					{withLiveMatchesButton && (
						<button
							className={modeState == "live" ? styles.activeMode : ""}
							onClick={() => setModeState("live")}
						>
							<div className={styles.image}>
								<Image
									src="/icons/live-matches.svg"
									alt=""
									height={15}
									width={15}
								/>
							</div>
							<span>Live Matches</span>
						</button>
					)}
					<button
						className={modeState == "odds" ? styles.activeMode : ""}
						onClick={() => setModeState("odds")}
					>
						<div className={styles.image}>
							<Image
								src="/icons/chart-bubble.svg"
								alt=""
								height={15}
								width={15}
							/>
						</div>
						<span>Odds</span>
					</button>
					<button
						className={modeState == "stats" ? styles.activeMode : ""}
						onClick={() => setModeState("stats")}
					>
						<div className={styles.image}>
							<Image
								src="/icons/chart-line.svg"
								alt=""
								height={15}
								width={15}
							/>
						</div>
						<span>Statistic</span>
					</button>
					{withDatePicker && (
						<button>
							<div
								className={`${styles.controls} ${styles.prev}`}
								onClick={prevDate}
							>
								<Image
									src="/icons/chevron-black.svg"
									height={12}
									width={12}
									alt=""
								/>
							</div>
							<Moment
								date={selectedDate}
								format="DD/MM"
							/>
							<div
								className={`${styles.controls} ${styles.next}`}
								onClick={nextDate}
							>
								<Image
									src="/icons/chevron-black.svg"
									height={12}
									width={12}
									alt=""
								/>
							</div>
						</button>
					)}
				</div>
			</div>
			<div className={styles.matches}>
				{league.matches.map((match, index) => (
					<Match
						{...match}
						mode={modeState}
						key={`league_match_${index}`}
					/>
				))}
			</div>
		</div>
	);
};

export const Match: React.FC<MatchType & { mode?: "live" | "odds" | "stats" }> = (
	props
) => {
	const { status, teams, date, odds, tip_count, mode } = props;
	const [isOpen, setIsOpen] = useState(false);

	function getTag(status: MatchStatus) {
		switch (status) {
			case MatchStatus.live:
				return <div className={styles.matchLive}>Live</div>;
			case MatchStatus.upcoming:
				return (
					<div className={styles.matchDate}>
						<Moment format="HH:mm">{date}</Moment>
						<Moment format="DD MMM">{date}</Moment>
					</div>
				);
			case MatchStatus.finished:
				return (
					<div className={styles.matchDate}>
						<Moment format="HH:mm">{date}</Moment>
						<Moment format="DD MMM">{date}</Moment>
					</div>
				);

			default:
				return <></>;
		}
	}

	return (
		<div className={styles.match}>
			<div className={styles.header}>
				<div className={styles.info}>
					<div className={styles.time}>{getTag(status)}</div>
					<div className={styles.teamImages}>
						{teams.map((team, index) => (
							<div
								key={index}
								className={styles.teamImage}
							>
								<Image
									src={team.image}
									alt={team.name}
									width={22}
									height={22}
								/>
							</div>
						))}
					</div>
					<div className={styles.teamNames}>
						<div
							className={`${styles.teamName} ${
								(teams[0]?.score || 0) - (teams[1]?.score || 0) &&
								styles.win
							}`}
						>
							{teams[0]?.name}
						</div>
						<div
							className={`${styles.teamName} ${
								(teams[1]?.score || 0) - (teams[0]?.score || 0) &&
								styles.win
							}`}
						>
							{teams[1]?.name}
						</div>
					</div>
				</div>
				<div
					className={styles.details}
					style={mode == "odds" ? { gap: "20px" } : {}}
				>
					<div className={`${styles.outcome} ${styles.score}`}>
						<span
							className={`${
								(teams[0]?.score || 0) - (teams[1]?.score || 0) &&
								styles.win
							}`}
						>
							{teams[0]?.score}
						</span>
						<span
							className={`${
								(teams[1]?.score || 0) - (teams[0]?.score || 0) &&
								styles.win
							}`}
						>
							{teams[1]?.score}
						</span>
					</div>
					{mode == "odds" && (
						<>
							<div
								className={styles.outcome}
								style={{ gap: "4px", marginTop: "-10px" }}
							>
								<span>Home</span>
								<span className={styles.oddVal}>{odds.home}</span>
							</div>
							<div
								className={styles.outcome}
								style={{ gap: "4px", marginTop: "-10px" }}
							>
								<span>Draw</span>
								<span className={styles.oddVal}>{odds.draw}</span>
							</div>
							<div
								className={styles.outcome}
								style={{ gap: "4px", marginTop: "-10px" }}
							>
								<span>Away</span>
								<span className={styles.oddVal}>{odds.away}</span>
							</div>
							<div
								className={`${styles.total} ${
									isOpen ? styles.open : styles.closed
								}`}
								onClick={() => setIsOpen(!isOpen)}
							>
								+ 0000
							</div>
						</>
					)}
					{mode == "stats" && (
						<>
							<div className={styles.outcome}>
								<span>Home</span>
								<span>{odds.home * 100}%</span>
							</div>
							<div className={styles.outcome}>
								<span>Draw</span>
								<span>{odds.draw * 100}%</span>
							</div>
							<div className={styles.outcome}>
								<span>Away</span>
								<span>{odds.away * 100}%</span>
							</div>
							<div
								className={`${styles.total} ${
									isOpen ? styles.open : styles.closed
								}`}
								onClick={() => setIsOpen(!isOpen)}
							>
								{tip_count} Tip{tip_count > 1 ? "s" : ""}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Leagues;