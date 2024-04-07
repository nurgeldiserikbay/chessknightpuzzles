import levels from './levels'

export type PagesType = 'START' | 'LEVELS' | 'PLAYGROUND' | 'LEVELDRAW'

export const PAGES: { [key in PagesType]: PagesType } = {
	START: 'START',
	LEVELS: 'LEVELS',
	PLAYGROUND: 'PLAYGROUND',
	LEVELDRAW: 'LEVELDRAW',
}

export const LEVELS = levels

export const GAME_SETTINGS = [
	{
		id: 0,
		board1: 'black-1',
		board2: 'white-1',
		bodyBg: 'radial-gradient(ellipse at center, #16A757 0%, #116336 85%)',
		boardBorderImg: 'border-1',
		horse: 'horse-1',
		board: 'board-1',
	},
	{
		id: 1,
		board1: 'black-2',
		board2: 'white-2',
		bodyBg: 'radial-gradient(ellipse at center, #16A757 0%, #116336 85%)',
		boardBorderImg: 'border-2',
		horse: 'horse-2',
		board: 'board-2',
	},
	{
		id: 2,
		board1: 'black-3',
		board2: 'white-3',
		bodyBg: 'radial-gradient(ellipse at center, #16A757 0%, #116336 85%)',
		boardBorderImg: 'border-3',
		horse: 'horse-3',
		board: 'board-3',
	},
	{
		id: 3,
		board1: 'black-4',
		board2: 'white-4',
		bodyBg: 'radial-gradient(ellipse at center, #16A757 0%, #116336 85%)',
		boardBorderImg: 'border-4',
		horse: 'horse-4',
		board: 'board-4',
	},
]
