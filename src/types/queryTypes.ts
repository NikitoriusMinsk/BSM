import { inferQueryOutput } from "src/utils/trpc";

export type Tipsters = inferQueryOutput<"tipsters.getAll">;

export type BestBookmakers = inferQueryOutput<"bookmakers.getTop">;

export type Bookmakers = inferQueryOutput<"bookmakers.getAll">;

export type LiveMatches = inferQueryOutput<"matches.getAllLive">;

export type Matches = inferQueryOutput<"matches.getAll">;

export type MatchesByLeague = inferQueryOutput<"matches.getAllByLeague">;

export type CurrentCompetition = inferQueryOutput<"competitions.getCurrent">;

export type PreviousCompetitions = inferQueryOutput<"competitions.getPrevious">;

export type MostTips = inferQueryOutput<"tips.getAll">;

export type Predictions = inferQueryOutput<"predictions.getAll">;

export type Sports = inferQueryOutput<"filters.getSports">;

export type Methods = inferQueryOutput<"coins.getMethods">;

export type LeaguesByCountry = inferQueryOutput<"filters.getLeaguesByCountry">;

export type UserInfo = inferQueryOutput<"user.getInfo">;

export type WithdrawInfo = inferQueryOutput<"user.getWithdrawInfo">;

export type FollowersInfo = inferQueryOutput<"user.getFollowersInfo">;

export type FollowingInfo = inferQueryOutput<"user.getFollowingInfo">;

export type SubscriptionInfo = inferQueryOutput<"user.getSubscriptionInfo">;

export type ProfileVisitsInfo = inferQueryOutput<"user.getProfileVisitsInfo">;

export type TrackingPredictions = inferQueryOutput<"user.getTrackingTips">;

export type PendingPredictions = inferQueryOutput<"user.getPendingTips">;

export type HistoricalPredictions = inferQueryOutput<"user.getHistoricalTips">;

export type MatchPredictions = inferQueryOutput<"matches.getMatchTips">;
