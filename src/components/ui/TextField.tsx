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
}

const TextField: React.FC<TextFieldProps> = (props) => {
	const {
		iconClick,
		minWidth,
		shouldShrink,
		errorMessage,
		...inputProps
	} = props;
	const [errmsg, setErrmsg] = useState<string | string[] | undefined>(errorMessage)

	useEffect(() => {
		setErrmsg(errorMessage)
	}, [errorMessage])

	return (
		<div
			className={
				`${styles.textFieldContainer}` +
				` ${shouldShrink && styles.shrinkSearch}` +
				` ${errmsg && styles.errorField}`
			}
			style={{
				minWidth: minWidth,
			}}
		>
			<input
				{...inputProps}
				style={inputProps.icon ? { paddingRight: 48 } : {}}
				onChange={(e) => {
					setErrmsg(undefined)
					inputProps.onChange && inputProps.onChange(e)
				}}
			/>
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
			{errmsg && <span className={styles.error}>
				{Array.isArray(errmsg) ? errmsg.map(e => e + '. ') : errmsg}
			</span>}
		</div>
	);
};

export default TextField;
