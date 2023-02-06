import { NextPage } from "next";
import React from "react";
import styles from "@styles/pages/AboutCoins.module.css";
import Image from "next/image";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import { Methods } from "src/types/queryTypes";
import { trpc } from "src/utils/trpc";
import { MethodStatus } from "src/types/methodStatus";

const AboutCoins: NextPage = () => {
	const { data: methods, isLoading: methodsLoading } = trpc.useQuery([
		"coins.getMethods",
	]);

	if (methodsLoading) {
		return <div>Loading...</div>;
	}

	if (!methods) {
		return <div>Error...</div>;
	}

	return (
		<>
			<div className={styles.header}>
				<div className={styles.background}>
					<Image
						src="/images/about-coins-background.png"
						fill
						alt=""
						style={{
							objectFit: "cover",
						}}
					/>
				</div>
				<div className={styles.coins}>
					<Image
						src="/images/about-coins-coins.png"
						fill
						alt=""
						style={{
							objectFit: "contain",
						}}
					/>
				</div>
				<h2>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</h2>
				<span>
					Sed tempus sem ac libero venenatis, malesuada rhoncus tellus
					gravida. Etiam vitae leo pretium, fermentum lectus interdum,
					imperdiet dui. Cras cursus non elit et feugiat. Nunc mi
					diam, pulvinar vel nunc eget, sodales auctor erat. Etiam
					fringilla sollicitudin accumsan. Phasellus at urna lectus.
				</span>
			</div>
			<div className={styles.mainColumn}>
				<div className={styles.description}>
					<h3>What are the coins and how to use them</h3>
					<span>
						Sed tempus sem ac libero venenatis, malesuada rhoncus
						tellus gravida. Etiam vitae leo pretium, fermentum
						lectus interdum, imperdiet dui. Cras cursus non elit et
						feugiat. Nunc mi diam, pulvinar vel nunc eget, sodales
						auctor erat. Etiam fringilla sollicitudin accumsan.
						Phasellus at urna lectus. Phasellus at urna lectus. Cras
						eleifend purus volutpat dolor volutpat placerat. Morbi
						ut dolor tempor, euismod eros eget, bibendum enim. Donec
						mattis dolor est, eu placerat tortor commodo id. Fusce
						purus quam, eleifend eu lacus ac, tempus molestie arcu.
						Nunc sagittis condimentum purus, vel iaculis nisi
						efficitur vitae.
					</span>
				</div>
				<div className={styles.description}>
					<h3>How to get the coins</h3>
					<span>
						Sed tempus sem ac libero venenatis, malesuada rhoncus
						tellus gravida. Etiam vitae leo pretium, fermentum
						lectus interdum, imperdiet dui.
					</span>
				</div>
				<div className={styles.methods}>
					{methods.map((method, index) => (
						<Method
							{...method}
							key={`method_${index}`}
						/>
					))}
				</div>
			</div>
		</>
	);
};

const Method: React.FC<inferArrayElementType<Methods>> = (props) => {
	const { reward, icon, status, text } = props;

	function getElementByType(type: typeof status) {
		switch (type) {
			case MethodStatus.available:
				return (
					<button className={styles.available}>
						Claim {reward}
						<Image
							src="/icons/profile/points.svg"
							height={24}
							width={24}
							alt=""
						/>
					</button>
				);

			case MethodStatus.unavailable:
				return (
					<button className={styles.unavailable}>
						Claim {reward}
						<Image
							src="/icons/profile/points.svg"
							height={24}
							width={24}
							alt=""
						/>
					</button>
				);

			case MethodStatus.claimed:
				return (
					<span className={styles.claimed}>
						Claimed
						<Image
							src="/icons/check.svg"
							height={24}
							width={24}
							alt=""
						/>
					</span>
				);
			default:
				return <></>;
		}
	}

	return (
		<div className={styles.method}>
			<div className={styles.info}>
				<Image
					src={icon}
					height={40}
					width={40}
					alt=""
				/>
				<div className={styles.text}>
					<h4>{text}</h4>
					<span>
						For completing this task you will recieve{" "}
						<b>{reward} coins</b>
					</span>
				</div>
			</div>
			{getElementByType(status)}
		</div>
	);
};

export default AboutCoins;
