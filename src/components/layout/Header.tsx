import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "@styles/components/layout/Header.module.css";
import Dropdown from "@components/ui/Dropdown";
import TextField from "@components/ui/TextField";
import Fuse from "fuse.js";
import Settings from "@components/layout/shared/Settings";
import MenuLink from "@components/layout/shared/MenuLink";
import { trpc } from "src/utils/trpc";
import Moment from "react-moment";
import debounce from "src/utils/debounce";
import UserProfile from "./shared/UserProfile";
import useWindowSize from "src/utils/useWindowSize";
import { useSession } from "next-auth/react";
import { RouterOutput } from "src/types/queryTypes";
import moment from "moment-timezone";
import timezones from "src/utils/Timezones";

const Header: React.FC = () => {
	const router = useRouter();
	const { data: sports } = trpc.navigation.getSports.useQuery();
	const { width } = useWindowSize();
	const { data: session } = useSession();

	function GetSportCount(width: number) {
		switch (true) {
			case width >= 1920:
				return 6;
			case width >= 1440:
				return 5;
			case width >= 1366:
				return 5;
			case width <= 1024 && session != null:
				return 2;
			case width <= 1024:
				return 3;
			case width <= 1280:
				return 4;
			default:
				return 6;
		}
	}

	function getTZInfo(width: number, name: string) {
		switch (true) {
			case width > 1440:
				return (
					<Moment
						tz={name}
						format={`DD.MM [${name.replace("_", " ")}] Z`}
					/>
				);
			default:
				return "";
		}
	}

	return (
		<div className={styles.container}>
			<Link
				href={"/"}
				className={styles.logo}
			>
				<Image
					src="/logo.svg"
					height={36}
					width={150}
					alt=""
				/>
			</Link>
			<nav>
				{sports && (
					<>
						{sports.slice(0, GetSportCount(width)).map((sport) => (
							<MenuLink
								key={sport.id}
								active={router.asPath.includes(`/${sport.name}`)}
								href={`/${sport.name}`}
								label={sport.name}
							/>
						))}
						<More items={sports.slice(GetSportCount(width))} />
					</>
				)}
			</nav>
			<div className={styles.controls}>
				<Dropdown
					defaultSelectedId={moment.tz.guess()}
					items={timezones.map((tz) => ({
						name: getTZInfo(width, tz.timezone),
						label: (
							<Moment
								format={"HH:mm"}
								tz={tz.timezone}
							/>
						),
						id: tz.timezone,
					}))}
					onSelect={(tz) => {
						Moment.globalTimezone = tz;
					}}
				/>
				<Settings />
				<UserProfile />
			</div>
		</div>
	);
};

interface MoreProps {
	items: RouterOutput["navigation"]["getSports"];
}

const MoreItemsVariants = {
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

const More: React.FC<MoreProps> = (props) => {
	const { items } = props;
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [filteredItems, setFilteredItems] = useState<MoreProps["items"]>(items);

	function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.value.length > 0) {
			const options = {
				includeScore: false,
				includeRefIndex: false,
				threshold: 0.3,
				keys: ["name"],
			};
			const fuse = new Fuse(items, options);
			const result = fuse.search(e.target.value).map((item) => item.item);
			setFilteredItems(result);
		} else {
			setFilteredItems(items);
		}
	}

	const closeIfNotDropdown = (e: MouseEvent) => {
		if (
			e.target != dropdownRef.current &&
			!dropdownRef.current?.contains(e.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (window) window.addEventListener("click", closeIfNotDropdown);
		return () => {
			window.removeEventListener("click", closeIfNotDropdown);
		};
	}, []);

	return (
		<div
			className={styles.more}
			ref={dropdownRef}
		>
			<div
				className={styles.moreIcon}
				onClick={() => setIsOpen(!isOpen)}
			>
				<Image
					src="/icons/more.svg"
					height={24}
					width={24}
					alt=""
				/>
			</div>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						className={styles.moreItems}
						variants={MoreItemsVariants}
						initial="closed"
						animate="open"
						exit="closed"
					>
						<TextField
							placeholder="Search"
							onChange={debounce(handleSearch, 500)}
						/>
						{filteredItems.map((item) => (
							<Link
								href={`/${item.name}`}
								key={item.id}
								className={styles.moreItem}
							>
								{item.name}
							</Link>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Header;
