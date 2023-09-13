import { GetServerSideProps, NextPage } from "next";
import React, { useMemo, useState } from "react";
import styles from "@styles/pages/UserDashboard.module.css";
import { trpc } from "src/utils/trpc";
import { UserInfo } from "src/types/queryTypes";
import Image from "next/image";
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
import useWindowSize from "src/utils/useWindowSize";
import DisaperingContainer from "@components/helpers/DisaperingContainer";
import { useSession } from "next-auth/react";

enum Tabs {
	Dashboard = "Dashboard",
	Withdraw = "Withdraw",
	Subscription = "Subscription",
	ProfileVisits = "Profile Visits",
	TrackingTips = "Tracking Tips",
	PendingTips = "Pending Tips",
	HistoricalTips = "Historical Tips",
	Settings = "Edit Profile",
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
	const { data: userInfo, isLoading: userInfoLoading } = trpc.user.getInfo.useQuery();
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
	const { width } = useWindowSize();

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
			<div className={styles.mainColumn}>
				<DisaperingContainer
					condition={width > 900}
					className={styles.mobileGrid}
				>
					{memoizedPage}
				</DisaperingContainer>
			</div>
		</>
	);
};

const Navigation: React.FC<{
	userInfo: UserInfo;
	currentPage: Tabs;
	onPageChange: (page: Tabs) => void;
}> = (props) => {
	const { userInfo, currentPage, onPageChange } = props;
	const { data: session } = useSession();
	const { width } = useWindowSize();

	return (
		<div className={styles.navigation}>
			<div className={styles.userInfo}>
				<div className={styles.club}>
					<div>
						<h4>Club</h4>
						<span>FCB</span>
					</div>
					<Image
						src={"/images/league-placeholder.png"}
						height={36}
						width={36}
						alt=""
					/>
				</div>
				<div className={styles.country}>
					<div>
						<h4>Country</h4>
						<span>Georgia</span>
					</div>
					<Image
						src={"/images/country-placeholder.svg"}
						height={36}
						width={36}
						alt=""
					/>
				</div>
				<div className={styles.user}>
					<div
						className={`${styles.avatar} ${
							userInfo.verified && styles.verified
						}`}
					>
						<Image
							src={
								session?.user?.image ?? "/images/profile-placeholder.png"
							}
							fill
							alt=""
							style={{ objectFit: "cover" }}
						/>
					</div>
					<div className={styles.details}>
						<span className={styles.name}>{userInfo.name}</span>
						<span className={styles.rank}>
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
				{NavigationItems.map(({ activeIcon, icon, page }, index) => (
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
					alt=""
				/>
				<span className={styles.name}>{page}</span>
			</div>
			{counter && <span className={styles.counter}>{counter}</span>}
		</span>
	);
};

export default UserDashboard;
