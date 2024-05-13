export function copyArray(arr: any[]) {
	return JSON.parse(JSON.stringify(arr))
}

export function getRandomInt(max: number, min: number = 0) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}
