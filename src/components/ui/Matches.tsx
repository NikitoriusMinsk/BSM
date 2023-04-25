import React, { useState } from "react";
import styles from "@styles/components/ui/Leagues.module.css";
import Image from "next/image";
import { MatchesByLeague } from "src/types/queryTypes";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import { motion } from "framer-motion";
import { MatchStatus } from "src/types/matchStatus";
import Moment from "react-moment";
import { Match } from "./Leagues";

interface MatchesInfoProps {
	leagues: MatchesByLeague;
	h3?: string;
	h2?: string;
	withLiveMatchesButton?: boolean;
	withDatePicker?: boolean;
}

type LeagueType = inferArrayElementType<MatchesByLeague>;
type MatchType = inferArrayElementType<inferArrayElementType<MatchesByLeague>["matches"]>;

const Matches: React.FC<MatchesInfoProps> = (props) => {
	const {
		leagues,
		h2,
		h3,
		withLiveMatchesButton = true,
		withDatePicker = true,
	} = props;

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [modeState, setModeState] = useState<"live" | "odds" | "stats">("odds");

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
		<div className={`${styles.container} ${styles.noGap}`}>
			<div className={styles.controls}>
				{(h2 || h3) && (
					<div className={styles.titles}>
						{h3 && <h3>{h3}</h3>}
						{h2 && <h2>{h2}</h2>}
					</div>
				)}
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
			{leagues.map((league, leagueIndex) => {
				return league.matches.map((match, index) => (
					<Match
						{...match}
						mode={modeState}
						key={`matches_match_${index}`}
					/>
				));
			})}
		</div>
	);
};

export default Matches;
