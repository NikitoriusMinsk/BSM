import { createRouter } from "../context";
import { z } from "zod";
import { MethodStatus } from "src/types/methodStatus";
import { publicProcedure, router } from "../trpc";

const methodsTemp = [
	{
		text: "Join our Facebook",
		icon: "/icons/about-coins/facebook.svg",
		status: MethodStatus.unavailable,
		reward: 10,
	},
	{
		text: "Complete creating your profile",
		icon: "/icons/about-coins/profile.svg",
		status: MethodStatus.unavailable,
		reward: 24,
	},
	{
		text: "Join our Instagram",
		icon: "/icons/about-coins/instagram.svg",
		status: MethodStatus.available,
		reward: 10,
	},
	{
		text: "Add an Email address",
		icon: "/icons/about-coins/mail.svg",
		status: MethodStatus.claimed,
		reward: 10,
	},
	{
		text: "Join our Twitter",
		icon: "/icons/about-coins/twitter.svg",
		status: MethodStatus.available,
		reward: 10,
	},
	{
		text: "Join our Telegram",
		icon: "/icons/about-coins/telegram.svg",
		status: MethodStatus.unavailable,
		reward: 10,
	},
];

export const coinsRouter = router({
	getMethods: publicProcedure.query(async ({ ctx, input }) => {
		return methodsTemp;
	}),
});
