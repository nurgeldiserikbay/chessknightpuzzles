import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { LEVELS, GAME_SETTINGS } from '@/utils/conts'

export interface IGameStat {
	time: string
	moves: number
	date: string
}

export type IGameStats = { [key: number]: IGameStat }

export const useGameStore = defineStore(
	'GameStore',
	() => {
		const currentLevel = ref(LEVELS[0]?.level || 0)
		const gameSettings = ref(0)
		const curGameStat = ref<IGameStat>({
			time: '',
			moves: 0,
			date: '',
		})
		const gameStats = ref<IGameStats>({})
		const showPossibleMoves = ref(true)

		const getGameSettings = computed(() => {
			return GAME_SETTINGS[gameSettings.value]
		})

		const nextLevel = computed(() => {
			return LEVELS[currentLevel.value + 1]?.level
		})

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

		function setGameSettings(value: number) {
			if (GAME_SETTINGS[value]) {
				gameSettings.value = value

				if (GAME_SETTINGS[value].bodyBg) setBodyBG(GAME_SETTINGS[value].bodyBg)
			}
		}

		function setBodyBG(bg?: string) {
			document.body.style.background = bg || GAME_SETTINGS[0]?.bodyBg || ''
		}

		function toggleShowPossibleMoves() {
			showPossibleMoves.value = !showPossibleMoves.value
		}

		function gameEnd(time: string) {
			if (curGameStat.value) {
				curGameStat.value.time = time
				curGameStat.value.date = new Date().toDateString()
			}

			gameStats.value[currentLevel.value] = curGameStat.value
		}

		function reload() {
			selectLevel(currentLevel.value)
		}

		return {
			nextLevel,
			currentLevel,
			selectLevel,
			getGameSettings,
			setGameSettings,
			setBodyBG,
			showPossibleMoves,
			toggleShowPossibleMoves,
			curGameStat,
			updateGameStat,
			gameEnd,
			reload,
			gameStats,
		}
	},
	{
		persist: true,
	}
)
