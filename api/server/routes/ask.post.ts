import { streamText, stepCountIs, tool, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";
import z from "zod";

export default defineEventHandler(async (event) => {
	console.log("Ask endpoint");

	// Validation
	const { messages } = await readBody(event);
	if (!messages) {
		throw createError({
			statusCode: 400,
			statusMessage: "No messages provided",
		});
	}

	// Tool definition
	const getWeatherTool = tool({
		description: "Get the weather for a location",
		inputSchema: z.object({
			city: z
				.string()
				.min(2)
				.max(100)
				.describe("The city for which the weather is requested"),
		}),
		execute: async ({ city }) => {
			const randomTemp = Math.floor(Math.random() * 30) + 10;
			return `It is ${randomTemp}º and sunny.`;
		},
	});

	// Generate text
	const result = streamText({
		model: openai("gpt-4o"),
		tools: {
			getWeather: getWeatherTool,
		},
		system: "You are a helpful assistant.",
		messages: convertToModelMessages(messages),
		stopWhen: stepCountIs(10),
	});

	return result.toUIMessageStreamResponse();
});
