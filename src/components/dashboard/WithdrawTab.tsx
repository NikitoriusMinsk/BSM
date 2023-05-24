import Image from "next/image";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { trpc } from "src/utils/trpc";
import styles from "@styles/components/dashboard/WithdrawTab.module.css";
import sharedStyles from "@styles/components/dashboard/shared.module.css";
import { createColumnHelper } from "@tanstack/react-table";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import { WithdrawInfo } from "src/types/queryTypes";
import Moment from "react-moment";
import { TransactionStatus } from "src/types/transactionStatus";
import usePortal from "src/utils/usePortal";
import { PortalContext } from "src/utils/portalContext";
import { AnimatePresence, motion } from "framer-motion";
import Table from "@components/ui/Table";
import dynamic from "next/dynamic";
import useWindowSize from "src/utils/useWindowSize";

const InPortal = dynamic(async () => (await import("react-reverse-portal")).InPortal, {
	ssr: false,
});
const OutPortal = dynamic(async () => (await import("react-reverse-portal")).OutPortal, {
	ssr: false,
});

const columnHelper = createColumnHelper<inferArrayElementType<WithdrawInfo["history"]>>();

function getStyleByStatus(status: TransactionStatus) {
	switch (status) {
		case TransactionStatus.Pending:
			return styles.pending;
		case TransactionStatus.Blocked:
			return styles.blocked;
		case TransactionStatus.Success:
			return styles.success;
		default:
			return undefined;
	}
}

const columns = [
	columnHelper.accessor("id", {
		cell: (info) => <div className={styles.id}>{info.getValue()}</div>,
		header: () => <span className={styles.id}>Id</span>,
		enableSorting: false,
	}),
	columnHelper.accessor("amount", {
		cell: (info) => <span className={styles.amount}>{info.getValue()}</span>,
		header: () => <span>Amount</span>,
		enableSorting: false,
	}),
	columnHelper.accessor("date", {
		cell: (info) => (
			<Moment
				date={info.getValue()}
				format="DD MMM YYYY"
			/>
		),
		header: () => <span>Date</span>,
		enableSorting: false,
	}),
	columnHelper.accessor("status", {
		cell: (info) => {
			const status = info.getValue();
			return (
				<span className={`${styles.status} ${getStyleByStatus(status)}`}>
					{info.getValue()}
				</span>
			);
		},
		header: () => <span>Status</span>,
		enableSorting: false,
	}),
];

const mobileColumns = [
	columnHelper.accessor((row) => row, {
		id: "index",
		header: "",
		cell: (props) => (
			<div className={styles.transactionInfo}>
				<span className={styles.amount}>${props.getValue().amount}</span>
				<span className={styles.id}>{props.getValue().id}</span>
			</div>
		),
		enableSorting: false,
	}),
	columnHelper.accessor("date", {
		cell: (info) => (
			<Moment
				date={info.getValue()}
				format="DD MMM YYYY"
			/>
		),
		header: "",
		enableSorting: false,
	}),
	columnHelper.accessor("status", {
		cell: (info) => {
			const status = info.getValue();
			return (
				<span className={`${styles.status} ${getStyleByStatus(status)}`}>
					{info.getValue()}
				</span>
			);
		},
		header: "",
		enableSorting: false,
	}),
];

const WithdrawTab: React.FC = () => {
	const { data, isLoading } = trpc.user.getWithdrawInfo.useQuery();
	const portalNode = usePortal();
	const { width } = useWindowSize();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!data) {
		return <div>Error...</div>;
	}

	return (
		<>
			<PortalContext.Provider value={{ portalNode: portalNode }}>
				{portalNode && <OutPortal node={portalNode} />}
				<div
					id={styles.withdrawBalance}
					className={`${sharedStyles.block} ${sharedStyles.wide} ${sharedStyles.positive}`}
				>
					<div>
						<Image
							src="/images/dashboard/wallet.svg"
							height={60}
							width={60}
							alt=""
						/>
						<div className={styles.text}>
							<h4>Pending Balance</h4>
							<span>$ {data.pendingBalance}</span>
						</div>
					</div>
					<div>
						<h5>Cash that can be withdrawn right now</h5>
						<WithdrawButton balance={data.availableBalance} />
					</div>
				</div>
				<div
					id={styles.withdrawTotal}
					className={`${sharedStyles.block} ${sharedStyles.narrow}`}
				>
					<Image
						src="/images/dashboard/total.svg"
						height={60}
						width={60}
						alt=""
					/>
					<div className={styles.text}>
						<h4>Pending Balance</h4>
						<span>$ {data.totalEarned}</span>
					</div>
				</div>
				<div id={styles.table}>
					<h2>Historical Withdraws</h2>
					<Table
						data={data.history}
						columns={width <= 425 ? mobileColumns : columns}
						pageSize={10}
					/>
				</div>
			</PortalContext.Provider>
		</>
	);
};

const WithdrawButton: React.FC<{ balance: number }> = (props) => {
	const { balance } = props;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<PortalContext.Consumer>
				{({ portalNode }) =>
					portalNode && (
						<InPortal node={portalNode}>
							<AnimatePresence initial={false}>
								{isOpen && (
									<WithdrawModal
										maxValue={balance}
										onClose={() => setIsOpen(false)}
									/>
								)}
							</AnimatePresence>
						</InPortal>
					)
				}
			</PortalContext.Consumer>
			<button
				className={styles.withdrawButton}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>Withdraw</span>
				<span>$ {balance}</span>
			</button>
		</>
	);
};

const ModalVariants = {
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

enum PaymentMethods {
	Paypal = "paypal",
	MastercardVisa = "mastercard/visa",
}

const WithdrawModal: React.FC<{ maxValue: number; onClose: () => void }> = (props) => {
	const { maxValue, onClose } = props;
	const [isMax, setIsMax] = useState<boolean>(false);
	const [selectedMethod, setSelectedMethod] = useState<PaymentMethods>(
		PaymentMethods.Paypal
	);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [timeLeft, setTimeLeft] = useState<string | null>(null);

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.target.value);
		if (value > maxValue) {
			if (inputRef.current) {
				inputRef.current.value = maxValue.toString();
				setIsMax(true);
			}
			return;
		}
		if (value === maxValue) {
			setIsMax(true);
		} else {
			setIsMax(false);
		}
	}

	function setMax(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		if (inputRef.current) {
			inputRef.current.value = maxValue.toString();
			setIsMax(true);
		}
	}

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		onClose();
	}

	function sendCode(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		let _timeLeft = 120;
		const minutes = Math.floor(_timeLeft / 60);
		const seconds = _timeLeft - minutes * 60;
		const interval = setInterval(() => {
			const minutes = Math.floor(_timeLeft / 60);
			const seconds = _timeLeft - minutes * 60;
			if (_timeLeft > 0) {
				setTimeLeft(
					`${minutes > 9 ? minutes : `0${minutes}`}:${
						seconds > 9 ? seconds : `0${seconds}`
					}`
				);
				_timeLeft--;
			} else {
				clearInterval(interval);
				setTimeLeft(null);
			}
		}, 1000);
		setTimeLeft(
			`${minutes > 9 ? minutes : `0${minutes}`}:${
				seconds > 9 ? seconds : `0${seconds}`
			}`
		);
	}

	return (
		<motion.div
			className={styles.modalContainer}
			variants={ModalVariants}
			initial="closed"
			animate="open"
			exit="closed"
		>
			<form
				className={styles.modal}
				onSubmit={onSubmit}
			>
				<div className={styles.header}>
					<h2>Withdraw Money</h2>
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
				<div className={styles.input}>
					<span className={styles.label}>
						Amount: <b>$</b>{" "}
					</span>
					<input
						type={"number"}
						placeholder="0"
						onChange={handleInput}
						ref={inputRef}
						name="amount"
					/>
					<button
						className={isMax ? styles.max : undefined}
						onClick={setMax}
					>
						MAX
					</button>
				</div>
				<div className={styles.methods}>
					<h3>Payment Methods</h3>
					<div
						className={styles.method}
						onClick={() => setSelectedMethod(PaymentMethods.Paypal)}
					>
						<div>
							<Image
								src="/images/paypal.svg"
								height={20}
								width={80}
								alt=""
							/>
						</div>
						<input
							type={"checkbox"}
							readOnly
							checked={selectedMethod === PaymentMethods.Paypal}
						/>
					</div>
					<div
						className={styles.method}
						onClick={() => setSelectedMethod(PaymentMethods.MastercardVisa)}
					>
						<div>
							<Image
								src="/images/visa.svg"
								height={20}
								width={48}
								alt=""
							/>
							<Image
								src="/images/mastercard.svg"
								height={20}
								width={32}
								alt=""
							/>
						</div>
						<input
							type={"checkbox"}
							readOnly
							checked={selectedMethod === PaymentMethods.MastercardVisa}
						/>
					</div>
				</div>
				<div className={styles.code}>
					<button onClick={!timeLeft ? sendCode : () => {}}>
						{!timeLeft ? "Send Code" : timeLeft}
					</button>
					<input
						type={"text"}
						placeholder="Email verification code"
						name="code"
					/>
				</div>
				<button
					className={styles.submit}
					type={"submit"}
				>
					Withdraw
				</button>
			</form>
		</motion.div>
	);
};

export default WithdrawTab;
