import React, { ReactElement } from "react";

interface DisaperingContainerProps {
	children: ReactElement[] | ReactElement;
	className: string | undefined;
	condition: boolean;
}

const DisaperingContainer: React.FC<DisaperingContainerProps> = (props) => {
	const { children, className, condition } = props;

	if (condition) {
		return <div className={className}>{children}</div>;
	} else {
		return <>{children}</>;
	}
};

export default DisaperingContainer;
