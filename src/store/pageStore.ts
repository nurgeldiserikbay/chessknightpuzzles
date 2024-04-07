import { ref, computed } from 'vue'
import type { Component } from 'vue'
import { defineStore } from 'pinia'

import { PAGES, type PagesType } from '@/utils/conts'

import StartPage from '@/pages/StartPage.vue'
import LevelsPage from '@/pages/LevelsPage.vue'
import PlaygroundPage from '@/pages/PlaygroundPage.vue'
import LevelDrow from '@/pages/LevelDrow.vue'

export const usePageStore = defineStore('PageStore', () => {
	const currentPage = ref<PagesType>(PAGES.START)

	const pages: { [key in PagesType]: Component } = {
		START: StartPage,
		LEVELS: LevelsPage,
		PLAYGROUND: PlaygroundPage,
		LEVELDRAW: LevelDrow,
	}

	const currentPageComponent = computed(() => {
		return pages[currentPage.value]
	})

	const backLink = computed(() => {
		if (currentPage.value === PAGES.LEVELS) return PAGES.START
		else if (currentPage.value === PAGES.PLAYGROUND) return PAGES.LEVELS
		else return ''
	})

	function routeTo(page: PagesType) {
		currentPage.value = page
	}

	function toBackLink() {
		if (backLink.value) routeTo(backLink.value)
	}

	return {
		currentPage,
		currentPageComponent,
		routeTo,
		backLink,
		toBackLink,
	}
})
