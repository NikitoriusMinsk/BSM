import React from "react";
import styles from "@styles/components/ui/Prediction.module.css";
import {
	HistoricalPredictions,
	PendingPredictions,
	TrackingPredictions,
	MatchPredictions,
} from "src/types/queryTypes";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import Moment from "react-moment";
import Image from "next/image";
import TextField from "./TextField";

type CommentType = inferArrayElementType<
	inferArrayElementType<
		| TrackingPredictions
		| PendingPredictions
		| HistoricalPredictions
		| MatchPredictions
	>["info"]["comments"]
> & { canReply?: boolean };

// add a prediction type from a specific match (all types should have matching fields)
const Prediction: React.FC<
	inferArrayElementType<
		| TrackingPredictions
		| PendingPredictions
		| HistoricalPredictions
		| MatchPredictions
	>
> = (props) => {
	const { author, date, info } = props;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.info}>
					<span className={styles.date}>
						<Moment
							className={styles.part}
							format="HH:mm"
						>
							{date}
						</Moment>
						<Moment
							className={styles.part}
							format="DD MMM"
						>
							{date}
						</Moment>
					</span>
					<div className={styles.user}>
						<div className={styles.avatar}>
							<Image
								src={author.image}
								height={46}
								width={46}
								alt=""
							/>
						</div>
						<div className={styles.userDetails}>
							<span>{author.name}</span>
							<span>Hit Rate {author.winrate * 100}%</span>
						</div>
					</div>
					<button
						className={`${
							author.subscribed ? styles.subscribed : styles.subscribe
						}`}
					>
						Subscribe
					</button>
				</div>
				<div className={styles.controls}>
					<div className={styles.track}>
						<Image
							src={
								info?.tracking
									? "/icons/star-filled.svg"
									: "/icons/star.svg"
							}
							height={24}
							width={24}
							alt=""
						/>
					</div>
					<span className={styles.tracking}>Tracking: 228</span>

					<div className={styles.share}>
						<Image
							src="/icons/share-black.svg"
							height={24}
							width={24}
							alt=""
						/>
					</div>
				</div>
			</div>
			{info && (
				<div className={styles.predictionInfo}>
					{info.match && info.match.teams[0] && info.match.teams[1] && (
						<div className={styles.matchInfo}>
							<div className={styles.background}>
								<Image
									src="/images/prediction-background.png"
									fill
									alt=""
									style={{
										objectFit: "cover",
									}}
								/>
							</div>
							<div className={styles.matchDetails}>
								<div className={styles.team}>
									<div className={styles.teamLogo}>
										<Image
											src={info.match.teams[0].image}
											height={22}
											width={22}
											alt=""
										/>
									</div>
									<span>{info.match.teams[0].name}</span>
								</div>
								<div className={styles.results}>
									<div className={styles.score}>
										<span>{info.match.teams[0].score ?? "-"}</span>
										<div className={styles.date}>
											<Moment
												className={styles.part}
												format="HH:mm"
											>
												{info.match.date}
											</Moment>
											<Moment
												className={styles.part}
												format="DD MMM"
											>
												{info.match.date}
											</Moment>
										</div>
										<span>{info.match.teams[1].score ?? "-"}</span>
									</div>
									<div className={styles.league}>
										<span>{info.match.league}</span>
										<span>•</span>
										<span>{info.match.sport.name}</span>
									</div>
								</div>
								<div className={styles.team}>
									<div className={styles.teamLogo}>
										<Image
											src={info.match.teams[1].image}
											height={22}
											width={22}
											alt=""
										/>
									</div>
									<span>{info.match.teams[1].name}</span>
								</div>
							</div>
						</div>
					)}
					{info.text && (
						<>
							<div className={styles.predictionText}>{info.text}</div>
							<div className={styles.separator} />
						</>
					)}
					{(author.subscribed) || (!author.subscribed && !author.paid) ? 
						<div className={styles.outcomes}>
							<div className={styles.outcome}>
								<span>Market</span>
								<span>{info.market}</span>
							</div>
							<div className={styles.outcome}>
								<span>Selection</span>
								<span>{info.selection}</span>
							</div>
							<div className={styles.outcome}>
								<span>Stake</span>
								<span>{info.stake}</span>
							</div>
							{info.bookmaker && 
								<div className={styles.bookmaker}>
									<Image
										src={info.bookmaker.image}
										height={20}
										width={56}
										alt=""
									/>
									<span className={styles.odd}>{info.bookmaker.odd}</span>
								</div>
							}						
							<div className={styles.profit}>
								<span
									className={
										info.profit?.potential
											? styles.potential
											: (info.profit?.amount && (info.profit?.amount > 0))
											? styles.positive
											: styles.negative
									}
								>
									{info.profit?.potential ? "Potential profit" : (info.profit?.amount && (info.profit?.amount > 0)) ? "Success" : "Lost"}
								</span>
								<span>$ {info.profit?.amount}</span>
							</div>
							{info.bet_now && (
								<div className={styles.betNow}>
									<Image
										src="/icons/refresh.svg"
										height={24}
										width={24}
										alt=""
									/>
									Bet Now
								</div>
							)}
						</div>
						:
						<div className={styles.outcomes}>
							<div className={styles.paidText}>
								<span className={styles.paidTip}>
									<Image 
										src={'/icons/locked.svg'}
										width={20}
										height={20}
										alt=""
									/>
									Paid tip
								</span>
								<span className={styles.paidAcc}>
									Please subscrie to <a>Gabriel</a> to gain access to the tip
								</span>
							</div>
							<div className={styles.paidPrice}>
								<span>
									$ 36.
								</span>
								<span>
									50
								</span>
								<span>
									/MO
								</span>
							</div>
						</div>
					}
					<div className={styles.stats}>
						<div className={styles.stat}>
							<Image
								src={
									info.liked
										? "/icons/like-filled.svg"
										: "/icons/like-black.svg"
								}
								height={24}
								width={24}
								alt=""
							/>
							<span className={styles.label}>Like</span>
							<span>{info.like_count}</span>
						</div>
						{(author.subscribed) || (!author.subscribed && !author.paid) && 
							<div className={styles.stat}>
								<Image
									src="/icons/comment.svg"
									height={24}
									width={24}
									alt=""
								/>
								<span className={styles.label}>Comments</span>
								<span>{info.comment_count}</span>
							</div>
						}
					</div>
					{(author.subscribed) || (!author.subscribed && !author.paid) && 
						<div className={styles.commentsContainer}>
							<div className={styles.comments}>
								<h3>Comments</h3>
								<div className={styles.commentsList}>
									{info.comments?.map((comment, index) => (
										<Comment
											{...comment}
											key={`comment_${index}`}
										/>
									))}
								</div>
								<div className={styles.input}>
									<div className={styles.avatar}>
										<Image
											src="/images/profile-placeholder.png"
											height={46}
											width={46}
											alt=""
										/>
									</div>
									<div className={styles.textField}>
										<TextField
											placeholder="Write a comment"
											icon="/icons/send.svg"
										/>
									</div>
								</div>
							</div>
						</div>
					}					
				</div>
			)}
		</div>
	);
};

const Comment: React.FC<CommentType> = (props) => {
	const { user, text, date, replies, canReply = true } = props;
	return (
		<div className={styles.commentContainer}>
			<div className={styles.comment}>
				<div className={styles.avatar}>
					<Image
						src={user.image}
						height={46}
						width={46}
						alt=""
					/>
				</div>
				<div className={styles.info}>
					<div className={styles.content}>
						<div className={styles.data}>
							<span className={styles.name}>{user.name}</span>
							<span className={styles.text}>{text}</span>
						</div>
						<div className={styles.controls}>
							<Image
								src="/icons/more.svg"
								height={24}
								width={24}
								alt=""
							/>
						</div>
					</div>
					<div className={styles.details}>
						<div className={styles.date}>
							<Moment
								className={styles.part}
								format="HH:mm"
							>
								{date}
							</Moment>
							<Moment
								className={styles.part}
								format="DD MMM YYYY"
							>
								{date}
							</Moment>
						</div>
						{canReply && <span className={styles.reply}>Reply</span>}
					</div>
				</div>
			</div>
			{replies.length > 0 && replies && (
				<div className={styles.replies}>
					{replies.map((reply, index) => (
						<Comment
							{...reply}
							key={`reply_${index}`}
							canReply={false}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Prediction;
