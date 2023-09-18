import React, { useEffect, useRef, useState } from "react";
import styles from "@styles/components/layout/shared/UserProfile.module.css";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserNotifications } from "src/types/queryTypes";
import { trpc } from "src/utils/trpc";
import Moment from "react-moment";
import { DashboardTabs } from "src/pages/user-dashboard";

const UserProfile: React.FC = () => {
	const { data: session } = useSession();
	const { data: notifications, isLoading: matchesLoading } =
		trpc.user.getNotifications.useQuery();

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
			{notifications && <Notifications items={notifications} />}
			<Profile
				name={session.user.name}
				id={1}
				image={session?.user?.image ?? "/images/profile-placeholder.png"}
			/>
		</div>
	);
};

interface NotificationsProps {
	items: UserNotifications;
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
							<div className={styles.notificationsHeaderText}>
								<h2>Notifications</h2>

								<div className={styles.notificationsBubble}>
									{items.new.length}
								</div>
							</div>
						</div>
						<div className={styles.notificationContainer}>
							<span className={styles.notificationSubTitle}>New</span>
							{items.new.map((item) => (
								<div
									key={item.id}
									className={styles.notification}
								>
									<Image
										src={item.image}
										height={52}
										width={52}
										alt="Notification Image"
										className={styles.notificationImage}
									/>
									<div className={styles.notificationInfo}>
										<span className={styles.notificationText}>
											{item.message}
										</span>
										<Moment
											fromNow
											className={styles.notificationTime}
										>
											{item.date}
										</Moment>
									</div>
								</div>
							))}
						</div>
						<div className={styles.notificationContainer}>
							<span className={styles.notificationSubTitle}>Earlier</span>
							{items.new.map((item) => (
								<div
									key={item.id}
									className={styles.notification}
								>
									<Image
										src={item.image}
										height={52}
										width={52}
										alt="Notification Image"
										className={styles.notificationImage}
									/>
									<div className={styles.notificationInfo}>
										<span className={styles.notificationText}>
											{item.message}
										</span>
										<Moment
											format="DD MMM"
											className={styles.notificationTime}
										>
											{item.date}
										</Moment>
									</div>
								</div>
							))}
						</div>
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
					fill
					style={{ objectFit: "cover" }}
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
							<div className={styles.user}>
								<div className={styles.profileImage}>
									<Image
										src={image}
										alt="profile"
										width={52}
										height={52}
										style={{ objectFit: "cover" }}
									/>
								</div>
								<div className={styles.userInfo}>
									<div className={styles.name}>{name}</div>
									<div className={styles.followers}>Followers 1337</div>
								</div>
							</div>
						</div>
						<div className={styles.menuSection}>
							<Link
								className={styles.menuItem}
								href={`/user-dashboard#${DashboardTabs.Settings}`}
							>
								<Image
									src="/icons/profile/edit-profile.svg"
									alt="profile"
									width={24}
									height={24}
								/>
								<span>Edit Profile</span>
							</Link>
							<Link
								className={styles.menuItem}
								href={`/user-dashboard#${DashboardTabs.Followers}`}
							>
								<Image
									src="/icons/profile/followers.svg"
									alt="profile"
									width={24}
									height={24}
								/>
								<span>Followers</span>
							</Link>
							<Link
								href={`/user-dashboard#${DashboardTabs.Dashboard}`}
								className={styles.menuItem}
							>
								<Image
									src="/icons/profile/dashboard.svg"
									alt="profile"
									width={24}
									height={24}
								/>
								<span>My Dashboard</span>
							</Link>
							<Link
								className={styles.menuItem}
								href={`/user-dashboard#${DashboardTabs.TrackingTips}`}
							>
								<Image
									src="/icons/profile/tips.svg"
									alt="profile"
									width={24}
									height={24}
								/>
								<span>Tracking Tips</span>
							</Link>
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
