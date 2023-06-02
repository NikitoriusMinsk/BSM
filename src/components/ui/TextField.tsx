import useWindowSize from "src/utils/useWindowSize";
import styles from "../../styles/components/ui/TextField.module.css";
import Image from "next/image";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	type?: "text" | "email" | string;
	icon?: string;
	iconClick?: (...args: any[]) => void;
	minWidth?: number | string;
	shouldShrink?: boolean;
}

const TextField: React.FC<TextFieldProps> = (props) => {
	const {
		iconClick,
		minWidth,
		shouldShrink,
		...inputProps
	} = props;
	const { width } = useWindowSize();

	return (
		<div
			className={
				`${styles.textFieldContainer}` +
				` ${shouldShrink && styles.shrinkSearch}`
			}
			style={{
				minWidth: minWidth,
			}}
		>
			<input
				{...inputProps}
				style={inputProps.icon ? { paddingRight: 48 } : {}}
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
		</div>
	);
};

export default TextField;
