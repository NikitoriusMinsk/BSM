import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { countrySchema, leagueSchema, paginatorHelper } from "../utils/DTOSchemas";
import makeApiCall from "../utils/makeApiCall";

const SportLeagues = [
	{
		name: "Premier League",
		subName: "England",
		count: 100,
		image: "/images/team-1-placeholder.svg",
		id: "1",
	},
	{
		name: "La Liga",
		subName: "Spain",
		count: 100,
		image: "/images/team-2-placeholder.svg",
		id: "2",
	},
	{
		name: "Bundesliga",
		subName: "Germany",
		count: 100,
		image: "/images/team-1-placeholder.svg",
		id: "3",
	},
	{
		name: "Serie A",
		subName: "Italy",
		count: 100,
		image: "/images/team-2-placeholder.svg",
		id: "4",
	},
	{
		name: "Ligue 1",
		subName: "France",
		count: 100,
		image: "/images/team-1-placeholder.svg",
		id: "5",
	},
	{
		name: "Eredivisie",
		subName: "Netherlands",
		count: 100,
		image: "/images/team-2-placeholder.svg",
		id: "6",
	},
	{
		name: "Primera Division",
		subName: "Spain",
		count: 100,
		image: "/images/team-1-placeholder.svg",
		id: "7",
	},
	{
		name: "Super League",
		subName: "Russia",
		count: 100,
		image: "/images/team-2-placeholder.svg",
		id: "8",
	},
	{
		name: "UEFA Champions League",
		subName: "England",
		count: 100,
		image: "/images/team-1-placeholder.svg",
		id: "9",
	},
	{
		name: "UEFA Europa League",
		subName: "England",
		count: 100,
		image: "/images/team-2-placeholder.svg",
		id: "10",
	},
];

const Sports = [
	{ name: "Football", image: "/images/sport-placeholder.svg", id: "1" },
	{ name: "Basketball", image: "/images/sport-placeholder.svg", id: "2" },
	{ name: "Hockey", image: "/images/sport-placeholder.svg", id: "3" },
	{ name: "Rugby", image: "/images/sport-placeholder.svg", id: "4" },
	{ name: "Tennis", image: "/images/sport-placeholder.svg", id: "5" },
	{ name: "Baseball", image: "/images/sport-placeholder.svg", id: "6" },
	{ name: "Handball", image: "/images/sport-placeholder.svg", id: "7" },
	{ name: "Soccer", image: "/images/sport-placeholder.svg", id: "8" },
	{ name: "Badminton", image: "/images/sport-placeholder.svg", id: "9" },
];

const LeaguesByCountry = [
	{
		name: "England",
		image: "/images/country-placeholder.svg",
		count: 22,
		id: "1",
		leagues: [
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "2",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "3",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "4",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "5",
			},
		],
	},
	{
		name: "England",
		image: "/images/country-placeholder.svg",
		count: 22,
		id: "6",
		leagues: [
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "7",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "8",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "9",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "10",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "11",
			},
		],
	},
	{
		name: "England",
		image: "/images/country-placeholder.svg",
		count: 22,
		id: "12",
		leagues: [
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "13",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "14",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "15",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "16",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "17",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "18",
			},
		],
	},
	{
		name: "England",
		image: "/images/country-placeholder.svg",
		count: 22,
		id: "19",
		leagues: [
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "20",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "21",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "22",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "23",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "24",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "25",
			},
		],
	},
	{
		name: "England",
		image: "/images/country-placeholder.svg",
		count: 23,
		id: "26",
		leagues: [
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "27",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "28",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "29",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "30",
			},
		],
	},
	{
		name: "England",
		image: "/images/country-placeholder.svg",
		count: 28,
		id: "31",
		leagues: [
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "32",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "33",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "34",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "35",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "36",
			},
		],
	},
	{
		name: "England",
		image: "/images/country-placeholder.svg",
		count: 22,
		id: "37",
		leagues: [
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "38",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "39",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "40",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "41",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "42",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "43",
			},
		],
	},
	{
		name: "England",
		image: "/images/country-placeholder.svg",
		count: 22,
		id: "44",
		leagues: [
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "45",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "46",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "47",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "48",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "49",
			},
			{
				name: "Premier League",
				image: "/images/team-1-placeholder.svg",
				count: 78,
				id: "50",
			},
		],
	},
];

const Countries = [
	{ name: "United Kingdom", image: "/icons/flags/en.svg", id: "1" },
	{ name: "Germany", image: "/icons/flags/ger.svg", id: "2" },
	{ name: "Russia", image: "/icons/flags/ru.svg", id: "3" },
	{ name: "Spain", image: "/icons/flags/sp.svg", id: "4" },
];

const SportClubs = [
	{ name: "FC Bayern Munich", image: "/images/team-1-placeholder.svg", id: "1" },
	{ name: "FC Bayern Munich", image: "/images/team-1-placeholder.svg", id: "2" },
	{ name: "FC Bayern Munich", image: "/images/team-1-placeholder.svg", id: "3" },
	{ name: "FC Bayern Munich", image: "/images/team-1-placeholder.svg", id: "4" },
];

export const filtersRouter = createTRPCRouter({
	getLeagues: publicProcedure
		.input(
			z.object({
				page: z.number(),
				size: z.number(),
				sportId: z.number(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { page, size, sportId } = input;

			return await makeApiCall(
				`leagues?page=${page}&size=${size}&sportId=${sportId}`,
				paginatorHelper(leagueSchema.array()),
				{
					method: "GET",
				}
			);
		}),
	getTopLeagues: publicProcedure
		.input(
			z.object({
				page: z.number(),
				size: z.number(),
				sportId: z.number(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { page, size, sportId } = input;

			return await makeApiCall(
				`leagues/top?page=${page}&size=${size}&sportId=${sportId}`,
				paginatorHelper(leagueSchema.array()),
				{
					method: "GET",
				}
			);
		}),
	getSports: publicProcedure.query(async ({ ctx, input }) => {
		return Sports;
	}),
	getTopLeaguesByCountry: publicProcedure
		.input(
			z.object({
				sportId: z.number(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { sportId } = input;

			return await makeApiCall(
				`countries/leagues/top?sportId=${sportId}`,
				countrySchema.array(),
				{
					method: "GET",
				}
			);
		}),
	getLeaguesByCountry: publicProcedure
		.input(
			z.object({
				sportId: z.number(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { sportId } = input;

			return await makeApiCall(
				`countries/leagues?sportId=${sportId}`,
				countrySchema.array(),
				{
					method: "GET",
				}
			);
		}),
	getCountries: publicProcedure.query(async ({ ctx, input }) => {
		return Countries;
	}),
	getSportClubs: publicProcedure.query(async ({ ctx, input }) => {
		return SportClubs;
	}),
});
