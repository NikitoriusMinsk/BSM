import styles from "../../styles/components/ui/SubmitButton.module.css";
import Image from "next/image";

const SubmitButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
	props
) => {
	return (
		<button
			className={styles.submit}
			type="submit"
			{...props}
		>
			{props.children}
			<Image
				src="/icons/arrow-narrow-right.svg"
				width={24}
				height={24}
				alt=""
			/>
		</button>
	);
};

export default SubmitButton;
