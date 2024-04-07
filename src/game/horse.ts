import { getRandomCoupleNumberExc } from '../helpers'
import { BOARD_ITEM } from './consts'
import { Board } from './board'
import { TypeBoard } from './types'

export type TypeHorsePos = [number, number]

export interface IHorseOpt {
	board: Board
	startPos?: TypeHorsePos
	user: number
}

export class Horse {
	board: Board
	boardLength: number
	currentPos: TypeHorsePos
	user: number
	pillCount: number

	static #movePoints = [
		[2, 1],
		[1, 2],
		[-1, 2],
		[-2, 1],
		[-2, -1],
		[-1, -2],
		[1, -2],
		[2, -1],
	]

	constructor({ board, startPos, user }: IHorseOpt) {
		this.board = board
		this.boardLength = board.board?.length || 2
		this.currentPos = startPos || this.initStartPos()
		this.user = user
		this.pillCount = 0

		this.board.setHorseTo(this.currentPos, user)
	}

	getPossibleMoves() {
		const points: number[][] = []

		Horse.#movePoints.forEach((point) => {
			const row = this.currentPos[0] + point[0]
			const col = this.currentPos[1] + point[1]

			if (
				this.board &&
				this.board.board &&
				this.board.board[row] &&
				(this.board.board[row][col]?.type === BOARD_ITEM.pill ||
					this.board.board[row][col]?.type === BOARD_ITEM.cell)
			) {
				points.push([row, col])
			}
		})

		return points
	}

	initStartPos(): TypeHorsePos {
		let point: TypeHorsePos = getRandomCoupleNumberExc(this.boardLength)

		do {
			point = getRandomCoupleNumberExc(this.boardLength)
		} while (!this.isPosiblePoint(point))

		return point
	}

	// fillBoard(level: number) {
	// 	if (this.board.boardScore) {
	// 		Horse.recursiveFill(this.board.boardScore, level, this.currentPos)
	// 		this.board.boardScore[this.currentPos[0]][this.currentPos[1]] = 1
	// 	}
	// }

	static recursiveFill(
		board: TypeBoard,
		level: number,
		pos: TypeHorsePos,
		prevMove?: number[]
	) {
		Horse.#movePoints.forEach((point: number[]) => {
			let levelIn = level
			let nextPos = [pos[0] + point[0], pos[1] + point[1]] as TypeHorsePos

			if (
				(prevMove &&
					nextPos[0] === prevMove[0] &&
					nextPos[1] === prevMove[1]) ||
				!board[nextPos[0]] ||
				!board[nextPos[0]][nextPos[1]] ||
				board[nextPos[0]][nextPos[1]].type === BOARD_ITEM.brick ||
				board[nextPos[0]][nextPos[1]].type === BOARD_ITEM.horse
			)
				return

			board[nextPos[0]][nextPos[1]].type = BOARD_ITEM.cell

			levelIn -= 1
			if (levelIn > 0) {
				Horse.recursiveFill(board, levelIn, nextPos, pos)
			}
		})
	}

	static isValidBoard(
		board: TypeBoard,
		pos: TypeHorsePos,
		levelCount: number
	): boolean {
		Horse.recursiveFill(board, levelCount || 6, pos)

		return board.every((r) => r.every((c) => c.type !== BOARD_ITEM.pill))
	}

	moveHorse(targetMove: TypeHorsePos): boolean {
		if (this.isPosibleMove(targetMove)) {
			this.currentPos = targetMove
			this.board.setHorseTo(targetMove, this.user)

			return true
		}

		return false
	}

	isPosibleMove(targetMove: TypeHorsePos): boolean {
		return this.isPosiblePoint(targetMove) && this.isCorrectMove(targetMove)
	}

	isCorrectMove(targetMove: TypeHorsePos): boolean {
		return Horse.#movePoints.some(([r, c]) => {
			const [curR, curC] = this.currentPos

			return curR + r === targetMove[0] && curC + c === targetMove[1]
		})
	}

	isPosiblePoint(point: TypeHorsePos): boolean {
		if (
			!this.board.board ||
			!this.board.board[point[0]] ||
			!this.board.board[point[0]][point[1]]
		)
			return false

		if (this.board.board[point[0]][point[1]].type === BOARD_ITEM.cell) {
			return true
		} else if (this.board.board[point[0]][point[1]].type === BOARD_ITEM.pill) {
			this.pillCount += 1
			return true
		}
		return false
	}
}
