import { SortTypes } from "../data/sortType"

export function sortArray<T extends string | number>(
	array: T[],
	sortType: string
): T[] {
	if (
		sortType === SortTypes.NAME_ASC ||
		sortType === SortTypes.PRICE_LOW_TO_HIGH
	) {
		// Ascending order
		return array.slice().sort((a, b) => {
			return a < b ? -1 : a > b ? 1 : 0
		})
	} else if (
		sortType === SortTypes.NAME_DESC ||
		sortType === SortTypes.PRICE_HIGH_TO_LOW
	) {
		// Descending order
		return array.slice().sort((a, b) => {
			return a < b ? 1 : a > b ? -1 : 0
		})
	} else {
		throw new Error(`Invalid sort type: ${sortType}`)
	}
}
