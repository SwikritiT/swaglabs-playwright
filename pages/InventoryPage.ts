import { Page, Locator } from "@playwright/test"
import { format } from "util"

export class InventoryPage {
	private page: Page
	private pageTitle = ".product_label"
	private inventoryItemName = ".inventory_item_name"
	private inventoryItemPrice = ".inventory_item_price"
	// there was no direct selector to add items as per name so the xpath goes from child to parent i.e. navigate up the DOM tree
	private addToCartButton =
		"//div[contains(@class,'inventory_item_name') and text()='%s']/ancestor::div[@class='inventory_item_label']" +
		"/following-sibling::div[@class='pricebar']/button[@class='btn_primary btn_inventory']"
	private shoppingCartIcon = ".shopping_cart_link"
	private sortSelect = ".product_sort_container"

	constructor(page: Page) {
		this.page = page
	}

	/**
	 *
	 * This method returns a locator for the inventory container element,
	 * allowing the caller to perform further actions or assertions on it.
	 *
	 * @returns {Locator} A Playwright Locator for the inventory container element.
	 */
	getInventoryPageTitle(): Locator {
		return this.page.locator(this.pageTitle)
	}

	async getTitlesOfAllTheInventoryItemInThePage(): Promise<string[]> {
		return this.page.locator(this.inventoryItemName).allTextContents()
	}

	async getPricesOfAllTheInventoryItemInThePage(): Promise<number[]> {
		const prices = await this.page
			.locator(this.inventoryItemPrice)
			.allTextContents()
		// replace the '$' before returning the array
		return prices.map((price) => parseFloat(price.replace("$", "")))
	}

	getPageUrl(): string {
		return this.page.url()
	}

	async sortItems(sortType: string): Promise<void> {
		await this.page.click(this.sortSelect)
		await this.page.locator(this.sortSelect).selectOption(sortType)
	}

	async addItemToCart(item: string): Promise<void> {
		// replace the string in the selector with the item with the help of `format`
		await this.page.locator(format(this.addToCartButton, item)).click()
	}

	async goToCartPage(): Promise<void> {
		// go to cart page by clicking the cart icon
		await this.page.locator(this.shoppingCartIcon).click()
	}
}
