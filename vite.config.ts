import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { VitePWA } from 'vite-plugin-pwa'

const START_PATH = '.'
const SCOPE = 'https://nurgeldiserikbay.github.io/'
const START_URL = './index.html?fullscreen=true'

const VitePWAConf = {
	injectRegister: 'auto',
	registerType: 'autoUpdate',
	workbox: {
		globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
	},
	manifest: {
		id: 'com.thelightcome.chessknightpuzzles',
		name: 'Chess Knight Puzzles',
		short_name: 'Chess Knight Puzzles',
		description:
			"Immerse yourself in the captivating world of \"Chess Knight Puzzles\" — a unique game that combines the classic mechanics of the knight's move in chess with modern gaming challenges. Control the chess knight as it moves across boards of various shapes in an L-pattern, collecting pills scattered across the field. Each move requires strategic thinking and quick reflexes. \n Game Modes: \n Classic: \n All the cells on the board are filled with pills. Your task is to collect them all, carefully planning each move. The difficulty of the levels gradually increases, offering new board shapes and pill placements. \n No Way Back: \n The conditions are the same as in the classic mode, but with one complication: the knight cannot return to the cells it has already visited. Plan your moves even more carefully to avoid getting stuck. \n For Time: \n Pills appear in random places on the board, and your goal is to collect as many as possible within a limited time. Compete with yourself and other players, setting new records and improving your reaction and strategy. \n To unlock new levels in the second and third modes, you first need to complete the corresponding levels in the classic mode. This creates a smooth learning curve and gradual increase in difficulty, allowing players to develop their skills and improve in the game. \n \"Chess Knight Puzzles\" is the perfect game for chess and puzzle enthusiasts, offering unique challenges and endless opportunities to improve your skills. Become a master of the knight and collect all the pills along your path!",
		scope: SCOPE,
		start_url: START_URL,
		display: 'fullscreen',
		orientation: 'portrait',
		background_color: '#fff',
		lang: 'en',
		theme_color: '#fff',
		protocol_handlers: [],
		icons: [
			{
				src: START_PATH + '/icons/favicon-16x16.png',
				type: 'image/png',
				sizes: '16x16',
			},
			{
				src: START_PATH + '/icons/favicon-32x32.png',
				type: 'image/png',
				sizes: '32x32',
			},
			{
				src: START_PATH + '/icons/mstile-70x70.png',
				type: 'image/png',
				sizes: '128x128',
			},
			{
				src: START_PATH + '/icons/mstile-144x144.png',
				type: 'image/png',
				sizes: '144x144',
			},
			{
				src: START_PATH + '/icons/mstile-150x150.png',
				type: 'image/png',
				sizes: '270x270',
			},
			{
				src: START_PATH + '/icons/mstile-310x150.png',
				type: 'image/png',
				sizes: '558x270',
			},
			{
				src: START_PATH + '/icons/mstile-310x310.png',
				type: 'image/png',
				sizes: '558x558',
			},
			{
				src: START_PATH + '/icons/android-chrome-192x192.png',
				type: 'image/png',
				sizes: '192x192',
			},
			{
				src: START_PATH + '/icons/android-chrome-512x512.png',
				type: 'image/png',
				sizes: '512x512',
			},
			{
				src: START_PATH + '/icons/apple-touch-icon.png',
				type: 'image/png',
				sizes: '180x180',
			},
		],
		display_override: ['window-controls-overlay'],
		screenshots: [
			{
				src: START_PATH + '/screenshots/narrow-1.png',
				type: 'image/png',
				sizes: '406x720',
				form_factor: 'narrow',
			},
			{
				src: START_PATH + '/screenshots/narrow-2.png',
				type: 'image/png',
				sizes: '406x720',
				form_factor: 'narrow',
			},
			{
				src: START_PATH + '/screenshots/narrow-3.png',
				type: 'image/png',
				sizes: '406x720',
				form_factor: 'narrow',
			},
			{
				src: START_PATH + '/screenshots/narrow-4.png',
				type: 'image/png',
				sizes: '406x720',
				form_factor: 'narrow',
			},
			{
				src: START_PATH + '/screenshots/narrow-5.png',
				type: 'image/png',
				sizes: '406x720',
				form_factor: 'narrow',
			},
			{
				src: START_PATH + '/screenshots/narrow-6.png',
				type: 'image/png',
				sizes: '406x720',
				form_factor: 'narrow',
			},
			{
				src: START_PATH + '/screenshots/wide-1.png',
				type: 'image/png',
				sizes: '1024x640',
				form_factor: 'wide',
			},
			{
				src: START_PATH + '/screenshots/wide-2.png',
				type: 'image/png',
				sizes: '1024x640',
				form_factor: 'wide',
			},
			{
				src: START_PATH + '/screenshots/wide-3.png',
				type: 'image/png',
				sizes: '1024x640',
				form_factor: 'wide',
			},
			{
				src: START_PATH + '/screenshots/wide-4.png',
				type: 'image/png',
				sizes: '1024x601',
				form_factor: 'wide',
			},
			{
				src: START_PATH + '/screenshots/wide-5.png',
				type: 'image/png',
				sizes: '1024x601',
				form_factor: 'wide',
			},
			{
				src: START_PATH + '/screenshots/wide-6.png',
				type: 'image/png',
				sizes: '1024x601',
				form_factor: 'wide',
			},
		],
	},
}

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	build: {
		outDir: './docs',
	},
	plugins: [vue(), svgLoader(), VitePWA(VitePWAConf)],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, './src/'),
			},
		],
	},
})
