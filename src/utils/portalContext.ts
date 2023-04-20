import { createContext } from "react";
import { HtmlPortalNode } from "react-reverse-portal";

interface IPortalContext {
	portalNode: HtmlPortalNode | null;
}

export const PortalContext = createContext<IPortalContext>({ portalNode: null });
