import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";

const currentCompetitionTemp = {
	startedOn: new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate() - 3
	),
	endsOn: new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate() + 7
	),
	leaders: [
		{
			name: "John Doe",
			image: "/images/profile-placeholder.png",
			prize: 750,
		},
		{
			name: "Jane Doe",
			image: "/images/profile-placeholder.png",
			prize: 450,
		},
		{
			name: "Jill Doe",
			image: "/images/profile-placeholder.png",
			prize: 250,
		},
	],
};

const previousCompetitions = [
	{
		name: "Competition 1",
		startedOn: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate() - 12
		),
		endsOn: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate() - 11
		),
		users: [
			{
				name: "John Doe",
				image: "/images/profile-placeholder.png",
				prize: 750,
				subscriptionCost: 20,
				winrate: 0.5,
				avgProfit: 600,
				subscriberCount: 2000,
				id: 1,
			},
			{
				name: "Jane Doe",
				image: "/images/profile-placeholder.png",
				prize: 450,
				subscriptionCost: 10,
				winrate: 0.6,
				avgProfit: 400,
				subscriberCount: 2500,
				id: 2,
			},
			{
				name: "James Doe",
				image: "/images/profile-placeholder.png",
				prize: 250,
				subscriptionCost: 15,
				winrate: 0.7,
				avgProfit: 200,
				subscriberCount: 1500,
				id: 3,
			},
			{
				name: "Joe Doe",
				image: "/images/profile-placeholder.png",
				prize: 150,
				subscriptionCost: 15,
				winrate: 0.7,
				avgProfit: 200,
				subscriberCount: 1500,
				id: 4,
			},
			{
				name: "Jill Doe",
				image: "/images/profile-placeholder.png",
				prize: 250,
				subscriptionCost: 15,
				winrate: 0.7,
				avgProfit: 200,
				subscriberCount: 1500,
				id: 5,
			},
		],
	},
	{
		name: "Competition 2",
		startedOn: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate() - 11
		),
		endsOn: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate() - 10
		),
		users: [
			{
				name: "John Doe",
				image: "/images/profile-placeholder.png",
				prize: 750,
				subscriptionCost: 20,
				winrate: 0.5,
				avgProfit: 600,
				subscriberCount: 2000,
				id: 1,
			},
			{
				name: "Jane Doe",
				image: "/images/profile-placeholder.png",
				prize: 450,
				subscriptionCost: 10,
				winrate: 0.6,
				avgProfit: 400,
				subscriberCount: 2500,
				id: 2,
			},
			{
				name: "Jane Doe",
				image: "/images/profile-placeholder.png",
				prize: 250,
				subscriptionCost: 15,
				winrate: 0.7,
				avgProfit: 200,
				subscriberCount: 1500,
				id: 3,
			},
		],
	},
	{
		name: "Competition 3",
		startedOn: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate() - 8
		),
		endsOn: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate() - 5
		),
		users: [
			{
				name: "John Doe",
				image: "/images/profile-placeholder.png",
				prize: 750,
				subscriptionCost: 20,
				winrate: 0.5,
				avgProfit: 600,
				subscriberCount: 2000,
				id: 1,
			},
			{
				name: "Jane Doe",
				image: "/images/profile-placeholder.png",
				prize: 450,
				subscriptionCost: 10,
				winrate: 0.6,
				avgProfit: 400,
				subscriberCount: 2500,
				id: 2,
			},
			{
				name: "Jane Doe",
				image: "/images/profile-placeholder.png",
				prize: 250,
				subscriptionCost: 15,
				winrate: 0.7,
				avgProfit: 200,
				subscriberCount: 1500,
				id: 3,
			},
		],
	},
	{
		name: "Competition 4",
		startedOn: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate() - 5
		),
		endsOn: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate() - 4
		),
		users: [
			{
				name: "John Doe",
				image: "/images/profile-placeholder.png",
				prize: 750,
				subscriptionCost: 20,
				winrate: 0.5,
				avgProfit: 600,
				subscriberCount: 2000,
				id: 1,
			},
			{
				name: "Jane Doe",
				image: "/images/profile-placeholder.png",
				prize: 450,
				subscriptionCost: 10,
				winrate: 0.6,
				avgProfit: 400,
				subscriberCount: 2500,
				id: 2,
			},
			{
				name: "Jane Doe",
				image: "/images/profile-placeholder.png",
				prize: 250,
				subscriptionCost: 15,
				winrate: 0.7,
				avgProfit: 200,
				subscriberCount: 1500,
				id: 3,
			},
		],
	},
	{
		name: "Competition 5",
		startedOn: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate() - 4
		),
		endsOn: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate() - 1
		),
		users: [
			{
				name: "John Doe",
				image: "/images/profile-placeholder.png",
				prize: 750,
				subscriptionCost: 20,
				winrate: 0.5,
				avgProfit: 600,
				subscriberCount: 2000,
				id: 1,
			},
			{
				name: "Jane Doe",
				image: "/images/profile-placeholder.png",
				prize: 450,
				subscriptionCost: 10,
				winrate: 0.6,
				avgProfit: 400,
				subscriberCount: 2500,
				id: 2,
			},
			{
				name: "Jane Doe",
				image: "/images/profile-placeholder.png",
				prize: 250,
				subscriptionCost: 15,
				winrate: 0.7,
				avgProfit: 200,
				subscriberCount: 1500,
				id: 3,
			},
		],
	},
];

export const competitionRouter = createTRPCRouter({
	getCurrent: publicProcedure.query(async ({ ctx, input }) => {
		return currentCompetitionTemp;
	}),
	getPrevious: publicProcedure.query(async ({ ctx, input }) => {
		return previousCompetitions;
	}),
});
