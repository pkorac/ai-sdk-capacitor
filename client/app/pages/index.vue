<script setup lang="ts">
import { Chat } from "@ai-sdk/vue";
import { DefaultChatTransport } from "ai";
import { computed, ref } from "vue";

const {
	public: { apiBase },
} = useRuntimeConfig();

const chat = new Chat({
	onFinish: (data: any) => {
		console.log("onFinish", data);
	},

	transport: new DefaultChatTransport({
		api: `${apiBase}/ask`,
	}),
});

const messageList = computed(() => chat.messages);
const input = ref("");

const handleSubmit = (e: Event) => {
	e.preventDefault();
	chat.sendMessage({ text: input.value });
	input.value = "";
};
</script>

<template>
	<div class="flex flex-col gap-6 py-24 mx-auto w-full max-w-md stretch">
		<div
			v-for="message in messageList"
			:key="message.id"
			class="whitespace-pre-wrap mt-12"
		>
			<strong>{{ `${message.role}: ` }}</strong>
			<template v-for="part in message.parts">
				<div v-if="part.type === 'text'" class="mt-4">
					{{ part.text }}
				</div>
				<template v-if="part.type === 'tool-getWeather'">
					<div>
						Weather tool
						<div>Input: {{ part.input }}</div>
						<div>Output: {{ part.output }}</div>
					</div>
				</template>
			</template>
		</div>

		<form @submit="handleSubmit">
			<input
				class="fixed bottom-0 p-2 mb-8 w-full max-w-md rounded border border-gray-300 shadow-xl"
				v-model="input"
				placeholder="Say something..."
			/>
			<button type="submit">Send</button>
		</form>
	</div>
</template>
