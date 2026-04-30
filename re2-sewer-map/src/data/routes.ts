import type { Route } from '@/types'

// TODO: 后续替换为真实路线数据
// 当前为示例数据，用于测试功能

export const EXAMPLE_ROUTES: Route[] = [
  {
    id: 'route-leon-standard',
    name: '里昂 标准难度路线',
    character: 'leon',
    difficulty: 'standard',
    segments: [
      {
        floor: 'B1',
        points: [
          { x: 0.2, y: 0.3 },
          { x: 0.3, y: 0.4 },
          { x: 0.5, y: 0.5 },
          { x: 0.7, y: 0.6 },
        ],
      },
      {
        floor: 'B2',
        points: [
          { x: 0.7, y: 0.6 },
          { x: 0.6, y: 0.7 },
          { x: 0.5, y: 0.8 },
        ],
      },
    ],
  },
  {
    id: 'route-claire-standard',
    name: '克莱尔 标准难度路线',
    character: 'claire',
    difficulty: 'standard',
    segments: [
      {
        floor: 'B1',
        points: [
          { x: 0.3, y: 0.4 },
          { x: 0.4, y: 0.5 },
          { x: 0.5, y: 0.5 },
        ],
      },
      {
        floor: 'B3',
        points: [
          { x: 0.5, y: 0.5 },
          { x: 0.6, y: 0.6 },
          { x: 0.7, y: 0.7 },
        ],
      },
    ],
  },
  {
    id: 'route-leon-expert',
    name: '里昂 专家难度路线',
    character: 'leon',
    difficulty: 'expert',
    segments: [
      {
        floor: 'B1',
        points: [
          { x: 0.2, y: 0.2 },
          { x: 0.3, y: 0.3 },
          { x: 0.4, y: 0.4 },
          { x: 0.6, y: 0.5 },
          { x: 0.8, y: 0.7 },
        ],
      },
    ],
  },
]

// 获取特定角色的路线
export function getRoutesByCharacter(character: 'leon' | 'claire'): Route[] {
  return EXAMPLE_ROUTES.filter(r => r.character === character)
}

// 获取特定难度的路线
export function getRoutesByDifficulty(difficulty: 'standard' | 'expert'): Route[] {
  return EXAMPLE_ROUTES.filter(r => r.difficulty === difficulty)
}

// 获取特定角色和难度的路线
export function getRoutesByCharacterAndDifficulty(
  character: 'leon' | 'claire',
  difficulty: 'standard' | 'expert'
): Route[] {
  return EXAMPLE_ROUTES.filter(
    r => r.character === character && r.difficulty === difficulty
  )
}
