import { ref } from 'vue'
import { defineStore } from 'pinia'

import { GAME_SETTINGS } from '@/utils/conts'

export const useGameSettings = defineStore('GameSettings', () => {
	const horseColor = ref('white')
	const getGameSettings = ref(GAME_SETTINGS[0])

	function setGameSettings(value: number) {
		if (GAME_SETTINGS[value]) {
			getGameSettings.value = GAME_SETTINGS[value]

			if (GAME_SETTINGS[value].bodyBg) setBodyBG(GAME_SETTINGS[value].bodyBg)
		}
	}

	function setBodyBG(bg?: string) {
		document.body.style.background = bg || GAME_SETTINGS[0]?.bodyBg || ''
	}

	const showPossibleMoves = ref(false)

	function toggleShowPossibleMoves() {
		showPossibleMoves.value = !showPossibleMoves.value
	}

	function toggleHorseColor() {
		if (horseColor.value === 'white') horseColor.value = 'black'
		else horseColor.value = 'white'
	}

	return {
		horseColor,
		toggleHorseColor,
		getGameSettings,
		setGameSettings,
		setBodyBG,
		showPossibleMoves,
		toggleShowPossibleMoves,
	}
})
