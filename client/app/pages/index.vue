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
	<div class="flex flex-col gap-4 py-24 mx-auto w-full max-w-md pb-32">
		<div
			v-for="message in messageList"
			:key="message.id"
			class="whitespace-pre-wrap"
		>
			<strong>{{ `${message.role}: ` }}</strong>
			<template v-for="part in message.parts">
				<div v-if="part.type === 'text'" class="">
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

		<form
			@submit="handleSubmit"
			class="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-4 bg-elevated p-3 shadow-lg rounded-xl"
		>
			<input
				class="border border-accented px-2 rounded-md w-64"
				v-model="input"
				placeholder="Say something..."
			/>
			<button
				type="submit"
				class="bg-primary-400 rounded-md py-2 px-4 text-white"
			>
				Send
			</button>
		</form>
	</div>
</template>
