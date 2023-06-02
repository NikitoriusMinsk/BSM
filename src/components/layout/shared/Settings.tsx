import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "@styles/components/layout/shared/Settings.module.css";
import Dropdown from "@components/ui/Dropdown";
import { trpc } from "src/utils/trpc";
import Moment from "react-moment";
import useWindowSize from "src/utils/useWindowSize";

const SettingsVariants = {
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

const Languages = [
	{
		name: "English",
		id: "1",
		label: (
			<Image
				src={"/icons/flags/en.svg"}
				height={30}
				width={30}
				alt=""
			/>
		),
	},
	{
		name: "Russian",
		id: "2",
		label: (
			<Image
				src={"/icons/flags/ru.svg"}
				height={30}
				width={30}
				alt=""
			/>
		),
	},
	{
		name: "Spanish",
		id: "3",
		label: (
			<Image
				src={"/icons/flags/sp.svg"}
				height={30}
				width={30}
				alt=""
			/>
		),
	},
	{
		name: "German",
		id: "4",
		label: (
			<Image
				src={"/icons/flags/ger.svg"}
				height={30}
				width={30}
				alt=""
			/>
		),
	},
];

const Settings: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { width } = useWindowSize();

	const closeIfNotDropdown = (e: MouseEvent) => {
		if (
			e.target != dropdownRef.current &&
			!dropdownRef.current?.contains(e.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (window) window.addEventListener("click", closeIfNotDropdown);
		return () => {
			window.removeEventListener("click", closeIfNotDropdown);
		};
	}, []);

	return (
		<div
			className={styles.settings}
			ref={dropdownRef}
		>
			<div
				className={styles.settingsIcon}
				onClick={() => setIsOpen(!isOpen)}
			>
				<Image
					src="/icons/settings.svg"
					height={24}
					width={24}
					alt=""
				/>
				<span>Settings</span>
			</div>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						className={styles.settingsMenu}
						variants={SettingsVariants}
						initial="closed"
						animate="open"
						exit="closed"
					>
						{/* 
                            this block is hidden untill mobile resolution by css
                            sorry in advance
                        */}
						<div className={styles.menuHeader}>
							<div
								className={styles.back}
								onClick={() => setIsOpen(false)}
							>
								<Image
									src={"/icons/arrow-narrow-right-black.svg"}
									height={24}
									width={24}
									alt="Back"
								/>
							</div>
							<h2>Settings</h2>
						</div>
						<div className={styles.settingItem}>
							<h3>Odds format</h3>
							<div className={styles.settingsItemContent}>
								<SettingsOdds text="American +125" />
								<SettingsOdds
									text="Decimal +1.25"
									active
								/>
								<SettingsOdds text="Fractional +1/2" />
							</div>
						</div>
						{/* 
                            this block is hidden untill mobile resolution by css
                            sorry in advance
                        */}
						<div
							className={styles.settingItem}
							id={styles.timezone}
						>
							<h3>Choose your timezone</h3>
							<span className={styles.settingsItemDescription}>
								We will show you sport events starting times in the
								timezone you choose.
							</span>
							<div className={styles.settingsItemContent}>
								{width > 600 ? (
									<Dropdown
										items={Languages}
										onSelect={(id) => { }}
									/>
								) : (
									<TimezoneTab />
								)}
							</div>
						</div>
						<div className={styles.settingItem}>
							<h3>Choose your language</h3>
							<div className={styles.settingsItemContent}>
								{width > 600 ? (
									<Dropdown
										items={Languages}
										onSelect={(id) => { }}
									/>
								) : (
									<LanguageTab />
								)}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

interface SettingsOddsProps {
	text: string;
	active?: boolean;
}

const SettingsOdds: React.FC<SettingsOddsProps> = (props) => {
	const { text, active } = props;

	return (
		<div className={`${styles.oddsFormat} ${active && styles.active}`}>
			{text}
		</div>
	);
};

const TabVariants = {
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

const TimezoneTab: React.FC = (props) => {
	const { data: timezones } = trpc.navigation.getTimezones.useQuery();

	const [active, setActive] = useState("0");
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(active);

	if (!timezones) {
		return <></>;
	}

	function handleSave() {
		setActive(selected);
		setIsOpen(false);
	}

	return (
		<>
			<div
				className={styles.tabButton}
				onClick={() => setIsOpen(true)}
			>
				<div className={styles.info}>
					<Moment
						date={timezones.find((tz) => tz.id === active)?.date}
						tz={timezones.find((tz) => tz.id === active)?.name}
						format={"HH:mm"}
					/>
					<Moment
						className={styles.timezoneDate}
						date={timezones.find((tz) => tz.id === active)?.date}
						tz={timezones.find((tz) => tz.id === active)?.name}
						format={"DD.MM Z"}
					/>
				</div>
				<Image
					className={styles.chevron}
					src={"/icons/chevron-black.svg"}
					height={12}
					width={12}
					alt="Choose Timezone"
				/>
			</div>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						className={styles.tab}
						variants={TabVariants}
						initial="closed"
						animate="open"
						exit="closed"
					>
						<div className={styles.menuHeader}>
							<div
								className={styles.back}
								onClick={() => setIsOpen(false)}
							>
								<Image
									src={"/icons/arrow-narrow-right-black.svg"}
									height={24}
									width={24}
									alt="Back"
								/>
							</div>
							<h2>Choose your timezone</h2>
						</div>
						<div className={styles.selected}>
							<Moment
								date={timezones.find((tz) => tz.id === active)?.date}
								tz={timezones.find((tz) => tz.id === active)?.name}
								format={"HH:mm"}
							/>
							<Moment
								className={styles.timezoneDate}
								date={timezones.find((tz) => tz.id === active)?.date}
								tz={timezones.find((tz) => tz.id === active)?.name}
								format={"DD.MM Z"}
							/>
						</div>
						<div className={styles.options}>
							{timezones.map((tz) => (
								<div
									className={`${styles.option} ${selected === tz.id && styles.selected
										}`}
									onClick={() => setSelected(tz.id)}
									key={tz.id}
								>
									<Moment
										date={tz.date}
										tz={tz.name}
										format={"HH:mm"}
									/>
									<Moment
										className={styles.timezoneDate}
										date={tz.date}
										tz={tz.name}
										format={"DD.MM Z"}
									/>
								</div>
							))}
						</div>
						<div
							className={styles.tabSave}
							onClick={handleSave}
						>
							Save
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

const LanguageTab: React.FC = (props) => {
	const [active, setActive] = useState("1");
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(active);

	function handleSave() {
		setActive(selected);
		setIsOpen(false);
	}

	return (
		<>
			<div
				className={styles.tabButton}
				onClick={() => setIsOpen(true)}
			>
				<div className={styles.info}>
					{Languages.find((lang) => lang.id === active)?.label}
					{Languages.find((lang) => lang.id === active)?.name}
				</div>
				<Image
					className={styles.chevron}
					src={"/icons/chevron-black.svg"}
					height={12}
					width={12}
					alt="Choose Language"
				/>
			</div>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						className={styles.tab}
						variants={TabVariants}
						initial="closed"
						animate="open"
						exit="closed"
					>
						<div className={styles.menuHeader}>
							<div
								className={styles.back}
								onClick={() => setIsOpen(false)}
							>
								<Image
									src={"/icons/arrow-narrow-right-black.svg"}
									height={24}
									width={24}
									alt="Back"
								/>
							</div>
							<h2>Choose your language</h2>
						</div>
						<div
							className={styles.options}
							id={styles.language}
						>
							{Languages.map((lang) => (
								<div
									className={`${styles.option} ${selected === lang.id && styles.selected
										}`}
									key={lang.id}
									onClick={() => setSelected(lang.id)}
								>
									{lang.label}
									{lang.name}
								</div>
							))}
						</div>
						<div
							className={styles.tabSave}
							onClick={handleSave}
						>
							Save
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Settings;
