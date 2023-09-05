import Image from "next/image"
import Link from "next/link"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { CircularProgressbarWithChildren } from "react-circular-progressbar"
import React, { ReactNode, useMemo, useState } from "react"
import { trpc } from "src/utils/trpc"
import styles from "@styles/components/dashboard/DashboardTab.module.css"
import sharedStyles from "@styles/components/dashboard/shared.module.css"
import DisaperingContainer from "@components/helpers/DisaperingContainer"
import useWindowSize from "src/utils/useWindowSize"

const DashboardTab: React.FC = () => {
	const { data, isLoading } = trpc.user.getDashboardInfo.useQuery()

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (!data) {
		return <div>Error...</div>
	}

	return (
		<>
			<div
				id={styles.profit}
				className={`${sharedStyles.block} ${sharedStyles.narrow} ${
					data.avgProfit > 0
						? sharedStyles.positive
						: sharedStyles.negative
				}`}
			>
				<Image
					src="/images/dashboard/wallet.svg"
					height={60}
					width={60}
					alt=""
				/>
				<div className={styles.text}>
					<h5>Avg. Monthly Profit</h5>
					<span>$ {data.avgProfit}</span>
				</div>
			</div>
			<div
				id={styles.stats}
				className={`${sharedStyles.block} ${sharedStyles.wide}`}
			>
				<div className={styles.stat}>
					<h3>ROI</h3>
					<span>{data.roi * 100}%</span>
				</div>
				<div className={styles.stat}>
					<h3>Tips Per Month</h3>
					<span>{data.tips_per_month}</span>
				</div>
				<div className={styles.stat}>
					<h3>Hit rate</h3>
					<span>{data.winrate * 100}%</span>
				</div>
			</div>

			<div
				id={styles.coins}
				className={`${sharedStyles.block} ${sharedStyles.wide}`}
			>
				<div className={styles.info}>
					<Image
						src="/images/dashboard/piggy-bank.svg"
						height={60}
						width={60}
						alt=""
					/>
					<div className={styles.count}>
						<h4>Coins</h4>
						<span>{data.coins.count}</span>
					</div>
				</div>
				<div className={styles.description}>
					<span>
						If you want to know more about the local currency and
						how to get it, visit the “About Coin” page
					</span>
					<Link href="/about-coins">
						<span>View more about coin</span>
					</Link>
				</div>
			</div>
			<div
				id={styles.bookmaker}
				className={`${sharedStyles.block} ${sharedStyles.narrow}`}
			>
				<h5>Favorite Bookmaker</h5>
				<div className={styles.bookmakerLogo}>
					<Image
						src={data.favoriteBookmaker.image}
						fill
						style={{ objectFit: "contain" }}
						alt=""
					/>
				</div>
			</div>

			<div
				id={styles.sport}
				className={`${sharedStyles.block} ${sharedStyles.small}`}
			>
				<Image
					src={data.favoriteSport.image}
					height={60}
					width={60}
					alt=""
				/>
				<div className={styles.info}>
					<h5>Favorite Sport</h5>
					<h2>{data.favoriteSport.name}</h2>
				</div>
			</div>
			<div
				id={styles.odds}
				className={`${sharedStyles.block} ${sharedStyles.narrow}`}
			>
				<div className={styles.info}>
					<Image
						src="/images/dashboard/chart-bubble.svg"
						height={60}
						width={60}
						alt=""
					/>
					<div className={styles.text}>
						<h5>Average Odds</h5>
						<span>{data.odds.avg}</span>
					</div>
				</div>
				<StatisticsChart data={data.odds.history} />
			</div>
			<div
				id={styles.unit}
				className={`${sharedStyles.block} ${sharedStyles.narrow}`}
			>
				<div className={styles.info}>
					<h5>All Time Average Unit Rate</h5>
					<div className={styles.detailed}>
						<Image
							src="/images/dashboard/coin.svg"
							height={60}
							width={60}
							alt=""
						/>
						<div className={styles.text}>
							<h4>Coins</h4>
							<span>{data.coins.count}</span>
						</div>
					</div>
				</div>
				<StatisticsChart data={data.coins.history} />
			</div>

			<div
				id={styles.bets}
				className={`${sharedStyles.block} ${sharedStyles.wide}`}
			>
				<div className={styles.info}>
					<h5>Bet Outcome</h5>
				</div>
				<div className={styles.progressBarContainer}>
					<div className={`${styles.progressBar} ${styles.won}`}>
						<CircularProgressbarWithChildren
							value={(data.bets.won / data.bets.total) * 360}
							maxValue={360}
							styles={{
								path: {
									strokeLinecap: "round",
									strokeWidth: "2px",
									stroke: "#7F3FFC",
								},
							}}
						>
							<h3>Won</h3>
							<span className={styles.circleInfo}>
								{data.bets.won}
								<Image
									src={"/icons/stonks.svg"}
									height={20}
									width={20}
									alt=""
								/>
							</span>
						</CircularProgressbarWithChildren>
					</div>
					<div className={`${styles.progressBar} ${styles.pending}`}>
						<CircularProgressbarWithChildren
							value={(data.bets.pending / data.bets.total) * 360}
							maxValue={360}
							styles={{
								path: {
									strokeLinecap: "round",
									strokeWidth: "2px",
									stroke: "#FFB82D",
								},
								root: {
									transform: `rotate(${
										360 -
										(data.bets.won / data.bets.total) * 360
									}deg)`,
								},
							}}
						>
							<h3>Pending</h3>
							<span>{data.bets.pending}</span>
						</CircularProgressbarWithChildren>
					</div>
					<div className={`${styles.progressBar} ${styles.lost}`}>
						<CircularProgressbarWithChildren
							value={(data.bets.lost / data.bets.total) * 360}
							maxValue={360}
							styles={{
								path: {
									strokeLinecap: "round",
									strokeWidth: "2px",
									stroke: "#FF5018",
								},
								root: {
									transform: `rotate(${
										360 -
										(data.bets.lost / data.bets.total) * 360
									}deg)`,
								},
							}}
						>
							<h3>Lost</h3>
							<span className={styles.circleInfo}>
								{data.bets.lost}{" "}
								<Image
									src={"/icons/stinks.svg"}
									height={20}
									width={20}
									alt=""
								/>
							</span>
						</CircularProgressbarWithChildren>
					</div>
				</div>
			</div>
		</>
	)
}

const StatisticsChart: React.FC<{ data: { time: number; value: number }[] }> = (
	props
) => {
	const { data } = props

	return (
		<ResponsiveContainer
			height={100}
			width="100%"
		>
			<LineChart data={data}>
				<Line
					type="linear"
					dataKey="value"
					stroke="#7F3FFC"
					strokeWidth={2}
					dot={false}
					strokeLinecap="round"
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}

export default DashboardTab
