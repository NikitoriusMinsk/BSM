import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/pages/Auth.module.css";
import Image from "next/image";
import TextField from "../../components/ui/TextField";
import PasswordField from "../../components/ui/PasswordField";
import SubmitButton from "../../components/ui/SubmitButton";
import Link from "next/link";
import { SyntheticEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login: NextPage = () => {
	const router = useRouter();

	function handleLogin(e: SyntheticEvent) {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
		};
		const email = target.email.value;
		const password = target.password.value;
		signIn("credentials", {
			email: email,
			password: password,
			callbackUrl: (router.query.callbackUrl as string) || "/",
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}

	return <>
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
                    OPTIMO
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
                        <Link href="/sign-up">
                            Create one
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
                        <TextField
                            type={"email"}
                            name="email"
                            placeholder="Email Address"
                        />
                        <PasswordField
                            name="password"
                            type={"password"}
                            placeholder="Password"
                        />
                    </div>
                    <div className={styles.formBtns}>
                        <span className={styles.formText}>
                            <Link href="/forgot-password">
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
    </>;
};

export default Login;
