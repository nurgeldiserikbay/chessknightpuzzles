<script setup lang="ts">
import { ref, computed, reactive, watch, toRefs } from 'vue'

import { TypeBoard } from '@/game/types'
import { Game } from '@/game/game'
import { BOARD_ITEM } from '@/game/consts'
import { LEVELS } from '@/utils/conts'
import { copyArray } from '@/utils/helpers'
import { useGameStore } from '@/store/gameStore'
import { useAudio } from '@/composables/useAudio'

import HeadMain from '@/components/HeadMain.vue'
import BoardTable from '@/components/BoardTable.vue'
import ResultTable from '@/components/ResultTable.vue'

const { currentLevel, showPossibleMoves, curGameStat, updateGameStat, reload } =
	toRefs(useGameStore())
const { playAudio } = useAudio()

const game = ref<Game>()
const board = reactive<{ value: TypeBoard | null }>({
	value: null,
})
const possibleMoves = ref<number[][]>([])

const pillCounts = computed(() => {
	return game.value?.board?.board?.reduce((acc, r) => {
		acc += r.reduce((acc2, c) => {
			if (c.type === BOARD_ITEM.pill) {
				acc2 += 1
			}

			return acc2
		}, 0)
		return acc
	}, 0)
})

const isGameEnd = computed(() => {
	return !pillCounts.value
})

watch(
	() => showPossibleMoves.value,
	() => {
		updatePossibleMoves()
	}
)

watch(
	() => currentLevel.value,
	() => {
		initGame()
	},
	{
		immediate: true,
	}
)

function updatePossibleMoves() {
	if (showPossibleMoves.value) {
		possibleMoves.value = game.value?.horses[0].getPossibleMoves() || []
	} else possibleMoves.value = []
}

function move({ row, col }: { row: number; col: number }) {
	const isMoved = game.value?.move(row, col)

	if (isMoved) {
		board.value = game.value?.board?.board?.map((r) => r) || []
		updatePossibleMoves()
		playAudio('move')

		if (curGameStat.value) {
			updateGameStat.value(['moves'], { moves: curGameStat.value.moves + 1 })
		}
	} else {
		console.log('wrong move!!!')
	}
}

function initGame() {
	game.value = new Game({
		board: copyArray(LEVELS[currentLevel.value || 0].board) as TypeBoard,
		horsePos: copyArray([LEVELS[currentLevel.value || 0].horsePos]),
		usersCount: 1,
	})
	board.value = game.value?.board?.board
	updatePossibleMoves()
}

function reloadGame() {
	initGame()
	reload.value()
}
</script>

<template>
	<HeadMain :isGameEnd="isGameEnd" :settings="true" />
	<div class="page playground-page">
		<div v-if="isGameEnd" class="playground-page__overlay">
			<ResultTable class="playground-page__table" @reload="reloadGame" />
		</div>
		<BoardTable
			v-if="board.value"
			:board="board.value"
			:possibleMoves="possibleMoves"
			@move="move"
		/>
	</div>
</template>

<style lang="scss" scoped>
.playground-page {
	position: relative;

	&__overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding-top: 5px;
	}
}
</style>
