/**
 * Возвращает новый объект, исключая из него указанные поля.
 *
 * @template T - Тип исходного объекта
 * @template K - Тип ключей, которые нужно исключить (должны быть ключами T)
 *
 * @param obj - Исходный объект, из которого будут исключены поля
 * @param keys - Массив ключей, которые нужно исключить из объекта
 *
 * @returns Новый объект, не содержащий указанных полей
 *
 * @example
 * const user = { id: 1, email: 'user@example.com', password: 'secret' };
 * const publicUser = omit(user, ['password']);
 * // → { id: 1, email: 'user@example.com' }
 */
export function omit<T extends object, K extends keyof T>(
	obj: T,
	keys: K[]
): Omit<T, K> {
	const result = { ...obj }
	keys.forEach(key => delete result[key])
	return result
}
