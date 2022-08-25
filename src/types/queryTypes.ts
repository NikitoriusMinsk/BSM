import { inferQueryOutput } from "src/utils/trpc";

export type Tipsters = inferQueryOutput<'tipsters.getAll'>;

export type Bookmakers = inferQueryOutput<'bookmakers.getAll'>

export type LiveMatches = inferQueryOutput<"matches.getAllLive">

export type CurrentCompetition = inferQueryOutput<"competitions.getCurrent">

export type MostTips = inferQueryOutput<"tips.getAll">