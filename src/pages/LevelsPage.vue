<script lang="ts" setup>
import { ref, computed, onBeforeUnmount } from 'vue'

import { LEVELS, PAGES, GAME_TYPES } from '@/utils/conts'

import HeadMain from '@/components/HeadMain.vue'

import { usePageStore } from '@/store/pageStore'
import { useGameStore } from '@/store/gameStore'

const { routeTo } = usePageStore()
const { gameType, gameStats, selectLevel } = useGameStore()

const isLevelActive = computed(() => (level: number) => {
	return level === 0 || gameStats[GAME_TYPES.COLLECT_ALL][level - 1]
})

const modalActive = ref(false)
let timerId: ReturnType<typeof setTimeout>

function clickLevel(levelInd: number) {
	if (!isLevelActive.value(levelInd)) {
		modalActive.value = true
		if (timerId) clearTimeout(timerId)
		timerId = setTimeout(() => {
			modalActive.value = false
		}, 1500)
	} else {
		selectLevel(levelInd)
		routeTo(PAGES.PLAYGROUND)
	}
}

onBeforeUnmount(() => {
	if (timerId) clearTimeout(timerId)
})
</script>

<template>
	<HeadMain :settings="false" />
	<div class="page levels-page">
		<div v-show="modalActive" class="levels-page__modal">
			This level has not yet been opened. You must complete the previous level
			in classic
		</div>
		<div class="levels-page__list">
			<button
				v-for="level in LEVELS"
				:key="level.level"
				class="levels-page__item level"
				:class="{ 'level--disaled': !isLevelActive(level.level) }"
				@click="clickLevel(level.level)"
			>
				<div class="level__img">
					<span class="level__row level__row--level">{{
						level.level + 1
					}}</span>
					<!-- <img :src="`./img/levels/${level.img}.png`" alt="" /> -->
				</div>
				<div class="level__info">
					<span class="level__row level__row--level">{{
						level.level + 1
					}}</span>
					<div
						v-if="gameType && gameStats[gameType][level.level]"
						class="level__stat"
					>
						<span
							v-if="gameType === GAME_TYPES.COLLECT_ALL"
							class="level__row level__row--small"
							><span>Time:</span
							><span>{{ gameStats[gameType][level.level].time }}</span></span
						>
						<span class="level__row level__row--small">
							<span v-if="gameType === GAME_TYPES.COLLECT_ALL">Moves:</span>
							<span v-else>Pills:</span>
							<span>{{ gameStats[gameType][level.level].moves }}</span></span
						>
					</div>
				</div>
			</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '@/assets/_common.scss';

.levels-page {
	position: relative;

	&__modal {
		position: fixed;
		left: 50%;
		bottom: 120px;
		z-index: 1000;
		text-align: center;
		transform: translateX(-50%);
		width: 90%;
		max-width: 280px;
		color: #fff;
		padding: 12px 25px;
		background: radial-gradient(circle, rgb(210, 45, 59) 0%, rgb(237, 30, 30) 60%);
		box-sizing: border-box;

		@media screen and (max-width: $media-phone) {
			font-size: 12px;
			padding: 8px 15px;
			bottom: 80px;
		}
	}

	&__list {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 25px;
		align-items: stretch;
		padding-bottom: 30px;

		@media screen and (max-width: $media-tablet) {
			gap: 15px;
			justify-content: space-between;
		}

		@media screen and (max-width: $media-phone) {
			gap: 10px;
		}
	}

	.level {
		position: relative;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 1.2rem;
		gap: 0.5rem;
		cursor: pointer;
		background: transparent;
		border: none;
		outline: none;
		width: 25%;
		aspect-ratio: 1;
		padding: 0;

		&--disaled {
			cursor: auto;
		}

		@media screen and (max-width: $media-tablet) {
			font-size: 1rem;
			gap: 0.3rem;
			width: 30%;
		}

		@media screen and (max-width: $media-phone) {
			font-size: 0.8rem;
			gap: 0.3rem;
			width: 30%;
		}

		&:after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			z-index: -1;
			background: rgba(0, 0, 0, 0.8);
			opacity: 0;
		}

		&--disaled:after {
			opacity: 1;
		}

		&__img {
			position: relative;
			max-width: 100%;
			align-items: flex-start;
			display: flex;

			img {
				max-width: 50%;
				height: auto;
				display: block;
			}
		}

		&--disaled .level__img {
			display: none;
		}

		&__info {
			display: flex;
			flex-direction: column;
			align-items: center;
			max-width: 80%;
			height: 20px;
			color: #fff;
		}

		&__row {
			width: 100%;
			display: flex;
			justify-content: space-between;
			gap: 8px;

			&--small {
				font-size: 0.8rem;

				@media screen and (max-width: $media-phone) {
					font-size: 0.6rem;
				}

				span {
					&:last-child {
						color: #fecb23;
					}
				}
			}

			&--level {
				width: 100%;
				font-size: 32px;
				text-align: center;
				color: #fecb23;
				display: none;
				text-shadow: #aa1e05 0 0 25px;
			}
		}

		&__img .level__row--level,
		&--disaled .level__row--level {
			display: block;
		}

		&__stat {
			display: flex;
			flex-wrap: wrap;
			gap: 0 18px;
		}

		&__stat &__row {
			flex-grow: 1;
		}
	}
}
</style>
