import { createRouter } from "../context";
import { z } from "zod";
import { TransactionStatus } from "src/types/transactionStatus";
import Fuse from "fuse.js";
import { protectedProcedure, router } from "../trpc";

// THIS IS A TEMPORARY FUNCTION FOR GENERATING DATES
function getOffsetDate(days: number, months: number, years: number) {
	return new Date(
		new Date().getFullYear() + years,
		new Date().getMonth() + months,
		new Date().getDate() + days
	);
}

const UserInfo = {
	image: "/images/profile-placeholder.png",
	name: "John Doe",
	nickname: "xXJohn1337Xx",
	email: "john@doe.com",
	sport: {
		name: "Box",
		image: "/images/sport-placeholder.svg",
	},
	club: {
		name: "FC Bayern Munich",
		image: "/images/team-1-placeholder.svg",
	},
	country: {
		name: "Spain",
		image: "/icons/flags/sp.svg",
	},
	rank: 143,
	follower_count: 1782,
	following_count: 395,
	tips: {
		tracking_count: 2,
		pending_count: 2,
	},
	verified: true,
};

const DashboardInfo = {
	avgProfit: 534,
	roi: 0.72,
	tips_per_month: 18,
	winrate: 0.45,
	favoriteBookmaker: {
		image: "/images/bookmaker-placeholder-3.png",
		name: "WeBet",
	},
	favoriteSport: {
		name: "Box",
		image: "/images/sport-placeholder.svg",
	},
	odds: {
		avg: 4.02,
		history: [
			{ time: 1, value: 2 },
			{ time: 2, value: 2 },
			{ time: 3, value: 4 },
			{ time: 4, value: 6 },
			{ time: 5, value: 1 },
			{ time: 6, value: 1 },
			{ time: 7, value: 6 },
		],
	},
	coins: {
		count: 213,
		history: [
			{ time: 1, value: 2 },
			{ time: 2, value: 1 },
			{ time: 3, value: 4 },
			{ time: 4, value: 4 },
			{ time: 5, value: 3 },
			{ time: 6, value: 1 },
			{ time: 7, value: 5 },
		],
	},
	bets: {
		won: 16,
		pending: 9,
		lost: 7,
		total: 32,
	},
};

const WithdrawInfo = {
	pendingBalance: 534,
	availableBalance: 523,
	totalEarned: 12523,
	history: [
		{
			id: 253946301635,
			amount: 228,
			date: new Date(),
			status: TransactionStatus.Pending,
		},
		{
			id: 253946301634,
			amount: 28,
			date: new Date(),
			status: TransactionStatus.Success,
		},
		{
			id: 253946301633,
			amount: 1238,
			date: new Date(),
			status: TransactionStatus.Blocked,
		},
		{
			id: 253946301632,
			amount: 345,
			date: new Date(),
			status: TransactionStatus.Success,
		},
		{
			id: 253946301631,
			amount: 78,
			date: new Date(),
			status: TransactionStatus.Success,
		},
		{
			id: 253946301630,
			amount: 8,
			date: new Date(),
			status: TransactionStatus.Pending,
		},
		{
			id: 253946301629,
			amount: 123,
			date: new Date(),
			status: TransactionStatus.Blocked,
		},
		{
			id: 253946301635,
			amount: 228,
			date: new Date(),
			status: TransactionStatus.Pending,
		},
		{
			id: 253946301634,
			amount: 28,
			date: new Date(),
			status: TransactionStatus.Success,
		},
		{
			id: 253946301633,
			amount: 1238,
			date: new Date(),
			status: TransactionStatus.Blocked,
		},
		{
			id: 253946301632,
			amount: 345,
			date: new Date(),
			status: TransactionStatus.Success,
		},
		{
			id: 253946301631,
			amount: 78,
			date: new Date(),
			status: TransactionStatus.Success,
		},
		{
			id: 253946301630,
			amount: 8,
			date: new Date(),
			status: TransactionStatus.Pending,
		},
		{
			id: 253946301629,
			amount: 123,
			date: new Date(),
			status: TransactionStatus.Blocked,
		},
		{
			id: 253946301635,
			amount: 228,
			date: new Date(),
			status: TransactionStatus.Pending,
		},
		{
			id: 253946301634,
			amount: 28,
			date: new Date(),
			status: TransactionStatus.Success,
		},
		{
			id: 253946301633,
			amount: 1238,
			date: new Date(),
			status: TransactionStatus.Blocked,
		},
		{
			id: 253946301632,
			amount: 345,
			date: new Date(),
			status: TransactionStatus.Success,
		},
		{
			id: 253946301631,
			amount: 78,
			date: new Date(),
			status: TransactionStatus.Success,
		},
		{
			id: 253946301630,
			amount: 8,
			date: new Date(),
			status: TransactionStatus.Pending,
		},
		{
			id: 253946301629,
			amount: 123,
			date: new Date(),
			status: TransactionStatus.Blocked,
		},
		{
			id: 253946301635,
			amount: 228,
			date: new Date(),
			status: TransactionStatus.Pending,
		},
		{
			id: 253946301634,
			amount: 28,
			date: new Date(),
			status: TransactionStatus.Success,
		},
		{
			id: 253946301633,
			amount: 1238,
			date: new Date(),
			status: TransactionStatus.Blocked,
		},
		{
			id: 253946301632,
			amount: 345,
			date: new Date(),
			status: TransactionStatus.Success,
		},
		{
			id: 253946301631,
			amount: 78,
			date: new Date(),
			status: TransactionStatus.Success,
		},
		{
			id: 253946301630,
			amount: 8,
			date: new Date(),
			status: TransactionStatus.Pending,
		},
		{
			id: 253946301629,
			amount: 123,
			date: new Date(),
			status: TransactionStatus.Blocked,
		},
	],
};

const FollowersInfo = {
	count: 1782,
	difference: 0.0293,
	followers: [
		{
			name: "John Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: false,
		},
		{
			name: "Jane Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Jack Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: false,
		},
		{
			name: "Jill Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: false,
		},
		{
			name: "Joe Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: false,
		},
		{
			name: "Juan Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Julie Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Jenny Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: false,
		},
		{
			name: "Lee Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Juan Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Jane Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "John Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: false,
		},
		{
			name: "Julie Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
	],
};

const FollowingInfo = {
	count: 395,
	followers: [
		{
			name: "John Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Jane Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Jack Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Jill Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Joe Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Juan Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Julie Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Jenny Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Lee Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Juan Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Jane Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "John Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
		{
			name: "Julie Doe",
			image: "/images/profile-placeholder.png",
			follower_count: 2000,
			following: true,
		},
	],
};

const SubscriptionInfo = {
	subscribers_count: 24,
	subscribers_difference: 0.0293,
	subscriptions_count: 12,
	subscribers: [
		{
			name: "John Doe",
			image: "/images/profile-placeholder.png",
			amount: 125,
			startedOn: getOffsetDate(0, 0, -1),
			endsOn: getOffsetDate(0, 0, 1),
		},
		{
			name: "Jane Doe",
			image: "/images/profile-placeholder.png",
			amount: 12,
			startedOn: getOffsetDate(0, 0, -2),
			endsOn: getOffsetDate(0, 2, 0),
		},
		{
			name: "Jill Doe",
			image: "/images/profile-placeholder.png",
			amount: 44,
			startedOn: getOffsetDate(0, -2, 0),
			endsOn: getOffsetDate(0, 3, 0),
		},
		{
			name: "Jack Doe",
			image: "/images/profile-placeholder.png",
			amount: 66,
			startedOn: getOffsetDate(0, 0, -1),
			endsOn: getOffsetDate(0, 0, 1),
		},
		{
			name: "James Doe",
			image: "/images/profile-placeholder.png",
			amount: 17,
			startedOn: getOffsetDate(-1, 0, 0),
			endsOn: getOffsetDate(0, 2, 0),
		},
		{
			name: "Jonathan Doe",
			image: "/images/profile-placeholder.png",
			amount: 29,
			startedOn: getOffsetDate(0, 0, -2),
			endsOn: getOffsetDate(0, 0, 3),
		},
		{
			name: "Jefferey Doe",
			image: "/images/profile-placeholder.png",
			amount: 42,
			startedOn: getOffsetDate(-7, 0, 0),
			endsOn: getOffsetDate(0, 1, 0),
		},
	],
	subscriptions: [
		{
			name: "Jane Doe",
			image: "/images/profile-placeholder.png",
			amount: 12,
			startedOn: getOffsetDate(0, 0, -2),
			endsOn: getOffsetDate(0, 2, 0),
		},
		{
			name: "Jill Doe",
			image: "/images/profile-placeholder.png",
			amount: 44,
			startedOn: getOffsetDate(0, -2, 0),
			endsOn: getOffsetDate(0, 3, 0),
		},
		{
			name: "John Doe",
			image: "/images/profile-placeholder.png",
			amount: 125,
			startedOn: getOffsetDate(0, 0, -1),
			endsOn: getOffsetDate(0, 0, 1),
		},
		{
			name: "Jefferey Doe",
			image: "/images/profile-placeholder.png",
			amount: 42,
			startedOn: getOffsetDate(-7, 0, 0),
			endsOn: getOffsetDate(0, 1, 0),
		},
		{
			name: "James Doe",
			image: "/images/profile-placeholder.png",
			amount: 17,
			startedOn: getOffsetDate(-1, 0, 0),
			endsOn: getOffsetDate(0, 2, 0),
		},
		{
			name: "Jack Doe",
			image: "/images/profile-placeholder.png",
			amount: 66,
			startedOn: getOffsetDate(0, 0, -1),
			endsOn: getOffsetDate(0, 0, 1),
		},
		{
			name: "Jonathan Doe",
			image: "/images/profile-placeholder.png",
			amount: 29,
			startedOn: getOffsetDate(0, 0, -2),
			endsOn: getOffsetDate(0, 0, 3),
		},
	],
};

const ProfileVisitsInfo = {
	count: 395,
	difference: 0.0293,
	visitors: [
		{
			name: "John Doe",
			image: "/images/profile-placeholder.png",
			date: getOffsetDate(0, 0, 0),
			following: true,
		},
		{
			name: "Jane Doe",
			image: "/images/profile-placeholder.png",
			date: getOffsetDate(-1, 0, 0),
			following: true,
		},
		{
			name: "Jill Doe",
			image: "/images/profile-placeholder.png",
			date: getOffsetDate(-1, 0, 0),
			following: false,
		},
		{
			name: "Jack Doe",
			image: "/images/profile-placeholder.png",
			date: getOffsetDate(-2, 0, 0),
			following: true,
		},
		{
			name: "James Doe",
			image: "/images/profile-placeholder.png",
			date: getOffsetDate(-3, 0, 0),
			following: false,
		},
		{
			name: "Jonathan Doe",
			image: "/images/profile-placeholder.png",
			date: getOffsetDate(-4, 0, 0),
			following: true,
		},
		{
			name: "Jefferey Doe",
			image: "/images/profile-placeholder.png",
			date: getOffsetDate(-5, 0, 0),
			following: false,
		},
	],
};

const TrackingTips = [
	{
		date: getOffsetDate(-1, 0, 0),
		author: {
			image: "/images/profile-placeholder.png",
			name: "John Doe",
			winrate: 0.53,
			subscribed: false,
			paid: false
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
				potential: false,
			},
			bet_now: false,
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
			paid: false
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
				amount: 179,
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

const PendingTips = [
	{
		date: getOffsetDate(-1, 0, 0),
		author: {
			image: "/images/profile-placeholder.png",
			name: "John Doe",
			winrate: 0.53,
			subscribed: false,
			paid: false
		},
		info: {
			tracking: false,
			match: {
				teams: [
					{
						name: "EIN",
						score: null,
						image: "/images/team-1-placeholder.svg",
					},
					{
						name: "FCB",
						score: null,
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
			bet_now: false,
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
			paid: false
		},
		info: {
			tracking: false,
			match: {
				teams: [
					{
						name: "EIN",
						score: null,
						image: "/images/team-1-placeholder.svg",
					},
					{
						name: "FCB",
						score: null,
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
				amount: 179,
				potential: true,
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

const HistoricalTips = [
	{
		date: getOffsetDate(-1, 0, 0),
		author: {
			image: "/images/profile-placeholder.png",
			name: "John Doe",
			winrate: 0.53,
			subscribed: false,
			paid: false
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
				potential: false,
			},
			bet_now: false,
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
			paid: false
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

const UserNotifications = {
	new: [
		{
			message: "You have a new message",
			date: getOffsetDate(-1, 0, 0),
			image: "/images/profile-placeholder.png",
			id: 1,
		},
		{
			message: "You have a new message",
			date: getOffsetDate(-2, 0, 0),
			image: "/images/profile-placeholder.png",
			id: 2,
		},
		{
			message: "You have a new message",
			date: getOffsetDate(-3, 0, 0),
			image: "/images/profile-placeholder.png",
			id: 3,
		},
	],
	old: [
		{
			message: "You have a new message",
			date: getOffsetDate(-1, 0, 0),
			image: "/images/profile-placeholder.png",
			id: 7,
		},
		{
			message: "You have a new message",
			date: getOffsetDate(-1, 0, 0),
			image: "/images/profile-placeholder.png",
			id: 8,
		},
		{
			message: "You have a new message",
			date: getOffsetDate(-2, 0, 0),
			image: "/images/profile-placeholder.png",
			id: 9,
		},
		{
			message: "You have a new message",
			date: getOffsetDate(-3, 0, 0),
			image: "/images/profile-placeholder.png",
			id: 10,
		},
		{
			message: "You have a new message",
			date: getOffsetDate(-3, 0, 0),
			image: "/images/profile-placeholder.png",
			id: 11,
		},
		{
			message: "You have a new message",
			date: getOffsetDate(-5, 0, 0),
			image: "/images/profile-placeholder.png",
			id: 12,
		},
		{
			message: "You have a new message",
			date: getOffsetDate(-5, 0, 0),
			image: "/images/profile-placeholder.png",
			id: 13,
		},
	],
};

export const userRouter = router({
	getInfo: protectedProcedure.query(async ({ ctx, input }) => {
		return UserInfo;
	}),
	getDashboardInfo: protectedProcedure.query(async ({ ctx, input }) => {
		return DashboardInfo;
	}),
	getWithdrawInfo: protectedProcedure.query(async ({ ctx, input }) => {
		return WithdrawInfo;
	}),
	getFollowersInfo: protectedProcedure.query(async ({ ctx, input }) => {
		return FollowersInfo;
	}),
	searchFollowers: protectedProcedure
		.input(
			z.object({
				searchString: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { searchString } = input;

			const options = {
				includeScore: true,
				keys: ["name"],
			};

			const fuse = new Fuse(FollowersInfo.followers, options);

			const result = fuse.search(searchString).map((item) => item.item);

			return result;
		}),
	getFollowingInfo: protectedProcedure.query(async ({ ctx, input }) => {
		return FollowingInfo;
	}),
	searchFollowing: protectedProcedure
		.input(
			z.object({
				searchString: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { searchString } = input;

			const options = {
				includeScore: true,
				keys: ["name"],
			};

			const fuse = new Fuse(FollowingInfo.followers, options);

			const result = fuse.search(searchString).map((item) => item.item);

			return result;
		}),
	getSubscriptionInfo: protectedProcedure.query(async ({ ctx, input }) => {
		return SubscriptionInfo;
	}),
	searchSubscribers: protectedProcedure
		.input(
			z.object({
				searchString: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { searchString } = input;

			const options = {
				includeScore: true,
				keys: ["name"],
			};

			const fuse = new Fuse(SubscriptionInfo.subscribers, options);

			const result = fuse.search(searchString).map((item) => item.item);

			return result;
		}),
	searchSubscriptions: protectedProcedure
		.input(
			z.object({
				searchString: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { searchString } = input;

			const options = {
				includeScore: true,
				keys: ["name"],
			};

			const fuse = new Fuse(SubscriptionInfo.subscriptions, options);

			const result = fuse.search(searchString).map((item) => item.item);

			return result;
		}),
	getProfileVisitsInfo: protectedProcedure.query(async ({ ctx, input }) => {
		return ProfileVisitsInfo;
	}),
	getTrackingTips: protectedProcedure.query(async ({ ctx, input }) => {
		return TrackingTips;
	}),
	getPendingTips: protectedProcedure.query(async ({ ctx, input }) => {
		return PendingTips;
	}),
	getHistoricalTips: protectedProcedure.query(async ({ ctx, input }) => {
		return HistoricalTips;
	}),
	getNotifications: protectedProcedure.query(async ({ ctx, input }) => {
		return UserNotifications;
	}),
});
