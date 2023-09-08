import React, { useState } from "react"
import styles from "@styles/components/dashboard/ProfileSettings.module.css"
import Image from "next/image"
import { trpc } from "src/utils/trpc"
import { AnimatePresence, motion } from "framer-motion"
import PasswordField from "@components/ui/PasswordField"
import Dropdown from "@components/ui/Dropdown"
import TextField from "@components/ui/TextField"

const ProfileSettings: React.FC = () => {
	const { data, isLoading } = trpc.user.getInfo.useQuery()
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
	const [isSportModalOpen, setIsSportModalOpen] = useState<
		"sport" | "country" | "club" | false
	>(false)

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (!data) {
		return <div>Error...</div>
	}

	return (
		<>
			<AnimatePresence initial={false}>
				{isPasswordModalOpen && (
					<PasswordModal
						onClose={() => setIsPasswordModalOpen(false)}
					/>
				)}
				{isSportModalOpen === "sport" && (
					<SportModal onClose={() => setIsSportModalOpen(false)} />
				)}
				{isSportModalOpen === "country" && (
					<CountryModal onClose={() => setIsSportModalOpen(false)} />
				)}
				{isSportModalOpen === "club" && (
					<ClubModal onClose={() => setIsSportModalOpen(false)} />
				)}
			</AnimatePresence>
			<>
				<div
					id={styles.accountSettings}
					className={styles.block}
				>
					<h2>Account Settings</h2>
					<div className={styles.content}>
						<div className={styles.imageInput}>
							<div
								className={`${styles.avatar} ${styles.verified}`}
							>
								<Image
									src="/images/profile-placeholder.png"
									fill
									alt=""
								/>
							</div>
							<label className={styles.upload}>
								<div>
									<Image
										src="/icons/upload.svg"
										height={24}
										width={24}
										alt=""
									/>
								</div>
								<span>Upload picture</span>
								<input type={"file"} />
							</label>
						</div>
						<div className={styles.info}>
							<ProfileField
								label="Username"
								defaultValue={data.nickname}
							/>
							<ProfileField
								label="Full Name"
								defaultValue={data.name.split(" ")[0]}
							/>
							<ProfileField
								label="Email"
								defaultValue={data.email}
							/>
							<div
								className={styles.changePassword}
								onClick={() => setIsPasswordModalOpen(true)}
							>
								<span>Change Password</span>
								<Image
									src="/icons/pencil.svg"
									height={18}
									width={18}
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
				<div
					id={styles.sportDetails}
					className={styles.block}
				>
					<div className={styles.header}>
						<h2>Sport Details</h2>
					</div>
					<div className={styles.content}>
						<div className={styles.sportBlockMain}>
							<div className={styles.image}>
								<Image
									src={data.sport.image}
									height={180}
									width={180}
									alt=""
								/>
							</div>
							<span className={styles.name}>
								<span>{data.sport.name}</span>
								<div
									className={styles.edit}
									onClick={() => setIsSportModalOpen("sport")}
								>
									<Image
										src="/icons/pencil.svg"
										height={18}
										width={18}
										alt=""
									/>
								</div>
							</span>
						</div>
						<div className={styles.sportBlock}>
							<span className={styles.label}>Club</span>
							<div className={styles.details}>
								<div className={styles.image}>
									<Image
										src={data.club.image}
										height={40}
										width={40}
										alt=""
									/>
								</div>
							</div>
							<div
								className={styles.edit}
								onClick={() => setIsSportModalOpen("club")}
							>
								<span>Edit</span>
								<Image
									src="/icons/pencil.svg"
									height={18}
									width={18}
									alt=""
								/>
							</div>
						</div>
						<div className={styles.sportBlock}>
							<span className={styles.label}>Country</span>
							<div className={styles.details}>
								<div className={styles.image}>
									<Image
										src={data.country.image}
										height={40}
										width={40}
										alt=""
									/>
								</div>
							</div>
							<div
								className={styles.edit}
								onClick={() => setIsSportModalOpen("club")}
							>
								<span>Edit</span>
								<Image
									src="/icons/pencil.svg"
									height={18}
									width={18}
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</>
		</>
	)
}

const ProfileField: React.FC<{ label: string; defaultValue?: string }> = (
	props
) => {
	const { label, defaultValue } = props
	const [editable, setEditable] = useState(false)

	return (
		<div className={styles.profileField}>
			<span className={styles.label}>{label}</span>
			<input
				type={"text"}
				readOnly={!editable}
				placeholder={label}
				defaultValue={defaultValue}
			/>
			{!editable ? (
				<div
					className={styles.icon}
					onClick={() => setEditable(true)}
				>
					<Image
						src="/icons/pencil.svg"
						height={18}
						width={18}
						alt=""
					/>
				</div>
			) : (
				<button
					className={styles.icon}
					onClick={() => setEditable(false)}
				>
					Save
				</button>
			)}
		</div>
	)
}

const ModalVariants = {
	open: {
		opacity: [0, 1],
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
	closed: {
		opacity: [1, 0],
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
}

const PasswordModal: React.FC<{ onClose: () => void }> = (props) => {
	const { onClose } = props

	return (
		<motion.div
			className={styles.modalContainer}
			variants={ModalVariants}
			initial="closed"
			animate="open"
			exit="closed"
		>
			<div className={styles.modal}>
				<div className={styles.header}>
					<span>Change Password</span>
					<div
						className={styles.close}
						onClick={onClose}
					>
						<Image
							src="/icons/close.svg"
							height={24}
							width={24}
							alt=""
						/>
					</div>
				</div>
				<div className={styles.content}>
					<PasswordField placeholder="Old Password" />
					<PasswordField placeholder="New Password" />
					<PasswordField placeholder="Repeat Password" />
				</div>
				<button>Save new password</button>
			</div>
		</motion.div>
	)
}

const SportModal: React.FC<{ onClose: () => void }> = (props) => {
	const { onClose } = props
	const { data: sports, isLoading: sportsLoading } =
		trpc.filters.getSports.useQuery()

	if (sportsLoading) {
		return <></>
	}

	if (!sports) {
		return <></>
	}

	return (
		<motion.div
			className={styles.modalContainer}
			variants={ModalVariants}
			initial="closed"
			animate="open"
			exit="closed"
		>
			<div className={styles.modal}>
				<div className={styles.header}>
					<span>Sport</span>
					<div
						className={styles.close}
						onClick={onClose}
					>
						<Image
							src="/icons/close.svg"
							height={24}
							width={24}
							alt=""
						/>
					</div>
				</div>
				<div className={styles.content}>
					<Image
						src="/"
						height={80}
						width={80}
						alt=""
					/>
					<TextField
						placeholder="Search"
						icon="/icons/search.svg"
						minWidth={"100%"}
					/>
					<div className={styles.items}>
						{sports.map((sport) => (
							<div
								className={styles.item}
								key={sport.id}
							>
								<Image
									src={sport.image}
									height={40}
									width={40}
									alt={sport.name}
								/>
								<span>{sport.name}</span>
							</div>
						))}
					</div>
				</div>
				<button>Save</button>
			</div>
		</motion.div>
	)
}

const ClubModal: React.FC<{ onClose: () => void }> = (props) => {
	const { onClose } = props
	const { data: clubs, isLoading: clubsLoading } =
		trpc.filters.getSportClubs.useQuery()

	if (clubsLoading) {
		return <></>
	}

	if (!clubs) {
		return <></>
	}

	return (
		<motion.div
			className={styles.modalContainer}
			variants={ModalVariants}
			initial="closed"
			animate="open"
			exit="closed"
		>
			<div className={styles.modal}>
				<div className={styles.header}>
					<span>Club</span>
					<div
						className={styles.close}
						onClick={onClose}
					>
						<Image
							src="/icons/close.svg"
							height={24}
							width={24}
							alt=""
						/>
					</div>
				</div>
				<div className={styles.content}>
					<Image
						src="/"
						height={80}
						width={80}
						alt=""
					/>
					<TextField
						placeholder="Search"
						icon="/icons/search.svg"
						minWidth={"100%"}
					/>
					<div className={styles.items}>
						{clubs.map((club) => (
							<div
								className={styles.item}
								key={club.id}
							>
								<Image
									src={club.image}
									height={40}
									width={40}
									alt={club.name}
								/>
								<span>{club.name}</span>
							</div>
						))}
					</div>
				</div>
				<button>Save</button>
			</div>
		</motion.div>
	)
}

const CountryModal: React.FC<{ onClose: () => void }> = (props) => {
	const { onClose } = props
	const { data: countries, isLoading: countriesLoading } =
		trpc.filters.getCountries.useQuery()

	if (countriesLoading) {
		return <></>
	}

	if (!countries) {
		return <></>
	}

	return (
		<motion.div
			className={styles.modalContainer}
			variants={ModalVariants}
			initial="closed"
			animate="open"
			exit="closed"
		>
			<div className={styles.modal}>
				<div className={styles.header}>
					<span>Country</span>
					<div
						className={styles.close}
						onClick={onClose}
					>
						<Image
							src="/icons/close.svg"
							height={24}
							width={24}
							alt=""
						/>
					</div>
				</div>
				<div className={styles.content}>
					<Image
						src="/"
						height={80}
						width={80}
						alt=""
					/>
					<TextField
						placeholder="Search"
						icon="/icons/search.svg"
						minWidth={"100%"}
					/>
					<div className={styles.items}>
						{countries.map((country) => (
							<div
								className={styles.item}
								key={country.id}
							>
								<Image
									src={country.image}
									height={40}
									width={40}
									alt={country.name}
								/>
								<span>{country.name}</span>
							</div>
						))}
					</div>
				</div>
				<button>Save</button>
			</div>
		</motion.div>
	)
}

export default ProfileSettings
