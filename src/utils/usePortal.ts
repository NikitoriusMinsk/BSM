import { useEffect, useMemo, useState } from "react";
import { HtmlPortalNode, createHtmlPortalNode } from "react-reverse-portal";

export default function usePortal(style?: string, id?: string) {
	const isServerSide = typeof document === "undefined";
	const [_portalNode, setPortalNode] = useState<HtmlPortalNode | null>(null);
	const portalNode = useMemo(() => _portalNode, [_portalNode]);

	useEffect(() => {
		if (!isServerSide) {
			setPortalNode(
				createHtmlPortalNode({
					attributes: {
						style: style ?? "position: absolute; top: 0; left: 0;",
						id: id ?? "portalOut",
					},
				})
			);
		}
	}, [isServerSide]);

	return portalNode;
}
