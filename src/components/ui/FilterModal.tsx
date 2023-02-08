import React, { Component, useReducer, useState } from "react";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import styles from "@styles/components/ui/FilterModal.module.css";
import { HtmlPortalNode } from "react-reverse-portal";
import dynamic from "next/dist/shared/lib/dynamic";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import TextField from "./TextField";
import DateInput from "./DatePicker";

const InPortal = dynamic(
	async () => (await import("react-reverse-portal")).InPortal,
	{ ssr: false }
);

interface FilterModalProps {
	filters: {
		key: string;
		label: string;
		type: "buttons" | "singleChoice" | "multipleChoice" | "date";
		items?: {
			id: number;
			label: string;
			image?: string;
		}[];
	}[];
	onApply: (selectedValues: { [k: string]: number[] }) => void;
	portalNode: HtmlPortalNode<Component<any>> | null;
}

const ModalVariants = {
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

const FilterModal: React.FC<FilterModalProps> = (props) => {
	const { filters, onApply, portalNode } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useReducer(reducer, filters, (initialArg) =>
		Object.fromEntries(initialArg.map(({ key }) => [key, new Array<number>()]))
	);

	function reducer(
		state: { [k: string]: number[] },
		action: { key: string; selected: number[] } | "clear"
	) {
		if (action === "clear") {
			return Object.fromEntries(
				Object.entries(state).map(([key, value]) => [
					key,
					new Array<number>(),
				])
			);
		}

		return {
			...state,
			[action.key]: action.selected,
		};
	}

	function getFilter(filter: inferArrayElementType<FilterModalProps["filters"]>) {
		const { items, key, type, label } = filter;
		switch (type) {
			case "buttons":
				return (
					<ButtonsFilter
						key={key}
						items={items}
						selected={selected[key] ?? []}
						onChange={(selected) => setSelected({ key, selected })}
						label={label}
					/>
				);
			case "singleChoice":
				return (
					<SingleChoiceFilter
						key={key}
						items={items}
						selected={selected[key] ?? []}
						onChange={(selected) => setSelected({ key, selected })}
						label={label}
					/>
				);
			case "multipleChoice":
				return (
					<MultipleChoiceFilter
						key={key}
						items={items}
						selected={selected[key] ?? []}
						onChange={(selected) => setSelected({ key, selected })}
						label={label}
					/>
				);
			case "date":
				return (
					<DateFilter
						key={key}
						items={items}
						selected={selected[key] ?? []}
						onChange={(selected) => setSelected({ key, selected })}
						label={label}
					/>
				);
		}
	}

	return (
		<>
			{portalNode && (
				<InPortal node={portalNode}>
					<AnimatePresence initial={false}>
						{isOpen && (
							<motion.div
								className={styles.modal}
								variants={ModalVariants}
								initial="closed"
								animate="open"
								exit="closed"
							>
								<div className={styles.header}>
									<div className={styles.title}>
										<Image
											src={"/icons/filter.svg"}
											height={20}
											width={20}
											alt={"Filter Button"}
										/>
										<span>Filter</span>
									</div>
									<div
										className={styles.close}
										onClick={() => setIsOpen(false)}
									>
										<Image
											src="/icons/close.svg"
											height={24}
											width={24}
											alt="Close Modal"
										/>
									</div>
								</div>
								<div className={styles.filters}>
									{filters.map((filter) => getFilter(filter))}
								</div>
								<div className={styles.controls}>
									<button
										className={styles.clear}
										onClick={() => setSelected("clear")}
									>
										Clear
									</button>
									<button
										className={styles.apply}
										onClick={() => {
											onApply(selected);
											setIsOpen(false);
										}}
									>
										Apply
									</button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</InPortal>
			)}
			<button
				className={styles.container}
				onClick={() => setIsOpen(true)}
			>
				<Image
					src={"/icons/filter.svg"}
					height={20}
					width={20}
					alt={"Filter Button"}
				/>
				<span>Filter</span>
			</button>
		</>
	);
};

interface FilterProps {
	items: inferArrayElementType<FilterModalProps["filters"]>["items"];
	selected: number[];
	onChange: (selected: number[]) => void;
	label: string;
}

const ButtonsFilter: React.FC<FilterProps> = (props) => {
	const { items, selected, onChange, label } = props;

	return (
		<div className={styles.filterContainer}>
			<span className={styles.filterLabel}>{label}</span>
			<div className={styles.buttonContainer}>
				{items?.map((item) => (
					<button
						className={
							selected.includes(item.id) ? styles.active : undefined
						}
						key={`button_${item.id}`}
						onClick={() => onChange([item.id])}
					>
						{item.label}
					</button>
				))}
			</div>
		</div>
	);
};

const SingleChoiceFilter: React.FC<FilterProps> = (props) => {
	const { selected, items, onChange, label } = props;

	return (
		<div className={styles.filterContainer}>
			<span className={styles.filterLabel}>{label}</span>
			<TextField
				placeholder="Search"
				icon="/icons/search.svg"
			/>
			<div className={styles.choiceContainer}>
				{items?.map((item) => (
					<div
						className={`${styles.option} ${
							selected.includes(item.id) ? styles.active : undefined
						}`}
						key={`option_${item.id}`}
						onClick={() => onChange([item.id])}
					>
						<Image
							src={item.image ?? ""}
							height={32}
							width={32}
							alt=""
						/>
						<span>{item.label}</span>
					</div>
				))}
			</div>
		</div>
	);
};

const MultipleChoiceFilter: React.FC<FilterProps> = (props) => {
	const { selected, items, onChange, label } = props;

	function handleChange(id: number) {
		if (selected.includes(id)) {
			onChange(selected.filter((_id) => _id !== id));
		} else {
			onChange([...selected, id]);
		}
	}

	return (
		<div className={styles.filterContainer}>
			<span className={styles.filterLabel}>{label}</span>
			<TextField
				placeholder="Search"
				icon="/icons/search.svg"
			/>
			<div className={styles.choiceContainer}>
				{items?.map((item) => (
					<div
						className={`${styles.option} ${
							selected.includes(item.id) ? styles.active : undefined
						}`}
						key={`option_${item.id}`}
						onClick={() => handleChange(item.id)}
					>
						<Image
							src={item.image ?? ""}
							height={32}
							width={32}
							alt=""
						/>
						<span>{item.label}</span>
					</div>
				))}
			</div>
		</div>
	);
};

const DateFilter: React.FC<FilterProps> = (props) => {
	const { label, onChange, selected } = props;

	return (
		<div className={styles.filterContainer}>
			<span className={styles.filterLabel}>{label}</span>
			<DateInput
				onChange={(date) => onChange([date.getTime()])}
				defaultDate={selected[0]}
				onlyDropdown={true}
			/>
		</div>
	);
};

export default FilterModal;
