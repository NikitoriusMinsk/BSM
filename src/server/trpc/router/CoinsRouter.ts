import { createRouter } from "../context";
import { z } from "zod";
import { MethodStatus } from "src/types/methodStatus";
import { publicProcedure, router } from "../trpc";

const methodsTemp = [
	{
		text: "Join our Facebook",
		icon: "/icons/social/facebook-colored.svg",
		status: MethodStatus.unavailable,
		reward: 10,
	},
	{
		text: "Complete creating your profile",
		icon: "/icons/profile.svg",
		status: MethodStatus.unavailable,
		reward: 24,
	},
	{
		text: "Join our Instagram",
		icon: "/icons/social/instagram-colored.svg",
		status: MethodStatus.available,
		reward: 10,
	},
	{
		text: "Add an Email address",
		icon: "/icons/email.svg",
		status: MethodStatus.claimed,
		reward: 10,
	},
	{
		text: "Join our Twitter",
		icon: "/icons/social/twitter-colored.svg",
		status: MethodStatus.available,
		reward: 10,
	},
	{
		text: "Join our Telegram",
		icon: "/icons/social/telegram-colored.svg",
		status: MethodStatus.unavailable,
		reward: 10,
	},
];

export const coinsRouter = router({
	getMethods: publicProcedure.query(async ({ ctx, input }) => {
		return methodsTemp;
	}),
});
