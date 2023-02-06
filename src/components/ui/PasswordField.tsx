import styles from "../../styles/components/ui/TextField.module.css";
import { useState } from "react";
import Image from "next/image";

const PasswordField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
	props
) => {
	const [typeF, setTypeF] = useState(true);

	return (
		<div className={styles.textFieldContainer}>
			<input
				{...props}
				type={typeF ? "password" : "text"}
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
		</div>
	);
};

export default PasswordField;
