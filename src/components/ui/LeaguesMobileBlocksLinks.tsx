import React, { useState, useRef } from "react";
import styles from "@styles/components/ui/LeaguesMobileBlocks.module.css";
import Image from "next/image";
import { useDraggable } from "react-use-draggable-scroll";

interface FilterProps {
	items: {
		name: string;
		subName?: string;
		count: number;
		image: string;
		id: string;
	}[];
}

const LeaguesMobileBlocksLinks: React.FC<FilterProps> = (props) => {
	const { items } = props;

	const sliderRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(sliderRef);

	return (
		<div className={styles.container} {...events} ref={sliderRef}>
			{items.map((item) => (
				<div
					key={item.id}
					className={`${styles.item}`}
				>
					<div className={styles.image}>
						<Image
							src={item.image}
							alt={item.name}
							width={32}
							height={32}
						/>
						<span className={styles.count}>{item.count}</span>
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
			))}
		</div>
	);
};

export default LeaguesMobileBlocksLinks;