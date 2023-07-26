import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { ReactSVG } from "react-svg";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import styles from "@styles/components/layout/Sidebar.module.css";
import { Url } from "url";
import { LastSportContext } from "src/pages/_app";

const links = [
	{
		href: "/[sport]",
		label: "Popular Games",
		image: "/images/menu/popular-games.svg",
		isDynamic: true,
	},
	{
		href: "/[sport]/matches",
		label: "Matches",
		image: "/images/menu/matches.svg",
		isDynamic: true,
	},
	{
		href: "/[sport]/live-matches",
		label: "Live Events",
		image: "/images/menu/live-events.svg",
		isDynamic: true,
	},
	{
		href: "tipster-rating",
		label: "Tipster Rating",
		image: "/images/menu/tipster-rating.svg",
		isDynamic: false,
	},
	{
		href: "/[sport]/predictions",
		label: "Predictions",
		image: "/images/menu/predictions.svg",
		isDynamic: true,
	},
	{
		href: "bookmakers",
		label: "Bookmakers",
		image: "/images/menu/bookmakers.svg",
		isDynamic: false,
	},
	{ href: "blog", label: "Blog", image: "/images/menu/blog.svg", isDynamic: false },
];

const Sidebar: React.FC = () => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const lastSport = useContext(LastSportContext);

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
				{links.map(({ href, label, image, isDynamic }) =>
					isDynamic ? (
						<MenuLink
							key={label}
							href={{
								pathname: href,
								query: {
									sport:
										router.query.sport ??
										lastSport?.name ??
										"Football",
								},
							}}
							label={label}
							image={image}
							active={router.pathname === href}
							expanded={isOpen}
						/>
					) : (
						<MenuLink
							key={label}
							href={`/${href}`}
							label={label}
							image={image}
							active={router.asPath.includes(href)}
							expanded={isOpen}
						/>
					)
				)}
			</div>
		</div>
	);
};

interface MenuLinkProps {
	href: LinkProps["href"];
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
		<Link
			href={href}
			className={`${styles.menuLink} ${active && styles.active} ${
				expanded && styles.expanded
			}`}
		>
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
		</Link>
	);
};

export default Sidebar;
