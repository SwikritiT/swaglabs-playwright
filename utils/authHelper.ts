import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { InventoryPage } from "../pages/InventoryPage"
import { SideBar } from "../pages/Sidebar"
import * as users from "../data/userCredentials.json"

export async function login(page) {
	const loginPage = new LoginPage(page)
	const inventoryPage = new InventoryPage(page)
	// Navigate to the Login page
	await loginPage.navigateToLoginPage()
	// user login
	await loginPage.login(users.valid_username, users.password)
	// check if login was successful by checking the title inventory page
	await expect(inventoryPage.getInventoryPageTitle()).toHaveText("Products")
}

export async function cleanup(page) {
	// cleanup after test
	const sidebarPage = new SideBar(page)
	await sidebarPage.openSidebar()
	// reset app state because AUT should be in the same state as it was when the test started
	await sidebarPage.resetAppState()
	// logout at the end
	await sidebarPage.logout()
	await page.close()
}
