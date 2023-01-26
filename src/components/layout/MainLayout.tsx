import React, { ReactElement, ReactNode } from "react";
import styles from "@styles/components/layout/MainLayout.module.css";
import Header from "@components/layout/Header";
import Sidebar from "@components/layout/Sidebar";
import Footer from "@components/layout/Footer";
import TipsterHeader from "./TipsterHeader";
import { useRouter } from "next/router";

interface MainLayoutProps {
	children?: JSX.Element | JSX.Element[];
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
	const { children } = props;
	const router = useRouter();
	const tipsterRoutes = ["/tipster-rating", "/tipster-competition"];

	function getHeader(): ReactElement {
		if (tipsterRoutes.includes(router.asPath.split("?")[0] ?? "")) {
			return <TipsterHeader />;
		}

		return <Header />;
	}

	return (
		<>
			{getHeader()}
			<Sidebar />
			<div className={styles.pageWrap}>
				<div className={styles.content}>{children}</div>
				<Footer />
			</div>
		</>
	);
};

export default MainLayout;
