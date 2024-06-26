<template>
	<div ref="tableRef" class="table">
		<div id="captureBlock" class="table__inner" :class="{ isHide: isHide }">
			<div
				class="horse"
				:class="{ hide: isHide }"
				:style="{
					...getHorseDefStyle,
					...getHorsePosStyle,
				}"
			>
				<img :src="getHorseImage" alt="knight" />
			</div>
			<div v-for="(row, rowInd) in board" :key="rowInd" class="table__row">
				<div
					v-for="(col, colInd) in row"
					:key="colInd"
					class="table__col"
					:style="getCellStyle(colInd + (rowInd % 2))"
					:class="{
						active: !isHide && isPossibleMove(rowInd, colInd),
						is_brick:
							(!canToBack && col.type === BOARD_ITEM.cell) ||
							col.type === BOARD_ITEM.brick,
					}"
					@click="move(rowInd, colInd)"
				>
					<div
						v-if="col.type === BOARD_ITEM.pill"
						class="coin"
						:class="{ hide: isHide }"
						:style="{
							...getCoinStyle,
							// animationDelay: `${(getRandomInt(6) * 400) / 1000}s`,
						}"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import { BOARD_ITEM } from '@/game/consts'
import { TypeBoard } from '@/game/types'

import { useGameSettings } from '@/store/gameSettings'
// import { getRandomInt } from '@/utils/helpers'

const $props = withDefaults(
	defineProps<{
		board: TypeBoard
		possibleMoves?: number[][]
		horsePos: number[]
		isHide?: boolean
		canToBack?: boolean
	}>(),
	{
		isHide: false,
		canToBack: true,
	}
)

const $emits = defineEmits(['move'])

const gameSettings = useGameSettings()

const tableRef = ref<HTMLDivElement | null>(null)
const boardWidth = ref(80)
const borderWidth = ref(16)

const isPossibleMove = computed(() => (row: number, col: number) => {
	return gameSettings.showPossibleMoves && $props.possibleMoves?.some((p) => p[0] === row && p[1] === col)
})

const getCellStyle = computed(() => (ind: number) => {
	if (ind % 2 === 0) {
		return {
			width: `${boardWidth.value}px`,
			minWidth: `${boardWidth.value}px`,
			height: `${boardWidth.value}px`,
			minHeight: `${boardWidth.value}px`,
			background: `${gameSettings.getGameSettings.board1}`,
		}
	} else {
		return {
			width: `${boardWidth.value}px`,
			minWidth: `${boardWidth.value}px`,
			height: `${boardWidth.value}px`,
			minHeight: `${boardWidth.value}px`,
			background: `${gameSettings.getGameSettings.board2}`,
		}
	}
})

const getCoinStyle = computed(() => {
	return {
		background: gameSettings.getGameSettings.coinBg,
	}
})

const getHorseDefStyle = computed(() => {
	return {
		height: `${Math.floor(boardWidth.value * 1.5)}px`,
		left: `${boardWidth.value / 2}px`,
		top: `${boardWidth.value / 2}px`,
	}
})

const getHorsePosStyle = computed(() => {
	return {
		transform: `translate(${
			boardWidth.value * $props.horsePos[1] + $props.horsePos[1]
		}px, ${boardWidth.value * $props.horsePos[0] + $props.horsePos[0]}px)`,
	}
})

const getHorseImage = computed(() => {
	return `./img/board/${gameSettings.getGameSettings.horse}-${gameSettings.horseColor}.png`
})

onMounted(() => {
	calculateBoardWidth()

	window.addEventListener('resize', calculateBoardWidth)
})

onBeforeUnmount(() => {
	window.removeEventListener('resize', calculateBoardWidth)
})

function move(row: number, col: number) {
	$emits('move', { row, col })
}

function calculateBoardWidth() {
	if (tableRef.value) {
		const style = getComputedStyle(tableRef.value)
		const width = Math.floor(parseInt(style.width))
		const min = Math.min(width, window.innerHeight * 0.8)
		boardWidth.value = Math.floor(
			min / $props.board.length - Math.floor($props.board.length / 2)
		)
	}

	if (window.innerWidth < 480) {
		borderWidth.value = 8
	} else {
		borderWidth.value = 16
	}
}
</script>

<style lang="scss" scoped>
.table {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	box-sizing: border-box;

	&__inner {
		/* background: #fff; */
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 1px;
	}

	&__row {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1px;
		position: relative;
	}

	&__col {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		position: relative;
		border-radius: 5px;
		box-shadow: inset 0 0 5px 3px rgba(0, 0, 0, 0.4),
			0 0 2px 1px rgba(0, 0, 0, 0.3);

		&.is_brick {
			opacity: 0;
		}

		&.active {
			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(226, 255, 4, 0.5);
			}
		}

		.coin {
			position: relative;
			z-index: 15;
			width: 50%;
			height: 50%;
			border-radius: 50%;
			display: block;
			pointer-events: none;
			box-shadow: 2px 2px 25px 0 rgba(0, 0, 0, 0.5);
		}
	}

	.hide {
		opacity: 0;
	}

	.horse {
		pointer-events: none;
		position: absolute;
		transition: 0.3s;
		z-index: 50;

		img {
			max-height: 100%;
			display: block;
			position: relative;
			left: -50%;
			top: -70%;
		}
	}
}
</style>
