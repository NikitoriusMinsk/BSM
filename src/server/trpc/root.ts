// src/server/router/index.ts

import { authRouter } from "./routers/AuthRouter";
import { bookmakerRouter } from "./routers/BookmakerRouter";
import { coinsRouter } from "./routers/CoinsRouter";
import { competitionRouter } from "./routers/CompetitionRouter";
import { filtersRouter } from "./routers/FiltersRouter";
import { matchesRouter } from "./routers/MatchesRouter";
import { navigationRouter } from "./routers/NavigationRouter";
import { newsRouter } from "./routers/NewsRouter";
import { pageGenerationRouter } from "./routers/PageGenerationRouter";
import { predictionsRouter } from "./routers/PredictionsRouter";
import { tipsRouter } from "./routers/TipsRouter";
import { tipsterRouter } from "./routers/TipsterRouter";
import { userRouter } from "./routers/UserRouter";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
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
	pageGeneration: pageGenerationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
