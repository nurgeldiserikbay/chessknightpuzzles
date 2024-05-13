<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import html2canvas from 'html2canvas'

import { TypeBoard, TypeBoardItemsType } from '@/game/types'
import { BOARD_ITEM } from '@/game/consts'
import { Board } from '@/game/board'
import { Horse } from '@/game/horse'

import BoardTable from '@/components/BoardTable.vue'

type TABLE_STATE = 'DRAW' | 'FIX' | 'CHECK'

const TABLE_STATE: { [key in TABLE_STATE]: TABLE_STATE } = {
	DRAW: 'DRAW',
	FIX: 'FIX',
	CHECK: 'CHECK',
}

const state = ref<TABLE_STATE>(TABLE_STATE.DRAW)
const levelName = ref(0)
const length = ref(8)
const recursiveCount = ref(6)
const horse = ref<[number, number] | undefined>()
const board = reactive<{ value: TypeBoard | null }>({
	value: null,
})
const validState = ref<boolean | undefined>()
const isHide = ref(false)

const horsePos = computed(() => {
	return (horse.value || [0, 0]) as number[]
})

onMounted(() => {
	const getDefLen = localStorage.getItem('get-def-len')
	if (getDefLen) length.value = Number(getDefLen) || 8
	generate()
})

function generate() {
	localStorage.setItem('get-def-len', String(length.value))
	board.value = Board.createBoard(length.value)
}

function move({ row, col }: { row: number; col: number }) {
	if (validState.value !== undefined) validState.value = undefined
	if (state.value === TABLE_STATE.DRAW) {
		setBrick(row, col)
	} else if (state.value === TABLE_STATE.FIX) {
		setHorse(row, col)
	}
}

function setBrick(row: number, col: number) {
	setCell(row, col, BOARD_ITEM.brick)
}

function setEmpty(row: number, col: number) {
	setCell(row, col, BOARD_ITEM.cell)
}

function setHorse(row: number, col: number) {
	if (horse.value) {
		setEmpty(horse.value[0], horse.value[1])
	}
	horse.value = [row, col]
	setCell(row, col, BOARD_ITEM.horse)
}

function setCell(row: number, col: number, type: TypeBoardItemsType) {
	if (!board.value) return

	if (
		board.value[row] &&
		board.value[row][col] &&
		board.value[row][col].type !== type
	) {
		board.value[row][col] = {
			row: row,
			col: col,
			type: type,
			user: null,
		}
	} else if (board.value[row][col].type === type) {
		board.value[row][col] = {
			row: row,
			col: col,
			type: 'cell',
			user: null,
		}
	}
}

function load() {
	if (board.value && horse.value) {
		const levelNameValue = String(levelName.value)
		fillBoard()
		downloadJson(
			{
				level: levelName.value,
				board: [...board.value],
				horsePos: [...horse.value],
				img: `level-${levelNameValue}`,
			},
			levelNameValue
		)
		isHide.value = true
		nextTick(() => {
			setTimeout(() => {
				captureBlock(levelNameValue)
				levelName.value += 1
				isHide.value = false
			}, 200)
		})
	}
}

function fillBoard() {
	if (!board.value) return
	board.value = board.value.map((r) =>
		r.map((c) => {
			if (c.type === BOARD_ITEM.cell) c.type = BOARD_ITEM.pill
			return c
		})
	)
}

function check() {
	if (!board.value || !horse.value) return
	validState.value = Horse.isValidBoard(
		board.value,
		horse.value,
		recursiveCount.value
	)
}

function downloadJson(jsonData: any, name: string) {
	const jsonString = JSON.stringify(jsonData, null, 2)
	const blob = new Blob([`export default ${jsonString}`], {
		type: 'text/javascript',
	})
	loadFile(URL.createObjectURL(blob), `level-${name}.ts`)
}

async function captureBlock(name: string) {
	const block = document.getElementById('captureBlock')
	if (!block) return
	const canvas = await html2canvas(block)
	canvas.getContext('2d')
	const dataURL = canvas.toDataURL()
	loadFile(dataURL, `level-${name}.png`)
}

function loadFile(data: any, filename: string) {
	const downloadLink = document.createElement('a')
	downloadLink.href = data
	downloadLink.download = filename
	document.body.appendChild(downloadLink)
	downloadLink.click()
	document.body.removeChild(downloadLink)
}
</script>

<template>
	<div class="page playground-page">
		<div class="control">
			<input v-model="length" type="text" placeholder="Board ratio" />
			<input
				v-model="recursiveCount"
				type="text"
				placeholder="Recursive count"
			/>
			<input v-model="levelName" type="text" placeholder="Level Name" />
			<div style="min-width: 100%"></div>
			<button @click="generate">Generate</button>
			<button
				v-if="board.value && state === TABLE_STATE.FIX"
				@click="state = TABLE_STATE.DRAW"
			>
				Draw
			</button>
			<button
				v-else-if="board.value && state === TABLE_STATE.DRAW"
				@click="state = TABLE_STATE.FIX"
			>
				Fix
			</button>
			<button @click="isHide = !isHide">{{ isHide ? 'show' : 'hide' }}</button>
			<button v-if="board.value && horse" @click="check">Check</button>
			<button v-if="board.value && horse" @click="load">Load</button>
			<button @click="fillBoard">Fill</button>
			<div v-if="typeof validState !== 'undefined'">
				<div v-if="validState">Valid</div>
				<div v-else>None Valid</div>
			</div>
		</div>

		<BoardTable
			v-if="board.value"
			:board="board.value"
			:horsePos="horsePos"
			:isHide="isHide"
			@move="move"
		/>
	</div>
</template>

<style lang="scss" scoped>
.control {
	padding: 15px 18px;
	display: flex;
	flex-wrap: wrap;
	gap: 5px 15px;
	margin-bottom: 25px;
}
</style>
