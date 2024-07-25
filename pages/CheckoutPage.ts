import { Page, Locator } from "@playwright/test"

export class CheckoutPage {
	private page: Page
	private inputFirstName = "[data-test='firstName']"
	private inputLastName = "[data-test='lastName']"
	private inputPostalCode = "[data-test='postalCode']"
	private checkoutButton = ".cart_button"
	private orderConfirmationMessage = ".complete-text"
	private pageSubHeader = ".subheader"

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
