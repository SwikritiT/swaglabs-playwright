import { Page, Locator } from "@playwright/test"
import { Navigation } from "../utils/Navigation"

export class LoginPage {
	readonly page: Page
	readonly navigation: Navigation
	readonly usernameInput = "[data-test='username']"
	readonly passwordInput = "[data-test='password']"
	readonly loginButton = "#login-button"
	readonly errorMessage = "[data-test='error']"

	constructor(page: Page) {
		this.page = page
		this.navigation = new Navigation()
	}

	async navigateToLoginPage(): Promise<void> {
		await this.navigation.navigateTo(this.page, "/index.html")
	}

	async login(username: string, password: string): Promise<void> {
		/**
		 * there is no step for waiting for element to be visible or active here
		 * because playwright has in-built actionability checks
		 * refer to: https://playwright.dev/docs/actionability#introduction for more info
		 */

		await this.page.fill(this.usernameInput, username)
		await this.page.fill(this.passwordInput, password)
		await this.page.click(this.loginButton)
	}

	/**
	 *
	 * This method returns a locator for error message element,
	 * allowing the caller to perform further actions or assertions on it.
	 *
	 * * @returns {Locator}
	 */
	getErrorMessage(): Locator {
		return this.page.locator(this.errorMessage)
	}
}
