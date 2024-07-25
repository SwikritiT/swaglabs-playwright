import { Page, Locator } from "@playwright/test"
import { expect } from "@playwright/test"
import { Navigation } from "../utils/Navigation"
import { format } from "util"

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

	getTitleOfThePage(): Locator {
		return this.page.locator(this.pageSubHeader)
	}

	async fillCheckoutForm(
		firstName: string,
		lastName: string,
		postalCode: string
	) {
		await this.page.fill(this.inputFirstName, firstName)
		await this.page.fill(this.inputLastName, lastName)
		await this.page.fill(this.inputPostalCode, postalCode)
		await this.page.click(this.checkoutButton)
	}

	async finishCheckout() {
		await this.page.click(this.checkoutButton)
	}

	getConfirmationMessage(): Locator {
		return this.page.locator(this.orderConfirmationMessage)
	}
}
