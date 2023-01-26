import { useState, useEffect } from "react";

export default function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: NaN,
		height: NaN,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight,
			});
		}
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
}
