import React from "react"
import styles from "@styles/components/layout/MobileHeader.module.css"
import Link from "next/link"
import Image from "next/image"
import UserProfile from "./shared/UserProfile"
import { trpc } from "src/utils/trpc"
import MenuLink from "./shared/MenuLink"
import { useRouter } from "next/router"
import { motion, AnimatePresence } from "framer-motion"

const MobileHeader: React.FC = () => {
	const { data: sports } = trpc.navigation.getSports.useQuery()
	const router = useRouter()

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
						<div
							className={styles.menuItem}
							key={sport.id}
						>
							<MenuLink
								active={router.asPath.includes(
									`/${sport.name}`
								)}
								href={`/${sport.name}`}
								label={sport.name}
							/>
							{router.asPath.includes(`/${sport.name}`) && (
								<motion.div
									className={styles.pageUnderline}
									layoutId="pageUnderline"
								/>
							)}
						</div>
					))}
				</nav>
			)}
		</div>
	)
}

export default MobileHeader
