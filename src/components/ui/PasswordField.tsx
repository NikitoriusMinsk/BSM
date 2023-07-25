import styles from "../../styles/components/ui/TextField.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	errorMessage?: string | string[];
	floatingPlaceholder?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = (
	props
) => {
	const {
		errorMessage,
		floatingPlaceholder,
		...inputProps
	} = props;
	const [errmsg, setErrmsg] = useState<string | string[] | undefined>(errorMessage)
	const [typeF, setTypeF] = useState(true);
	const [val, setVal] = useState<any>(inputProps.defaultValue || inputProps.value || null)

	useEffect(() => {
		setErrmsg(errorMessage)
	}, [errorMessage])

	useEffect(() => {
		setVal(inputProps.defaultValue || inputProps.value || null)
	}, [inputProps.defaultValue, inputProps.value])

	return (
		<div
			className={
				`${styles.textFieldContainer}` +
				` ${errmsg && styles.errorField}` +
				` ${floatingPlaceholder && styles.floatingPlaceholder}`
			}
		>
			<input
				{...inputProps}
				placeholder={floatingPlaceholder ? undefined : inputProps.placeholder}
				type={typeF ? "password" : "text"}
				onChange={(e) => {
					setErrmsg(undefined)
					setVal(e.currentTarget.value)
					inputProps.onChange && inputProps.onChange(e)
				}}
			/>
			{floatingPlaceholder &&
				<label className={`${styles.floating} ${val && styles.up}`}>{inputProps.placeholder}</label>
			}
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
