import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/pages/Auth.module.css";
import Image from "next/image";
import TextField from "../../components/ui/TextField";
import PasswordField from "../../components/ui/PasswordField";
import SubmitButton from "../../components/ui/SubmitButton";
import { SyntheticEvent, useState } from "react";
import Link from "next/link";
import { trpc } from "src/utils/trpc";
import { useRouter } from "next/router";

const Register: NextPage = () => {
    const [passwordCheck, setPasswordCheck] = useState([false, false, false, false]);

    function checkPassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPasswordCheck([
            e.target.value?.length >= 8,

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

    const [errors, setErrors] = useState<any>()
    const userMutation = trpc.auth.registerUser.useMutation()

    function handleRegister(e: SyntheticEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
            confirmedPassword: { value: string };
            indFirstName: { value: string };
            indLastName: { value: string };
            nickName: { value: string };
            terms: { checked: boolean };
        };

        userMutation.mutateAsync({
            email: target.email.value,
            password: target.password.value,
            confirmedPassword: target.confirmedPassword.value,
            indFirstName: target.indFirstName.value,
            indLastName: target.indLastName.value,
            nickName: target.nickName.value,
            terms: target.terms.checked,
        })
            .then(r => {
                // useRouter().push('/sign-in')
            })
            .catch(r => {
                setErrors(r.data.zodError?.fieldErrors || r.data.serverError?.errorCodes)
            })
    }

    return <>
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
                    <Image
                        src="/logo.svg"
                        height={32}
                        width={136}
                        alt=""
                        style={{ objectFit: 'contain' }}
                    />
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
                            Sign In
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
                        <div className={styles.row}>
                            <TextField
                                type="text"
                                placeholder="First Name"
                                name="indFirstName"
                                errorMessage={errors?.indFirstName || null}
                                floatingPlaceholder
                            />
                            <TextField
                                type="text"
                                placeholder="Last Name"
                                name="indLastName"
                                errorMessage={errors?.indLastName || null}
                                floatingPlaceholder
                            />
                        </div>
                        <TextField
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            errorMessage={errors?.email || null}
                            floatingPlaceholder
                        />
                        <TextField
                            type="text"
                            placeholder="Nickname"
                            // icon="/images/login/dice.svg"
                            // iconClick={() => { }}
                            name="nickName"
                            errorMessage={errors?.nickName || null}
                            floatingPlaceholder
                        />
                        <PasswordField
                            name="password"
                            placeholder="Password"
                            onChange={checkPassword}
                            errorMessage={errors?.password || null}
                            floatingPlaceholder
                        />
                        <PasswordField
                            name="confirmedPassword"
                            placeholder="Repeat Password"
                            errorMessage={errors?.confirmedPassword || null}
                            floatingPlaceholder
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
                            Be at least 8 characters
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
                                name="terms"
                            />
                            <div className={styles.checkBox} />
                            <span className={styles.checkText}>
                                I confirm that I am over 18 years old and I agree with the{" "}
                                <Link href="?">
                                    Terms and Conditions and Privacy Policy.
                                </Link>
                                {userMutation.error?.data?.zodError?.fieldErrors?.terms && <p className={styles.error}>
                                    {userMutation.error?.data?.zodError?.fieldErrors?.terms}
                                </p>}
                            </span>
                        </label>
                    </div>
                    <div className={styles.formBtns}>
                        <SubmitButton disabled={userMutation.isLoading}>Sign Up</SubmitButton>
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
    </>;
};

export default Register;
