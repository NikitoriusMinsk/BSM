import React from "react";
import styles from "@styles/components/layout/MobileNavbar.module.css";
import Link from "next/link";
import { ReactSVG } from "react-svg";
import { useRouter } from "next/router";

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

	return (
		<div className={styles.container}>
			<nav className={styles.links}>
				{links.map(({ href, label, image }) => (
					<MenuLink
						key={label}
						href={href}
						label={label}
						image={image}
						active={router.asPath.split("?")[0] === href}
					/>
				))}
				<span className={`${styles.menuLink} ${false && styles.active}`}>
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

export default MobileNavbar;
