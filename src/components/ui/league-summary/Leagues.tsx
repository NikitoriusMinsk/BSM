import React, { useState } from "react";
import styles from "@styles/components/ui/league-summary/Leagues.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

interface LeaguesProps {
	h3: string;
	h2?: string;
	items: {
		name: string;
		subName?: string;
		count?: number;
		image: string;
		id: string;
	}[];
	showCount?: boolean;
}

const Leagues: React.FC<LeaguesProps> = (props) => {
	const { h3, h2, items, showCount = true } = props;
	const [isOpen, setIsOpen] = useState(false);

	const ItemsVariants = {
		open: {
			height: "auto",
		},
		closed: {
			height: 405,
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
				transition={{ ease: 'easeInOut' }}
			>
				{items.map((item) => (
					<div
						key={item.id}
						className={`${styles.item}`}
					>
						<div className={styles.info}>
							<div className={styles.image}>
								<Image
									src={item.image}
									alt={item.name}
									width={28}
									height={28}
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
						{showCount && <div className={styles.count}>{item.count}</div>}
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
					transition={{ ease: 'easeInOut' }}
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

export default Leagues