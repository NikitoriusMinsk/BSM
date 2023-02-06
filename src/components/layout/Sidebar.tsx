import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import styles from "@styles/components/layout/Sidebar.module.css";

const links = [
	{
		href: "/",
		label: "Popular Games",
		image: "/images/menu/popular-games.svg",
	},
	{ href: "/matches", label: "Matches", image: "/images/menu/matches.svg" },
	{
		href: "/live-matches",
		label: "Live Events",
		image: "/images/menu/live-events.svg",
	},
	{
		href: "/tipster-rating",
		label: "Tipster Rating",
		image: "/images/menu/tipster-rating.svg",
	},
	{
		href: "/predictions",
		label: "Predictions",
		image: "/images/menu/predictions.svg",
	},
	{
		href: "/bookmakers",
		label: "Bookmakers",
		image: "/images/menu/bookmakers.svg",
	},
	{ href: "/blog", label: "Blog", image: "/images/menu/blog.svg" },
];

const Sidebar: React.FC = () => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.container}>
			<div
				className={styles.menuButton}
				onClick={() => setIsOpen(!isOpen)}
			>
				<Image
					src="/icons/menu.svg"
					alt="menu"
					width={24}
					height={24}
				/>
			</div>
			<div className={styles.menu}>
				{links.map(({ href, label, image }) => (
					<MenuLink
						key={label}
						href={href}
						label={label}
						image={image}
						active={router.asPath.split("?")[0] === href}
						expanded={isOpen}
					/>
				))}
			</div>
		</div>
	);
};

interface MenuLinkProps {
	href: string;
	label: string;
	image: string;
	active?: boolean;
	expanded?: boolean;
}

const MenuTextVariants = {
	open: {
		width: "max-content",
		transition: {
			type: "easeInOut",
			duration: 0.2,
		},
	},
	closed: {
		width: 0,
		transition: {
			type: "easeInOut",
			duration: 0.2,
		},
	},
};

const MenuLink: React.FC<MenuLinkProps> = (props) => {
	const { href, label, active, expanded } = props;

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
				<AnimatePresence initial={false}>
					{expanded && (
						<motion.div
							className={styles.menuLinkLabel}
							variants={MenuTextVariants}
							initial="closed"
							animate="open"
							exit="closed"
						>
							{label}
						</motion.div>
					)}
				</AnimatePresence>
			</a>
		</Link>
	);
};

export default Sidebar;
