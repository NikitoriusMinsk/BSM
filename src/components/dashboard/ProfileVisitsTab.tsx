import React from "react";
import styles from "@styles/components/dashboard/ProfileVisitsTab.module.css";
import sharedStyles from "@styles/components/dashboard/shared.module.css";
import Image from "next/image";
import { trpc } from "src/utils/trpc";
import { createColumnHelper } from "@tanstack/react-table";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import { ProfileVisitsInfo } from "src/types/queryTypes";
import Moment from "react-moment";
import Table from "@components/ui/Table";
import useWindowSize from "src/utils/useWindowSize";

const columnHelper =
	createColumnHelper<inferArrayElementType<ProfileVisitsInfo["visitors"]>>();

const columns = [
	columnHelper.accessor((row) => ({ ...row }), {
		id: "user",
		cell: (info) => {
			const { image, name } = info.getValue();
			return (
				<div className={styles.user}>
					<div className={styles.avatar}>
						<Image
							src={image}
							height={36}
							width={36}
							alt=""
						/>
					</div>
					<span>{name}</span>
				</div>
			);
		},
	}),
	columnHelper.accessor("date", {
		cell: (info) => <Moment format="DD MMM YYYY HH:mm">{info.getValue()}</Moment>,
	}),
	columnHelper.accessor("following", {
		cell: (info) => {
			const following = info.getValue();
			return (
				<div className={styles.buttonContainer}>
					<button
						className={`${styles.followButton} ${
							following ? styles.following : styles.follow
						}`}
					>
						{following ? "Following" : "Follow"}
					</button>
				</div>
			);
		},
	}),
];

const mobileColumns = [
	columnHelper.accessor((row) => ({ ...row }), {
		id: "user",
		cell: (info) => {
			const { image, name, date } = info.getValue();
			return (
				<div className={styles.user}>
					<div className={styles.avatar}>
						<Image
							src={image}
							height={36}
							width={36}
							alt=""
						/>
					</div>
					<div className={styles.info}>
						<span>{name}</span>
						<Moment format="DD MMM YYYY HH:mm">{date}</Moment>
					</div>
				</div>
			);
		},
	}),
	columnHelper.accessor("following", {
		cell: (info) => {
			const following = info.getValue();
			return (
				<div className={styles.buttonContainer}>
					<button
						className={`${styles.followButton} ${
							following ? styles.following : styles.follow
						}`}
					>
						{following ? "Following" : "Follow"}
					</button>
				</div>
			);
		},
	}),
];

export default function ProfileVisitsTab() {
	const { data, isLoading } = trpc.user.getProfileVisitsInfo.useQuery();
	const { width } = useWindowSize();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!data) {
		return <div>Error...</div>;
	}

	return (
		<div className={styles.profileVisitsTab}>
			<div
				id={styles.profileVisits}
				className={`${sharedStyles.block} ${sharedStyles.wide} ${sharedStyles.positive}`}
			>
				<div className={sharedStyles.image}>
					<Image
						src="/images/dashboard/profile-visits.svg"
						height={80}
						width={80}
						alt=""
					/>
				</div>
				<div className={styles.text}>
					<div>
						<h3>Profile Visits</h3>
						<h2>{data.count}</h2>
					</div>
					<div>
						<h4>From last month</h4>
						<span
							className={
								data.difference > 0 ? styles.positive : styles.negative
							}
						>
							{(data.difference * 100).toFixed(2)}%
						</span>
					</div>
				</div>
			</div>
			<div id={styles.table}>
				<Table
					data={data.visitors}
					pageSize={10}
					columns={width <= 425 ? mobileColumns : columns}
					header={false}
				/>
			</div>
		</div>
	);
}
