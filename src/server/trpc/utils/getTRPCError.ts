import { TRPC_ERROR_CODES_BY_API_CODE } from "./types/TRPCErrorCode";
import TRPCExtendedError from "./types/TRPCExtendedError";

export default async function getTRPCError(result: Response) {
	const resObj = await result.json();

	return new TRPCExtendedError({
		code: TRPC_ERROR_CODES_BY_API_CODE[resObj.errorCode] ?? "INTERNAL_SERVER_ERROR",
		message: resObj.message,
		cause: resObj,
		serverError: resObj,
	});
}
