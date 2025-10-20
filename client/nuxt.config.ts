// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: false },

	modules: ["@nuxt/ui"],
	css: ["~/assets/main.css"],

	ssr: false,

	runtimeConfig: {
		public: {
			apiBase: "http://192.168.0.14:3001", // 👈 Replace with your server url or local IP
		},
	},

	app: {
		head: {
			title: "Capacitor + AI SDK",
			meta: [
				{
					name: "description",
					content: "AI SDK + Capacitor example",
				},
				{
					name: "viewport",
					content:
						"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
				},
			],
		},
	},
});
