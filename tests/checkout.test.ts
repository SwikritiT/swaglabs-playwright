import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { InventoryPage } from "../pages/InventoryPage"
import { CartPage } from "../pages/CartPage"
import { CheckoutPage } from "../pages/CheckoutPage"
import { SideBar } from "../pages/Sidebar"
import * as users from "../data/userCredentials.json"
import { multipleItemsToBeAddedInTheCart } from "../data/cartData"

test.describe("Inventory Feature", async () => {
	let loginPage: LoginPage
	let inventoryPage: InventoryPage
	let cartPage: CartPage
	let checkoutpage: CheckoutPage

	test.beforeEach(async ({ page }) => {
		// setup test
		loginPage = new LoginPage(page)
		inventoryPage = new InventoryPage(page)
		cartPage = new CartPage(page)
		checkoutpage = new CheckoutPage(page)
		// Navigate to the Login page
		await loginPage.navigateToLoginPage()
		await loginPage.login(users.valid_username, users.password)
	})

	test("perform checkout", async () => {
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
		// expect(await checkoutpage.getTitleOfThePage()).toHaveText("Finish")
		// check the confirmation message
		expect(await checkoutpage.getConfirmationMessage()).toHaveText(
			"Your order has been dispatched, and will arrive just as fast as the pony can get there!"
		)
	})


	test.afterEach(async ({ page }) => {
		// cleanup after test
		const sidebarPage = new SideBar(page)
		await sidebarPage.openSidebar()
		// reset app state because AUT should be in the same state as it was when the test started
		await sidebarPage.resetAppState()
		// logout at the end
		await sidebarPage.logout()
	})
})
