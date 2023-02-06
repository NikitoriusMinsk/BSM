import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/pages/Auth.module.css";
import Image from "next/image";
import TextField from "../../components/ui/TextField";
import PasswordField from "../../components/ui/PasswordField";
import SubmitButton from "../../components/ui/SubmitButton";
import { useState } from "react";
import Link from "next/link";

const Forgot: NextPage = () => {
	const [submitForbidden, setSubmitForbidden] = useState(true);
	const [submitted, setSubmitted] = useState(false);

	const submitForgot = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
	};

	return <>
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
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href={"/"}>
                    OPTIMO
                </Link>
            </div>
            <div className={styles.formArea}>
                {!submitted ? (
                    <form
                        className={styles.form}
                        onSubmit={submitForgot}
                    >
                        <Link href="/sign-in" className={styles.backToLogin}>

                            <Image
                                src="/icons/arrow-left-purple.svg"
                                width={24}
                                height={24}
                                alt=""
                            />Back to Login
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
                                placeholder="Email Address"
                                onChange={(e) => {
                                    if (e.target.validity.valid) {
                                        e.target.value.length > 0 &&
                                            setSubmitForbidden(false);
                                    } else {
                                        setSubmitForbidden(true);
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
    </>;
};

export default Forgot;
