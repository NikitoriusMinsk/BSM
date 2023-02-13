import { NextPage } from "next";
import React from "react";
import styles from "@styles/pages/AboutUs.module.css";
import Image from "next/image";

const AboutUs: NextPage = () => {
	return (
		<>
			<div className={styles.predictionOffers}>
				<TipsAndOffers />
			</div>
			<div className={styles.ourGoals}>
				<OurGoals />
			</div>
		</>
	);
};

const TipsAndOffers: React.FC = () => {
	return (
		<>
			<h2>Free Tips And Prediction Offers</h2>
			<div className={styles.content}>
				<div className={styles.block}>
					<div className={styles.mobileText}>
						<Image
							src="/images/about-us/daily-tips.png"
							height={100}
							width={100}
							alt=""
						/>
						<h3>Free Daily Basic Tips</h3>
					</div>
					<div className={styles.text}>
						<h3>Free Daily Basic Tips</h3>
						<span>
							Randomly selected match tips with success rate of 80% in
							form of 1X2, BTS(Goal) amd Over/Under categories.
						</span>
					</div>
				</div>
				<div className={styles.block}>
					<div className={styles.mobileText}>
						<Image
							src="/images/about-us/latest-news.png"
							height={100}
							width={100}
							alt=""
						/>
						<h3>Latest Sport News</h3>
					</div>
					<div className={styles.text}>
						<h3>Latest Sport News</h3>
						<span>
							We provide latest and updated sports news across the
							world to keep you always informed.
						</span>
					</div>
				</div>
				<div className={styles.block}>
					<div className={styles.mobileText}>
						<Image
							src="/images/about-us/expert-tips.png"
							height={100}
							width={100}
							alt=""
						/>
						<h3>Daily Expert and Premium Tips</h3>
					</div>
					<div className={styles.text}>
						<h3>Daily Expert and Premium Tips</h3>
						<span>
							Safe and secure daily match tips which are sure and 99.9%
							guaranteed. Jackpot plus many more.
						</span>
					</div>
				</div>
				<div className={styles.block}>
					<div className={styles.mobileText}>
						<Image
							src="/images/about-us/daily-picks.png"
							height={100}
							width={100}
							alt=""
						/>
						<h3>Sure Daily Picks</h3>
					</div>
					<div className={styles.text}>
						<h3>Sure Daily Picks</h3>
						<span>
							Daily Super ttips with 7+ odds and many more to win you
							quick cash and profitability
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

const OurGoals: React.FC = () => {
	return (
		<>
			<div className={styles.block}>
				<h3>WHAT IS OUR GOAL? WHAT DO YOU GET?</h3>
				<span>
					Winabettips is one of the best football prediction sites in Kenya
					and the world at large. It brings you free high odds soccer
					predictions for all the matches available across all platforms in
					the World.As Winabettips today we study available games in
					Football, Tennis, Basketball and Handball, and determine where
					the best value is irrespective of odds size, we use statistics to
					determine the safest leagues and players to stake on and we
					follow hundreds of sports channels daily to get the latest news.
					Every day, we feature some of the web’s most trusted sporting
					tipsters – providing punters with top value bets from leagues and
					sports across the world. You get the best well researched, very
					accurate betting predictions and complete statistics of our
					previous performance be it profit or loses to enable you predicts
					your possible profitability using our tips.We also provided
					latest Sports news to always keep our customers updated.
				</span>
			</div>
			<div className={styles.block}>
				<h3>We</h3>
				<ul id={styles.checks}>
					<li>Carefully analyse sport matches</li>
					<li>Thoroughly examine upcoming sporting events</li>
					<li>
						Analyze all aspects to make sure the result we predict will
						be as accurate as possible
					</li>
					<li>Avoid predicting uncertain sport matches</li>
					<li>Provide analytical report for our premium users</li>
					<li>Provide expert picks for our users to make selections</li>
				</ul>
			</div>
			<div className={styles.block}>
				<h3>You</h3>
				<ul id={styles.stars}>
					<li>Receive a complete analysis of upcoming sport matches</li>
					<li>Form your ideas and opinions based on our guidance</li>
					<li>Make your bets on single or multiple games</li>
					<li>
						Increase the success rate of your bets with any bookmaker
					</li>
					<li>
						Aren’t spending a lot of time making match forecasts on your
						own
					</li>
					<li>
						<b>WIN!</b>
					</li>
				</ul>
			</div>
			<div className={styles.block}>
				<span>
					Optimobet will increase the success rate of your bets!.This means
					we get to give you the best winning percentage and regular high
					payouts both in short-term and long-term as well as unrivalled
					profitability.Today’s football betting predictions, tomorrow’s
					football betting predictions and weekend football betting
					predictions are all added as they become available from the best
					tipsters. Keeps subscribing to get the best out of it.
				</span>
			</div>
			<div className={styles.block}>
				<h3>How We Operate</h3>
				<span>Each Optimobet advice contains:</span>
				<ul id={styles.operate}>
					<li>Horoughly examined upcoming sporting events</li>
					<li>
						Analyze all aspects to make sure the result we predict will
						be as accurate as possible
					</li>
					<li>Avoid predicting uncertain sport matches</li>
				</ul>
				<span>
					We offer the most likely outcome of each football match. You will
					clearly see reasons why selected teams or football matches ought
					to win and minimize your risks.Our team offers you complete
					details concerning upcoming football matches. You are not
					compelled to take all our selections. It is your choice whether
					to place a bet on recommended result. We help you make decisions,
					which provide real monetary value for you. Visit{" "}
					<b>Our operation</b> for more information
				</span>
			</div>
			<div className={styles.block}>
				<h3>We Predict Top Leagues</h3>
				<span>
					We provide soccer predictions and tips for over 30 popular
					leagues in the world, including the{" "}
					<b>
						English Premier League, German Bundesliga, Italian Serie A,
						Spanish Laliga, French Ligue 1, Turkey Super Lig Australian
						A-League, UEFA Champions League League, Europa League
						Predictions, Euro 2020, Netherlands Eredivisie, Scotland
						Premiership, Portugal Primera Liga, Russia Premier League,
						Poland Ekstraklasa, Spain Copa Del Rey
					</b>{" "}
					and many more. Our experts make forecasts for today's matches and
					ensure that no matches in lower leagues are left out. We also
					provide match previews, reports and blog about everything
					football betting. So our users are regularly updated with the
					latest happenings in the world of sports through our{" "}
					<b>News Channel</b>.
				</span>
				<span>
					Optimobet team offers predictions mainly on top leagues and
					tournaments. If we made careless decisions, imagine the effect it
					would have on the bankroll of our esteemed users. Investing in
					unclear tournaments is too careless for your bankroll. It is
					almost impossible to offer quality predictions on events if there
					is no open-source information about them. Top-leagues are under
					the constant close attention of media and sport governing
					organizations, unlike non-popular championships, where there is a
					high chance of bribery. In this case, how can you trust such an
					analysis?
				</span>
			</div>
		</>
	);
};

export default AboutUs;
