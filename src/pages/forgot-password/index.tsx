import type { NextPage } from "next"
import Head from "next/head"
import styles from "../../styles/pages/Auth.module.css"
import Image from "next/image"
import TextField from "../../components/ui/TextField"
import SubmitButton from "../../components/ui/SubmitButton"
import { useState } from "react"
import Link from "next/link"
import { trpc } from "src/utils/trpc"
import { useRouter } from "next/router"
import { AnimatePresence } from "framer-motion"
import MessageModal from "@components/ui/MessageModal"

const Forgot: NextPage = () => {
	const router = useRouter()
	const [submitForbidden, setSubmitForbidden] = useState(true)
	const [submitted, setSubmitted] = useState(false)
	const [errors, setErrors] = useState<any>()
	const [internalError, setInternalError] = useState<string | boolean>(false)
	const reset = trpc.auth.requestPasswordReset.useMutation()

	const submitForgot = (e: React.FormEvent) => {
		e.preventDefault()
		const target = e.target as typeof e.target & {
			email: { value: string }
		}
		const email = target.email.value

		reset
			.mutateAsync({ email })
			.then(() => {
				setSubmitted(true)
			})
			.catch((err) => {
				setErrors(
					err.data.zodError?.fieldErrors ||
						err.data.serverError?.errorCodes
				)
				if (err.data.httpStatus == 500) {
					let errorTxt: string =
						err.data.serverError?.error ||
						err.data.serverError?.message ||
						"Internal server error. Try again later."
					if (errorTxt.toLocaleLowerCase() == "internal server error")
						errorTxt += ". Try again later."
					setInternalError(errorTxt)
				}
			})
	}

	return (
		<>
			<Head>
				<title>Optimo Forgot Password</title>
				<meta
					name="description"
					content="Optimo betting social media forgot password"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<AnimatePresence initial={false}>
				{internalError && (
					<MessageModal
						title="Error"
						close={() => setInternalError(false)}
						closeOnClickOutside
						containerStyle={{ minWidth: "30vw" }}
					>
						<p>{internalError}</p>
					</MessageModal>
				)}
			</AnimatePresence>
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
					{!submitted ? (
						<form
							className={styles.form}
							onSubmit={submitForgot}
						>
							<Link
								href={{
									pathname: "/sign-in",
									query: router.query,
								}}
								className={styles.backToLogin}
							>
								<Image
									src="/icons/arrow-left-purple.svg"
									width={24}
									height={24}
									alt=""
								/>
								Back to Login
							</Link>
							<h1 className={styles.loginTitle}>
								Forgot your password?
							</h1>
							<span className={styles.formTextForgot}>
								Happens to all of us, but we’ll help you reset
								your password. Enter the email associated with
								your account, we’ll send you a link to reset
								password.
							</span>
							<div className={styles.fields}>
								<TextField
									type="email"
									name="email"
									placeholder="Email Address"
									floatingPlaceholder
									errorMessage={errors?.email || null}
									onChange={(e) => {
										if (e.target.validity.valid) {
											e.target.value.length > 0 &&
												setSubmitForbidden(false)
										} else {
											setSubmitForbidden(true)
										}
									}}
								/>
							</div>
							<div className={styles.formBtns}>
								<SubmitButton
									disabled={submitForbidden}
									style={{ marginLeft: "auto" }}
								>
									Reset my password
								</SubmitButton>
							</div>
						</form>
					) : (
						<div className={styles.form}>
							<h1 className={styles.loginTitle}>
								Check your Email
							</h1>
							<span className={styles.formText}>
								The link has been sent to the email.
							</span>
						</div>
					)}
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
	)
}

export default Forgot
