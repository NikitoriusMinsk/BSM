import { z } from "zod";
import { MatchStatus } from "src/types/matchStatus";
import Fuse from "fuse.js";
import { publicProcedure, router } from "../trpc";

// THIS IS A TEMPORARY FUNCTION FOR GENERATING DATES
function getOffsetDate(days: number, months: number, years: number) {
	return new Date(
		new Date().getFullYear() + years,
		new Date().getMonth() + months,
		new Date().getDate() + days
	);
}

const LiveMatchesTemp = [
	{
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
			{
				name: "Manchester City",
				image: "/images/team-2-placeholder.svg",
				score: 1,
			},
		],
		id: 1,
		duration: "48:32",
		viewer_count: 28,
	},
	{
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
			{
				name: "Manchester City",
				image: "/images/team-2-placeholder.svg",
				score: 0,
			},
		],
		id: 2,
		duration: "48:32",
		viewer_count: 12,
	},
	{
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 0 },
			{
				name: "Manchester City",
				image: "/images/team-2-placeholder.svg",
				score: 1,
			},
		],
		id: 3,
		duration: "48:32",
		viewer_count: 8,
	},
	{
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 0 },
			{
				name: "Manchester City",
				image: "/images/team-2-placeholder.svg",
				score: 1,
			},
		],
		id: 4,
		duration: "57:45",
		viewer_count: 55,
	},
];

const MatchesTemp = [
	{
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
			{
				name: "Manchester City",
				image: "/images/team-2-placeholder.svg",
				score: 1,
			},
		],
		id: 1,
		date: "2020.01.01 12:00",
		status: MatchStatus.live,
		league: "Premier League",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
	},
	{
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 1 },
			{
				name: "Manchester City",
				image: "/images/team-2-placeholder.svg",
				score: 0,
			},
		],
		id: 2,
		date: "2020.01.01 17:22",
		status: MatchStatus.upcoming,
		league: "England League",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
	},
	{
		teams: [
			{ name: "Liverpool", image: "/images/team-1-placeholder.svg", score: 0 },
			{
				name: "Manchester City",
				image: "/images/team-2-placeholder.svg",
				score: 1,
			},
		],
		id: 3,
		date: "2020.01.01 13:00",
		status: MatchStatus.finished,
		duration: "17:32",
		league: "Premier League",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
	},
];

const MatchesByLeague = [
	{
		name: "Premier League",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
		country: "England",
		image: "/images/team-1-placeholder.svg",
		matches: [
			{
				teams: [
					{
						name: "Liverpool",
						image: "/images/team-1-placeholder.svg",
						score: 1,
					},
					{
						name: "Manchester City",
						image: "/images/team-2-placeholder.svg",
						score: 1,
					},
				],
				id: 1,
				date: "2020.01.01 12:00",
				status: MatchStatus.upcoming,
				odds: {
					home: 0.34,
					draw: 0.17,
					away: 0.49,
				},
				tip_count: 21,
			},
			{
				teams: [
					{
						name: "Liverpool",
						image: "/images/team-1-placeholder.svg",
						score: 1,
					},
					{
						name: "Manchester City",
						image: "/images/team-2-placeholder.svg",
						score: 1,
					},
				],
				id: 1,
				date: "2020.01.01 12:00",
				status: MatchStatus.live,
				odds: {
					home: 0.34,
					draw: 0.17,
					away: 0.49,
				},
				tip_count: 21,
			},
			{
				teams: [
					{
						name: "Liverpool",
						image: "/images/team-1-placeholder.svg",
						score: 1,
					},
					{
						name: "Manchester City",
						image: "/images/team-2-placeholder.svg",
						score: 1,
					},
				],
				id: 1,
				date: "2020.01.01 12:00",
				status: MatchStatus.live,
				odds: {
					home: 0.34,
					draw: 0.17,
					away: 0.49,
				},
				tip_count: 21,
			},
		],
	},
	{
		name: "Premier League",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
		country: "England",
		image: "/images/team-1-placeholder.svg",
		matches: [
			{
				teams: [
					{
						name: "Liverpool",
						image: "/images/team-1-placeholder.svg",
						score: 1,
					},
					{
						name: "Manchester City",
						image: "/images/team-2-placeholder.svg",
						score: 1,
					},
				],
				id: 1,
				date: "2020.01.01 12:00",
				status: MatchStatus.upcoming,
				odds: {
					home: 0.34,
					draw: 0.17,
					away: 0.49,
				},
				tip_count: 21,
			},
			{
				teams: [
					{
						name: "Liverpool",
						image: "/images/team-1-placeholder.svg",
						score: 1,
					},
					{
						name: "Manchester City",
						image: "/images/team-2-placeholder.svg",
						score: 1,
					},
				],
				id: 1,
				date: "2020.01.01 12:00",
				status: MatchStatus.live,
				odds: {
					home: 0.34,
					draw: 0.17,
					away: 0.49,
				},
				tip_count: 21,
			},
			{
				teams: [
					{
						name: "Liverpool",
						image: "/images/team-1-placeholder.svg",
						score: 1,
					},
					{
						name: "Manchester City",
						image: "/images/team-2-placeholder.svg",
						score: 1,
					},
				],
				id: 1,
				date: "2020.01.01 12:00",
				status: MatchStatus.live,
				odds: {
					home: 0.34,
					draw: 0.17,
					away: 0.49,
				},
				tip_count: 21,
			},
		],
	},
	{
		name: "Premier League",
		sport: {
			name: "Football",
			image: "/images/sport-placeholder.svg",
		},
		country: "England",
		image: "/images/team-1-placeholder.svg",
		matches: [
			{
				teams: [
					{
						name: "Liverpool",
						image: "/images/team-1-placeholder.svg",
						score: 1,
					},
					{
						name: "Manchester City",
						image: "/images/team-2-placeholder.svg",
						score: 1,
					},
				],
				id: 1,
				date: "2020.01.01 12:00",
				status: MatchStatus.live,
				odds: {
					home: 0.34,
					draw: 0.17,
					away: 0.49,
				},
				tip_count: 21,
			},
			{
				teams: [
					{
						name: "Liverpool",
						image: "/images/team-1-placeholder.svg",
						score: 1,
					},
					{
						name: "Manchester City",
						image: "/images/team-2-placeholder.svg",
						score: 1,
					},
				],
				id: 1,
				date: "2020.01.01 12:00",
				status: MatchStatus.upcoming,
				odds: {
					home: 0.34,
					draw: 0.17,
					away: 0.49,
				},
				tip_count: 21,
			},
			{
				teams: [
					{
						name: "Liverpool",
						image: "/images/team-1-placeholder.svg",
						score: 1,
					},
					{
						name: "Manchester City",
						image: "/images/team-2-placeholder.svg",
						score: 1,
					},
				],
				id: 1,
				date: "2020.01.01 12:00",
				status: MatchStatus.live,
				odds: {
					home: 0.34,
					draw: 0.17,
					away: 0.49,
				},
				tip_count: 21,
			},
		],
	},
];

const MatchTips = [
	{
		date: getOffsetDate(-1, 0, 0),
		author: {
			image: "/images/profile-placeholder.png",
			name: "John Doe",
			winrate: 0.53,
			subscribed: false,
		},
		info: {
			tracking: true,
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat arcu vel erat suscipit sodales. Curabitur feugiat, ligula in consequat convallis, turpis arcu aliquet ante, sed rhoncus velit metus nec magna.",
			market: "Over/Under-Total",
			selection: "Over 2.5",
			stake: 115,
			bookmaker: {
				name: "some bookmaker",
				image: "/images/bookmaker-placeholder-1.png",
				odd: 1.56,
			},
			profit: {
				amount: 179,
				potential: true,
			},
			bet_now: true,
			liked: true,
			like_count: 1285,
			comment_count: 25,
			comments: [
				{
					user: {
						name: "John Doe",
						image: "/images/profile-placeholder.png",
					},
					text: "Cras vitae rutrum purus.",
					date: getOffsetDate(-1, 0, 0),
					replies: [
						{
							user: {
								name: "John Doe",
								image: "/images/profile-placeholder.png",
							},
							text: "Cras vitae rutrum purus.",
							date: getOffsetDate(-1, 0, 0),
							replies: [],
						},
						{
							user: {
								name: "Jane Doe",
								image: "/images/profile-placeholder.png",
							},
							text: "Mauris molestie dictum ex, sit amet blandit nisl dignissim at. Quisque quis lorem tincidunt, commodo turpis nec, laoreet massa.",
							date: getOffsetDate(-1, 0, 0),
							replies: [],
						},
					],
				},
				{
					user: {
						name: "Jane Doe",
						image: "/images/profile-placeholder.png",
					},
					text: "Mauris molestie dictum ex, sit amet blandit nisl dignissim at. Quisque quis lorem tincidunt, commodo turpis nec, laoreet massa.",
					date: getOffsetDate(-1, 0, 0),
					replies: [],
				},
				{
					user: {
						name: "John Doe",
						image: "/images/profile-placeholder.png",
					},
					text: "Cras vitae rutrum purus.",
					date: getOffsetDate(-1, 0, 0),
					replies: [
						{
							user: {
								name: "John Doe",
								image: "/images/profile-placeholder.png",
							},
							text: "Cras vitae rutrum purus.",
							date: getOffsetDate(-1, 0, 0),
							replies: [],
						},
						{
							user: {
								name: "Jane Doe",
								image: "/images/profile-placeholder.png",
							},
							text: "Mauris molestie dictum ex, sit amet blandit nisl dignissim at. Quisque quis lorem tincidunt, commodo turpis nec, laoreet massa.",
							date: getOffsetDate(-1, 0, 0),
							replies: [],
						},
					],
				},
				{
					user: {
						name: "Jane Doe",
						image: "/images/profile-placeholder.png",
					},
					text: "Mauris molestie dictum ex, sit amet blandit nisl dignissim at. Quisque quis lorem tincidunt, commodo turpis nec, laoreet massa.",
					date: getOffsetDate(-1, 0, 0),
					replies: [],
				},
			],
		},
	},
	{
		date: getOffsetDate(-2, 0, 0),
		author: {
			image: "/images/profile-placeholder.png",
			name: "Jane Doe",
			winrate: 0.43,
			subscribed: false,
		},
		info: {
			tracking: true,
			match: {
				teams: [
					{
						name: "EIN",
						score: 2,
						image: "/images/team-1-placeholder.svg",
					},
					{
						name: "FCB",
						score: 0,
						image: "/images/team-2-placeholder.svg",
					},
				],
				date: getOffsetDate(2, 0, 0),
				league: "Bundesliga",
				sport: {
					name: "Football",
					image: "/images/sport-placeholder.png",
				},
			},
			market: "Over/Under-Total",
			selection: "Over 2.5",
			stake: 115,
			bookmaker: {
				name: "some bookmaker",
				image: "/images/bookmaker-placeholder-1.png",
				odd: 1.56,
			},
			profit: {
				amount: -179,
				potential: false,
			},
			bet_now: false,
			liked: false,
			like_count: 31,
			comment_count: 3,
			comments: [
				{
					user: {
						name: "John Doe",
						image: "/images/profile-placeholder.png",
					},
					text: "Cras vitae rutrum purus.",
					date: getOffsetDate(-1, 0, 0),
					replies: [],
				},
				{
					user: {
						name: "Jane Doe",
						image: "/images/profile-placeholder.png",
					},
					text: "Mauris molestie dictum ex, sit amet blandit nisl dignissim at. Quisque quis lorem tincidunt, commodo turpis nec, laoreet massa.",
					date: getOffsetDate(-1, 0, 0),
					replies: [],
				},
				{
					user: {
						name: "John Doe",
						image: "/images/profile-placeholder.png",
					},
					text: "Cras vitae rutrum purus.",
					date: getOffsetDate(-1, 0, 0),
					replies: [],
				},
				{
					user: {
						name: "Jane Doe",
						image: "/images/profile-placeholder.png",
					},
					text: "Mauris molestie dictum ex, sit amet blandit nisl dignissim at. Quisque quis lorem tincidunt, commodo turpis nec, laoreet massa.",
					date: getOffsetDate(-1, 0, 0),
					replies: [],
				},
			],
		},
	},
];

export const matchesRouter = router({
	getAllLive: publicProcedure.query(async ({ ctx, input }) => {
		return LiveMatchesTemp;
	}),
	getAll: publicProcedure.query(async ({ ctx, input }) => {
		return MatchesTemp;
	}),
	getAllByLeague: publicProcedure.query(async ({ ctx, input }) => {
		return MatchesByLeague;
	}),
	search: publicProcedure
		.input(
			z.object({
				searchString: z.string(),
				sport: z.string().nullish(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { searchString, sport } = input;

			const options = {
				includeScore: true,
				keys: ["league", "teams.name"],
			};

			const fuse = new Fuse(MatchesTemp, options);

			const result = fuse.search(searchString).map((item) => item.item);

			return result;
		}),
	getMatchTips: publicProcedure.query(async ({ ctx, input }) => {
		return MatchTips;
	}),
});
