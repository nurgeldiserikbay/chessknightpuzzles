<script lang="ts" setup>
import { PAGES } from '@/utils/conts'

import { usePageStore } from '@/store/pageStore'

const { routeTo } = usePageStore()
</script>

<template>
	<div class="page start-page">
		<div class="start-page__head">
			<div class="logo start-page__logo">
				<img src="@/assets/img/logo.png" alt="logo" />
			</div>
			<button class="start-page__btn" @click="routeTo(PAGES.LEVELTYPES)">
				<img src="@/assets/img/start.png" alt="start" />
			</button>
		</div>

		<div class="privacy">
			<a
				href="https://docs.google.com/document/d/1Hk88865_6yvWeWvi25jErXQOD6Oi5-h2qEHW5d8P25Y"
				target="_blank"
				>Privacy Policy</a
			>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.start-page {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100dvh;

	&__head {
		margin-top: 10vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__logo {
		max-width: 200px;
		align-items: center;
		margin-bottom: 45px;

		img {
			width: 100%;
			height: auto;
		}
	}

	&__btn {
		padding: 0.8rem 1.3rem;
		text-align: center;
		cursor: pointer;
		background: transparent;
		padding: 0;
		border: 0;
		outline: 0;
		max-width: 70%;

		img {
			width: 12rem;
			max-width: 100%;
		}
	}

	.privacy {
		margin-bottom: 35px;

		a {
			color: #fff;
			text-decoration: none;
			font-size: 12px;

			&:visited,
			&:active {
				color: #fff;
			}
		}
	}
}
</style>
