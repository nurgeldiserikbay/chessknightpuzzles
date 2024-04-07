import { ref } from 'vue'

export const audioList: { [key: string]: string } = {
	move: './sounds/move-sound.mp3',
}

const audioActive = ref(true)

export const useAudio = () => {
	function playAudio(audioType: string, anyway: boolean = false) {
		if (!anyway && (!audioActive.value || !audioList[audioType])) return

		if (audioList[audioType]) {
			const audio = new Audio(audioList[audioType])
			audio.play()
		}
	}

	function toggleAudio() {
		audioActive.value = !audioActive.value
	}

	return {
		audioActive,
		toggleAudio,
		playAudio,
	}
}
