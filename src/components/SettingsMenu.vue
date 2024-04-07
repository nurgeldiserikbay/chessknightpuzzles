<template>
	<div class="settings-menu">
		<button class="btn settings-menu__btn" @click="isActive = true">
			<IconSettings />
		</button>

		<Teleport to="body">
			<div
				v-if="isActive"
				class="settings-menu__overlay"
				@click="isActive = false"
			>
				<div class="settings-menu__modal" @click.stop.prevent="">
					<div class="settings-menu__modal-head">
						<div class="title settings-menu__head">Settings</div>
						<button class="btn btn--second settings-menu__close" @click="isActive = false">
							<IconClose />
						</button>
					</div>
					<div class="settings-menu__body">
						<div class="settings-menu__option settings-menu__option--row">
							<div class="settings-menu__option-title">Sound</div>
							<div class="settings-menu__option-body">
								<UiToggle
									:modelValue="audioActive"
									@update:modelValue="toggleAudio"
								/>
							</div>
						</div>
						<div class="settings-menu__option settings-menu__option--row">
							<div class="settings-menu__option-title">Show possible moves</div>
							<div class="settings-menu__option-body">
								<UiToggle
									:modelValue="gameStore.showPossibleMoves"
									@update:modelValue="gameStore.toggleShowPossibleMoves"
								/>
							</div>
						</div>
						<div class="settings-menu__option">
							<div class="settings-menu__option-title">Themes</div>
							<div class="settings-menu__option-body">
								<button
									v-for="setting in GAME_SETTINGS"
									:key="setting.id"
									class="theme"
									:class="{
										'theme--active':
											setting.id === gameStore.getGameSettings.id,
									}"
									@click="selectTheme(setting.id)"
								>
									<img :src="`/img/board/${setting.board}.png`" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import IconSettings from '@/assets/img/settings.svg'
import IconClose from '@/assets/img/close.svg'

import UiToggle from '@/components/UiToggle.vue'

import { useGameStore } from '@/store/gameStore'
import { useAudio } from '@/composables/useAudio'

import { GAME_SETTINGS } from '@/utils/conts'

const gameStore = useGameStore()
const { audioActive, toggleAudio } = useAudio()

const isActive = ref(false)

function selectTheme(id: number) {
	gameStore.setGameSettings(id)
}
</script>

<style lang="scss" scoped>
@import '@/assets/_common.scss';

.settings-menu {
	display: inline-block;
	flex-shrink: 0;

	&__btn {
  	border-radius: 5px 8px 8px 12px;
		outline: none;
		padding: 2px 8px;
		cursor: pointer;

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

	&__modal {
		position: relative;
  	background: radial-gradient(ellipse at center, #16A757 0%, #116336 85%);
		border-radius: 25px 29px 30px 15px;
		width: 480px;
		max-width: 80%;
		box-sizing: border-box;
		margin-top: 9%;
		box-shadow: 0 5px 10px 0 rgba(254, 203, 35, 0.4);

		@media screen and (max-width: $media-tablet) {
			margin-top: 25%;
		}
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
		letter-spacing: 3px;

		&::first-letter {
			font-size: 32px;
			text-transform: uppercase;
		}
	}

	&__close {
		position: absolute;
		top: -10px;
		right: -8px;
		outline: none;
		cursor: pointer;
		border-radius: 50%;
		padding: 11px 11px;

		svg {
			display: block;
			fill: #fecb23;
			width: 15px;
			height: 15px;
		}
	}

	&__body {
		padding: 15px 33px 38px;
	}

	&__option {
		margin-bottom: 15px;

		&--row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 25px;
		}
	}

	&__option-title {
		font-size: 18px;
		font-weight: 500;
		margin-bottom: 14px;
	}

	&__option-body {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;

		.theme {
			position: relative;
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;
			height: 45px;
			background: transparent;
			border: none;
			outline: none;
			padding: 0;

			img {
				display: block;
				width: 100%;
				height: 100%;
			}

			&--active {
				transform: scale(1.1);

				&:after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: rgba(207, 225, 68, 0.6);
				}
			}
		}
	}
}
</style>
