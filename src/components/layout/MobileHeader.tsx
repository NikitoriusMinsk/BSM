import React from "react";
import styles from "@styles/components/layout/MobileHeader.module.css";
import Link from "next/link";
import Image from "next/image";
import UserProfile from "./shared/UserProfile";
import { trpc } from "src/utils/trpc";
import MenuLink from "./shared/MenuLink";
import { useRouter } from "next/router";

const MobileHeader: React.FC = () => {
	const { data: sports } = trpc.navigation.getSports.useQuery();
	const router = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<Link
					href={"/"}
					className={styles.logo}
				>
					<Image
						src="/logo.svg"
						height={42}
						width={150}
						alt=""
					/>
				</Link>
				<UserProfile />
			</div>
			{sports && (
				<nav className={styles.navigation}>
					{sports.map((sport) => (
						<MenuLink
							key={sport.id}
							active={router.pathname.includes(`/${sport.name}`)}
							href={`/${sport.name}`}
							label={sport.name}
						/>
					))}
				</nav>
			)}
		</div>
	);
};

export default MobileHeader;
