// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },

	modules: ["nuxt-security"],

	security: {
		corsHandler: {
			origin: [
				"capacitor://localhost", // For capacitor iOS/Android apps
				"ionic://localhost", // For some Ionic configs
				"https://ccrow-mealplanneer-mobile.vercel.app", // Web Test App
				"http://localhost:3000", // For browser dev
				"https://app.hotandcold.io",
				"http://192.168.0.14:8000", // For Capacitor Simulator
				"http://192.168.0.14:3000", // For Live Reload Simulator
			],
			credentials: true,
			methods: ["GET", "POST", "OPTIONS"], //"PUT", "DELETE", "OPTIONS"
			allowHeaders: [
				"Content-Type",
				"Authorization",
				"X-Requested-With",
				"Transfer-Encoding",
				"Connection",
			],
		},
		removeLoggers: false,
	},
});
