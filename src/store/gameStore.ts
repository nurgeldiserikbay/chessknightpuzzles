import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { Preferences } from '@capacitor/preferences'

import { LEVELS, GAME_TYPE, GAME_TYPES } from '@/utils/conts'

export interface IGameStat {
	time: string
	moves: number
	date: string
}

export type IGameStats = {
	[key: string]: { [key: number]: IGameStat }
}

export const useGameStore = defineStore('GameStore', () => {
	const gameType = ref<GAME_TYPE | null>(null)
	const currentLevel = ref(LEVELS[0]?.level || 0)
	const curGameStat = ref<IGameStat>({
		time: '',
		moves: 0,
		date: '',
	})
	const gameStats = ref<IGameStats>({
		[GAME_TYPES.COLLECT_ALL]: {},
		[GAME_TYPES.NO_WAY_BACK]: {},
		[GAME_TYPES.BY_TIME]: {},
	})

	const nextLevel = computed(() => {
		if (
			gameType.value !== GAME_TYPES.COLLECT_ALL &&
			!gameStats.value[GAME_TYPES.COLLECT_ALL][currentLevel.value]
		)
			return
		return LEVELS[currentLevel.value + 1]?.level
	})

	watch(
		() => gameStats.value,
		async () => {
			await Preferences.set({
				key: 'gameStats',
				value: JSON.stringify(gameStats.value),
			})
		},
		{ deep: true }
	)

	function setGameType(type: GAME_TYPE) {
		gameType.value = type
	}

	function selectLevel(levelInd: number) {
		currentLevel.value = levelInd

		curGameStat.value = {
			time: '',
			moves: 0,
			date: '',
		}
	}

	function updateGameStat(
		fields: (keyof IGameStat)[],
		newGameStat: Partial<IGameStat>
	) {
		fields.forEach((key) => {
			if (curGameStat.value[key] !== undefined) {
				// @ts-ignore
				curGameStat.value[key] = newGameStat[key]
			}
		})
	}

	function gameEnd(time: string) {
		if (curGameStat.value) {
			curGameStat.value.time = time
			curGameStat.value.date = new Date().toDateString()
		}

		if (gameType.value) {
			gameStats.value[gameType.value][currentLevel.value] = curGameStat.value
		}
	}

	function reload() {
		selectLevel(currentLevel.value)
	}

	async function loadData() {
		const ret = await Preferences.get({ key: 'gameStats' })

		if (ret.value) {
			gameStats.value = JSON.parse(ret.value) as IGameStats
		}
	}

	return {
		gameType,
		setGameType,
		nextLevel,
		currentLevel,
		selectLevel,
		curGameStat,
		updateGameStat,
		gameEnd,
		reload,
		gameStats,
		loadData,
	}
})
