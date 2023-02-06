import react, { useState } from "react";
import { Tipsters } from "src/types/queryTypes";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import { motion } from "framer-motion";
import styles from "@styles/components/ui/TipsterModal.module.css";
import Image from "next/image";
import Moment from "react-moment";

interface TipsterModalProps extends inferArrayElementType<Tipsters> {
	onClose: () => void;
}

const plans = [
	{ name: "Monthly", multiplier: 1, id: 1 },
	{ name: "6/mo", multiplier: 6, id: 2 },
	{ name: "12/mo", multiplier: 12, id: 3 },
];

const TipsterModalVariants = {
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

const TipsterModal: React.FC<TipsterModalProps> = (props) => {
	const { image, name, subscriptionCost, onClose } = props;
	const [selectedPlan, setSelectedPlan] = useState(1);

	return (
		<div className={styles.modalContainer}>
			<motion.div
				className={styles.backdrop}
				onClick={onClose}
				variants={TipsterModalVariants}
				initial="closed"
				animate="open"
				exit="closed"
			/>
			<motion.div
				className={styles.modal}
				variants={TipsterModalVariants}
				initial="closed"
				animate="open"
				exit="closed"
			>
				<div className={styles.header}>
					<Image
						src={image}
						height={70}
						width={70}
						alt=""
					/>
					<div>
						<span>Subscribe to</span>
						<span className={styles.name}>{name}</span>
					</div>
					<div
						className={styles.close}
						onClick={onClose}
					>
						<Image
							src="/icons/close.svg"
							height={24}
							width={24}
							alt=""
						/>
					</div>
				</div>
				<div className={styles.plans}>
					<span>Plans</span>
					<div className={styles.plansList}>
						{plans.map(({ name, multiplier, id }) => (
							<div
								key={`subscription_plan_${id}`}
								className={`${styles.plan} ${
									selectedPlan === id && styles.active
								}`}
								onClick={() => setSelectedPlan(id)}
							>
								<span className={styles.name}>{name}</span>
								<span className={styles.cost}>
									$ {subscriptionCost * multiplier}
								</span>
								<span className={styles.duration}>
									Per {multiplier > 1 && multiplier} month
									{multiplier > 1 && "s"}
								</span>
								<span className={styles.description}>
									Subscription will run from now to{" "}
									<Moment
										format="D MMMM YYYY"
										date={
											new Date(
												new Date().getFullYear(),
												new Date().getMonth() +
													multiplier,
												new Date().getDate()
											)
										}
									/>
								</span>
							</div>
						))}
					</div>
				</div>
				<div className={styles.paymentMethods}>
					<span>Payment methods</span>
					<button>
						<Image
							src="/images/paypal.svg"
							height={20}
							width={80}
							alt=""
						/>
					</button>
					<button>
						<Image
							src="/images/visa.svg"
							height={14}
							width={48}
							alt=""
						/>
						<Image
							src="/images/mastercard.svg"
							height={20}
							width={32}
							alt=""
						/>
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default TipsterModal;
