import React, { Component, useReducer, useState } from "react";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import styles from "@styles/components/ui/FilterModal.module.css";
import { HtmlPortalNode } from "react-reverse-portal";
import dynamic from "next/dist/shared/lib/dynamic";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import TextField from "./TextField";
import DateInput from "./DatePicker";

const InPortal = dynamic(async () => (await import("react-reverse-portal")).InPortal, {
	ssr: false,
});

interface FilterModalProps {
	filters: {
		key: string;
		label: string;
		type:
			| "buttons"
			| "singleChoice"
			| "singleChoiceSeparatePage"
			| "multipleChoice"
			| "multipleChoiceSeparatePage"
			| "date";
		items?: {
			id: number;
			label: string;
			image?: string;
		}[];
		customClass?: string;
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
				Object.entries(state).map(([key, value]) => [key, new Array<number>()])
			);
		}

		return {
			...state,
			[action.key]: action.selected,
		};
	}

	function getFilter(filter: inferArrayElementType<FilterModalProps["filters"]>) {
		const { items, key, type, label, customClass } = filter;
		switch (type) {
			case "buttons":
				return (
					<ButtonsFilter
						key={key}
						items={items}
						selected={selected[key] ?? []}
						onChange={(selected) => setSelected({ key, selected })}
						label={label}
						customClass={customClass}
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
						customClass={customClass}
					/>
				);
			case "singleChoiceSeparatePage":
				return (
					<SingleChoiceSeparatePageFilter
						key={key}
						items={items}
						selected={selected[key] ?? []}
						onChange={(selected) => setSelected({ key, selected })}
						label={label}
						customClass={customClass}
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
						customClass={customClass}
					/>
				);
			case "multipleChoiceSeparatePage":
				return (
					<MultipleChoiceSeparatePageFilter
						key={key}
						items={items}
						selected={selected[key] ?? []}
						onChange={(selected) => setSelected({ key, selected })}
						label={label}
						customClass={customClass}
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
						customClass={customClass}
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
	customClass?: string;
}

const ButtonsFilter: React.FC<FilterProps> = (props) => {
	const { items, selected, onChange, label, customClass } = props;

	return (
		<div className={`${styles.filterContainer} ${customClass}`}>
			<span className={styles.filterLabel}>{label}</span>
			<div className={styles.buttonContainer}>
				{items?.map((item) => (
					<button
						className={selected.includes(item.id) ? styles.active : undefined}
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
	const { selected, items, onChange, label, customClass } = props;
	const [open, setOpen] = useState(false);

	return (
		<div className={`${styles.filterContainer} ${customClass}`}>
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

const SingleChoiceSeparatePageFilter: React.FC<FilterProps> = (props) => {
	const { selected, items, onChange, label, customClass } = props;
	const [open, setOpen] = useState(false);

	return (
		<div className={`${styles.filterContainer} ${customClass}`}>
			<span className={styles.filterLabel}>{label}</span>
			<div
				className={styles.selectedFilter}
				onClick={() => setOpen(true)}
			>
				<span>
					{selected && selected.length > 0
						? items && selected && selected[0]
							? items[selected[0]]!.label
							: "Filters"
						: "All"}
				</span>
				<Image
					src={"/icons/chevron.svg"}
					width={24}
					height={24}
					alt=""
					style={{ transform: "rotateZ(-90deg)", marginLeft: "auto" }}
				/>
			</div>
			{open && (
				<div className={styles.filtersModalPage}>
					<div className={styles.modalPageClose}>
						<div
							className={styles.close}
							onClick={() => setOpen(false)}
						>
							<Image
								src={"/icons/arrow-back.svg"}
								height={24}
								width={24}
								alt="Close Filter Page"
							/>
						</div>
						<div
							className={styles.close}
							onClick={() => setOpen(false)}
						>
							<Image
								src="/icons/close.svg"
								height={24}
								width={24}
								alt="Close Modal"
							/>
						</div>
					</div>
					<TextField
						placeholder="Search"
						icon="/icons/search.svg"
					/>
					<div className={styles.choiceContainerPage}>
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
					<div className={styles.controls}>
						<button
							className={styles.clear}
							onClick={() => {
								onChange([]);
								setOpen(false);
							}}
						>
							Clear
						</button>
						<button
							className={styles.apply}
							onClick={() => {
								setOpen(false);
							}}
						>
							Apply
						</button>
					</div>
				</div>
			)}
			<div></div>
		</div>
	);
};

const MultipleChoiceFilter: React.FC<FilterProps> = (props) => {
	const { selected, items, onChange, label, customClass } = props;
	const [open, setOpen] = useState(false);

	function handleChange(id: number) {
		if (selected.includes(id)) {
			onChange(selected.filter((_id) => _id !== id));
		} else {
			onChange([...selected, id]);
		}
	}

	function clearSelections() {
		onChange([]);
	}

	return (
		<div className={`${styles.filterContainer} ${customClass}`}>
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

const MultipleChoiceSeparatePageFilter: React.FC<FilterProps> = (props) => {
	const { selected, items, onChange, label, customClass } = props;
	const [open, setOpen] = useState(false);

	function handleChange(id: number) {
		if (selected.includes(id)) {
			onChange(selected.filter((_id) => _id !== id));
		} else {
			onChange([...selected, id]);
		}
	}

	function clearSelections() {
		onChange([]);
	}

	return (
		<div className={`${styles.filterContainer} ${customClass}`}>
			<span className={styles.filterLabel}>{label}</span>
			<div
				className={styles.selectedFilter}
				onClick={() => setOpen(true)}
			>
				<span>
					{selected && selected.length > 0
						? selected.length > 1
							? selected.length + " selected"
							: items &&
							  selected &&
							  selected[0] &&
							  items[selected[0]]!.label
						: "All"}
				</span>
				<Image
					src={"/icons/chevron.svg"}
					width={24}
					height={24}
					alt=""
					style={{ transform: "rotateZ(-90deg)", marginLeft: "auto" }}
				/>
			</div>
			{open && (
				<div className={styles.filtersModalPage}>
					<div className={styles.modalPageClose}>
						<div
							className={styles.close}
							onClick={() => setOpen(false)}
						>
							<Image
								src={"/icons/arrow-back.svg"}
								height={24}
								width={24}
								alt="Close Filter Page"
							/>
						</div>
						<div
							className={styles.close}
							onClick={() => setOpen(false)}
						>
							<Image
								src="/icons/close.svg"
								height={24}
								width={24}
								alt="Close Modal"
							/>
						</div>
					</div>
					<TextField
						placeholder="Search"
						icon="/icons/search.svg"
					/>
					<div className={styles.choiceContainerPage}>
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
					<div className={styles.controls}>
						<button
							className={styles.clear}
							onClick={() => {
								clearSelections();
								setOpen(false);
							}}
						>
							Clear
						</button>
						<button
							className={styles.apply}
							onClick={() => {
								setOpen(false);
							}}
						>
							Apply
						</button>
					</div>
				</div>
			)}
			<div></div>
		</div>
	);
};

const DateFilter: React.FC<FilterProps> = (props) => {
	const { label, onChange, selected, customClass } = props;

	return (
		<div className={`${styles.filterContainer} ${customClass}`}>
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
