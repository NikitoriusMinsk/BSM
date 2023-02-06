import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/pages/Auth.module.css";
import Image from "next/image";
import TextField from "../../components/ui/TextField";
import PasswordField from "../../components/ui/PasswordField";
import SubmitButton from "../../components/ui/SubmitButton";
import { SyntheticEvent, useState } from "react";
import Link from "next/link";

const Register: NextPage = () => {
	const [passwordCheck, setPasswordCheck] = useState([false, false, false, false]);

	function checkPassword(e: React.ChangeEvent<HTMLInputElement>) {
		setPasswordCheck([
			e.target.value?.length >= 12,

			e.target.value
				?.split("")
				.filter(
					(letter) => isNaN(parseInt(letter)) && letter.toLowerCase() != letter.toUpperCase() && letter == letter.toUpperCase()
				).length > 0,

			e.target.value?.split("").filter((letter) => !isNaN(parseInt(letter))).length > 0,

			e.target.value?.split("").filter((letter) => isNaN(parseInt(letter)) && letter.toLowerCase() == letter.toUpperCase()).length >
				0,
		]);
	}

	function handleRegister(e: SyntheticEvent) {
		e.preventDefault();
		if (passwordCheck.filter((check) => check).length == 4) {
			const target = e.target as typeof e.target & {
				email: { value: string };
				password: { value: string };
				firstName: { value: string };
				lastName: { value: string };
				nickname: { value: string };
			};
			const email = target.email.value;
			const password = target.password.value;
			const firstName = target.firstName.value;
			const lastName = target.lastName.value;
			const nickname = target.nickname.value;
		} else {
			alert("invalid data");
		}
	}

	return (
		<>
			<Head>
				<title>Optimo Sign Up</title>
				<meta
					name="description"
					content="Optimo betting social media sign up"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<div className={styles.container}>
				<div className={styles.header}>
					<Link href={"/"}>
						<a>OPTIMO</a>
					</Link>
				</div>
				<div className={styles.formArea}>
					<form
						className={styles.form}
						onSubmit={handleRegister}
					>
						<h1 className={styles.loginTitle}>Sign Up</h1>
						<span className={styles.formText}>
							You already have an account?&nbsp;&nbsp;&nbsp;
							<Link href="/sign-in">
								<a>Sign In</a>
							</Link>
						</span>
						<div className={styles.socials}>
							<div className={styles.social}>
								<Image
									src="/images/login/facebook.svg"
									width={24}
									height={24}
									alt="facebook"
								/>
							</div>
							<div className={styles.social}>
								<Image
									src="/images/login/google.svg"
									width={24}
									height={24}
									alt="google"
								/>
							</div>
							<div className={styles.social}>
								<Image
									src="/images/login/twitter.svg"
									width={24}
									height={24}
									alt="twitter"
								/>
							</div>
						</div>
						<span className={styles.separatorOr}>OR</span>
						<div className={styles.fields}>
							<div className={styles.row}>
								<TextField
									type="text"
									placeholder="First Name"
									name="firstName"
								/>
								<TextField
									type="text"
									placeholder="Last Name"
									name="lastName"
								/>
							</div>
							<TextField
								type="email"
								placeholder="Email Address"
								name="email"
							/>
							<TextField
								type="nickname"
								placeholder="Nickname"
								icon="/images/login/dice.svg"
								iconClick={() => {}}
								name="nickname"
							/>
							<PasswordField
								name="password"
								placeholder="Password"
								onChange={checkPassword}
							/>
							<PasswordField
								name="repeat_password"
								placeholder="Repeat Password"
							/>
						</div>
						<div className={styles.passwordDescription}>
							<span className={styles.passwordTitle}>Your password must:</span>
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
							<label className={styles.checkTerms}>
								<input
									type={"checkbox"}
									name="agree_to_terms"
								/>
								<div className={styles.checkBox} />
								<span className={styles.checkText}>
									I confirm that I am over 18 years old and I agree with the{" "}
									<Link href="/sign-in">
										<a>Terms and Conditions and Privacy Policy.</a>
									</Link>
								</span>
							</label>
						</div>
						<div className={styles.formBtns}>
							<SubmitButton>Sign Up</SubmitButton>
						</div>
					</form>
				</div>
				<div className={styles.pageImg}>
					<Image
						src="/images/login/background-register.png"
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

export default Register;
