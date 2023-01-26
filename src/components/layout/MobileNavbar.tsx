import React, { useState } from "react";
import styles from "@styles/components/layout/MobileNavbar.module.css";
import Link from "next/link";
import { ReactSVG } from "react-svg";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/future/image";

const links = [
	{
		href: "/",
		label: "Popular",
		image: "/images/menu/popular-games.svg",
	},
	{ href: "/matches", label: "Matches", image: "/images/menu/matches.svg" },
	{
		href: "/tipster-rating",
		label: "Rating",
		image: "/images/menu/tipster-rating.svg",
	},
	{
		href: "/predictions",
		label: "Predictions",
		image: "/images/menu/predictions.svg",
	},
];

const MobileNavbar: React.FC = () => {
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<div className={styles.container}>
				<nav className={styles.links}>
					{links.map(({ href, label, image }) => (
						<MenuLink
							key={label}
							href={href}
							label={label}
							image={image}
							active={
								router.asPath.split("?")[0] === href && !isMenuOpen
							}
						/>
					))}
					<span
						className={`${styles.menuLink} ${
							isMenuOpen && styles.active
						}`}
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<ReactSVG
							className={styles.menuLinkIcon}
							src={"/images/menu/burger.svg"}
							alt={"Menu"}
							height={10}
							width={10}
						/>
						<span>{"Menu"}</span>
					</span>
				</nav>
			</div>
			<AnimatePresence initial={false}>
				{isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
			</AnimatePresence>
		</>
	);
};

interface MenuLinkProps {
	href: string;
	label: string;
	image: string;
	active?: boolean;
}

const MenuLink: React.FC<MenuLinkProps> = (props) => {
	const { href, label, active } = props;

	return (
		<Link href={href}>
			<a className={`${styles.menuLink} ${active && styles.active}`}>
				<ReactSVG
					className={styles.menuLinkIcon}
					src={props.image}
					alt={label}
					height={10}
					width={10}
				/>
				<span>{label}</span>
			</a>
		</Link>
	);
};

interface MenuProps {
	onClose: () => void;
}

const MenuVariants = {
	open: {
		opacity: 1,
		y: [-10, 0],
		transition: {
			duration: 0.2,
			ease: [0.6, 0.05, -0.01, 0.9],
		},
	},
	closed: {
		opacity: 0,
		y: [0, -10],
		transition: {
			duration: 0.2,
			ease: [0.6, 0.05, -0.01, 0.9],
		},
	},
};

const Menu: React.FC<MenuProps> = (props) => {
	const { onClose } = props;

	return (
		<motion.div
			className={styles.menu}
			variants={MenuVariants}
			initial="closed"
			animate="open"
			exit="closed"
		>
			<div className={styles.menuHeader}>
				<div
					className={styles.back}
					onClick={onClose}
				>
					<Image
						src={"/icons/arrow-narrow-right-black.svg"}
						height={24}
						width={24}
						alt="Back"
					/>
				</div>
				<h2>Navigation</h2>
			</div>
			<div className={styles.menuSection}>
				<div className={styles.column}>
					<div className={styles.menuItem}>
						<Image
							src="/images/menu/live-events.svg"
							alt="profile"
							width={24}
							height={24}
						/>
						<span>Live Events</span>
					</div>
					<div className={styles.menuItem}>
						<Image
							src="/icons/settings.svg"
							alt="profile"
							width={24}
							height={24}
						/>
						<span>Settings</span>
					</div>
				</div>
				<div className={styles.column}>
					<Link href="/user-dashboard">
						<a className={styles.menuItem}>
							<Image
								src="/images/menu/bookmakers.svg"
								alt="profile"
								width={24}
								height={24}
							/>
							<span>Bookmakers</span>
						</a>
					</Link>
					<div className={styles.menuItem}>
						<Image
							src="/images/menu/Blog.svg"
							alt="profile"
							width={24}
							height={24}
						/>
						<span>Blog</span>
					</div>
				</div>
			</div>
			<div className={styles.socials}>
				<h3>Social media</h3>
				<div className={styles.socialButtons}>
					<a
						href="https://facebook.com"
						target={"_blank"}
					>
						<Image
							src={"/icons/social/facebook.svg"}
							height={24}
							width={24}
							alt="Facebook"
						/>
						<span>Facebook</span>
					</a>
					<a
						href="https://instagram.com"
						target={"_blank"}
					>
						<Image
							src={"/icons/social/instagram.svg"}
							height={24}
							width={24}
							alt="Instagram"
						/>
						<span>Instagram</span>
					</a>
					<a
						href="https://twitter.com"
						target={"_blank"}
					>
						<Image
							src={"/icons/social/twitter.svg"}
							height={24}
							width={24}
							alt="Twitter"
						/>
						<span>Twitter</span>
					</a>
					<a
						href="https://telegram.com"
						target={"_blank"}
					>
						<Image
							src={"/icons/social/telegram.svg"}
							height={24}
							width={24}
							alt="Telegram"
						/>
						<span>Telegram</span>
					</a>
				</div>
			</div>
		</motion.div>
	);
};

export default MobileNavbar;
