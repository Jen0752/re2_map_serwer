// 标点分类
export type MarkerCategory =
  | 'puzzles'        // 提示指引/机关拼图
  | 'keyItems'       // 解密道具/钥匙
  | 'savePoints'     // 存档
  | 'doors'          // 门
  | 'enemies'        // 敌人
  | 'items'          // 武器/收集品
  | 'throwables'     // 投掷物
  | 'ammo'           // 弹药
  | 'health'         // 药品

// 楼层
export type Floor = '3F' | '2F' | '1F' | 'B1' | "B1'" | 'B2' | 'B3'

// 角色
export type Character = 'leon' | 'claire'

// 难度
export type Difficulty = 'standard' | 'expert'

// 分类配置
export interface CategoryConfig {
  id: MarkerCategory
  name: string
  icon: string
  priority: number
}

// 标点数据
export interface Marker {
  id: string
  name: string
  category: MarkerCategory
  floor: Floor
  position: { x: number; y: number }  // 相对坐标 0-1
  characters: Character[]
  difficulty: Difficulty[]
  description?: string
  image?: string
  collectible: boolean
}

// 路线段
export interface RouteSegment {
  floor: Floor
  points: { x: number; y: number }[]
}

// 路线数据
export interface Route {
  id: string
  name: string
  character: Character
  difficulty: Difficulty
  segments: RouteSegment[]
}

// 地图尺寸
export interface MapSize {
  width: number
  height: number
}

// 筛选状态
export interface FilterState {
  categories: MarkerCategory[]
  characters: Character[]
  difficulties: Difficulty[]
}

// 抽屉类型
export type DrawerType = 'filter' | 'route' | 'floor' | null

// 工具栏按钮类型
export type ToolbarButton =
  | 'filter'
  | 'mode'
  | 'route'
  | 'character'
  | 'zoomIn'
  | 'zoomOut'
  | 'floor'
