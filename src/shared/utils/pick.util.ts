/**
 * Возвращает новый объект, содержащий только указанные поля.
 * @param obj Исходный объект
 * @param keys Массив ключей, которые нужно оставить
 * @returns Новый объект с указанными полями
 */
export function pick<T extends object, K extends keyof T>(
	obj: T,
	keys: K[]
): Pick<T, K> {
	const result = {} as Pick<T, K>
	for (const key of keys) {
		if (key in obj) {
			result[key] = obj[key]
		}
	}
	return result
}
