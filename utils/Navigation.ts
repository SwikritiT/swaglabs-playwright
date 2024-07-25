import { Page } from "@playwright/test"

export class Navigation {
	/**
	 * only relative path is given because baseURL is set in `playwright.config.ts` file
	 * refer to: https://playwright.dev/docs/test-webserver#adding-a-baseurl for more info
	 */

	async navigateTo(page: Page, path: string) {
		await page.goto(`v1${path}`)
	}
}
