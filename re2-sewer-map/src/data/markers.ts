import type { Marker } from '@/types'

// TODO: 后续替换为真实标点数据
// 当前为示例数据，用于测试功能

export const EXAMPLE_MARKERS: Marker[] = [
  // B1 层 - 里昂和克莱尔共用标点
  {
    id: 'b1-1',
    name: '下水道钥匙',
    category: 'keyItems',
    floor: 'B1',
    position: { x: 0.3, y: 0.4 },
    characters: ['leon', 'claire'],
    difficulty: ['standard', 'expert'],
    description: '打开下水道区域的铁门',
    collectible: true,
  },
  {
    id: 'b1-2',
    name: '存档点',
    category: 'savePoints',
    floor: 'B1',
    position: { x: 0.5, y: 0.5 },
    characters: ['leon', 'claire'],
    difficulty: ['standard', 'expert'],
    description: '游戏存档点',
    collectible: false,
  },
  {
    id: 'b1-3',
    name: '手雷',
    category: 'throwables',
    floor: 'B1',
    position: { x: 0.7, y: 0.3 },
    characters: ['leon', 'claire'],
    difficulty: ['standard', 'expert'],
    description: '强力爆炸物',
    collectible: true,
  },

  // B2 层
  {
    id: 'b2-1',
    name: '万能钥匙',
    category: 'keyItems',
    floor: 'B2',
    position: { x: 0.4, y: 0.6 },
    characters: ['leon', 'claire'],
    difficulty: ['standard', 'expert'],
    description: '可打开多个上锁的门',
    collectible: true,
  },
  {
    id: 'b2-2',
    name: '丧尸狗',
    category: 'enemies',
    floor: 'B2',
    position: { x: 0.6, y: 0.4 },
    characters: ['leon', 'claire'],
    difficulty: ['standard', 'expert'],
    description: '变异的丧尸犬',
    collectible: false,
  },
  {
    id: 'b2-3',
    name: '绿色药草',
    category: 'health',
    floor: 'B2',
    position: { x: 0.2, y: 0.8 },
    characters: ['leon', 'claire'],
    difficulty: ['standard', 'expert'],
    description: '恢复生命值',
    collectible: true,
  },

  // B3 层 - 克莱尔专属
  {
    id: 'b3-1',
    name: '克莱尔的ID卡',
    category: 'keyItems',
    floor: 'B3',
    position: { x: 0.5, y: 0.5 },
    characters: ['claire'],
    difficulty: ['standard', 'expert'],
    description: '用于打开B3层的安保门',
    collectible: true,
  },
  {
    id: 'b3-2',
    name: '手枪弹药',
    category: 'ammo',
    floor: 'B3',
    position: { x: 0.3, y: 0.7 },
    characters: ['claire'],
    difficulty: ['standard', 'expert'],
    description: '9mm手枪弹药',
    collectible: true,
  },

  // 1F 层 - 里昂专属
  {
    id: '1f-1',
    name: '里昂的ID卡',
    category: 'keyItems',
    floor: '1F',
    position: { x: 0.6, y: 0.4 },
    characters: ['leon'],
    difficulty: ['standard', 'expert'],
    description: '用于打开1F层的安保门',
    collectible: true,
  },
  {
    id: '1f-2',
    name: '霰弹枪弹药',
    category: 'ammo',
    floor: '1F',
    position: { x: 0.4, y: 0.6 },
    characters: ['leon'],
    difficulty: ['standard', 'expert'],
    description: '霰弹枪专用弹药',
    collectible: true,
  },

  // 2F 层 - 专家难度专属敌人
  {
    id: '2f-1',
    name: 'G幼体',
    category: 'enemies',
    floor: '2F',
    position: { x: 0.5, y: 0.5 },
    characters: ['leon', 'claire'],
    difficulty: ['expert'],
    description: 'G病毒的幼体形态',
    collectible: false,
  },
  {
    id: '2f-2',
    name: '开关把手',
    category: 'puzzles',
    floor: '2F',
    position: { x: 0.7, y: 0.3 },
    characters: ['leon', 'claire'],
    difficulty: ['standard', 'expert'],
    description: '打开特定门的机关',
    collectible: false,
  },

  // 3F 层
  {
    id: '3f-1',
    name: '铁门',
    category: 'doors',
    floor: '3F',
    position: { x: 0.4, y: 0.5 },
    characters: ['leon', 'claire'],
    difficulty: ['standard', 'expert'],
    description: '需要钥匙才能打开',
    collectible: false,
  },
  {
    id: '3f-2',
    name: '宝石盒',
    category: 'items',
    floor: '3F',
    position: { x: 0.6, y: 0.6 },
    characters: ['leon', 'claire'],
    difficulty: ['standard', 'expert'],
    description: '收集品道具',
    collectible: true,
  },
]

// 获取特定楼层的标点
export function getMarkersByFloor(floor: string): Marker[] {
  return EXAMPLE_MARKERS.filter(m => m.floor === floor)
}

// 获取特定分类的标点
export function getMarkersByCategory(category: string): Marker[] {
  return EXAMPLE_MARKERS.filter(m => m.category === category)
}

// 获取特定角色的标点
export function getMarkersByCharacter(character: 'leon' | 'claire'): Marker[] {
  return EXAMPLE_MARKERS.filter(m => m.characters.includes(character))
}

// 获取特定难度的标点
export function getMarkersByDifficulty(difficulty: 'standard' | 'expert'): Marker[] {
  return EXAMPLE_MARKERS.filter(m => m.difficulty.includes(difficulty))
}
