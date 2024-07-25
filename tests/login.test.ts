import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { InventoryPage } from "../pages/InventoryPage"
import { SideBar } from "../pages/Sidebar"
import * as users from "../data/userCredentials.json"


test.describe("Login Feature", async () => {
	let loginPage: LoginPage
	let inventoryPage: InventoryPage

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page)
		inventoryPage = new InventoryPage(page)
		// Navigate to the Login page
		await loginPage.navigateToLoginPage()
	})

	test("Login with an Invalid User", async () => {
		// fill out the login form with invalid user details
		await loginPage.login(users.invalid_username, users.password)

		// get the element with error message
		const errorMessage = await loginPage.getErrorMessage()
		// verify that the message is visible
		await expect(errorMessage).toBeVisible()
		// verify that correct error message is displayed
		await expect(errorMessage).toHaveText(
			"Epic sadface: Sorry, this user has been locked out."
		)
	})

	test("Login with a valid User", async ({page}) => {
		// fill out and submit the login form with valid user details
		await loginPage.login(users.valid_username, users.password)

		// check if login was successful by checking the title inventory page
		await expect(inventoryPage.getInventoryPageTitle()).toHaveText("Products")

		// check the current url of the page as well to be sure
		expect(await inventoryPage.getPageUrl()).toBe(
			"https://www.saucedemo.com/v1/inventory.html"
		)

        const sidebarPage = new SideBar(page)
        await sidebarPage.openSidebar()
        // reset app state because AUT should be in the same state as it was when the test started
        await sidebarPage.resetAppState()
        // logout at the end
        await sidebarPage.logout()
	})

})
