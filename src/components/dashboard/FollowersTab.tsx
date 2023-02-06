import React, { ChangeEvent, useState } from "react";
import styles from "@styles/components/dashboard/FollowersTab.module.css";
import sharedStyles from "@styles/components/dashboard/shared.module.css";
import Image from "next/image";
import { trpc } from "src/utils/trpc";
import debounce from "src/utils/debounce";
import { FollowersInfo } from "src/types/queryTypes";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import { createColumnHelper } from "@tanstack/react-table";
import shortenNumber from "src/utils/shortenNumber";
import Table from "@components/ui/Table";

const columnHelper =
	createColumnHelper<inferArrayElementType<FollowersInfo["followers"]>>();

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
		header: () => <span>Tipster</span>,
	}),
	columnHelper.accessor("follower_count", {
		cell: (info) => (
			<span>{shortenNumber(info.getValue(), 0)} followers</span>
		),
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

const FollowersTab: React.FC = () => {
	const [searchString, setSearchString] = useState<string>("");
	const { data: searchResults, isLoading: searchResultsLoading } =
		trpc.useQuery(["user.searchFollowers", { searchString: searchString }]);
	const { data, isLoading } = trpc.useQuery(["user.getFollowersInfo"]);
	const [shouldShowSearchResuts, setShouldShowSearchResults] =
		useState(false);

	function handleSearch(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		if (value !== "") {
			setSearchString(value);
			setShouldShowSearchResults(true);
		} else {
			setShouldShowSearchResults(false);
		}
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!data) {
		return <div>Error...</div>;
	}

	return (
		<div className={styles.followersTab}>
			<div className={sharedStyles.row}>
				<div
					id={styles.followers}
					className={`${sharedStyles.block} ${sharedStyles.wide} ${sharedStyles.positive}`}
				>
					<div className={sharedStyles.image}>
						<Image
							src="/images/dashboard/followers.svg"
							height={80}
							width={80}
							alt=""
						/>
					</div>
					<div className={styles.text}>
						<div>
							<h3>Followers</h3>
							<h2>{data.count}</h2>
						</div>
						<div>
							<h4>From last month</h4>
							<span
								className={
									data.difference > 0
										? styles.positive
										: styles.negative
								}
							>
								{(data.difference * 100).toFixed(2)}%
							</span>
						</div>
					</div>
					<div className={styles.search}>
						<input
							type={"text"}
							placeholder="Search"
							onChange={debounce(handleSearch, 1000)}
						/>
						<div className={styles.icon}>
							<Image
								src="/icons/search-white.svg"
								height={24}
								width={24}
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
			<Table
				data={
					shouldShowSearchResuts &&
					searchResults &&
					!searchResultsLoading
						? searchResults
						: data.followers
				}
				columns={columns}
				header={false}
				pageSize={10}
			/>
		</div>
	);
};

export default FollowersTab;
