import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/components/ui/Dropdown.module.css";
import Image from "next/image";
import TextField from "./TextField";
import debounce from "src/utils/debounce";
import Fuse from "fuse.js";

interface DropdownProps {
	items: {
		name: string | ReactNode;
		id: string;
		label?: string | ReactNode;
	}[];
	label?: string;
	onSelect: (id: string) => void;
	minWidth?: string | number;
	searchable?: boolean;
	style?: "light" | "default";
}

const DropdownVariants = {
	open: {
		height: "auto",
	},
	closed: {
		height: 0,
	},
};

const ChevronVariants = {
	open: {
		rotate: 180,
	},
	closed: {
		rotate: 0,
	},
};

const Dropdown: React.FC<DropdownProps> = (props) => {
	const {
		items,
		onSelect,
		label,
		searchable = false,
		minWidth,
		style = "default",
	} = props;
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(items[0]);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [filteredItems, setFilteredItems] = useState(items);

	function handleSelect(id: string) {
		onSelect(id);
		setSelected(items.find((item) => item.id === id));
		setIsOpen(false);
	}

	const closeIfNotDropdown = (e: MouseEvent) => {
		if (
			e.target != dropdownRef.current &&
			!dropdownRef.current?.contains(e.target as Node)
		) {
			setIsOpen(false);
		}
	};

	function handleSearch(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		const searchString = e.target.value;
		if (e.target.value.length > 0) {
			const options = {
				includeScore: false,
				includeRefIndex: false,
				threshold: 0.3,
				keys: ["name"],
			};
			const fuse = new Fuse(items, options);
			const result = fuse.search(searchString).map((item) => item.item);
			setFilteredItems(result);
		} else {
			setFilteredItems(items);
		}
	}

	useEffect(() => {
		if (window) window.addEventListener("click", closeIfNotDropdown);
		return () => {
			window.removeEventListener("click", closeIfNotDropdown);
		};
	}, []);

	return (
		<div
			className={`${styles.container} ${styles[style]}`}
			ref={dropdownRef}
			style={{
				minWidth: minWidth,
			}}
		>
			<div
				className={styles.activeItem}
				onClick={() => setIsOpen(!isOpen)}
			>
				{label && <span className={styles.mainLabel}>{label}</span>}
				<div className={styles.activeName}>
					{selected?.label && (
						<span className={styles.label}>{selected?.label}</span>
					)}
					<span>{selected?.name}</span>
				</div>
				<motion.span
					className={styles.chevron}
					variants={ChevronVariants}
					initial={false}
					animate={isOpen ? "open" : "closed"}
				>
					<Image
						src="/icons/chevron.svg"
						height={16}
						width={16}
						alt=""
					/>
				</motion.span>
			</div>
			<motion.div
				className={styles.dropdown}
				variants={DropdownVariants}
				initial={false}
				animate={isOpen ? "open" : "closed"}
			>
				<div className={styles.itemsContainer}>
					{searchable && (
						<div className={styles.search}>
							<TextField
								placeholder="Search"
								icon="/icons/search.svg"
								onChange={debounce(handleSearch, 500)}
							/>
						</div>
					)}
					{filteredItems.map(({ name, id, label }) => (
						<Item
							key={id}
							name={name}
							id={id}
							label={label}
							onClick={() => handleSelect(id)}
						/>
					))}
				</div>
			</motion.div>
		</div>
	);
};

interface ItemProps {
	name: string | ReactNode;
	id: string;
	label?: string | ReactNode;
	onClick: () => void;
}

const Item: React.FC<ItemProps> = (props) => {
	const { name, id, label, onClick } = props;

	return (
		<div
			className={styles.item}
			key={id}
			onClick={onClick}
		>
			{label && <span className={styles.label}>{label}</span>}
			<span>{name}</span>
		</div>
	);
};

export default Dropdown;
