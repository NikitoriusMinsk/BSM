import type { GetStaticProps, NextPage } from "next";
import React from "react";
import styles from "@styles/pages/Blog.module.css";
import Image from "next/image";
import { trpc } from "src/utils/trpc";
import Moment from "react-moment";
import shortenString from "src/utils/shortenString";
import { MatchStatus } from "src/types/matchStatus";
import { createSSGHelpers } from "@trpc/react/ssg";
import { appRouter } from "src/server/router";
import { createContext } from "src/server/router/context";
import superjson from "superjson";

const BlogPage: NextPage = () => {
	const { data: news, isLoading: newsLoading } = trpc.useQuery(["news.getAll"]);
	const { data: matches, isLoading: matchesLoading } = trpc.useQuery(["matches.getAll"]);

	if (newsLoading || matchesLoading) {
		return <div>Loading...</div>;
	}

	if (!news || !matches) {
		return <div>Error...</div>;
	}

	return (
		<>
			<div className={`${styles.mainColumn} ${styles.top}`}>
				{news[0] && <MainNews {...news[0]} />}
				<NewsBlock
					news={news.slice(1, 7)}
					h2="Recently addded"
					h3="News"
				/>
			</div>
			<div className={`${styles.sideColumn} ${styles.top}`}>
				<SideNews news={news} />
				<TopMatches matches={matches} />
			</div>
			<FullWidthNewsBlock
				news={news.slice(7, 12)}
				h2="Last week"
				h3="News"
			/>
			<div className={`${styles.mainColumn} ${styles.bottom}`}>
				<NewsBlock
					news={news.slice(12)}
					h2="Last Month"
					h3="News"
				/>
			</div>
		</>
	);
};

interface MainNewsProps {
	title: string;
	date: string;
	image: string;
	likes: number;
	comments: number;
	views: number;
}

const MainNews: React.FC<MainNewsProps> = (props) => {
	const { title, date, image, likes, comments, views } = props;

	return (
		<div className={styles.mainNews}>
			<div className={styles.mainNewsLabel}>Popular</div>
			<Image
				src={image}
				alt={title}
				fill
				style={{
					objectFit: "cover",
				}}
			/>
			<div className={styles.mainNewsInfo}>
				<span className={styles.mainNewsDate}>
					<Moment format="DD MMM YYYY">{date}</Moment>
				</span>
				<h2 className={styles.mainNewsTitle}>{title}</h2>
			</div>
			<div className={styles.mainNewsStats}>
				<span className={styles.mainNewsStat}>
					<Image
						src="/icons/like.svg"
						alt="like"
						width={24}
						height={24}
					/>
					{likes}
				</span>
				<span className={styles.mainNewsStat}>
					<Image
						src="/icons/comment-white.svg"
						alt="comment"
						width={24}
						height={24}
					/>
					{comments}
				</span>
				<span className={styles.mainNewsStat}>
					<Image
						src="/icons/views.svg"
						alt="view"
						width={24}
						height={24}
					/>
					{views}
				</span>
			</div>
		</div>
	);
};

interface SideNewsProps {
	news: {
		title: string;
		date: string;
		image: string;
		likes: number;
		comments: number;
		views: number;
	}[];
}

const SideNews: React.FC<SideNewsProps> = (props) => {
	const { news } = props;

	return (
		<div className={styles.sideNews}>
			{news[0] && (
				<div className={styles.sideNewsMainNews}>
					<Image
						src={news[0].image}
						alt={news[0].title}
						fill
						style={{
							objectFit: "cover",
						}}
					/>
					<div className={styles.info}>
						<span className={styles.date}>
							<Moment format="DD MMM YYYY">{news[0].date}</Moment>
						</span>
						<h2 className={styles.title}>{shortenString(news[0].title, 75)}</h2>
					</div>
				</div>
			)}
			{news.slice(1, 4).map((news, index) => (
				<div
					key={`side_news_${index}`}
					className={styles.sideNewsOtherNews}
				>
					<div className={styles.image}>
						<Image
							src={news.image}
							alt={news.title}
							height={100}
							width={100}
							style={{
								objectFit: "cover",
							}}
						/>
					</div>
					<div className={styles.info}>
						<span className={styles.date}>
							<Moment format="DD MMM YYYY">{news.date}</Moment>
						</span>
						<h2 className={styles.title}>{shortenString(news.title, 45)}</h2>
						<div className={styles.stats}>
							<span className={styles.stat}>
								<Image
									src="/icons/comment.svg"
									alt="comments"
									width={16}
									height={16}
								/>
								{news.likes}
							</span>
							<span className={styles.stat}>
								<Image
									src="/icons/views-gray.svg"
									alt="views"
									width={16}
									height={16}
								/>
								{news.views}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

interface TopMatchesProps {
	matches: {
		teams: {
			name: string;
			image: string;
			score: number;
		}[];
		id: number;
		date: string;
		status: MatchStatus;
		duration?: string;
	}[];
}

const TopMatches: React.FC<TopMatchesProps> = (props) => {
	const { matches } = props;

	function getElementByStatus(match: typeof matches[0]): React.ReactElement {
		switch (match.status) {
			case MatchStatus.live:
				return <div className={styles.live}>Live</div>;
			default:
				return (
					<div className={styles.matchDate}>
						<Moment
							format="HH:mm"
							className={styles.date}
						>
							{match.date}
						</Moment>
						<span className={styles.today}>Today</span>
					</div>
				);
		}
	}

	return (
		<div className={styles.topMatches}>
			<div className={styles.topMatchesHeader}>
				<div className={styles.titles}>
					<h3>Today</h3>
					<h2>Top Matches</h2>
				</div>
				<button>See All</button>
			</div>
			<div className={styles.topMatchesContent}>
				{matches.slice(0, 5).map((match, index) => (
					<div
						key={`top_match_${index}`}
						className={styles.topMatch}
					>
						{getElementByStatus(match)}
						<div className={styles.topMatchInfo}>
							<div className={styles.topMatchTeams}>
								{match.teams.map((team, index) => (
									<div
										key={`top_match_team_image_${index}`}
										className={styles.topMatchTeam}
									>
										<Image
											src={team.image}
											alt={team.name}
											width={32}
											height={32}
										/>
									</div>
								))}
							</div>
							<div className={styles.topMatchTeamNames}>
								{match.teams.map((team, index) => (
									<div
										key={`top_match_team_name_${index}`}
										className={styles.topMatchTeamName}
									>
										{team.name}
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

interface NewsBlockProps {
	news: {
		title: string;
		date: string;
		image: string;
		likes: number;
		comments: number;
		views: number;
	}[];
	h2?: string;
	h3?: string;
}

const NewsBlock: React.FC<NewsBlockProps> = (props) => {
	const { news, h2, h3 } = props;

	return (
		<div className={styles.newsBlock}>
			{(h2 || h3) && (
				<div className={styles.newsBlockHeader}>
					{h3 && <h3>{h3}</h3>}
					{h2 && <h2>{h2}</h2>}
				</div>
			)}
			<div className={styles.newsBlockContent}>
				{news.map((news, index) => (
					<div
						key={`news_${index}`}
						className={styles.news}
					>
						<div className={styles.image}>
							<Image
								src={news.image}
								alt={news.title}
								fill
								style={{
									objectFit: "cover",
								}}
							/>
						</div>
						<div className={styles.info}>
							<div className={styles.mainInfo}>
								<span className={styles.date}>
									<Moment format="DD MMM YYYY">{news.date}</Moment>
								</span>
								<h2 className={styles.title}>{news.title}</h2>
							</div>
							<div className={styles.stats}>
								<span className={styles.stat}>
									<Image
										src="/icons/comment.svg"
										alt="comments"
										width={16}
										height={16}
									/>
									{news.comments}
								</span>
								<span className={styles.stat}>
									<Image
										src="/icons/views-gray.svg"
										alt="views"
										width={16}
										height={16}
									/>
									{news.views}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const FullWidthNewsBlock: React.FC<NewsBlockProps> = (props) => {
	const { news, h2, h3 } = props;
	return (
		<div className={styles.fullWidthNewsBlock}>
			{(h2 || h3) && (
				<div className={styles.fullWidthNewsBlockHeader}>
					{h3 && <h3>{h3}</h3>}
					{h2 && <h2>{h2}</h2>}
				</div>
			)}
			<div className={styles.fullWidthNewsBlockContent}>
				<div className={styles.main}>
					{news.slice(0, 2).map((news, index) => (
						<div
							key={`news_${index}`}
							className={styles.news}
						>
							<Image
								src={news.image}
								alt={news.title}
								fill
								style={{
									objectFit: "cover",
								}}
							/>
							<div className={styles.info}>
								<span className={styles.date}>
									<Moment format="DD MMM YYYY">{news.date}</Moment>
								</span>
								<h2 className={styles.title}>{news.title}</h2>
							</div>
							<div className={styles.stats}>
								<span className={styles.stat}>
									<Image
										src="/icons/comment-white.svg"
										alt="comment"
										width={24}
										height={24}
									/>
									{news.comments}
								</span>
								<span className={styles.stat}>
									<Image
										src="/icons/views.svg"
										alt="view"
										width={24}
										height={24}
									/>
									{news.views}
								</span>
							</div>
						</div>
					))}
				</div>
				<div className={styles.side}>
					{news.slice(2).map((news, index) => (
						<div
							key={`news_${index}`}
							className={styles.news}
						>
							<div className={styles.image}>
								<Image
									src={news.image}
									alt={news.title}
									height={100}
									width={100}
									style={{
										objectFit: "cover",
									}}
								/>
							</div>
							<div className={styles.info}>
								<span className={styles.date}>
									<Moment format="DD MMM YYYY">{news.date}</Moment>
								</span>
								<h2 className={styles.title}>{shortenString(news.title, 45)}</h2>
								<div className={styles.stats}>
									<span className={styles.stat}>
										<Image
											src="/icons/comment.svg"
											alt="comment"
											width={16}
											height={16}
										/>
										{news.comments}
									</span>
									<span className={styles.stat}>
										<Image
											src="/icons/views-gray.svg"
											alt="views"
											width={16}
											height={16}
										/>
										{news.views}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = createSSGHelpers({
		router: appRouter,
		ctx: await createContext(),
		transformer: superjson,
	});

	await ssg.prefetchQuery("news.getAll");
	await ssg.prefetchQuery("matches.getAll");

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 60,
	};
};

export default BlogPage;
