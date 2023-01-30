import styles from "@styles/components/ui/TipsterInfo.module.css";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/future/image";
import { useState } from "react";
import { Tipsters } from "src/types/queryTypes";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import { PortalContext } from "src/utils/portalContext";
import shortenNumber from "src/utils/shortenNumber";
import TipsterModal from "./TipsterModal";

const InPortal = dynamic(
	async () => (await import("react-reverse-portal")).InPortal,
	{ ssr: false }
);

const TipsterInfo: React.FC<inferArrayElementType<Tipsters>> = (props) => {
	const { name, image, subscriberCount } = props;
	const [modalOpen, setModalOpen] = useState(false);
	const [isHovering, setIsHovering] = useState(false);

	return (
		<>
			<PortalContext.Consumer>
				{({ portalNode }) =>
					portalNode && (
						<InPortal node={portalNode}>
							<AnimatePresence>
								{modalOpen && (
									<TipsterModal
										{...props}
										onClose={() => setModalOpen(false)}
									/>
								)}
							</AnimatePresence>
						</InPortal>
					)
				}
			</PortalContext.Consumer>
			<div className={styles.tipster}>
				<div
					className={styles.user}
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
				>
					<AnimatePresence initial={false}>
						{isHovering && (
							<UserHover
								{...props}
								onSubscribe={() => setModalOpen(true)}
							/>
						)}
					</AnimatePresence>
					<div className={styles.avatar}>
						<Image
							src={image}
							height={36}
							width={36}
							alt={name}
						/>
					</div>
					<div className={styles.userInfo}>
						<span className={styles.name}>{name}</span>
						<span className={styles.subscribers}>
							{shortenNumber(subscriberCount, 0)} subscribers
						</span>
					</div>
				</div>
				<button
					onClick={() => setModalOpen(!modalOpen)}
					className={styles.subscribeButton}
				>
					<Image
						src="/icons/plus-gray.svg"
						height={18}
						width={18}
						alt=""
					/>
					Subscribe
				</button>
			</div>
		</>
	);
};

interface UserHoverProps {
	onSubscribe: () => void;
}

const UserHoverVariants = {
	open: {
		opacity: [0, 1],
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
	closed: {
		opacity: [1, 0],
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
};

const UserHover: React.FC<inferArrayElementType<Tipsters> & UserHoverProps> = (
	props
) => {
	const {
		avgProfit,
		name,
		image,
		sport,
		followerCount,
		subscriptionCost,
		roi,
		form,
		betCount,
		winrate,
		onSubscribe,
	} = props;

	return (
		<motion.div
			className={styles.hoverContainer}
			variants={UserHoverVariants}
			initial="closed"
			animate="open"
			exit="closed"
		>
			<div
				className={`${styles.profit} ${
					avgProfit > 0 ? styles.positive : styles.negative
				}`}
			>
				<span>Avg. Monthly Profit</span>
				<span>$ {avgProfit}</span>
			</div>
			<div className={styles.userDetailed}>
				<div className={styles.infoContainer}>
					<div className={styles.user}>
						<div className={styles.avatar}>
							<Image
								src={image}
								height={60}
								width={60}
								alt=""
							/>
						</div>
						<div className={styles.userInfo}>
							<span className={styles.name}>{name}</span>
							<span className={styles.sport}>
								Top {sport.name} Tipster
								<Image
									src={sport.image}
									height={24}
									width={24}
									alt=""
								/>
							</span>
						</div>
					</div>
					<div className={styles.followers}>
						<button>
							<Image
								src="/icons/follow.svg"
								height={20}
								width={20}
								alt=""
							/>
							Follow
						</button>
						<span>{shortenNumber(followerCount, 0)} followers</span>
					</div>
				</div>
				<div className={styles.additionalInfo}>
					<div className={styles.subscriptionInfo}>
						<span>${subscriptionCost}/MO</span>
						<button onClick={onSubscribe}>Subscribe</button>
					</div>
					<div className={styles.info}>
						<div
							className={`${styles.profit} ${
								avgProfit > 0 ? styles.positive : styles.negative
							}`}
						>
							<span>Avg. Monthly Profit</span>
							<span>$ {avgProfit}</span>
						</div>
						<div className={styles.stat}>
							<span>ROI</span>
							<span
								className={`${styles.roi} ${
									roi < 0 ? styles.negative : styles.positive
								}`}
							>
								{roi}
							</span>
						</div>
						<div className={styles.stat}>
							<span>Form</span>
							<span className={styles.form}>
								{form.map((el, index) => (
									<div
										className={`${styles.dot} ${
											el ? styles.positive : styles.negative
										}`}
									/>
								))}
							</span>
						</div>
						<div className={styles.stat}>
							<span>Bets</span>
							<span>{betCount}</span>
						</div>
						<div className={styles.stat}>
							<span>Hitrate</span>
							<span>{winrate * 100}%</span>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default TipsterInfo;
