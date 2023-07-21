import { TRPCError } from "@trpc/server"
import { TRPC_ERROR_CODES_BY_API_CODE } from "./trpcErrorCode"

interface Error {
    time: string,
    exception: string,
    message: string,
    errorCode: number,
    showPopUpInUI: boolean,
    applicationName: string
}

export default async function getTRPCError(result: Response) {
    const resObj = await result.json() as Error
    return new TRPCError({
        code: TRPC_ERROR_CODES_BY_API_CODE[resObj.errorCode] ?? 'INTERNAL_SERVER_ERROR',
        message: resObj.message,
        cause: resObj
    })
}