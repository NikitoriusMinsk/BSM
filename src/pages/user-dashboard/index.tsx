import { GetServerSideProps, NextPage } from "next";
import React, { useMemo, useState } from "react";
import styles from "@styles/pages/UserDashboard.module.css";
import { trpc } from "src/utils/trpc";
import { UserInfo } from "src/types/queryTypes";
import Image from "next/legacy/image";
import DashboardTab from "@components/dashboard/DashboardTab";
import WithdrawTab from "@components/dashboard/WithdrawTab";
import FollowersTab from "@components/dashboard/FollowersTab";
import FollowingTab from "@components/dashboard/FollowingTab";
import SubscriptionTab from "@components/dashboard/SubscriptionTab";
import ProfileVisitsTab from "@components/dashboard/ProfileVisitsTab";
import TrackingTipsTab from "@components/dashboard/TrackingTipsTab";
import PendingTipsTab from "@components/dashboard/PendingTipsTab";
import HistoricalTipsTab from "@components/dashboard/HistoricalTipsTab";
import ProfileSettings from "@components/dashboard/ProfileSettings";
import Slider from "@components/ui/Slider";
import ArrayToChunks from "src/utils/ArrayToChunks";
import useWindowSize from "src/utils/useWindowSize";

enum Tabs {
	Dashboard = "Dashboard",
	Withdraw = "Withdraw",
	Subscription = "Subscription",
	ProfileVisits = "Profile Visits",
	TrackingTips = "Tracking Tips",
	PendingTips = "Pending Tips",
	HistoricalTips = "Historical Tips",
	Settings = "Profile Settings",
	Followers = "Followers",
	Following = "Following",
}

const NavigationItems = [
	{
		page: Tabs.Dashboard,
		icon: "/icons/dashboard/dashboard.svg",
		activeIcon: "/icons/dashboard/dashboard-white.svg",
	},
	{
		page: Tabs.Withdraw,
		icon: "/icons/dashboard/withdraw.svg",
		activeIcon: "/icons/dashboard/withdraw-white.svg",
	},
	{
		page: Tabs.Subscription,
		icon: "/icons/dashboard/subscription.svg",
		activeIcon: "/icons/dashboard/subscription-white.svg",
	},
	{
		page: Tabs.ProfileVisits,
		icon: "/icons/dashboard/profile-visits.svg",
		activeIcon: "/icons/dashboard/profile-visits-white.svg",
	},
	{
		page: Tabs.TrackingTips,
		icon: "/icons/dashboard/tracking-tips.svg",
		activeIcon: "/icons/dashboard/tracking-tips-white.svg",
	},
	{
		page: Tabs.PendingTips,
		icon: "/icons/dashboard/pending-tips.svg",
		activeIcon: "/icons/dashboard/pending-tips-white.svg",
	},
	{
		page: Tabs.HistoricalTips,
		icon: "/icons/dashboard/historical-tips.svg",
		activeIcon: "/icons/dashboard/historical-tips-white.svg",
	},
	{
		page: Tabs.Settings,
		icon: "/icons/dashboard/settings.svg",
		activeIcon: "/icons/dashboard/settings-white.svg",
	},
];

const UserDashboard: NextPage = () => {
	const { data: userInfo, isLoading: userInfoLoading } =
		trpc.user.getInfo.useQuery();
	const [currentPage, setCurrentPage] = useState(Tabs.Dashboard);
	const memoizedPage = useMemo(() => {
		switch (currentPage) {
			case Tabs.Dashboard:
				return <DashboardTab />;
			case Tabs.Withdraw:
				return <WithdrawTab />;
			case Tabs.Subscription:
				return <SubscriptionTab />;
			case Tabs.ProfileVisits:
				return <ProfileVisitsTab />;
			case Tabs.TrackingTips:
				return <TrackingTipsTab />;
			case Tabs.PendingTips:
				return <PendingTipsTab />;
			case Tabs.HistoricalTips:
				return <HistoricalTipsTab />;
			case Tabs.Settings:
				return <ProfileSettings />;
			case Tabs.Following:
				return <FollowingTab />;
			case Tabs.Followers:
				return <FollowersTab />;
			default:
				return <></>;
		}
	}, [currentPage]);

	if (userInfoLoading) {
		return <div>Loading...</div>;
	}

	if (!userInfo) {
		return <div>Error...</div>;
	}

	return (
		<>
			<div className={styles.sideColumn}>
				<div className={styles.navigationContainer}>
					<Navigation
						userInfo={userInfo}
						currentPage={currentPage}
						onPageChange={(page) => setCurrentPage(page)}
					/>
				</div>
			</div>
			<div className={styles.mainColumn}>{memoizedPage}</div>
		</>
	);
};

const Navigation: React.FC<{
	userInfo: UserInfo;
	currentPage: Tabs;
	onPageChange: (page: Tabs) => void;
}> = (props) => {
	const { userInfo, currentPage, onPageChange } = props;

	const { width } = useWindowSize();

	return (
		<div className={styles.navigation}>
			<div className={styles.userInfo}>
				<div className={styles.user}>
					<div
						className={`${styles.avatar} ${
							userInfo.verified && styles.verified
						}`}
					>
						<Image
							src={userInfo.image}
							height={80}
							width={80}
						/>
					</div>
					<div className={styles.details}>
						<span className={styles.name}>{userInfo.name}</span>
						<span className={styles.rank}>
							<Image
								src="/icons/star.svg"
								height={16}
								width={16}
							/>
							<span>
								Rank <b>{userInfo.rank}</b>
							</span>
						</span>
					</div>
				</div>
				<div className={styles.stats}>
					<div
						className={`${styles.stat} ${
							currentPage === Tabs.Followers && styles.active
						}`}
						onClick={() => onPageChange(Tabs.Followers)}
					>
						<h5>Followers</h5>
						<span>{userInfo.follower_count}</span>
					</div>
					<div
						className={`${styles.stat} ${
							currentPage === Tabs.Following && styles.active
						}`}
						onClick={() => onPageChange(Tabs.Following)}
					>
						<h5>Following</h5>
						<span>{userInfo.following_count}</span>
					</div>
				</div>
			</div>
			<nav>
				<Slider
					swipable={true}
					showPagination={false}
				>
					{ArrayToChunks(
						NavigationItems,
						width <= 425 ? 2 : NavigationItems.length
					).map((chunk, index) => (
						<div
							className={styles.chunk}
							key={`chunk_${index}`}
						>
							{chunk.map(({ icon, activeIcon, page }) => (
								<MenuItem
									key={page}
									page={page}
									icon={icon}
									activeIcon={activeIcon}
									active={currentPage === page}
									onNavigate={() => onPageChange(page)}
									counter={
										page === Tabs.TrackingTips
											? userInfo.tips.tracking_count
											: page === Tabs.PendingTips
											? userInfo.tips.pending_count
											: undefined
									}
								/>
							))}
						</div>
					))}
				</Slider>
			</nav>
		</div>
	);
};

const MenuItem: React.FC<{
	page: Tabs;
	onNavigate: () => void;
	active: boolean;
	icon: string;
	activeIcon: string;
	counter?: number;
}> = (props) => {
	const { active, onNavigate, page, icon, activeIcon, counter } = props;

	return (
		<span
			className={`${styles.menuItem} ${active && styles.active}`}
			onClick={onNavigate}
		>
			<div>
				<Image
					src={active ? activeIcon : icon}
					height={24}
					width={24}
				/>
				<span className={styles.name}>{page}</span>
			</div>
			{counter && <span className={styles.counter}>{counter}</span>}
		</span>
	);
};

export default UserDashboard;
