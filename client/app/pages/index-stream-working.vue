<template>
	<div class="px-6 py-12">
		<h3 class="text-lg font-medium">Basic text stream</h3>
		<form @submit.prevent="testStream()">
			<UInput v-model="question" placeholder="Ask a question" />
			<UButton type="submit" label="Ask" />
		</form>
	</div>
	<div class="px-6 py-12">
		{{ streamResult }}
	</div>
</template>
<script setup lang="ts">
const {
	public: { apiBase },
} = useRuntimeConfig();

const streamResult = ref<string>("");

const question = ref("where is ambleside?");

async function testStream() {
	console.log("Starting stream...");
	streamResult.value = "";

	const response = await fetch(`${apiBase}/stream-working`, {
		method: "POST",
		body: JSON.stringify({ question: question.value }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.body) {
		console.error("No response body");
		return;
	}

	const reader = response.body.getReader();
	const decoder = new TextDecoder();

	while (true) {
		const { done, value } = await reader.read();

		if (done) {
			console.log("Stream complete");
			break;
		}

		// Decode the chunk
		const chunk = decoder.decode(value, { stream: true });
		console.log("Raw chunk:", chunk);
		streamResult.value = chunk;

		// Parse SSE format (data: message\n\n)
		const lines = chunk.split("\n");
		for (const line of lines) {
			if (line.startsWith("data: ")) {
				const data = line.substring(6); // Remove 'data: ' prefix
				console.log("📦 Data:", data);
				streamResult.value += data;
			}
		}
	}
}
</script>
