import { inferRouterOutputs } from "@trpc/server/dist/core";
import { AppRouter } from "src/server/trpc/router/_app";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type Tipsters = RouterOutput["tipsters"]["getAll"];

export type BestBookmakers = RouterOutput["bookmakers"]["getTop"];

export type Bookmakers = RouterOutput["bookmakers"]["getAll"];

export type LiveMatches = RouterOutput["matches"]["getAllLive"];

export type Matches = RouterOutput["matches"]["getAll"];

export type MatchesByLeague = RouterOutput["matches"]["getAllByLeague"];

export type CurrentCompetition = RouterOutput["competitions"]["getCurrent"];

export type PreviousCompetitions = RouterOutput["competitions"]["getPrevious"];

export type MostTips = RouterOutput["tips"]["getAll"];

export type Predictions = RouterOutput["predictions"]["getAll"];

export type Sports = RouterOutput["filters"]["getSports"];

export type Methods = RouterOutput["coins"]["getMethods"];

export type LeaguesByCountry = RouterOutput["filters"]["getLeaguesByCountry"];

export type UserInfo = RouterOutput["user"]["getInfo"];

export type WithdrawInfo = RouterOutput["user"]["getWithdrawInfo"];

export type FollowersInfo = RouterOutput["user"]["getFollowersInfo"];

export type FollowingInfo = RouterOutput["user"]["getFollowingInfo"];

export type SubscriptionInfo = RouterOutput["user"]["getSubscriptionInfo"];

export type ProfileVisitsInfo = RouterOutput["user"]["getProfileVisitsInfo"];

export type TrackingPredictions = RouterOutput["user"]["getTrackingTips"];

export type PendingPredictions = RouterOutput["user"]["getPendingTips"];

export type HistoricalPredictions = RouterOutput["user"]["getHistoricalTips"];

export type MatchPredictions = RouterOutput["matches"]["getMatchTips"];

export type UserNotifications = RouterOutput["user"]["getNotifications"];
