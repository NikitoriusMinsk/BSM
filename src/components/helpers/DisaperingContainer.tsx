import React, { ReactElement } from "react";

interface DisaperingContainerProps {
	children: ReactElement[] | ReactElement;
	className?: string | undefined;
	id?: string | undefined;
	condition: boolean;
}

const DisaperingContainer: React.FC<DisaperingContainerProps> = (props) => {
	const { children, className, condition, id } = props;

	if (!condition) {
		return (
			<div
				id={id}
				className={className}
			>
				{children}
			</div>
		);
	} else {
		return <>{children}</>;
	}
};

export default DisaperingContainer;
