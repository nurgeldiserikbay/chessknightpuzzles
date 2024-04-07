<template>
	<div ref="tableRef" class="table">
		<div id="captureBlock" class="table__inner" :class="{ isHide: isHide }">
			<div class="border border--top" :style="getTableStyle"></div>
			<div class="border border--right" :style="getTableStyle"></div>
			<div class="border border--bottom" :style="getTableStyle"></div>
			<div class="border border--left" :style="getTableStyle"></div>
			<div v-for="(row, rowInd) in board" :key="rowInd" class="table__row">
				<div
					v-for="(col, colInd) in row"
					:key="colInd"
					class="table__col"
					:style="getCellStyle(colInd + (rowInd % 2))"
					:class="{ active: !isHide && isPossibleMove(rowInd, colInd) }"
					@click="move(rowInd, colInd)"
				>
					<img
						v-if="col.type === BOARD_ITEM.horse"
						:src="getHorseImage"
						alt=""
						class="horse"
						:class="{ hide: isHide }"
					/>
					<img
						v-if="col.type === BOARD_ITEM.pill"
						src="/img/board/coin.png"
						alt=""
						class="coin"
						:class="{ hide: isHide }"
					/>
					<div v-if="col.type === BOARD_ITEM.brick" class="brick">
						<img src="/img/board/stone.png" alt="stone" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import { BOARD_ITEM } from '@/game/consts'
import { TypeBoard } from '@/game/types'

import { useGameStore } from '@/store/gameStore'

const $props = withDefaults(
	defineProps<{
		board: TypeBoard
		possibleMoves?: number[][]
		isHide?: boolean
	}>(),
	{
		isHide: false,
	}
)

const $emits = defineEmits(['move'])

const gameStore = useGameStore()

const tableRef = ref<HTMLDivElement | null>(null)
const boardWidth = ref(80)
const borderWidth = ref(16)

const getTableStyle = computed(() => {
	return {
		background: `url('/img/board/${gameStore.getGameSettings.boardBorderImg}.png')`,
	}
})

const isPossibleMove = computed(() => (row: number, col: number) => {
	return $props.possibleMoves?.some((p) => p[0] === row && p[1] === col)
})

const getCellStyle = computed(() => (ind: number) => {
	if (ind % 2 === 0) {
		return {
			width: `${boardWidth.value}px`,
			minWidth: `${boardWidth.value}px`,
			height: `${boardWidth.value}px`,
			minHeight: `${boardWidth.value}px`,
			backgroundImage: `url('/img/board/${gameStore.getGameSettings.board1}.png')`,
		}
	} else {
		return {
			width: `${boardWidth.value}px`,
			minWidth: `${boardWidth.value}px`,
			height: `${boardWidth.value}px`,
			minHeight: `${boardWidth.value}px`,
			backgroundImage: `url('/img/board/${gameStore.getGameSettings.board2}.png')`,
		}
	}
})

const getHorseImage = computed(() => {
	return `/img/board/${gameStore.getGameSettings.horse}.png`
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
		boardWidth.value = Math.floor(min / $props.board.length)
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
		position: relative;
		padding: 16px;

		@media screen and (max-width: 480px) {
			padding: 8px;
		}

		&:after {
			content: '';
			position: absolute;
			top: 16px;
			left: 16px;
			right: 16px;
			bottom: 16px;
			box-shadow: inset 0 0 10px 5px rgba(0, 0, 0, 0.8);
			pointer-events: none;

			@media screen and (max-width: 480px) {
				top: 8px;
				left: 8px;
				right: 8px;
				bottom: 8px;
			}
		}

		&.isHide:after {
			box-shadow: none;
		}
	}

	&__row {
		display: flex;
		justify-content: center;
		align-items: center;
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

		&.active {
			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: rgba(207, 225, 68, 0.6);
			}
		}

		.horse {
			width: 80%;
			height: 80%;
			display: block;
			object-fit: contain;
		}

		.coin {
			width: 50%;
			height: 50%;
			display: block;
			object-fit: contain;
			pointer-events: none;
		}

		.brick {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;

			img {
				width: 80%;
				height: 80%;
			}
		}

		.hide {
			opacity: 0;
		}
	}

	.border {
		position: absolute;

		&--top {
			left: 16px;
			top: 0;
			right: 16px;
			height: 16px;
		}

		&--right {
			top: 0;
			bottom: 0;
			right: 0;
			width: 16px;
		}

		&--bottom {
			left: 16px;
			bottom: 0;
			right: 16px;
			height: 16px;
		}

		&--left {
			top: 0;
			bottom: 0;
			left: 0;
			width: 16px;
		}
	}
}
</style>
