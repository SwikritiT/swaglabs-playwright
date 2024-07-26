import { Page, Locator } from "@playwright/test"

export class CartPage {
	private page: Page
	private inventoryItemName = ".inventory_item_name"
	private checkoutButton = ".checkout_button"

	constructor(page: Page) {
		this.page = page
	}

	async getItemsInTheCart(browserName: string): Promise<string[]> {
		// test is falky is firefox so add a explicit wait for selector
		if (browserName === "firefox") {
			await this.page.waitForSelector(this.inventoryItemName, {
				state: "visible",
			})
		}
		// get title of all the items in the cart so that calling function can assert it
		return this.page.locator(this.inventoryItemName).allTextContents()
	}

	async proceedCheckout(): Promise<void> {
		await this.page.click(this.checkoutButton)
	}
}
