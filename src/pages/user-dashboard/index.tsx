import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
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
import { useRouter } from "next/router";
import Link from "next/link";

export enum DashboardTabs {
	Dashboard = "dashboard",
	Withdraw = "withdraw",
	Subscription = "subscription",
	ProfileVisits = "profile_visits",
	TrackingTips = "tracking_tips",
	PendingTips = "pending_tips",
	HistoricalTips = "historical_tips",
	Settings = "settings",
	Followers = "followers",
	Following = "following",
}

const NavigationItems = [
	{
		page: DashboardTabs.Dashboard,
		icon: "/icons/dashboard/dashboard.svg",
		activeIcon: "/icons/dashboard/dashboard-white.svg",
		name: "Dashboard",
	},
	{
		page: DashboardTabs.Withdraw,
		icon: "/icons/dashboard/withdraw.svg",
		activeIcon: "/icons/dashboard/withdraw-white.svg",
		name: "Withdraw",
	},
	{
		page: DashboardTabs.Subscription,
		icon: "/icons/dashboard/subscription.svg",
		activeIcon: "/icons/dashboard/subscription-white.svg",
		name: "Subscription",
	},
	{
		page: DashboardTabs.ProfileVisits,
		icon: "/icons/dashboard/profile-visits.svg",
		activeIcon: "/icons/dashboard/profile-visits-white.svg",
		name: "Profile Visits",
	},
	{
		page: DashboardTabs.TrackingTips,
		icon: "/icons/dashboard/tracking-tips.svg",
		activeIcon: "/icons/dashboard/tracking-tips-white.svg",
		name: "Tracking Tips",
	},
	{
		page: DashboardTabs.PendingTips,
		icon: "/icons/dashboard/pending-tips.svg",
		activeIcon: "/icons/dashboard/pending-tips-white.svg",
		name: "Pending Tips",
	},
	{
		page: DashboardTabs.HistoricalTips,
		icon: "/icons/dashboard/historical-tips.svg",
		activeIcon: "/icons/dashboard/historical-tips-white.svg",
		name: "Historical Tips",
	},
	{
		page: DashboardTabs.Settings,
		icon: "/icons/dashboard/settings.svg",
		activeIcon: "/icons/dashboard/settings-white.svg",
		name: "Edit Profile",
	},
];

const UserDashboard: NextPage = () => {
	const { data: userInfo, isLoading: userInfoLoading } = trpc.user.getInfo.useQuery();
	const router = useRouter();
	const memoizedPage = useMemo(() => {
		switch (router.asPath.split("#")[1] as DashboardTabs) {
			case DashboardTabs.Dashboard:
				return <DashboardTab />;
			case DashboardTabs.Withdraw:
				return <WithdrawTab />;
			case DashboardTabs.Subscription:
				return <SubscriptionTab />;
			case DashboardTabs.ProfileVisits:
				return <ProfileVisitsTab />;
			case DashboardTabs.TrackingTips:
				return <TrackingTipsTab />;
			case DashboardTabs.PendingTips:
				return <PendingTipsTab />;
			case DashboardTabs.HistoricalTips:
				return <HistoricalTipsTab />;
			case DashboardTabs.Settings:
				return <ProfileSettings />;
			case DashboardTabs.Following:
				return <FollowingTab />;
			case DashboardTabs.Followers:
				return <FollowersTab />;
			default:
				return <DashboardTab />;
		}
	}, [router.asPath]);
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
					<Navigation userInfo={userInfo} />
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
}> = (props) => {
	const { userInfo } = props;
	const { data: session } = useSession();
	const { width } = useWindowSize();
	const router = useRouter();
	const currentPage =
		(router.asPath.split("#")[1] as DashboardTabs) ?? DashboardTabs.Dashboard;

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
					<Link
						href={`/user-dashboard#${DashboardTabs.Followers}`}
						className={`${styles.stat} ${
							currentPage === DashboardTabs.Followers && styles.active
						}`}
					>
						<h5>Followers</h5>
						<span>{userInfo.follower_count}</span>
					</Link>
					<Link
						href={`/user-dashboard#${DashboardTabs.Following}`}
						className={`${styles.stat} ${
							currentPage === DashboardTabs.Following && styles.active
						}`}
					>
						<h5>Following</h5>
						<span>{userInfo.following_count}</span>
					</Link>
				</div>
			</div>
			<nav>
				{NavigationItems.map(({ activeIcon, icon, page, name }, index) => (
					<MenuItem
						key={page}
						name={name}
						page={page}
						icon={icon}
						activeIcon={activeIcon}
						active={currentPage === page}
						counter={
							page === DashboardTabs.TrackingTips
								? userInfo.tips.tracking_count
								: page === DashboardTabs.PendingTips
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
	name: string;
	page: DashboardTabs;
	active: boolean;
	icon: string;
	activeIcon: string;
	counter?: number;
}> = (props) => {
	const { active, name, icon, activeIcon, counter, page } = props;

	return (
		<Link href={`/user-dashboard#${page}`}>
			<span className={`${styles.menuItem} ${active && styles.active}`}>
				<div>
					<Image
						src={active ? activeIcon : icon}
						height={24}
						width={24}
						alt=""
					/>
					<span className={styles.name}>{name}</span>
				</div>
				{counter && <span className={styles.counter}>{counter}</span>}
			</span>
		</Link>
	);
};

export default UserDashboard;
