import { Page } from "@playwright/test"

export class SideBar {
	readonly page: Page
	readonly sidebarMenu = ".bm-burger-button"
	readonly logoutButton = "#logout_sidebar_link"
	readonly resetAppStateButton = "#reset_sidebar_link"

	constructor(page: Page) {
		this.page = page
	}

	async openSidebar(): Promise<void> {
		await this.page.click(this.sidebarMenu)
	}

	async resetAppState(): Promise<void> {
		await this.page.click(this.resetAppStateButton)
	}

	async logout(): Promise<void> {
		await this.page.click(this.logoutButton)
	}
}
