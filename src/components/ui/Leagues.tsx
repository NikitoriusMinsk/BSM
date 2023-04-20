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
}> = (props) => {
	const { league, withDatePicker, withLiveMatchesButton } = props;
	const [selectedDate, setSelectedDate] = useState(new Date());

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
							height={40}
							width={40}
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
						<button>
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
					<button>
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
					<button>
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
						key={`league_match_${index}`}
					/>
				))}
			</div>
		</div>
	);
};

const Match: React.FC<MatchType> = (props) => {
	const { status, teams, date, odds, tip_count } = props;
	const [isOpen, setIsOpen] = useState(false);

	function getTag(status: MatchStatus) {
		switch (status) {
			case MatchStatus.live:
				return <div className={styles.matchLive}>Live</div>;
			case MatchStatus.upcoming:
				return <span>{date}</span>;
			case MatchStatus.finished:
				return <span>{date}</span>;

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
						{teams.map((team, index) => (
							<div
								key={index}
								className={styles.teamName}
							>
								{team.name}
							</div>
						))}
					</div>
				</div>
				<div className={styles.details}>
					<div className={`${styles.outcome} ${styles.score}`}>
						<span>{teams[0]?.score}</span>
						<span>{teams[1]?.score}</span>
					</div>
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
				</div>
			</div>
		</div>
	);
};

export default Leagues;
