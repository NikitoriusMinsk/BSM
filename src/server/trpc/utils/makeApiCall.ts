import { env } from "src/env/server.mjs"
import { z } from "zod"
import getTRPCError from "./getTRPCError"

export default async function makeApiCall<O extends object>(
	path: string,
	schema: z.Schema<O>,
	options?: RequestInit
) {
	const result = await fetch(`${env.API_URL}/${path}`, options)

	if (result.ok) {
		try {
			const response = await result.json()

			const parsedObject = schema.parse(response)

			return parsedObject
		} catch {
			if (result.status == 200) return {}
		}
	} else {
		throw await getTRPCError(result)
	}
}
