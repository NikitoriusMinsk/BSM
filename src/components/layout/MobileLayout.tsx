import React from "react";
import styles from "@styles/components/layout/MobileLayout.module.css";
import Footer from "./Footer";
import MobileHeader from "./MobileHeader";
import MobileNavbar from "./MobileNavbar";

interface MobileLayoutProps {
	children?: JSX.Element | JSX.Element[];
}

const MobileLayout: React.FC<MobileLayoutProps> = (props) => {
	const { children } = props;
	return (
		<>
			<MobileHeader />
			<div className={styles.pageWrap}>
				<div className={styles.content}>{children}</div>
				<Footer />
			</div>
			<MobileNavbar />
		</>
	);
};

export default MobileLayout;
