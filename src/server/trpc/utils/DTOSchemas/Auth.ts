import { z } from "zod";

const authSchema = z.object({
	accessToken: z.string(),
	expiresIn: z.string(),
	refreshExpiresIn: z.string(),
	refreshToken: z.string(),
	tokenType: z.string(),
	notBeforePolicy: z.string(),
	sessionState: z.string(),
	scope: z.string(),
	userId: z.string(),
	nickname: z.string(),
	email: z.string(),
	fistName: z.string(),
	lastName: z.string(),
	subscribeQty: z.string().nullish(),
	subscribersQty: z.string().nullish(),
});

export default authSchema;
