import { Page } from "@playwright/test"

export class SideBar {
	private page: Page
	private sidebarMenu = ".bm-burger-button"
	private logoutButton = "#logout_sidebar_link"
	private resetAppStateButton = "#reset_sidebar_link"

	constructor(page: Page) {
		this.page = page
	}

	async openSidebar() {
		await this.page.click(this.sidebarMenu)
	}

	async resetAppState() {
		await this.page.click(this.resetAppStateButton)
	}

	async logout() {
		await this.page.click(this.logoutButton)
	}
}
