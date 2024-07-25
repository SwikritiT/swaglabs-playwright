import { Page, Locator } from "@playwright/test"
import { Navigation } from "../utils/Navigation"
import { format } from "util"

export class CartPage {
	private page: Page
	private cartItemName = ".inventory_item_name"
	private checkoutButton = ".checkout_button"

	constructor(page: Page) {
		this.page = page
	}

	async getItemsInTheCart(): Promise<Array<string>> {
		// get title of all the items in the cart so that calling function can assert it
		return this.page.locator(this.cartItemName).allTextContents()
	}

	async proceedCheckout() {
		await this.page.click(this.checkoutButton)
	}
}
