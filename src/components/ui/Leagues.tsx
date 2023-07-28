import React, { useState } from "react";
import styles from "@styles/components/ui/Leagues.module.css";
import Image from "next/image";
import { MatchesByLeague } from "src/types/queryTypes";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import Moment from "react-moment";
import { leagueSchema, matchSchema } from "src/server/trpc/utils/DTOSchemas";
import { useRouter } from "next/router";

interface MatchesInfoProps {
	leagues: (typeof leagueSchema._type)[];
	h3?: string;
	h2?: string;
	withLiveMatchesButton?: boolean;
	withDatePicker?: boolean;
	mode?: "live" | "odds" | "stats";
}

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
	league: typeof leagueSchema._type;
	withLiveMatchesButton: boolean;
	withDatePicker: boolean;
	mode?: "live" | "odds" | "stats";
}> = (props) => {
	const { league, withDatePicker, withLiveMatchesButton, mode } = props;
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [modeState, setModeState] = useState(mode || "odds");
	const router = useRouter();

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
							src={league.image ?? "/placeholeder.png"}
							height={28}
							width={28}
							alt={league.name}
						/>
					</div>
					<div className={styles.titles}>
						<span>
							{league.country} • {router.query.sport}
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
									height={20}
									width={20}
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
								height={20}
								width={20}
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
								height={20}
								width={20}
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
				{league.matches?.map((match, index) => (
					<Match
						{...match}
						mode={modeState}
						key={`league_match_${index}`}
					/>
				))}
				<button className={styles.seeMore}>See More</button>
			</div>
		</div>
	);
};

export const Match: React.FC<
	typeof matchSchema._type & { mode?: "live" | "odds" | "stats" }
> = (props) => {
	const { status, teams, date, odds, tipCount, mode } = props;
	const [isOpen, setIsOpen] = useState(false);

	function getTag(status: typeof matchSchema._type.status) {
		switch (status) {
			case "Half-time":
			case "Overtime":
			case "Overtime(deprecated)":
			case "Second half":
			case "Penalty Shoot-out":
			case "First half":
				return (
					<div className={styles.matchLive}>
						<Moment
							fromNow
							format="mm:SS"
						>
							{date}
						</Moment>
					</div>
				);
			case "Delay":
			case "Interrupt":
			case "To be determined":
			case "Not started":
				return (
					<div className={styles.matchUpcoming}>
						<Moment
							format="HH:mm"
							toNow
						>
							{date}
						</Moment>
						s
					</div>
				);
			case "Cancel":
			case "End":
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
									src={team.image ?? "/placeholeder.png"}
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
								(teams[0]?.score || 0) - (teams[1]?.score || 0) > 0 &&
								styles.win
							}`}
						>
							{teams[0]?.name}
						</div>
						<div
							className={`${styles.teamName} ${
								(teams[1]?.score || 0) - (teams[0]?.score || 0) > 0 &&
								styles.win
							}`}
						>
							{teams[1]?.name}
						</div>
					</div>
				</div>
				<div className={styles.details}>
					<div className={`${styles.outcome} ${styles.score}`}>
						<span
							className={`${
								(teams[0]?.score || 0) - (teams[1]?.score || 0) > 0 &&
								styles.win
							}`}
						>
							{teams[0]?.score}
						</span>
						<span
							className={`${
								(teams[1]?.score || 0) - (teams[0]?.score || 0) > 0 &&
								styles.win
							}`}
						>
							{teams[1]?.score}
						</span>
					</div>
					{mode == "odds" && (
						<>
							<div className={styles.percents}>
								<div
									className={styles.outcome}
									style={{ gap: "4px", marginTop: "-12px" }}
								>
									<span>Home</span>
									<span className={styles.oddVal}>
										{odds.home ?? 0}
									</span>
								</div>
								<div
									className={styles.outcome}
									style={{ gap: "4px", marginTop: "-12px" }}
								>
									<span>Draw</span>
									<span className={styles.oddVal}>
										{odds.draw ?? 0}
									</span>
								</div>
								<div
									className={styles.outcome}
									style={{ gap: "4px", marginTop: "-12px" }}
								>
									<span>Away</span>
									<span className={styles.oddVal}>
										{odds.away ?? 0}
									</span>
								</div>
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
							<div className={styles.percents}>
								<div className={styles.outcome}>
									<span>Home</span>
									<span>{(odds.home ?? 0) * 100}%</span>
								</div>
								<div className={styles.outcome}>
									<span>Draw</span>
									<span>{(odds.draw ?? 0) * 100}%</span>
								</div>
								<div className={styles.outcome}>
									<span>Away</span>
									<span>{(odds.away ?? 0) * 100}%</span>
								</div>
							</div>
							<div
								className={`${styles.total} ${
									isOpen ? styles.open : styles.closed
								}`}
								onClick={() => setIsOpen(!isOpen)}
							>
								{tipCount} Tip{(tipCount ?? 0) > 1 ? "s" : ""}
							</div>
						</>
					)}
				</div>
				<span className={styles.timeMobile}>{getTag(status)}</span>
			</div>
		</div>
	);
};

export default Leagues;
