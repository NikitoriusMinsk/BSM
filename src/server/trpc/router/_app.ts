// src/server/router/index.ts
import { createRouter } from "../context";
import superjson from "superjson";
import { tipsterRouter } from "./TipsterRouter";
import { tipsRouter } from "./TipsRouter";
import { bookmakerRouter } from "./BookmakerRouter";
import { matchesRouter } from "./MatchesRouter";
import { filtersRouter } from "./FiltersRouter";
import { predictionsRouter } from "./PredictionsRouter";
import { newsRouter } from "./NewsRouter";
import { competitionRouter } from "./CompetitionRouter";
import { coinsRouter } from "./CoinsRouter";
import { userRouter } from "./UserRouter";
import { authRouter } from "./AuthRouter";
import { navigationRouter } from "./NavigationRouter";
import { router } from "../trpc";

export const appRouter = router({
	tipsters: tipsterRouter,
	tips: tipsRouter,
	bookmakers: bookmakerRouter,
	matches: matchesRouter,
	filters: filtersRouter,
	predictions: predictionsRouter,
	news: newsRouter,
	competitions: competitionRouter,
	coins: coinsRouter,
	navigation: navigationRouter,
	user: userRouter,
	auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
