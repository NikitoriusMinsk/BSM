import React, { useState } from "react";
import styles from "@styles/components/layout/Footer.module.css";
import Link from "next/link";
import Image from "next/future/image";
import { motion } from "framer-motion";

const GeneralLinks = [
	{ href: "/about-us", text: "About us" },
	{ href: "/contact-us", text: "Contact us" },
	{ href: "/privacy-policy", text: "Privacy policy" },
	{ href: "/cookies-policy", text: "Cookies policy" },
	{ href: "/terms-of-us", text: "Terms of use" },
	{ href: "/faq", text: "FAQ" },
];

const ForecastLinks = [
	{ href: "/", text: "All Forecasts" },
	{ href: "/football", text: "Football forecasts" },
	{ href: "/basketball", text: "Basketball forecasts" },
	{ href: "/hockey", text: "Hockey forecasts" },
	{ href: "/tennis", text: "Tennis forecasts" },
	{ href: "/volleyball", text: "Volleyball forecasts" },
	{ href: "/contest", text: "Forecast contests" },
];

const BookmakerLinks = [
	{ href: "/", text: "All Bookmakers" },
	{ href: "/bet365", text: "Bet365" },
	{ href: "/betway", text: "Betway" },
	{ href: "/betvictor", text: "Betvictor" },
	{ href: "/1xbet", text: "1Xbet" },
];

const SocialLinks = [
	{
		href: "https://www.facebook.com/",
		text: "Facebook",
		image: "/icons/social/facebook.svg",
	},
	{
		href: "https://www.instagram.com/",
		text: "Instagram",
		image: "/icons/social/instagram.svg",
	},
	{
		href: "https://www.twitter.com/",
		text: "Twitter",
		image: "/icons/social/twitter.svg",
	},
	{
		href: "https://www.telegram.com/",
		text: "Telegram",
		image: "/icons/social/telegram.svg",
	},
];

const Footer: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<Column
					items={GeneralLinks}
					title="General"
				/>
				<Column
					items={ForecastLinks}
					title="Forecasts"
				/>
				<Column
					items={BookmakerLinks}
					title="Bookmakers"
				/>
				<div className={styles.column}>
					<h3>Social Media</h3>
					<div className={styles.links}>
						{SocialLinks.map(({ href, text, image }) => (
							<SocialLink
								key={href}
								href={href}
								text={text}
								image={image}
							/>
						))}
					</div>
				</div>
				<div className={styles.column}>
					Historical results are not an indication of future results. The
					information on betting.com website is not investment
					advice.betting.com does not facilitate betting on sports.
					betting.com is not a bookmaker and does not handle any payments
					for sports betting activities. Values quoted on the site hold no
					real or implied value.Betting.com is owned by Game Lounge Ltd, a
					Maltese company with organization number - C53144 and is
					completely independent of the gaming companies.
				</div>
			</div>
			<div className={styles.row}>
				<Image
					src="/icons/age-restriction.svg"
					alt="Age restriction"
					height={36}
					width={36}
				/>
				<span className={styles.copyright}>
					<Image
						src="/icons/copyright.svg"
						alt="Copyright"
						height={24}
						width={24}
					/>
					2022
				</span>
			</div>
		</div>
	);
};

interface ColumnProps {
	title: string;
	items: { href: string; text: string }[];
}

const ChevronVariants = {
	open: {
		rotateZ: 270,
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	},
	closed: {
		rotateZ: 90,
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	},
};

const LinksVariants = {
	open: {
		height: "auto",
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	},
	closed: {
		height: 0,
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	},
};
const Column: React.FC<ColumnProps> = (props) => {
	const { items, title } = props;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.column}>
			<h3>
				<span>{title}</span>
				<motion.div
					onClick={() => setIsOpen(!isOpen)}
					variants={ChevronVariants}
					animate={isOpen ? "open" : "closed"}
				>
					<Image
						src={"/icons/chevron-white.svg"}
						height={24}
						width={24}
						alt=""
					/>
				</motion.div>
			</h3>
			<motion.div
				className={styles.links}
				variants={LinksVariants}
				animate={isOpen ? "open" : "closed"}
			>
				{items.map(({ href, text }) => (
					<ColumnLink
						key={href}
						href={href}
						text={text}
					/>
				))}
			</motion.div>
		</div>
	);
};

interface LinkProps {
	href: string;
	text: string;
}

const ColumnLink: React.FC<LinkProps> = (props) => {
	const { href, text } = props;
	return (
		<Link href={href}>
			<a
				href={href}
				className={styles.link}
			>
				{text}
			</a>
		</Link>
	);
};

interface SocialLinkProps extends LinkProps {
	image: string;
}

const SocialLink: React.FC<SocialLinkProps> = (props) => {
	const { href, text, image } = props;
	return (
		<Link href={href}>
			<a
				href={href}
				className={styles.socialLink}
			>
				<Image
					src={image}
					alt={text}
					height={24}
					width={24}
				/>
				{text}
			</a>
		</Link>
	);
};

export default Footer;
