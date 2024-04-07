<template>
	<div class="result-table">
		<div class="result-table__modal-head">
			<div class="title result-table__head">Game End</div>
		</div>
		<div class="result-table__body">
			<div class="result-table__values">
				<div class="result-table__time">
					<span>Time:</span>
					<span>{{ gameStore.curGameStat.time }}</span>
				</div>
				<div class="result-table__move">
					<span>Moves:</span>
					<span v-if="gameStore.curGameStat">{{
						gameStore.curGameStat.moves
					}}</span>
				</div>
			</div>
			<div class="result-table__controls">
				<button class="btn result-table__menu" @click="routeTo(PAGES.LEVELS)">
					<IconMenu />
				</button>
				<button class="btn result-table__reload" @click="reload">
					<IconReload />
				</button>
				<button
					v-if="nextLevel !== undefined"
					class="btn result-table__next"
					@click="next"
				>
					<IconNext />
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'

import { PAGES } from '@/utils/conts'

import IconMenu from '@/assets/img/menu.svg'
import IconReload from '@/assets/img/reload.svg'
import IconNext from '@/assets/img/next.svg'

import { usePageStore } from '@/store/pageStore'
import { useGameStore } from '@/store/gameStore'

const { routeTo } = usePageStore()

const $emits = defineEmits(['reload'])

const gameStore = useGameStore()
const { nextLevel, selectLevel } = toRefs(useGameStore())

function reload() {
	$emits('reload')
}

function next() {
	selectLevel.value(nextLevel.value)
}
</script>

<style lang="scss" scoped>
@import '@/assets/_common.scss';

.result-table {
	background: radial-gradient(ellipse at center, #16A757 0%, #116336 85%);
	width: 480px;
	max-width: 80%;
	box-sizing: border-box;
	border-top-width: 0;
	padding-top: 25px;
	margin-top: 9%;
	border-radius: 25px;
	box-shadow: 0 5px 10px 0 rgba(254, 203, 35, 0.4);

	@media screen and (max-width: $media-tablet) {
		margin-top: 25%;
	}

	&__modal-head {
		padding: 15px 18px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__head {
		font-size: 25px;
		font-weight: 600;
		line-height: 1;
		text-align: center;

		&::first-letter {
			font-size: 32px;
			text-transform: uppercase;
		}
	}

	&__body {
		padding: 20px 30px 35px;
	}

	&__values {
		display: flex;
		flex-direction: column;
		gap: 15px;
		font-size: 1.8rem;
		margin-bottom: 45px;
	}

	&__time,
	&__move {
		display: flex;
		justify-content: space-between;

		span {
			&:last-child {
				color: #fecb23;
			}
		}
	}

	&__controls {
		display: flex;
		justify-content: center;
		gap: 30px;
		margin-top: 25px;
		margin-bottom: 15px;
		padding: 0 22px;

		button {
			cursor: pointer;
			box-sizing: border-box;
			outline: none;
			padding: 8px 18px;

			&:nth-child(1) {
				border-radius: 12px 8px 19px 4px;
			}

			&:nth-child(2) {
				border-radius: 5px 8px 16px 11px;
			}

			&:nth-child(3) {
				border-radius: 12px 8px 16px 11px;
			}

			svg {
				fill: #fecb23;
				width: 35px;
				height: 35px;

				@media screen and (max-width: $media-tablet) {
					width: 25px;
					height: 25px;
				}
			}
		}
	}

	&__time,
	&__move {
		display: flex;
		gap: 8px;

		span {
			&:last-child {
				min-width: 80px;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				@media screen and (max-width: $media-tablet) {
					min-width: unset;
				}
			}
		}
	}
}
</style>
