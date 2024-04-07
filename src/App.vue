<script lang="ts" setup>
import { onMounted } from 'vue'

import { usePageStore } from '@/store/pageStore'
import { useGameStore } from '@/store/gameStore'

import { PAGES } from '@/utils/conts'

import LevelsPage from '@/pages/LevelsPage.vue'
import PlaygroundPage from '@/pages/PlaygroundPage.vue'
import StartPage from '@/pages/StartPage.vue'
import LevelDrow from '@/pages/LevelDrow.vue'

const pageStore = usePageStore()
const gameStore = useGameStore()

onMounted(() => {
	gameStore.setBodyBG()
})
</script>

<template>
	<StartPage v-if="pageStore.currentPage === PAGES.START" />
	<LevelsPage v-if="pageStore.currentPage === PAGES.LEVELS" />
	<PlaygroundPage v-if="pageStore.currentPage === PAGES.PLAYGROUND" />
	<LevelDrow v-if="pageStore.currentPage === PAGES.LEVELDRAW" />
</template>

<style scoped></style>
