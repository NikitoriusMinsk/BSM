import React from "react";
import { trpc } from "src/utils/trpc";
import styles from "@styles/components/dashboard/TipsTab.module.css";
import Dropdown from "@components/ui/Dropdown";
import DateInput from "@components/ui/DatePicker";
import TextField from "@components/ui/TextField";
import Prediction from "@components/ui/Prediction";
import FilterModal from "@components/ui/FilterModal";
import useWindowSize from "src/utils/useWindowSize";
import usePortal from "src/utils/usePortal";
import { PortalContext } from "src/utils/portalContext";
import dynamic from "next/dist/shared/lib/dynamic";

const OutPortal = dynamic(async () => (await import("react-reverse-portal")).OutPortal, {
	ssr: false,
});

const DateFilterItems = [
	{ name: "Newest to Oldest", id: "1" },
	{ name: "Oldest to Newest", id: "2" },
];

const ProfitabilityFilterItems = [
	{ name: "Biggest to Lowest", id: "1" },
	{ name: "Lowest to Biggest", id: "2" },
];

const PendingTipsTab: React.FC = () => {
	const { data, isLoading } = trpc.user.getPendingTips.useQuery();
	const { width } = useWindowSize();
	const portalNode = usePortal();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!data) {
		return <div>Error...</div>;
	}

	return (
		<PortalContext.Provider value={{ portalNode }}>
			{portalNode && <OutPortal node={portalNode} />}
			<>
				<div className={styles.filters}>
					{width > 1024 ? (
						<>
							<div className={styles.filter}>
								<span>CREATE DATE</span>
								<Dropdown
									items={DateFilterItems}
									onSelect={() => {}}
								/>
							</div>
							<div className={styles.filter}>
								<span>PROFITABILITY</span>
								<Dropdown
									items={ProfitabilityFilterItems}
									onSelect={() => {}}
								/>
							</div>
							<div className={styles.filter}>
								<span>DATE</span>
								<DateInput onChange={() => {}} />
							</div>
						</>
					) : (
						<>
							<button className={styles.clear}>Clear</button>
							<FilterModal
								portalNode={portalNode}
								onApply={() => {}}
								filters={[
									{
										key: "creationDate",
										type: "buttons",
										label: "Create Date",
										items: [
											{ id: 1, label: "Newest to Oldest" },
											{ id: 2, label: "Oldest to Newest" },
										],
									},
									{
										key: "profitability",
										type: "buttons",
										label: "Profitability",
										items: [
											{ id: 1, label: "Biggest to Lowest" },
											{ id: 2, label: "Lowest to Biggest" },
										],
									},
									{
										key: "date",
										type: "date",
										label: "Date",
									},
								]}
							/>
						</>
					)}
					<div className={`${styles.filter} ${styles.search}`}>
						<TextField
							icon="/icons/search.svg"
							placeholder="Search"
						/>
					</div>
				</div>
				<div className={styles.predictions}>
					{data.map((prediction, index) => (
						<Prediction
							key={`prediction_${index}`}
							{...prediction}
						/>
					))}
				</div>
			</>
		</PortalContext.Provider>
	);
};

export default PendingTipsTab;
