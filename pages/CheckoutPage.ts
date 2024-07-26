import { Page, Locator } from "@playwright/test"

export class CheckoutPage {
	readonly page: Page
	readonly inputFirstName = "[data-test='firstName']"
	readonly inputLastName = "[data-test='lastName']"
	readonly inputPostalCode = "[data-test='postalCode']"
	readonly checkoutButton = ".cart_button"
	readonly orderConfirmationMessage = ".complete-text"
	readonly pageSubHeader = ".subheader"

	constructor(page: Page) {
		this.page = page
	}

	/**
	 *
	 * This method returns a locator for element,
	 * allowing the caller to perform further actions or assertions on it.
	 *
	 * @returns {Locator}
	 */
	getTitleOfThePage(): Locator {
		return this.page.locator(this.pageSubHeader)
	}

	async fillCheckoutForm(
		firstName: string,
		lastName: string,
		postalCode: string
	): Promise<void> {
		await this.page.fill(this.inputFirstName, firstName)
		await this.page.fill(this.inputLastName, lastName)
		await this.page.fill(this.inputPostalCode, postalCode)
		await this.page.click(this.checkoutButton)
	}

	async finishCheckout(): Promise<void> {
		await this.page.click(this.checkoutButton)
	}

	/**
	 *
	 * This method returns a locator for element,
	 * allowing the caller to perform further actions or assertions on it.
	 *
	 * @returns {Locator}
	 */
	getConfirmationMessage(): Locator {
		return this.page.locator(this.orderConfirmationMessage)
	}
}
