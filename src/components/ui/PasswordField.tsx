import styles from "../../styles/components/ui/TextField.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	errorMessage?: string | string[];
}

const PasswordField: React.FC<PasswordFieldProps> = (
	props
) => {
	const {
		errorMessage,
		...inputProps
	} = props;
	const [errmsg, setErrmsg] = useState<string | string[] | undefined>(errorMessage)
	const [typeF, setTypeF] = useState(true);

	useEffect(() => {
		setErrmsg(errorMessage)
	}, [errorMessage])

	return (
		<div
			className={
				`${styles.textFieldContainer}` +
				` ${errmsg && styles.errorField}`
			}
		>
			<input
				{...inputProps}
				type={typeF ? "password" : "text"}
				onChange={(e) => {
					setErrmsg(undefined)
					inputProps.onChange && inputProps.onChange(e)
				}}
			/>
			<div
				className={styles.eye}
				onClick={() => {
					setTypeF(!typeF);
				}}
			>
				<Image
					src={
						typeF
							? "/images/login/eye-off.svg"
							: "/images/login/eye.svg"
					}
					width={24}
					height={24}
					alt=""
				/>
			</div>
			{errmsg && <span className={styles.error}>
				{Array.isArray(errmsg) ? errmsg.map(e => e + '. ') : errmsg}
			</span>}
		</div>
	);
};

export default PasswordField;
