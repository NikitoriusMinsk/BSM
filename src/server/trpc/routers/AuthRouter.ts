import { z } from "zod";
import { authSchema, partySchema } from "../utils/DTOSchemas";
import makeApiCall from "../utils/makeApiCall";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
	registerUser: publicProcedure
		.input(
			z
				.object({
					nickName: z
						.string()
						.min(4, "Nickname must be at least 4 characters")
						.max(40, "Nickname must be 40 characters max"),
					password: z
						.string()
						.min(1, "Password is required")
						.min(8, "Password must be at least 8 characters")
						.max(250, "Password must be 250 characters max"),
					confirmedPassword: z
						.string()
						.min(1, "Confirmation is required")
						.min(8, "Confirmation must be at least 8 characters")
						.max(250, "Confirmation must be 250 characters max"),
					indFirstName: z.string().min(1, "First name is required"),
					indLastName: z.string().min(1, "Last name is required"),
					email: z
						.string()
						.email("Invalid email")
						.min(1, "Email is required")
						.max(256, "Email must be 250 characters max"),
					terms: z.literal<boolean>(true, {
						errorMap: (errors) => ({
							...errors,
							message: "You must accept the terms and conditions",
						}),
					}),
				})
				.refine((data) => data.password === data.confirmedPassword, {
					path: ["password"],
					message: "Passwords do not match",
				})
				.refine((data) => data.password === data.confirmedPassword, {
					path: ["confirmedPassword"],
					message: "Passwords do not match",
				})
		)
		.mutation(async ({ ctx, input }) => {
			const {
				nickName,
				email,
				password,
				confirmedPassword,
				indFirstName,
				indLastName,
			} = input;

			const headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");

			const options: RequestInit = {
				method: "POST",
				headers,
				credentials: "include",
				body: JSON.stringify({
					nickName,
					email,
					password,
					confirmedPassword,
					indFirstName,
					indLastName,
				}),
			};

			return await makeApiCall("auth/unauthenticated/create", partySchema, options);
		}),
	authUser: publicProcedure
		.input(
			z.object({
				username: z.string(),
				password: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { password, username } = input;

			const headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");

			return await makeApiCall("auth/unauthenticated/authenticate", authSchema, {
				method: "POST",
				body: JSON.stringify({ password, username }),
				headers,
			});
		}),
	requestPasswordReset: publicProcedure
		.input(z.object({ email: z.string().email("Invalid email") }))
		.mutation(async ({ ctx, input }) => {
			const { email } = input;

			return await makeApiCall(
				`auth/unauthenticated/recovery-password/request?email=${email}`,
				z.object({}),
				{
					method: "POST",
				}
			);
		}),
	resetPassword: publicProcedure
		.input(
			z
				.object({
					password: z
						.string()
						.min(1, "Password is required")
						.min(8, "Password must be at least 8 characters")
						.max(250, "Password must be 250 characters max"),
					passwordConfirmation: z
						.string()
						.min(1, "Confirmation is required")
						.min(8, "Confirmation must be at least 8 characters")
						.max(250, "Confirmation must be 250 characters max"),
					code: z.string(),
				})
				.refine((data) => data.password === data.passwordConfirmation, {
					path: ["password"],
					message: "Passwords do not match",
				})
				.refine((data) => data.password === data.passwordConfirmation, {
					path: ["passwordConfirmation"],
					message: "Passwords do not match",
				})
		)
		.mutation(async ({ ctx, input }) => {
			const { code, password, passwordConfirmation } = input;

			const headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");

			return await makeApiCall(
				"auth/unauthenticated/recovery-password/confirmation",
				z.object({}),
				{
					method: "POST",
					headers,
					body: JSON.stringify({
						password,
						passwordConfirmation,
						code,
					}),
				}
			);
		}),
});