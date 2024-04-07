<template>
	<button v-if="pageStore.backLink" class="btn back-to" @click="click">
		<IconBack />
	</button>
</template>

<script lang="ts" setup>
import { usePageStore } from '@/store/pageStore'

import IconBack from '@/assets/img/back.svg'

const pageStore = usePageStore()

function click() {
	pageStore.toBackLink()
}
</script>

<style lang="scss" scoped>
@import '@/assets/_common.scss';

.back-to {
	z-index: 20;
	cursor: pointer;
	box-sizing: border-box;
	outline: none;
  border-radius: 5px 15px 6px 8px;
	padding: 2px 8px;

	svg {
		fill: #fecb23;
		stroke-width: 14px;
		width: 35px;
		height: 35px;

		@media screen and (max-width: $media-tablet) {
			width: 25px;
			height: 25px;
		}
	}
}
</style>
