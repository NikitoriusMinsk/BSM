import type { NextPage } from "next"
import Head from "next/head"
import styles from "../../styles/pages/Auth.module.css"
import Image from "next/image"
import TextField from "../../components/ui/TextField"
import PasswordField from "../../components/ui/PasswordField"
import SubmitButton from "../../components/ui/SubmitButton"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"
import MessageModal from "@components/ui/MessageModal"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"

const RegisterSuccess: NextPage = () => {
	const router = useRouter()

	return (
		<>
			<Head>
				<title>Optimo Sign Up Success</title>
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
					<div className={styles.form}>
						<h1 className={styles.loginTitle}>Congratulations</h1>
						<span className={styles.congratsText}>
							Your account has been successfully created!
						</span>
						<div className={styles.formBtns}>
							<SubmitButton
								onClick={() =>
									signIn(undefined, {
										callbackUrl: router.query.callbackUrl
											? Array.isArray(
													router.query.callbackUrl
											  )
												? router.query.callbackUrl[0]
												: router.query.callbackUrl
											: undefined,
									})
								}
							>
								Go to login page
							</SubmitButton>
						</div>
					</div>
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
	)
}

export default RegisterSuccess
