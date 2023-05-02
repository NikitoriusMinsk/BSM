import React from "react";
import styles from "@styles/pages/Bookmakers.module.css";
import Image from "next/image";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import { BestBookmakers, Bookmakers } from "src/types/queryTypes";
import { GetStaticProps, NextPage } from "next";
import { trpc } from "src/utils/trpc";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "src/server/trpc/router/_app";
import { createContext } from "src/server/trpc/context";
import superjson from "superjson";
import Slider from "@components/ui/Slider";
import ArrayToChunks from "src/utils/ArrayToChunks";
import useWindowSize from "src/utils/useWindowSize";

const Bookmakers: NextPage = () => {
	const { data: bestBookmakers, isLoading: bestBookmakersLoading } =
		trpc.bookmakers.getTop.useQuery();
	const { data: bookmakers, isLoading: bookmakersLoading } =
		trpc.bookmakers.getAll.useQuery();
	const { width } = useWindowSize();
	if (bestBookmakersLoading || bookmakersLoading) {
		return <div>Loading...</div>;
	}

	if (!bestBookmakers || !bookmakers) {
		return <div>Error...</div>;
	}

	function getBestBookmakerCount(width: number) {
		switch (true) {
			case width >= 1920:
				return 3;
			case width >= 1440:
				return 3;
			case width >= 1366:
				return 3;
			case width >= 1280:
				return 3;
			case width >= 1024:
				return 2;
			case width >= 768:
				return 2;
			case width >= 320:
				return 1;
			default:
				return 3;
		}
	}

	function getAllBookmakerCount(width: number) {
		switch (true) {
			case width >= 1920:
				return 8;
			case width >= 1440:
				return 8;
			case width >= 1366:
				return 8;
			case width >= 1280:
				return 8;
			case width >= 1024:
				return 6;
			case width >= 768:
				return 4;
			case width >= 320:
				return 4;
			default:
				return 8;
		}
	}

	return (
		<>
			<div className={styles.bestBookmakers}>
				<div className={styles.background}>
					<Image
						src="/images/stadium-background.png"
						fill
						alt=""
						style={{
							objectFit: "cover",
						}}
					/>
				</div>
				<div className={styles.header}>
					<h3>OUR CHOICE</h3>
					<h2>Best Bookmakers</h2>
				</div>
				<div className={styles.bookmakers}>
					<Slider
						swipable={true}
						showPagination={true}
					>
						{ArrayToChunks(bestBookmakers, getBestBookmakerCount(width)).map(
							(chunk, index) => (
								<div
									className={styles.bestBookmakersSlide}
									key={index}
								>
									{chunk.map((bookmaker, index) => (
										<BestBookmaker
											key={`best_bookmaker_${index}`}
											{...bookmaker}
										/>
									))}
								</div>
							)
						)}
					</Slider>
				</div>
			</div>
			<div className={styles.allBookmakers}>
				<div className={styles.header}>
					<h3>FROM A TO Z</h3>
					<h2>All Bookmakers</h2>
				</div>
				<div className={styles.bookmakers}>
					{bookmakers
						.slice(0, getAllBookmakerCount(width))
						.map((bookmaker, index) => (
							<Bookmaker
								key={`bookmaker_${index}`}
								{...bookmaker}
							/>
						))}
				</div>
			</div>
			<div className={styles.text}>
				<TextBlock />
			</div>
		</>
	);
};

const BestBookmaker: React.FC<inferArrayElementType<BestBookmakers>> = (props) => {
	const { color, image, name, rating, offer } = props;
	return (
		<div className={styles.bestBookmaker}>
			<div
				className={styles.info}
				style={{ backgroundColor: color }}
			>
				<div className={styles.row}>
					<Image
						src={image}
						height={50}
						width={140}
						alt={name}
						style={{
							objectFit: "contain",
						}}
					/>
					<div className={styles.rating}>
						<Image
							src="/icons/star-white.svg"
							height={24}
							width={24}
							alt=""
						/>
						<span>{rating}</span>
					</div>
				</div>
				<div className={styles.row}>
					<span className={styles.offer}>{offer}</span>
				</div>
			</div>
			<div className={styles.links}>
				<button className={styles.visit}>
					<span>Visit</span>
					<Image
						src="/icons/link.svg"
						height={24}
						width={24}
						alt=""
					/>
				</button>
				<button className={styles.review}>See Review</button>
			</div>
		</div>
	);
};

const Bookmaker: React.FC<inferArrayElementType<Bookmakers>> = (props) => {
	const { color, image, name, rating } = props;

	return (
		<div className={styles.bookmaker}>
			<div
				className={styles.info}
				style={{ backgroundColor: color }}
			>
				<span className={styles.name}>{name}</span>
				<Image
					src={image}
					height={50}
					width={140}
					alt={name}
				/>
			</div>
			<div className={styles.links}>
				<div className={styles.rating}>
					<Image
						src="/icons/star-black.svg"
						height={24}
						width={24}
						alt=""
						style={{ objectFit: "contain" }}
					/>
					<span>{rating}</span>
				</div>
				<button className={styles.review}>Review</button>
			</div>
		</div>
	);
};

const TextBlock: React.FC = () => {
	return (
		<>
			<div className={styles.block}>
				<h2>What Exactly Are Betting Sites?</h2>
				<span>
					Betting sites are nothing else than online platforms that are licensed
					to accept and pay out bets. They only became popular in the mid-2000s,
					which is the time where everyone was finally able to bask in the
					wonders of the internet. At first, it was just a collection of the
					most popular US sports market.
				</span>
				<span>
					As everything grew exponentially, players could place bets on things
					like soccer, cricket, winter sports, and just about everything else
					you can think of. Additionally, there are multiple kinds of betting
					sites United States players can try out. There are versatile ones, but
					you’ll also find specialized sportsbooks, too.
				</span>
			</div>
			<div className={styles.block}>
				<h2>How Do Online Betting Sites Work?</h2>
				<span>
					Whether it’s new betting sites, or old, reliable ones, the formula is
					still the same. Sports betting isn’t rocket science, so you won’t
					encounter innovations being applied on a weekly basis. That’s why
					knowing how do online betting sites work is an indispensable tool to
					every single bettor. So, how does the magic happen? Obviously, there
					are many things going on behind the scenes, but the mechanism is
					mostly based around these principles and steps:
				</span>
				<ul>
					<li>
						Players provide personal information to sites, mainly as a means
						of preventing money laundering and ensuring that the person is not
						a problem gambler. All of this info is provided when you’re
						creating an account, and the data is stored within secure servers.
					</li>
					<li>
						All the best online betting sites source their lines from
						oddsmakers. They can be employed by the site, but also come from
						third parties, too. Using a complex network of algorithms,
						formulas, and publicly available data, these professionals
						generate numerical odds that can be bet on.
					</li>
					<li>
						All the best online betting sites source their lines from
						oddsmakers. They can be employed by the site, but also come from
						third parties, too. Using a complex network of algorithms,
						formulas, and publicly available data, these professionals
						generate numerical odds that can be bet on.
					</li>
					<li>
						To place a bet, you must select a market that you want to add to
						your slip. Once you add one or more legs to the slip, entering the
						bet amount will automatically calculate your potential winnings.
					</li>
					<li>
						While it may seem like the bet is instantly processed, it’s
						officially through once the website has an official confirmation
						that the slip has been submitted. You should receive a
						confirmation once that is complete.
					</li>
					<li>
						If you lose your bet, nothing happens. If you win, your potential
						winnings will be automatically added to your balance once all
						events on the slip have been concluded. In case you believe you
						are wronged, you can contact customer support and an actual person
						will review your case.
					</li>
					<li>
						Did you win on some juicy MLB lines? Great, now is probably the
						final part of the inner workings of a betting site – withdrawals.
						As long as you have the amount in your account balance, you will
						just have to enter the amount you want to withdraw, pick a payment
						method, and input any additional details.
					</li>
				</ul>
				<span>
					That’s basically the whole process. Usually, we can pinpoint issues in
					one of these key situations as the main culprits behind a bad place to
					bet. Now, let’s take a look at how we rate online betting sites, and
					what impacts our final verdict the most.
				</span>
			</div>
			<div className={styles.block}>
				<h2>How We Rate Online Betting Sites</h2>
				<span>
					Our reviews can often get a bit complex, and it’s for a reason – we
					like to unravel the inner workings of every website. However, we also
					want you to know what we prioritize. That’s why our team had quite a
					brainstorming session, in which we determined that there are several
					pillars that form how we rate online betting sites:
				</span>
				<ul>
					<li>
						<b className={styles.highlight}>Licensing</b> is very important
						when assessing whether a site is good or not. The best betting
						sites United States players have access are licensed with a
						legitimate authority. It can be either a US state regulator or a
						government in another country. Regardless, the sites Betting.com
						recommends have a publicly available licensing record and undergo
						regular audits.
					</li>
					<li>
						<b className={styles.highlight}>Promos</b> showcase a site’s
						ability to consistently reward your loyalty. If you’re going to be
						spending lots of money on their moneylines and other markets,
						they’d better give make it worth it. For starters, a generous
						welcome bonus will do, followed by a loyalty program and maybe
						even a top-up.
					</li>
					<li>
						<b className={styles.highlight}>Design</b> and mobile-friendliness
						also play a large role in all of our high ratings. Sure, licensing
						and lucrative promos are important, but all of that’s worthless if
						you can’t actually use the thing. Betting.com top picks must have
						modern UIs, usable homepages, and intuitive designs.
					</li>
					<li>
						There is nothing better than good{" "}
						<b className={styles.highlight}>customer support</b>, as everyone
						needs help every once in a while. We prefer online betting sites
						to use live chat and be available 24/7, but email and phone
						support are also usable in some cases. All in all, you should be
						able to reach a dedicated agent in a few minutes.
					</li>
					<li>
						<b className={styles.highlight}>Odds and markets</b> are what you
						came for, right? Sure, we believe that US betting sites are a
						complex puzzle, but if you can’t find value and bet what you want
						– it’s pointless. The lines have to be consistent and above the
						industry average if you are to make the most out of every slip.
					</li>
				</ul>
				<span>
					And there you have it – the five pillars of every proper website. Now
					that you’re aware of what to look for and what to avoid. With that out
					of the way, let’s take a look at how to place bets on United States
					betting sites. Learning the process will put you in the best position
					to succeed.
				</span>
			</div>
			<div className={styles.block}>
				<h2>How to Place Bets on United States Betting Sites</h2>
				<span>
					There’s not much to learn when you’re looking at how to place bets on
					United States betting sites, to be honest. Before, things were a bit
					more complicated, and you had to jump through hoops in order to submit
					a slip. Nowadays, things are much simpler – just follow these steps,
					regardless of where you’re playing:
				</span>
				<ul>
					<li>
						<b className={styles.highlight}>Create an account.</b> Remember,
						this involves providing some basic personal information. Verify
						the account, if need be.
					</li>
					<li>
						<b className={styles.highlight}>Make a deposit.</b> Make sure it’s
						a payment method you’re already familiar with.
					</li>
					<li>
						<b className={styles.highlight}>Choose a sport and a league.</b>{" "}
						Whether it’s NBA, NHL, or NFL, or MLB markets, the best betting
						sites have it all. Again, Betting.com strongly advises you to pick
						a sport and competition that you’re familiar with.
					</li>
					<li>
						<b className={styles.highlight}>
							Check to see what games are on.
						</b>{" "}
						The key to placing bets successfully lies in planning. Once you’ve
						decided to, let’s say, bet on the NBA, you can see the schedule
						for the next few days. Highlight a couple of interesting games.
					</li>
					<li>
						<b className={styles.highlight}>
							Enter the bet amount and submit the slip.
						</b>{" "}
						Before you do anything, double-check everything to make sure you
						haven’t made a mistake. Think of which amount you want to wager
						and click submit.
					</li>
				</ul>
				<span>
					See? It wasn’t that hard, was it? Let’s get a bit more detailed and
					see what sports can you bet on. The best online betting sites have
					variety down to a science, so there’s no telling what you might find
					at the end of the day.
				</span>
			</div>
			<div className={styles.block}>
				<h2>What Sports Can You Bet On?</h2>
				<span>
					The only legitimate answer to the question “what sports can you bet
					on?” would be – everything. From traditional sports to virtual games
					and even the weather – if it can be put into numbers, you can most
					definitely bet on it. But most websites give the following sports and
					leagues the most coverage:
				</span>
			</div>
			<div className={styles.sports}>
				<div className={styles.sport}>
					<h3>NFL</h3>
					<span>
						See? It wasn’t that hard, was it? Let’s get a bit more detailed
						and see what sports can you bet on. The best online betting sites
						have variety down to a science, so there’s no telling what you
						might find at the end of the day.
					</span>
				</div>
				<div className={styles.sport}>
					<h3>NHL</h3>
					<span>
						Hockey is definitely on the upswing. And with the addition of the
						Seattle Kraken into the fold, there’s a lot to be excited about.
						Whether it is or it isn’t the best betting site 2022 the operator
						will surely let you wager money on almost anything – from fights
						to penalties and top points scorers. Browse to our NHL picks page
						to see the latest winning predictions and place your bet!
					</span>
				</div>
				<div className={styles.sport}>
					<h3>NBA</h3>
					<span>
						Recent rule changes have made every game more exciting to watch,
						which automatically means there’s lots of turmoil at betting sites
						throughout the US. There are more title contenders than ever, too.
						If you like watching the best of the best play hoops, you’ll have
						no problems finding great NBA odds.
					</span>
				</div>
				<div className={styles.sport}>
					<h3>MLB</h3>
					<span>
						If you like being overwhelmed with games and available markets,
						then baseball is the right pick. With almost 200 games played by
						the top teams, there’s no shortage of excitement and drama. Also,
						baseball is a numbers-based sport, which means that you can
						effectively predict much of what’s going on. You can check our
						best picks for MLB.
					</span>
				</div>
				<div className={styles.sport}>
					<h3>MLS</h3>
					<span>
						We’ve come a long way since the World Cup was hosted in the
						states, didn’t we? The MLS has outgrown its reputation as a
						retirement league for European stars and now fields many great
						teams with legitimate talent in their primes. US betting sites
						know how to cover both the regular season and the playoffs. Visit
						our MLS odds page
					</span>
				</div>
				<div className={styles.sport}>
					<h3>UFC</h3>
					<span>
						Whenever there’s a fight night, be sure that you’re going to find
						a lot of fun and quirky props. But when it comes to the main event
						and the top markets, UFC online betting sites are more than
						prepared for any amount of interest that comes their way.
					</span>
				</div>
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const ssg = createProxySSGHelpers({
		router: appRouter,
		ctx: await createContext(),
		transformer: superjson,
	});

	await ssg.bookmakers.getTop.prefetch();
	await ssg.bookmakers.getAll.prefetch();

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 60,
	};
};

export default Bookmakers;
