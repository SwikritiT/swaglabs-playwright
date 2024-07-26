import { test, expect, Page } from "@playwright/test"
import { InventoryPage } from "../pages/InventoryPage"
import { CartPage } from "../pages/CartPage"
import { CheckoutPage } from "../pages/CheckoutPage"
import { multipleItemsToBeAddedInTheCart } from "../data/cartData"
import { login, cleanup } from "../utils/authHelper"

test.describe("Inventory Feature", async () => {
	let inventoryPage: InventoryPage
	let cartPage: CartPage
	let checkoutpage: CheckoutPage

	test.beforeEach(async ({ page }: { page: Page }) => {
		// setup test
		inventoryPage = new InventoryPage(page)
		cartPage = new CartPage(page)
		checkoutpage = new CheckoutPage(page)
		// login with valid user i.e standard_user
		await login(page)
	})

	test("Standard user performs checkout", async () => {
		for (const item of multipleItemsToBeAddedInTheCart) {
			await inventoryPage.addItemToCart(item)
		}
		await inventoryPage.goToCartPage()
		// proceed the checkout from cart page

		await cartPage.proceedCheckout()
		// verfiy that the page is navigated to next one

		expect(await checkoutpage.getTitleOfThePage()).toHaveText(
			"Checkout: Your Information"
		)

		// fill the billing info and proceed checkout
		await checkoutpage.fillCheckoutForm("standard", "user", "1234")

		// make sure that the page has navigated to final checkout page
		expect(await checkoutpage.getTitleOfThePage()).toHaveText(
			"Checkout: Overview"
		)

		// finish the checkout
		await checkoutpage.finishCheckout()

		// check that the page navigated to final confirmation page
		expect(await checkoutpage.getTitleOfThePage()).toHaveText("Finish")

		// check the confirmation message
		expect(await checkoutpage.getConfirmationMessage()).toHaveText(
			"Your order has been dispatched, and will arrive just as fast as the pony can get there!"
		)
	})

	test.afterEach(async ({ page }: { page: Page }) => {
		await cleanup(page)
	})
})
