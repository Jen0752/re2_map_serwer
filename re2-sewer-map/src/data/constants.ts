import type { CategoryConfig, Floor, MarkerCategory } from '@/types'

// 分类配置（按优先级排序）
export const CATEGORIES: CategoryConfig[] = [
  { id: 'puzzles', name: '提示指引', icon: 'puzzle', priority: 1 },
  { id: 'keyItems', name: '解密道具', icon: 'key', priority: 2 },
  { id: 'savePoints', name: '存档', icon: 'save', priority: 3 },
  { id: 'doors', name: '门', icon: 'door', priority: 4 },
  { id: 'enemies', name: '敌人', icon: 'enemy', priority: 5 },
  { id: 'items', name: '收集品', icon: 'item', priority: 6 },
  { id: 'throwables', name: '投掷物', icon: 'throwable', priority: 7 },
  { id: 'ammo', name: '弹药', icon: 'ammo', priority: 8 },
  { id: 'health', name: '药品', icon: 'health', priority: 9 },
]

// 楼层列表
export const FLOORS: Floor[] = ['3F', '2F', '1F', 'B1', "B1'", 'B2', 'B3']

// 楼层显示顺序
export const FLOOR_ORDER: Record<Floor, number> = {
  '3F': 0,
  '2F': 1,
  '1F': 2,
  'B1': 3,
  "B1'": 4,
  'B2': 5,
  'B3': 6,
}

// 地图图片路径
export const MAP_IMAGES: Record<Floor, string> = {
  '3F': '/maps/re2_sewer_3F.png',
  '2F': '/maps/re2_sewer_2F.png',
  '1F': '/maps/re2_sewer_1F.png',
  'B1': '/maps/re2_sewer_B1.png',
  "B1'": '/maps/re2_sewer_B1_.png',
  'B2': '/maps/re2_sewer_B2.png',
  'B3': '/maps/re2_sewer_B3.png',
}

// 地图原始尺寸（用于坐标转换）
export const MAP_SIZES: Record<Floor, { width: number; height: number }> = {
  '3F': { width: 2622, height: 1598 },
  '2F': { width: 2249, height: 1863 },
  '1F': { width: 2048, height: 2048 },
  'B1': { width: 2359, height: 1776 },
  "B1'": { width: 2220, height: 1888 },
  'B2': { width: 1564, height: 2681 },
  'B3': { width: 3106, height: 1349 },
}

// 分类优先级映射
export const CATEGORY_PRIORITY: Record<MarkerCategory, number> = {
  puzzles: 1,
  keyItems: 2,
  savePoints: 3,
  doors: 4,
  enemies: 5,
  items: 6,
  throwables: 7,
  ammo: 8,
  health: 9,
}

// 默认筛选状态
export const DEFAULT_FILTERS = {
  categories: CATEGORIES.map(c => c.id),
  characters: ['leon', 'claire'] as const,
  difficulties: ['standard', 'expert'] as const,
}

// 地图缩放范围
export const ZOOM_CONFIG = {
  min: 0.5,
  max: 3.0,
  initial: 1.0,
}

// 标点显示配置
export const MARKER_CONFIG = {
  size: 48,
  clusterRadius: 40,
  visibleRatio: 0.3,  // 低缩放时显示30%的密集区域标点
}

// 抽屉高度比例
export const DRAWER_CONFIG = {
  height: 0.7,  // 占屏幕高度的70%
}

// 动画时长
export const ANIMATION_CONFIG = {
  drawer: 300,
  popup: 200,
  route: 2000,  // 路线绘制动画时长
}
