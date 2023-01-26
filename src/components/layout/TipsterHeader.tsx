import { AnimatePresence, motion } from "framer-motion";
import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "@styles/components/layout/Header.module.css";
import Dropdown from "@components/ui/Dropdown";
import { useSession } from "next-auth/react";
import Settings from "@components/layout/shared/Settings";
import MenuLink from "@components/layout/shared/MenuLink";
import "moment-timezone";
import Moment from "react-moment";
import dynamic from "next/dynamic";
import { trpc } from "src/utils/trpc";
import UserProfile from "./shared/UserProfile";
// const UserProfile = dynamic(() => import('@components/layout/shared/UserProfile'))

const links = [
	{ href: "/tipster-rating", label: "Tipsters" },
	{ href: "/tipster-competition", label: "Competition" },
];

const TipsterHeader: React.FC = () => {
	const router = useRouter();
	const { data: Timezones } = trpc.useQuery(["navigation.getTimezones"]);

	return (
		<div className={styles.container}>
			<Link href={"/"}>
				<a className={styles.logo}>
					<Image
						src="/logo.svg"
						height={32}
						width={188}
						alt=""
					/>
				</a>
			</Link>
			<div className={styles.links}>
				{links.map(({ href, label }) => (
					<MenuLink
						key={label}
						href={href}
						label={label}
						active={router.pathname.includes(href)}
					/>
				))}
			</div>
			<nav>
				<div className={styles.controls}>
					{Timezones && (
						<Dropdown
							items={Timezones.map((tz) => ({
								name: (
									<Moment
										date={tz.date}
										tz={tz.name}
										format={"DD.MM Z"}
									/>
								),
								label: (
									<Moment
										date={tz.date}
										format={"HH:mm"}
										tz={tz.name}
									/>
								),
								id: tz.id,
							}))}
							onSelect={(id) => {}}
							minWidth={200}
						/>
					)}
					<Settings />
					<UserProfile />
				</div>
			</nav>
		</div>
	);
};

export default TipsterHeader;
