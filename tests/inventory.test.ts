import { test, expect, Page} from "@playwright/test"
import { InventoryPage } from "../pages/InventoryPage"
import { CartPage } from "../pages/CartPage"
import { multipleItemsToBeAddedInTheCart } from "../data/cartData"
import { SortTypes } from "../data/sortType"
import { sortArray } from "../utils/sortHelper"
import { login, cleanup } from "../utils/authHelper"

test.describe("Inventory Feature", async () => {
	let inventoryPage: InventoryPage
	let cartPage: CartPage

	test.beforeEach(async ({ page }: { page: Page }) => {
		inventoryPage = new InventoryPage(page)
		cartPage = new CartPage(page)
		await login(page)
	})

	test("Standard user filters products by size and price", async () => {
		// get the initial name and prices of the items in the page, i.e. before sorting
		const initialItemNames = await inventoryPage.getTitlesOfAllTheInventoryItemInThePage()
		const initialItemPrices = await inventoryPage.getPricesOfAllTheInventoryItemInThePage()
		// sort the items in decending order according to name
		await inventoryPage.sortItems(SortTypes.NAME_DESC)
		// get the sorted names of items
		const sortedItemNames = await inventoryPage.getTitlesOfAllTheInventoryItemInThePage()
		// manually sort the initial value to decending to use it to assert against the sorted value obtained through webpage
		const manuallySortInitialItemNames = sortArray(initialItemNames, SortTypes.NAME_DESC)
		// assert that the vlaue obtained from web page is equal to the manually sorted value
		expect(sortedItemNames).toEqual(manuallySortInitialItemNames)

		// sort prices from low to high
		await inventoryPage.sortItems(SortTypes.PRICE_LOW_TO_HIGH)
		// get the sorted prices items
		const sortedItemPrices = await inventoryPage.getPricesOfAllTheInventoryItemInThePage()
		// manually sort the initial value to decending to use it to assert against the sorted value obtained through webpage
		const manuallySortInitialItemPrices = sortArray(initialItemPrices, SortTypes.PRICE_LOW_TO_HIGH)
		// assert that the vlaue obtained from web page is equal to the manually sorted value
		expect(sortedItemPrices).toEqual(manuallySortInitialItemPrices)


	})

	test("Standard user adds items to the cart", async ({browserName}) => {
		// add the above items to the cart
		for (const item of multipleItemsToBeAddedInTheCart) {
			await inventoryPage.addItemToCart(item)
		}
		// go to the cart page by clicking the cart icon as it's closer to the actual user action
		await inventoryPage.goToCartPage()
		// get the titles of all the items that were added in the cart
		const actualItemsAddedInTheCart = await cartPage.getItemsInTheCart(browserName)
		// assert that both arrays are equal
		expect(actualItemsAddedInTheCart).toEqual(multipleItemsToBeAddedInTheCart)
	})

	test.afterEach(async ({ page }: { page: Page }) => {
		await cleanup(page)
	})
})
