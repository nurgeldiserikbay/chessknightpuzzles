import { Board } from './board'
import { Horse, TypeHorsePos } from './horse'
import { TypeBoard } from './types'

export interface IGameOpt {
	length?: number
	board?: TypeBoard
	horsePos?: number[][]
	usersCount: number
}

export class Game {
	board: Board
	horses: Horse[]
	order: number

	constructor({ length, usersCount, horsePos, board }: IGameOpt) {
		this.board = new Board({ board, length, random: false })
		this.horses = new Array(usersCount).fill(null).map(
			(_, ind) =>
				new Horse({
					board: this.board,
					startPos: (horsePos ? horsePos[ind] : undefined) as TypeHorsePos,
					user: ind,
				})
		)
		this.order = 0
	}

	move(r: number, c: number): boolean {
		return this.horses[this.order].moveHorse([r, c])
	}

	setOrder(order: number) {
		this.order = order
	}
}
