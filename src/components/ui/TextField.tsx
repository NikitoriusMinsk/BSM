import styles from "../../styles/components/ui/TextField.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	type?: "text" | "email" | string;
	icon?: string;
	iconClick?: (...args: any[]) => void;
	minWidth?: number | string;
	shouldShrink?: boolean;
	errorMessage?: string | string[];
	floatingPlaceholder?: boolean;
}

const TextField: React.FC<TextFieldProps> = (props) => {
	const {
		iconClick,
		minWidth,
		shouldShrink,
		errorMessage,
		floatingPlaceholder,
		...inputProps
	} = props;
	const [errmsg, setErrmsg] = useState<string | string[] | undefined>(errorMessage);
	const [val, setVal] = useState<any>(
		inputProps.defaultValue || inputProps.value || null
	);

	useEffect(() => {
		setErrmsg(errorMessage);
	}, [errorMessage]);

	useEffect(() => {
		setVal(inputProps.defaultValue || inputProps.value || null);
	}, [inputProps.defaultValue, inputProps.value]);

	return (
		<div
			className={
				`${styles.textFieldContainer}` +
				` ${shouldShrink && styles.shrinkSearch}` +
				` ${errmsg && styles.errorField}` +
				` ${floatingPlaceholder && styles.floatingPlaceholder}`
			}
			style={{
				minWidth: minWidth,
			}}
		>
			<input
				{...inputProps}
				placeholder={floatingPlaceholder ? undefined : inputProps.placeholder}
				style={inputProps.icon ? { paddingRight: 48 } : {}}
				onChange={(e) => {
					setErrmsg(undefined);
					setVal(e.currentTarget.value);
					inputProps.onChange && inputProps.onChange(e);
				}}
			/>
			{floatingPlaceholder && (
				<label className={`${styles.floating} ${val && styles.up}`}>
					{inputProps.placeholder}
				</label>
			)}
			{inputProps.icon && (
				<div
					className={styles.icon}
					onClick={iconClick}
					style={iconClick ? { cursor: "pointer" } : {}}
				>
					<Image
						src={inputProps.icon}
						fill
						alt=""
						style={{
							objectFit: "cover",
						}}
					/>
				</div>
			)}
			{errmsg && (
				<span className={styles.error}>
					{Array.isArray(errmsg) ? errmsg.map((e) => e + ". ") : errmsg}
				</span>
			)}
		</div>
	);
};

export default TextField;
