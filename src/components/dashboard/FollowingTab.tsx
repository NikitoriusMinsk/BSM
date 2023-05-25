import React, { ChangeEvent, useState } from "react";
import styles from "@styles/components/dashboard/FollowingTab.module.css";
import sharedStyles from "@styles/components/dashboard/shared.module.css";
import Image from "next/image";
import { trpc } from "src/utils/trpc";
import debounce from "src/utils/debounce";
import { FollowingInfo } from "src/types/queryTypes";
import { inferArrayElementType } from "src/utils/inferArrayElementType";
import { createColumnHelper } from "@tanstack/react-table";
import shortenNumber from "src/utils/shortenNumber";
import Table from "@components/ui/Table";
import useWindowSize from "src/utils/useWindowSize";

const columnHelper =
	createColumnHelper<inferArrayElementType<FollowingInfo["followers"]>>();

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
		cell: (info) => <span>{shortenNumber(info.getValue(), 0)} followers</span>,
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
			const { image, name, follower_count } = info.getValue();
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
						<span>{shortenNumber(follower_count, 0)} followers</span>
					</div>
				</div>
			);
		},
		header: () => <span>Tipster</span>,
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

const FollowingTab: React.FC = () => {
	const [searchString, setSearchString] = useState<string>("");
	const { data: searchResults, isLoading: searchResultsLoading } =
		trpc.user.searchFollowing.useQuery({ searchString: searchString });
	const { data, isLoading } = trpc.user.getFollowingInfo.useQuery();
	const [shouldShowSearchResuts, setShouldShowSearchResults] = useState(false);
	const { width } = useWindowSize();

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
		<>
			<div
				id={styles.following}
				className={`${sharedStyles.block} ${sharedStyles.wide} ${sharedStyles.positive}`}
			>
				<div className={styles.info}>
					<Image
						src="/images/dashboard/followers.svg"
						height={80}
						width={80}
						alt=""
					/>
					<div className={styles.text}>
						<h3>Following</h3>
						<h2>{data.count}</h2>
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
			<div id={styles.table}>
				<Table
					data={
						shouldShowSearchResuts && searchResults && !searchResultsLoading
							? searchResults
							: data.followers
					}
					columns={width <= 425 ? mobileColumns : columns}
					header={false}
					pageSize={20}
				/>
			</div>
		</>
	);
};

export default FollowingTab;
