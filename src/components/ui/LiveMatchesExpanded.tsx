import React from "react";
import styles from "@styles/components/ui/LiveMatchesExpanded.module.css";
import Image from "next/image";
import { LiveMatches } from "src/types/queryTypes";
import { inferArrayElementType } from "src/utils/inferArrayElementType";

const LiveMatchesExpanded: React.FC<{ matches: LiveMatches }> = (props) => {
	const { matches } = props;

	return (
		<div className={styles.liveMatches}>
			<div className={styles.liveMatchesTitle}>
				<div className={styles.liveMatchesTitleText}>
					<h2>Top Matches</h2>
				</div>
			</div>
			<div className={styles.liveMatchesList}>
				<LiveMatch match={matches[0]} />
				<div className={styles.otherMatches}>
					{matches.slice(1).map((match, index) => (
						<LiveMatchCard
							match={match}
							key={`match_${index}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

interface LiveMatchProps {
	match?: inferArrayElementType<LiveMatches>;
}

const LiveMatch: React.FC<LiveMatchProps> = (props) => {
	const { match } = props;

	if (!match) return <></>;

	return (
		<div className={styles.liveMatchesItem}>
			<div className={styles.matchInfo}>
				<div className={styles.matchInfoHeader}>
					<div className={styles.matchDuration}>Live: {match.duration}</div>
					<div className={styles.buttonContainer}>
						<button>
							<Image
								src="/icons/expand.svg"
								width={20}
								height={20}
								alt="expand"
							/>
						</button>
					</div>
				</div>
				<div className={styles.matchLive}>
					<Image
						src="/images/live-match-placeholder.png"
						width={340}
						height={99}
						alt=""
					/>
				</div>
			</div>
			<div className={styles.matchTeams}>
				{match.teams.map((team, index) => (
					<div
						className={styles.matchTeam}
						key={`team_${index}`}
					>
						<span className={styles.matchTeamName}>{team.name}</span>
						<span className={styles.matchTeamScore}>{team.score}</span>
					</div>
				))}
			</div>
		</div>
	);
};

const LiveMatchCard: React.FC<LiveMatchProps> = (props) => {
	const { match } = props;

	if (!match) return <></>;

	return (
		<div className={styles.liveMatchesCard}>
			<div className={styles.logoDateBlock}>
				<div className={styles.teamLogos}>
					<div className={styles.logo}>
						<Image
							src="/testimg/club1.png"
							width={22}
							height={22}
							alt=""
						/>
					</div>
					<div className={styles.logo}>
						<Image
							src="/testimg/club2.png"
							width={22}
							height={22}
							alt=""
						/>
					</div>
				</div>
				<div className={styles.timeBlock}>
					{match.id==2 && <>
						<span className={styles.time}>
							23:30
						</span>
						<span className={styles.date}>
							16/02/2023
						</span>
					</>}
					{/* other types */}
					{match.id==3 && <div className={styles.liveTime}>
						LIVE: 25:33
					</div>}
					{match.id==4 && <div className={styles.beforeTime}>
						25:33s
					</div>}
				</div>
			</div>
			<div className={styles.resultBlock}>
				<span className={styles.league}>
					LEAGUE
				</span>
				<div className={styles.matchTeams}>
					{match.teams.map((team, index) => (
						<div
							className={styles.matchTeam}
							key={`team_${index}`}
						>
							<div className={styles.matchTeamName}>{team.name}</div>
						</div>
					))}
				</div>
				<div className={styles.tipsBtn}>
					21 Tips
				</div>
			</div>
		</div>
	);
};

export default LiveMatchesExpanded;
