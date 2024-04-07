<template>
	<div class="score-table">
		<div class="score-table__time">
			<span>Time:</span>
			<span>{{ timeValue }}</span>
		</div>
		<div class="score-table__move">
			<span>Moves:</span>
			<span v-if="gameStore.curGameStat">{{
				gameStore.curGameStat.moves
			}}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'

import { useGameStore } from '@/store/gameStore'

const $props = defineProps<{
	isGameEnd?: boolean
}>()

const gameStore = useGameStore()

const date = ref(0)
const timerId = ref<ReturnType<typeof setInterval>>()
const timeValue = computed(() => {
	const h = Math.floor(date.value / 3600)
	const m = Math.floor((date.value % 3600) / 60)
	const s = (date.value % 3600) % 60

	return `${h ? `${h} : ` : ''}${addZero(m)} : ${addZero(s)}`
})

watch(
	() => gameStore.curGameStat,
	() => createTimer(),
	{ immediate: true }
)

watch(
	() => $props.isGameEnd,
	() => {
		if ($props.isGameEnd) {
			if (timerId.value) clearInterval(timerId.value)
			gameStore.gameEnd(timeValue.value)
		}
	}
)

onBeforeUnmount(() => {
	if (timerId.value) clearInterval(timerId.value)
})

function createTimer() {
	date.value = 0
	timerId.value = setInterval(() => {
		date.value += 1
	}, 1000)
}

function addZero(num: number) {
	if (!num) return `00`
	else if (num < 10) return `0${num}`
	else return num
}
</script>

<style lang="scss" scoped>
@import '@/assets/_common.scss';

.score-table {
	display: flex;
	align-items: center;
	gap: 25px;

	@media screen and (max-width: $media-tablet) {
		justify-content: center;
		gap: 0px;
		flex-wrap: wrap;
	}

	&__time,
	&__move {
		display: flex;
		align-items: center;
		gap: 15px;

		span {
			&:last-child {
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				@media screen and (max-width: $media-tablet) {
					min-width: unset;
				}
			}

			&:last-child {
				font-size: 22px;
				color: #fecb23;
			}
		}
	}
}
</style>
