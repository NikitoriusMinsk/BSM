import type { NextPage } from "next"
import Head from "next/head"
import styles from "../../styles/pages/Auth.module.css"
import Image from "next/image"
import TextField from "../../components/ui/TextField"
import PasswordField from "../../components/ui/PasswordField"
import SubmitButton from "../../components/ui/SubmitButton"
import Link from "next/link"
import { SyntheticEvent } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

const Login: NextPage = () => {
	const router = useRouter()

	function handleLogin(e: SyntheticEvent) {
		e.preventDefault()
		const target = e.target as typeof e.target & {
			email: { value: string }
			password: { value: string }
		}
		const email = target.email.value
		const password = target.password.value
		signIn("credentials", {
			email: email,
			password: password,
			callbackUrl: (router.query.callbackUrl as string) || "/",
		})
	}

	return (
		<>
			<Head>
				<title>Optimo Login</title>
				<meta
					name="description"
					content="Optimo betting social media login"
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
						onSubmit={handleLogin}
					>
						<h1 className={styles.loginTitle}>Sign In</h1>
						<span className={styles.formText}>
							Don’t have an account?&nbsp;&nbsp;&nbsp;
							<Link
								href={{
									pathname: "/sign-up",
									query: router.query,
								}}
							>
								Create one
							</Link>
						</span>
						{/* <div className={styles.socials}>
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
						<span className={styles.separatorOr}>OR</span> */}
						<div className={styles.fields}>
							<TextField
								type={"text"}
								name="email"
								placeholder="Username"
								floatingPlaceholder
								errorMessage={router.query.error && " "}
							/>
							<PasswordField
								name="password"
								type={"password"}
								placeholder="Password"
								floatingPlaceholder
								errorMessage={router.query.error && " "}
							/>
							{router.query.error && (
								<span className={styles.error}>
									Username or password is incorrect
								</span>
							)}
						</div>
						<div className={styles.formBtns}>
							<span className={styles.formText}>
								<Link
									href={{
										pathname: "/forgot-password",
										query: router.query,
									}}
								>
									Forgot Password?
								</Link>
							</span>
							<SubmitButton type="submit">Sign In</SubmitButton>
						</div>
					</form>
				</div>
				<div className={styles.pageImg}>
					<Image
						src="/images/login/background-login.png"
						fill
						alt=""
						style={{
							objectFit: "cover",
						}}
					/>
				</div>
			</div>
		</>
	)
}

export default Login
