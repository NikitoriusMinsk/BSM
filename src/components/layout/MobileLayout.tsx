import React, { ReactElement } from "react";
import styles from "@styles/components/layout/MobileLayout.module.css";
import Footer from "./Footer";
import MobileHeader from "./MobileHeader";
import MobileNavbar from "./MobileNavbar";
import MobileTipsterHeader from "./MobileTipsterHeader";
import { useRouter } from "next/router";

interface MobileLayoutProps {
	children?: JSX.Element | JSX.Element[];
}

const MobileLayout: React.FC<MobileLayoutProps> = (props) => {
	const { children } = props;
	const router = useRouter();

	const tipsterRoutes = ["/tipster-rating", "/tipster-competition"];

	function getHeader(): ReactElement {
		if (tipsterRoutes.includes(router.asPath.split("?")[0] ?? "")) {
			return <MobileTipsterHeader />;
		}

		return <MobileHeader />;
	}

	return (
		<>
			{getHeader()}
			<div className={styles.pageWrap}>
				<div className={styles.content}>{children}</div>
				<Footer />
			</div>
			<MobileNavbar />
		</>
	);
};

export default MobileLayout;
