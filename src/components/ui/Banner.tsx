import React from "react";
import styles from "@styles/components/ui/Banner.module.css";
import Image from "next/image";

interface BannerProps {
	height: number;
	image: string;
}

const Banner: React.FC<BannerProps> = (props) => {
	const { height, image } = props;

	return (
		<div
			className={styles.container}
			style={{ height: 'auto' }}
		>
			<img
				src={image}
				alt="banner"
				style={{
					objectFit: "cover",
					width: '100%'
				}}
			/>
		</div>
	);
};

export default Banner;
