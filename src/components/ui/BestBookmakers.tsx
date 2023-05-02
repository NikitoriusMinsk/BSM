import React from "react";
import styles from "@styles/components/ui/BestBookmakers.module.css";
import Image from "next/image";
import { BestBookmakers } from "src/types/queryTypes";

const BestBookmakers: React.FC<{ bookmakers: BestBookmakers, mobileSlider?: boolean }> = ({ bookmakers, mobileSlider = false }) => {

	return (
		<div className={styles.bestBookmakers}>
			<div className={styles.bestBookmakersTitle}>
				<div className={styles.bestBookmakersTitleText}>
					<h3>Today</h3>
					<h2>Best Bookmakers</h2>
				</div>
				<button>See All</button>
			</div>
			<div className={`${styles.bestBookmakersList} ${mobileSlider && styles.mobileSlider}`}>
				{bookmakers.map((bookmaker, index) => (
					<div
						className={styles.bestBookmaker}
						style={{ backgroundColor: bookmaker.color }}
						key={`bookmaker_${index}`}
					>
						<div className={styles.bestBookmakerImage}>
							<Image
								src={bookmaker.image}
								alt={bookmaker.name}
								width={140}
								height={50}
							/>
						</div>
						<div className={styles.bestBookmakerRating}>
							{bookmaker.rating}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BestBookmakers;
