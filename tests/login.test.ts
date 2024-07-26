import { test, expect, Page } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import * as users from "../data/userCredentials.json"
import { login, cleanup } from "../utils/authHelper"

test.describe("Login Feature", async () => {
	let loginPage: LoginPage

	test.beforeEach(async ({ page }: { page: Page }) => {
		loginPage = new LoginPage(page)
		// Navigate to the Login page
		await loginPage.navigateToLoginPage()
	})

	test("Login with an Invalid User", async ({ page }: { page: Page }) => {
		// fill out the login form with invalid user details
		await loginPage.login(users.invalid_username, users.password)

		// get the element with error message
		const errorMessage = await loginPage.getErrorMessage()

		// verify that the message is visible
		await expect(errorMessage).toBeVisible()

		// verify that correct error message is displayed
		await expect(errorMessage).toHaveText(
			"Epic happyface: Sorry, this user has been locked out."
		)

		await page.close()
	})

	test("Login with a valid User", async ({ page }: { page: Page }) => {
		// login with standard user
		await login(page)

		// clean up the changes made by test and logout
		await cleanup(page)
	})
})
