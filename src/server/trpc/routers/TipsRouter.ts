import { z } from "zod";
import { MatchStatus } from "src/types/matchStatus";
import { publicProcedure, createTRPCRouter } from "../trpc";

const MostTipsTemp = [
	{
		league: "Premier League",
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
		],
		tipAmount: 21,
		date: "23:20 2020.01.01",
		status: MatchStatus.upcoming,
	},
	{
		league: "Premier League",
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
		],
		tipAmount: 21,
		date: "2020-01-01",
		status: MatchStatus.live,
		duration: "48:32",
	},
	{
		league: "Premier League",
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
		],
		tipAmount: 21,
		date: "2020-01-01",
		status: MatchStatus.finished,
		duration: "17:32",
	},
	{
		league: "Premier League",
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
		],
		tipAmount: 21,
		date: "23:20 2020.01.01",
		status: MatchStatus.upcoming,
	},
	{
		league: "Premier League",
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
		],
		tipAmount: 21,
		date: "2020-01-01",
		status: MatchStatus.live,
		duration: "48:32",
	},
	{
		league: "Premier League",
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
		],
		tipAmount: 21,
		date: "2020-01-01",
		status: MatchStatus.finished,
		duration: "17:32",
	},
	{
		league: "Premier League",
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
		],
		tipAmount: 21,
		date: "23:20 2020.01.01",
		status: MatchStatus.upcoming,
	},
	{
		league: "Premier League",
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
		],
		tipAmount: 21,
		date: "2020-01-01",
		status: MatchStatus.live,
		duration: "48:32",
	},
	{
		league: "Premier League",
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
		],
		tipAmount: 21,
		date: "2020-01-01",
		status: MatchStatus.finished,
		duration: "17:32",
	},
	{
		league: "Premier League",
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
		],
		tipAmount: 21,
		date: "23:20 2020.01.01",
		status: MatchStatus.upcoming,
	},
	{
		league: "Premier League",
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
		],
		tipAmount: 21,
		date: "2020-01-01",
		status: MatchStatus.live,
		duration: "48:32",
	},
	{
		league: "Premier League",
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg" },
			{ name: "Manchester City", image: "/images/team-2-placeholder.svg" },
		],
		tipAmount: 21,
		date: "2020-01-01",
		status: MatchStatus.finished,
		duration: "17:32",
	},
];

export const tipsRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx, input }) => {
		return MostTipsTemp;
	}),
});
