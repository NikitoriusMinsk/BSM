import React from "react";
import styles from "@styles/components/layout/MobileHeader.module.css";
import Link from "next/link";
import Image from "next/image";
import UserProfile from "./shared/UserProfile";
import { trpc } from "src/utils/trpc";
import MenuLink from "./shared/MenuLink";
import { useRouter } from "next/router";

const MobileHeader: React.FC = () => {
	const { data: links } = trpc.navigation.getSports.useQuery();
	const router = useRouter();

	return (
        <div className={styles.container}>
			<div className={styles.row}>
				<Link href={"/"} className={styles.logo}>

                    <Image
                        src="/logo.svg"
                        height={32}
                        width={188}
                        alt=""
                    />

                </Link>
				<UserProfile />
			</div>
			{links && (
				<nav className={styles.navigation}>
					{links.map((link) => (
						<MenuLink
							key={link.label}
							{...link}
							active={router.pathname.includes(link.href)}
						/>
					))}
				</nav>
			)}
		</div>
    );
};

export default MobileHeader;
