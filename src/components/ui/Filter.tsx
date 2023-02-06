import React, { useState } from "react";
import styles from "@styles/components/ui/Filter.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

interface FilterProps {
	h3: string;
	h2?: string;
	items: {
		name: string;
		subName?: string;
		count: number;
		image: string;
		id: string;
	}[];
	onChange: (ids: string[]) => void;
}

const ItemsVariants = {
	open: {
		height: "auto",
	},
	closed: {
		height: 390,
	},
};

const CevronVariants = {
	open: {
		rotate: 180,
	},
	closed: {
		rotate: 0,
	},
};

const Filter: React.FC<FilterProps> = (props) => {
	const { h3, h2, items, onChange } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	function handleSelect(id: string) {
		if (selectedItems.includes(id)) {
			setSelectedItems(selectedItems.filter((item) => item !== id));
			onChange(selectedItems.filter((item) => item !== id));
		} else {
			setSelectedItems([...selectedItems, id]);
			onChange([...selectedItems, id]);
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>{h3}</h3>
				{h2 && <h2>{h2}</h2>}
			</div>
			<motion.div
				className={styles.items}
				variants={ItemsVariants}
				initial={"closed"}
				animate={isOpen ? "open" : "closed"}
			>
				{items.map((item) => (
					<div
						key={item.id}
						className={`${styles.item} ${
							selectedItems.includes(item.id) && styles.selected
						}`}
						onClick={() => handleSelect(item.id)}
					>
						<div className={styles.info}>
							<div className={styles.image}>
								<Image
									src={item.image}
									alt={item.name}
									width={40}
									height={40}
								/>
							</div>
							<div className={styles.titles}>
								<span className={styles.itemName}>
									{item.name}
								</span>
								{item.subName && (
									<span className={styles.itemSubname}>
										{item.subName}
									</span>
								)}
							</div>
						</div>
						<div className={styles.count}>{item.count}</div>
					</div>
				))}
			</motion.div>
			<span
				className={styles.showMore}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>Show {isOpen ? "less" : "more"}</span>
				<motion.div
					className={styles.chevron}
					variants={CevronVariants}
					initial={"closed"}
					animate={isOpen ? "open" : "closed"}
				>
					<Image
						src="/icons/chevron.svg"
						alt="chevron"
						width={24}
						height={24}
					/>
				</motion.div>
			</span>
		</div>
	);
};

export default Filter;
