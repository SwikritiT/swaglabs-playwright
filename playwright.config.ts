import { defineConfig, devices } from "@playwright/test"

const workers = process.env.WORKERS
	? parseInt(process.env.WORKERS, 10)
	: undefined

	const retries = process.env.RETRIES ? parseInt(process.env.RETRIES, 10): 0

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./tests",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry only on CI and on local based on env var */
	retries: process.env.CI ? 2 : retries,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : workers,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [["html"],["allure-playwright"]],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: "https://www.saucedemo.com/",

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
	},

	/* Configure projects for major browsers, currently only enabled for chromium but you can enable 
		test exection in other browsers by uncommenting the given lines. Depending on the operating system used
		extra host package installation might be necessary for correct browser to work
	*/
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				headless: process.env.PLAYWRIGHT_HEADLESS !== "false", // Set headless based on the environment variable
				launchOptions: {
					slowMo: parseInt(process.env.SLOW_MO ?? "0", 10) || 0,
					timeout: parseInt(process.env.TIMEOUT ?? "60000", 10) || 60000,
				},
			},
		},
		// {
		// 	name: "firefox",
		// 	use: {
		// 		...devices["Desktop Firefox"],
		// 		headless: process.env.PLAYWRIGHT_HEADLESS !== "false", // Set headless based on the environment variable
		// 		launchOptions: {
		// 			slowMo: parseInt(process.env.SLOW_MO ?? "0", 10) || 0,
		// 			timeout: parseInt(process.env.TIMEOUT ?? "60000", 10) || 60000,
		// 		},
		// 	},
		// },
		// {
		// 	name: "webkit",
		// 	use: {
		// 		...devices["Desktop Safari"],
		// 		headless: process.env.PLAYWRIGHT_HEADLESS !== "false", // Set headless based on the environment variable
		// 		launchOptions: {
		// 			slowMo: parseInt(process.env.SLOW_MO ?? "0", 10) || 0,
		// 			timeout: parseInt(process.env.TIMEOUT ?? "60000", 10) || 60000,
		// 		},
		// 	},
		// },
	],
})
