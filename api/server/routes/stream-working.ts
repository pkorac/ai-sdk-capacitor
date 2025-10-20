import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, stepCountIs, streamText } from "ai";

export default defineEventHandler(async (event) => {
	console.log("should generate response");

	const url = getRequestURL(event);
	const method = getMethod(event);
	const headers = getHeaders(event);
	console.log("=== REQUEST DEBUG INFO ===");
	console.log("Method:", method);
	console.log("URL:", url.toString());
	console.log("Origin:", url.origin);

	// SSE headers — be explicit
	setHeader(event, "Content-Type", "text/event-stream; charset=utf-8");
	setHeader(event, "Cache-Control", "no-cache, no-transform");
	setHeader(event, "Connection", "keep-alive");
	setHeader(event, "X-Accel-Buffering", "no");

	const openai = createOpenAI({
		apiKey: useRuntimeConfig().openaiApiKey,
	});

	const { question } = await readBody(event);
	console.log("Question:", question);

	const result = streamText({
		model: openai("gpt-4o"),
		prompt: question,
	});

	const encoder = new TextEncoder();
	const stream = new ReadableStream({
		async start(controller) {
			let answer = "";
			for await (const textPart of result.textStream) {
				answer += textPart;
				console.log(textPart);
				controller.enqueue(encoder.encode(answer));
			}

			const finalText = await result.text;
			controller.enqueue(encoder.encode(finalText));
			controller.close();
		},
	});

	return sendStream(event, stream);
});
