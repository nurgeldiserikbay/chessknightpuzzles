<script lang="ts" setup>
import { onBeforeMount, onMounted } from 'vue'

import { useGameSettings } from '@/store/gameSettings'
import { usePageStore } from '@/store/pageStore'
import { useGameStore } from '@/store/gameStore'

import Admob from '@/utils/admob'

const gameSettings = useGameSettings()
const pageStore = usePageStore()
const gameStore = useGameStore()

onBeforeMount(() => {
	gameStore.loadData()
})

onMounted(() => {
	gameSettings.setBodyBG()

	if (import.meta.env.VITE_APP_MODE !== 'TEST') Admob.initialize()
})
</script>

<template>
	<component :is="pageStore.currentPageComponent" />
</template>

<style scoped></style>
