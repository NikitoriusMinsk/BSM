import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import styles from "@styles/components/dashboard/ProfileSettings.module.css";
import Image from "next/image";
import { trpc } from "src/utils/trpc";
import { AnimatePresence, motion } from "framer-motion";
import PasswordField from "@components/ui/PasswordField";
import Dropdown from "@components/ui/Dropdown";
import TextField from "@components/ui/TextField";
import { useSession } from "next-auth/react";
import makeApiCall from "src/server/trpc/utils/makeApiCall";
import { z } from "zod";

const ProfileSettings: React.FC = () => {
	const { data, isLoading } = trpc.user.getInfo.useQuery();
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [isSportModalOpen, setIsSportModalOpen] = useState<
		"sport" | "country" | "club" | false
	>(false);
	const { data: session, update: updateSession } = useSession();
	const { mutateAsync: updateEmail } = trpc.user.updateEmail.useMutation();
	const { mutateAsync: updateNickname } = trpc.user.updateNickname.useMutation();
	const { mutateAsync: updatePassword } = trpc.user.updatePassword.useMutation();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!data) {
		return <div>Error...</div>;
	}

	function handleAvatarUpload(e: ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;
		const files = e.target.files;
		const formData = new FormData();
		files[0] && formData.append("file", files[0]);
		fetch(
			`https://bsm-backend.betting-media.com/bsm-backend/api/files/avatars/parties/${session?.user?.partyId}`,
			{
				method: "POST",
				body: formData,
			}
		)
			.then(async (res) => {
				const url = await res.text();
				updateSession({ image: url });
			})
			.catch((e) => console.log(e));
	}

	async function handleUpdateEmail(value: string) {
		await updateEmail({ email: value });
		updateSession({ email: value });
	}

	async function handleUpdateNickname(value: string) {
		await updateNickname({ nickname: value });
		updateSession({ nickname: value });
	}

	function handleUpdatePassword(
		oldPassword: string,
		newPassword: string,
		newPasswordConfirm: string
	) {
		updatePassword({ oldPassword, newPassword, newPasswordConfirm })
			.then(() => setIsPasswordModalOpen(false))
			.catch((e) => alert(e));
	}

	return (
		<>
			<AnimatePresence initial={false}>
				{isPasswordModalOpen && (
					<PasswordModal
						onClose={() => setIsPasswordModalOpen(false)}
						onSave={handleUpdatePassword}
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
							<div className={`${styles.avatar} ${styles.verified}`}>
								<Image
									src={
										session?.user?.image ??
										"/images/profile-placeholder.png"
									}
									fill
									style={{ objectFit: "cover" }}
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
								<input
									type={"file"}
									multiple={false}
									onChange={handleAvatarUpload}
								/>
							</label>
						</div>
						{session?.user && (
							<div className={styles.info}>
								<ProfileField
									label="Username"
									defaultValue={session.user.nickname}
									onSave={handleUpdateNickname}
									type={"text"}
								/>
								<ProfileField
									label="Full Name"
									defaultValue={session.user.name}
									type={"text"}
								/>
								<ProfileField
									label="Email"
									defaultValue={session.user.email}
									onSave={handleUpdateEmail}
									type={"email"}
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
						)}
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
	);
};

const ProfileField: React.FC<{
	label: string;
	defaultValue?: string;
	onSave?: (value: string) => Promise<void>;
	type?: HTMLInputElement["type"];
}> = (props) => {
	const { label, defaultValue, onSave, type } = props;
	const [editable, setEditable] = useState(false);
	const ref = useRef<HTMLInputElement>(null);
	const previousValue = useRef<string | undefined>(defaultValue);
	const [error, setError] = useState<string>();

	async function handleSave() {
		if (!ref.current?.value) return;
		onSave &&
			onSave(ref.current.value)
				.then(() => setEditable(false))
				.catch((e) => {
					setError(e.message);
				});
	}

	return (
		<div className={styles.profileField}>
			<span className={styles.label}>{label}</span>
			<input
				type={type}
				readOnly={!editable}
				placeholder={label}
				defaultValue={defaultValue}
				ref={ref}
			/>
			{error && <span className={styles.error}>{error}</span>}
			{!editable ? (
				<div
					className={styles.icon}
					onClick={() => {
						setEditable(true);
						previousValue.current = ref.current?.value;
					}}
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
					onClick={handleSave}
				>
					Save
				</button>
			)}
		</div>
	);
};

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
};

const PasswordModal: React.FC<{
	onClose: () => void;
	onSave?: (
		oldPassword: string,
		newPassword: string,
		newPasswordConfirm: string
	) => void;
}> = (props) => {
	const { onClose, onSave } = props;

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			new: { value: string };
			newConfirm: { value: string };
			old: { value: string };
		};
		const newPassword = target.new.value;
		const newPasswordConfirmation = target.newConfirm.value;
		const oldPassword = target.old.value;

		onSave && onSave(oldPassword, newPassword, newPasswordConfirmation);
	}

	return (
		<motion.div
			className={styles.modalContainer}
			variants={ModalVariants}
			initial="closed"
			animate="open"
			exit="closed"
		>
			<form
				className={styles.modal}
				onSubmit={handleSubmit}
			>
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
					<PasswordField
						name="old"
						placeholder="Old Password"
					/>
					<PasswordField
						name="new"
						placeholder="New Password"
					/>
					<PasswordField
						name="newConfirm"
						placeholder="Repeat Password"
					/>
				</div>
				<button type="submit">Save new password</button>
			</form>
		</motion.div>
	);
};

const SportModal: React.FC<{ onClose: () => void }> = (props) => {
	const { onClose } = props;
	const { data: sports, isLoading: sportsLoading } = trpc.filters.getSports.useQuery();

	if (sportsLoading) {
		return <></>;
	}

	if (!sports) {
		return <></>;
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
	);
};

const ClubModal: React.FC<{ onClose: () => void }> = (props) => {
	const { onClose } = props;
	const { data: clubs, isLoading: clubsLoading } =
		trpc.filters.getSportClubs.useQuery();

	if (clubsLoading) {
		return <></>;
	}

	if (!clubs) {
		return <></>;
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
	);
};

const CountryModal: React.FC<{ onClose: () => void }> = (props) => {
	const { onClose } = props;
	const { data: countries, isLoading: countriesLoading } =
		trpc.filters.getCountries.useQuery();

	if (countriesLoading) {
		return <></>;
	}

	if (!countries) {
		return <></>;
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
	);
};

export default ProfileSettings;
