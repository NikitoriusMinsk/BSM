import React, { useState } from "react";
import { LeaguesByCountry } from "src/types/queryTypes";
import styles from "@styles/components/ui/NestedFilter.module.css";
import Image from "next/image";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import { motion } from "framer-motion";

interface NestedFilterProps {
	items: LeaguesByCountry;
	h3?: string;
	h2?: string;
	onChange: (countryIds: string[], champIds: string[]) => void;
	withClearButton?: boolean;
	colapsible?: boolean;
}

const ItemsVariants = {
	open: {
		height: "auto",
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
	closed: {
		height: 220,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
};

const ChevronVariants = {
	open: {
		rotate: 180,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
	closed: {
		rotate: 0,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
};

const NestedFilter: React.FC<NestedFilterProps> = (props) => {
	const { items, onChange, h2, h3, withClearButton = true, colapsible = false } = props;
	const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
	const [selectedChampionships, setSelectedChampionships] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	function handleSelect(idCountry: string, idChampionship: string | null) {
		const champs = items.find(i => i.id == idCountry)!.leagues.map(l => l.id)

		if (idChampionship == null) {
			// If user selects the block of leagues
			if (selectedChampionships.filter(sc => champs?.includes(sc)).length == champs?.length) {
				// If user selects the exist block of leagues -> this block selects
				onChange(
					selectedCountries.filter((_id) => _id !== idCountry),
					selectedChampionships.filter((_id) => !champs?.includes(_id))
				)
				setSelectedCountries(
					selectedCountries.filter((_id) => _id !== idCountry)
				)
				setSelectedChampionships(
					selectedChampionships.filter((_id) => !champs?.includes(_id))
				)
			} else {
				// If user selects the empty or not fully selected block of leagues -> this block fully selects
				onChange(
					Array.from(new Set([...selectedCountries, idCountry])),
					Array.from(new Set([...selectedChampionships, ...champs]))
				)
				setSelectedCountries(
					Array.from(new Set([...selectedCountries, idCountry]))
				)
				setSelectedChampionships(
					Array.from(new Set([...selectedChampionships, ...champs]))
				)
			}
		} else {
			// If user selects the league
			if (selectedChampionships.includes(idChampionship)) {
				// If user selects the already selected league
				if (selectedChampionships.filter(sc => champs?.includes(sc)).length == 1) {
					// If this league is last league of the selected block -> league and its block removes
					onChange(
						selectedCountries.filter((_id) => _id !== idCountry),
						selectedChampionships.filter((_id) => _id !== idChampionship)
					)
					setSelectedCountries(selectedCountries.filter((_id) => _id !== idCountry))
					setSelectedChampionships(selectedChampionships.filter((_id) => _id !== idChampionship))
				} else {
					// If this league is NOT last league of the selected block -> only league removes
					onChange(
						selectedCountries,
						selectedChampionships.filter((_id) => _id !== idChampionship)
					)
					setSelectedCountries(selectedCountries)
					setSelectedChampionships(selectedChampionships.filter((_id) => _id !== idChampionship))
				}

			} else {
				// If user selects the unchecked league -> this league and its block selects
				onChange(
					Array.from(new Set([...selectedCountries, idCountry])),
					Array.from(new Set([...selectedChampionships, idChampionship]))
				)
				setSelectedCountries(
					Array.from(new Set([...selectedCountries, idCountry]))
				)
				setSelectedChampionships(
					Array.from(new Set([...selectedChampionships, idChampionship]))
				)
			}
		}
	}

	function clear() {
		setSelectedCountries([]);
		setSelectedChampionships([]);
		onChange([], []);
	}

	return (
		<div className={styles.container}>
			{(h2 || h3 || withClearButton) && (
				<div className={styles.header}>
					<div className={styles.headings}>
						{h3 && <h3>{h3}</h3>}
						{h2 && <h2>{h2}</h2>}
					</div>
					{withClearButton && (
						<button
							className={styles.clear}
							onClick={clear}
						>
							Clear
						</button>
					)}
				</div>
			)}
			<motion.div
				className={`${styles.items} ${colapsible && styles.colapsible}`}
				variants={colapsible ? ItemsVariants : undefined}
				animate={isOpen ? "open" : "closed"}
				initial={false}
			>
				{items.map((item) => (
					<Item
						key={`nested_filter_${item.name}_item_${item.id}`}
						{...item}
						selectedCountries={selectedCountries}
						selectedChampionships={selectedChampionships}
						onSelect={(id) => handleSelect(item.id, id)}
					/>
				))}
			</motion.div>
			{colapsible && (
				<span
					className={styles.showMore}
					onClick={() => setIsOpen(!isOpen)}
				>
					<span>Show {isOpen ? "less" : "more"}</span>
					<motion.div
						className={styles.chevron}
						variants={ChevronVariants}
						animate={isOpen ? "open" : "closed"}
						initial={false}
					>
						<Image
							src="/icons/chevron.svg"
							height={24}
							width={24}
							alt=""
						/>
					</motion.div>
				</span>
			)}
		</div>
	);
};

interface ItemType extends inferArrayElementType<LeaguesByCountry> {
	onSelect: (id: string | null) => void;
	selectedCountries: string[];
	selectedChampionships: string[];
}

const SubItemsVariants = {
	open: {
		height: "auto",
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
	closed: {
		height: 0,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
};

const Item: React.FC<ItemType> = (props) => {
	const { count, id, image, name, selectedCountries, selectedChampionships, onSelect, leagues } = props;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.itemContainer}>
			<div
				className={`${styles.item} ${selectedCountries.includes(id) && styles.active}`}
			>
				<div
					className={styles.info}
					onClick={() => setIsOpen(!isOpen)}
				>
					<div className={styles.image}>
						<Image
							src={image}
							height={34}
							width={34}
							alt=""
						/>
					</div>
					<span
						className={styles.name}
					>
						{name}
					</span>
				</div>
				<div
					className={styles.count}
					onClick={() => onSelect(null)}
				>
					{count}
				</div>
			</div>
			<motion.div
				className={styles.subItems}
				variants={SubItemsVariants}
				animate={isOpen ? "open" : "closed"}
				initial={false}
			>
				{leagues.map(({ count, id, image, name }) => (
					<div
						className={`${styles.subItem} ${selectedChampionships.includes(id) && styles.active}`}
						key={`nested_filter_${name}_item_${id} `}
						onClick={() => onSelect(id)}
					>
						<div className={styles.info}>
							<div className={styles.image}>
								<Image
									src={image}
									height={22}
									width={22}
									alt=""
								/>
							</div>
							<span className={styles.name}>{name}</span>
						</div>
						<div
							className={styles.count}
						>
							+{count}
							<input
								type={"checkbox"}
								checked={selectedChampionships.includes(id)}
								readOnly
							/>
						</div>
					</div>
				))}
			</motion.div>
		</div>
	);
};

export default NestedFilter;
