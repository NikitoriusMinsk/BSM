import React, { ReactElement, ReactNode, useMemo } from "react";
import styles from "@styles/components/ui/Slider.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import usePortal from "src/utils/usePortal";
import dynamic from "next/dynamic";

const InPortal = dynamic(
	async () => (await import("react-reverse-portal")).InPortal,
	{ ssr: false }
);
const OutPortal = dynamic(
	async () => (await import("react-reverse-portal")).OutPortal,
	{ ssr: false }
);

interface SliderProps {
	children?: ReactElement[];
	showArrows?: boolean;
	showPagination?: boolean;
	autoPlay?: boolean;
	loop?: boolean;
	swipable?: boolean;
	arrowOptions?: {
		offset: {
			next?: {
				top?: number | string;
				side?: number | string;
			};
			prev?: {
				top?: number | string;
				side?: number | string;
			};
		};
		size?: {
			height: number;
			width: number;
		};
		backgroundColor?: string;
		arrowColor?: "light" | "dark";
	};
}

const Slider: React.FC<SliderProps> = (props) => {
	const {
		children,
		showArrows = false,
		showPagination = true,
		autoPlay = false,
		loop = false,
		arrowOptions,
		swipable = false,
	} = props;
	const portalNode = usePortal("position: absolute; width: 100%; z-index: 1;");

	return (
		<>
			{portalNode && showArrows && <OutPortal node={portalNode} />}
			<Carousel
				className={styles.container}
				showArrows={showArrows}
				showIndicators={showPagination}
				showStatus={false}
				showThumbs={false}
				autoPlay={autoPlay}
				infiniteLoop={loop}
				stopOnHover={true}
				interval={5000}
				swipeable={swipable}
				emulateTouch
				renderIndicator={(clickHandler, isSelected, index) => (
					<Dot
						clickHandler={clickHandler}
						isSelected={isSelected}
						index={index}
					/>
				)}
				renderArrowNext={(clickHandler, hasNext) =>
					portalNode &&
					showArrows && (
						<InPortal node={portalNode}>
							<ArrowNext
								clickHandler={clickHandler}
								hasNext={hasNext}
								offset={arrowOptions?.offset?.next}
								size={arrowOptions?.size}
								backgroundColor={arrowOptions?.backgroundColor}
								arrowColor={arrowOptions?.arrowColor}
							/>
						</InPortal>
					)
				}
				renderArrowPrev={(clickHandler, hasPrev) =>
					portalNode &&
					showArrows && (
						<InPortal node={portalNode}>
							<ArrowPrev
								clickHandler={clickHandler}
								hasPrev={hasPrev}
								offset={arrowOptions?.offset?.prev}
								size={arrowOptions?.size}
								backgroundColor={arrowOptions?.backgroundColor}
								arrowColor={arrowOptions?.arrowColor}
							/>
						</InPortal>
					)
				}
			>
				{children}
			</Carousel>
		</>
	);
};

interface DotProps {
	clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void;
	isSelected: boolean;
	index: number;
}

const Dot: React.FC<DotProps> = (props) => {
	const { clickHandler, isSelected, index } = props;

	return (
		<div
			className={`${styles.dot} ${isSelected ? styles.active : ""}`}
			onClick={clickHandler}
			onKeyDown={clickHandler}
			role="button"
			tabIndex={0}
			data-index={index}
		/>
	);
};

interface ArrowProps {
	clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void;
	hasNext?: boolean;
	hasPrev?: boolean;
	offset?: {
		top?: number | string;
		side?: number | string;
	};
	size?: {
		height: number;
		width: number;
	};
	backgroundColor?: string;
	arrowColor?: "light" | "dark";
}

const ArrowNext: React.FC<ArrowProps> = (props) => {
	const { clickHandler, hasNext, offset, size, backgroundColor, arrowColor } =
		props;

	function getArrowColor(type: typeof arrowColor) {
		switch (type) {
			case "dark":
				return "invert(1)";
			case "light":
				return undefined;
			default:
				break;
		}
	}

	return (
		<div
			className={`${styles.arrow} ${styles.next} ${hasNext && styles.active}`}
			onClick={clickHandler}
			style={{
				top: offset?.top ?? undefined,
				right: offset?.side ?? undefined,
				height: size?.height ?? undefined,
				width: size?.width ?? undefined,
				backgroundColor: backgroundColor ?? undefined,
			}}
		>
			<Image
				src="/icons/slider-next.svg"
				height={12}
				width={7}
				style={{
					filter: getArrowColor(arrowColor),
				}}
				alt=""
			/>
		</div>
	);
};

const ArrowPrev: React.FC<ArrowProps> = (props) => {
	const { clickHandler, hasPrev, offset, size, backgroundColor, arrowColor } =
		props;

	function getArrowColor(type: typeof arrowColor) {
		switch (type) {
			case "dark":
				return "invert(1)";
			case "light":
				return undefined;
			default:
				break;
		}
	}

	return (
		<div
			className={`${styles.arrow} ${styles.prev} ${hasPrev && styles.active}`}
			onClick={clickHandler}
			style={{
				top: offset?.top ?? undefined,
				left: offset?.side ?? undefined,
				height: size?.height ?? undefined,
				width: size?.width ?? undefined,
				backgroundColor: backgroundColor ?? undefined,
			}}
		>
			<Image
				src="/icons/slider-prev.svg"
				height={12}
				width={7}
				style={{
					filter: getArrowColor(arrowColor),
				}}
				alt=""
			/>
		</div>
	);
};

export default Slider;
