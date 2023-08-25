import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/pages/Auth.module.css";
import Image from "next/image";
import TextField from "../../components/ui/TextField";
import PasswordField from "../../components/ui/PasswordField";
import SubmitButton from "../../components/ui/SubmitButton";
import { useState } from "react";
import Link from "next/link";
import { trpc } from "src/utils/trpc";
import { useRouter } from "next/router";

const Forgot: NextPage = () => {
	const [passwordCheck, setPasswordCheck] = useState([false, false, false, false]);
	const reset = trpc.auth.resetPassword.useMutation();
	const router = useRouter();

	function checkPassword(e: React.ChangeEvent<HTMLInputElement>) {
		setPasswordCheck([
			e.target.value?.length >= 12,

			e.target.value
				?.split("")
				.filter(
					(letter) =>
						isNaN(parseInt(letter)) &&
						letter.toLowerCase() != letter.toUpperCase() &&
						letter == letter.toUpperCase()
				).length > 0,

			e.target.value?.split("").filter((letter) => !isNaN(parseInt(letter)))
				.length > 0,

			e.target.value
				?.split("")
				.filter(
					(letter) =>
						isNaN(parseInt(letter)) &&
						letter.toLowerCase() == letter.toUpperCase()
				).length > 0,
		]);
	}

	function resetPassword(e: React.FormEvent) {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			password: { value: string };
			passwordConfirmation: { value: string };
		};
		const password = target.password.value;
		const passwordConfirmation = target.passwordConfirmation.value;
		const code = router.query.code as string;

		reset
			.mutateAsync({ password, passwordConfirmation, code })
			.then(() => {})
			.catch((err) => alert(`Oops! Error\n${err}`));
	}

	return (
		<>
			<Head>
				<title>Optimo Reset Password</title>
				<meta
					name="description"
					content="Optimo betting social media reset password"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<div className={styles.container}>
				<div className={styles.header}>
					<Link href={"/"}>
						<Image
							src="/logo.svg"
							height={32}
							width={136}
							alt=""
							style={{ objectFit: "contain" }}
						/>
					</Link>
				</div>
				<div className={styles.formArea}>
					<form
						className={styles.form}
						onSubmit={resetPassword}
					>
						<h1
							className={styles.loginTitle}
							style={{ marginBottom: 0 }}
						>
							Enter New Password
						</h1>
						<div className={styles.fields}>
							<PasswordField
								name="password"
								placeholder="New password"
								onChange={checkPassword}
							/>
							<PasswordField
								name="passwordConfirmation"
								placeholder="Repeat Password"
							/>
						</div>
						<div className={styles.passwordDescription}>
							<span className={styles.passwordTitle}>
								Your password must:
							</span>
							<span
								className={`
                                ${styles.checkOption} 
                                ${passwordCheck[0] && styles.active}
                            `}
							>
								Be at least 12 characters
							</span>
							<span
								className={`
                                ${styles.checkOption} 
                                ${passwordCheck[1] && styles.active}
                            `}
							>
								Include at least one uppercase letter
							</span>
							<span
								className={`
                                ${styles.checkOption} 
                                ${passwordCheck[2] && styles.active}
                            `}
							>
								Include at least one number
							</span>
							<span
								className={`
                                ${styles.checkOption} 
                                ${passwordCheck[3] && styles.active}
                            `}
							>
								Include at least one symbol
							</span>
						</div>
						<div
							className={styles.formBtns}
							style={{ marginTop: 32 }}
						>
							<SubmitButton>Save new password</SubmitButton>
						</div>
					</form>
				</div>
				<div className={styles.pageImg}>
					<Image
						src="/images/login/background-password.png"
						fill
						alt=""
						style={{
							objectFit: "cover",
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default Forgot;
