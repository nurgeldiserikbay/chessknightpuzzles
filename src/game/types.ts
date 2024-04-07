export type TypeBoardItemsType = 'cell' | 'brick' | 'horse' | 'pill'

export type TypeBoardItemConst = {
  [key in TypeBoardItemsType]: TypeBoardItemsType
}

export type TypeBoardItems = {
  row: number
  col: number
  type: TypeBoardItemsType
  user: number | null
}

export type TypeBoard = TypeBoardItems[][]
