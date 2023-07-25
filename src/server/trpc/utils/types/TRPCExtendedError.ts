import { TRPCError } from "@trpc/server"
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";

export default class TRPCExtendedError extends TRPCError {
    serverError?: unknown

    constructor(opts: {
        message?: string;
        code: TRPC_ERROR_CODE_KEY;
        cause?: unknown;
        serverError?: unknown
    }) {
        super({
            message: opts.message,
            code: opts.code,
            cause: opts.cause
        })
        this.serverError = opts.serverError
        Object.setPrototypeOf(this, new.target.prototype)
    }
}