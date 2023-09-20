import { env } from "@/env.mjs";
import { z } from "zod";
import getTRPCError from "./getTRPCError";

export default async function makeApiCall<O extends object>(
	path: string,
	schema: z.Schema<O>,
	options?: RequestInit
) {
	const result = await fetch(`${env.API_URL}/${path}`, options);

	if (result.ok) {
		if (result.headers.get("Content-Length") === "0") return schema.parse({});

		const response = await result.json();

		const parsedObject = schema.parse(response);

		return parsedObject;
	} else {
		throw await getTRPCError(result);
	}
}
