import React, { useEffect, useRef, useState } from "react";
import styles from "@styles/components/layout/shared/UserProfile.module.css";
import Image from "next/future/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const NotificationsList = [
	{ text: "You have a new message", date: "10:00", id: 1 },
	{ text: "You have a new message", date: "10:00", id: 2 },
	{ text: "You have a new message", date: "10:00", id: 3 },
	{ text: "You have a new message", date: "10:00", id: 4 },
	{ text: "You have a new message", date: "10:00", id: 5 },
	{ text: "You have a new message", date: "10:00", id: 6 },
];

const UserProfile: React.FC = () => {
	const { data: session } = useSession();

	if (!session?.user) {
		return (
			<button
				className={styles.button}
				onClick={() => signIn()}
			>
				Sign In
			</button>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.points}>
				<Image
					src="/icons/profile/points.svg"
					alt="points"
					width={24}
					height={24}
				/>
				228
			</div>
			<Notifications items={NotificationsList} />
			<Profile
				name={session.user.name}
				id={1}
				image="/images/profile-placeholder.png"
			/>
		</div>
	);
};

interface NotificationsProps {
	items: { text: string; date: string; id: number }[];
}

const NotificationVariants = {
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

const Notifications: React.FC<NotificationsProps> = (props) => {
	const { items } = props;
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

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
			className={styles.notifications}
			ref={dropdownRef}
		>
			<div
				className={styles.notificationIcon}
				onClick={() => setIsOpen(!isOpen)}
			>
				<Image
					src="/icons/profile/notification.svg"
					alt="notification"
					width={24}
					height={24}
				/>
			</div>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						className={styles.notificationsList}
						variants={NotificationVariants}
						initial="closed"
						animate="open"
						exit="closed"
					>
						<div className={styles.notificationsHeader}>
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
							<h2>Notifications</h2>
						</div>
						{items.map((item) => (
							<div
								key={item.id}
								className={styles.notification}
							>
								<span className={styles.notificationTime}>
									{item.date}
								</span>
								<span className={styles.notificationText}>
									{item.text}
								</span>
							</div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

interface ProfileProps {
	name: string;
	id: number;
	image: string;
}

const ProfileMenuVariants = {
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

const Profile: React.FC<ProfileProps> = (props) => {
	const { name, id, image } = props;
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

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
			className={styles.profile}
			ref={dropdownRef}
		>
			<div
				className={styles.profileImage}
				onClick={() => setIsOpen(!isOpen)}
			>
				<Image
					src={image}
					alt="profile"
					width={36}
					height={36}
				/>
			</div>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						className={styles.menu}
						variants={ProfileMenuVariants}
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
							<div className={styles.name}>{name}</div>
							<button>
								<Image
									src="/icons/plus.svg"
									alt="plus"
									width={16}
									height={16}
								/>
								Bet Now
							</button>
						</div>
						<div className={styles.menuSection}>
							<div className={styles.column}>
								<div className={styles.menuItem}>
									<Image
										src="/icons/profile/profile.svg"
										alt="profile"
										width={24}
										height={24}
									/>
									<span>Profile</span>
								</div>
								<div className={styles.menuItem}>
									<Image
										src="/icons/profile/edit-profile.svg"
										alt="profile"
										width={24}
										height={24}
									/>
									<span>Edit Profile</span>
								</div>
								<div className={styles.menuItem}>
									<Image
										src="/icons/profile/followers.svg"
										alt="profile"
										width={24}
										height={24}
									/>
									<span>Followers</span>
								</div>
							</div>
							<div className={styles.column}>
								<Link href="/user-dashboard">
									<a className={styles.menuItem}>
										<Image
											src="/icons/profile/dashboard.svg"
											alt="profile"
											width={24}
											height={24}
										/>
										<span>My Dashboard</span>
									</a>
								</Link>
								<div className={styles.menuItem}>
									<Image
										src="/icons/profile/tips.svg"
										alt="profile"
										width={24}
										height={24}
									/>
									<span>Tracking Tips</span>
								</div>
							</div>
						</div>
						<div className={styles.menuSection}>
							<div
								className={styles.menuItem}
								onClick={() => signOut()}
							>
								<Image
									src="/icons/profile/logout.svg"
									alt="logout"
									width={24}
									height={24}
								/>
								<span>Logout</span>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default UserProfile;
