import React from "react";
import { MostTips } from "src/types/queryTypes";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import styles from "@styles/components/ui/MatchTipsCard.module.css";
import { MatchStatus } from "src/types/matchStatus";
import Image from "next/image";

const MatchTipsCard: React.FC<inferArrayElementType<MostTips>> = (props) => {
	const { date, league, status, teams, tipAmount, duration } = props;

	function getStatusComponent(tip: inferArrayElementType<MostTips>) {
		switch (tip.status) {
			case MatchStatus.finished:
				return <span className={styles.mostTipsFinished}>{tip.duration}s</span>;
			case MatchStatus.live:
				return <span className={styles.mostTipsLive}>Live: {tip.duration}</span>;
			case MatchStatus.upcoming:
				return <span className={styles.mostTipsUpcoming}>{tip.date}</span>;
		}
	}

	return (
		<div className={styles.mostTipsItem}>
			<div className={styles.mostTipsRow}>
				<div className={styles.mostTipsTeams}>
					{teams.map((team, index) => (
						<div
							className={styles.mostTipsTeam}
							key={`team_image_${index}`}
						>
							<Image
								src={team.image}
								alt={team.name}
								width={35}
								height={35}
							/>
						</div>
					))}
				</div>
				{status && getStatusComponent(props)}
			</div>
			<div className={styles.mostTipsRow}>
				<div className={styles.mostTipsInfo}>
					<span className={styles.mostTipsLeague}>{league}</span>
					<div className={styles.mostTipsTeamNames}>
						{teams.map((team, index) => (
							<span
								className={styles.mostTipsTeamName}
								key={`team_name_${index}`}
							>
								{team.name}
							</span>
						))}
					</div>
				</div>
				<div className={styles.mostTipsTipAmount}>{tipAmount} Tips</div>
			</div>
		</div>
	);
};

export default MatchTipsCard;
