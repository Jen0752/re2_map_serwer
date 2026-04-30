import type { Floor } from '@/types'
import { MAP_SIZES } from '@/data/constants'

/**
 * 将相对坐标 (0-1) 转换为像素坐标
 */
export function relativeToPixel(
  relativeX: number,
  relativeY: number,
  floor: Floor,
  containerWidth: number,
  containerHeight: number
): { x: number; y: number } {
  const mapSize = MAP_SIZES[floor]

  // 计算图片在容器中的显示尺寸（letterbox 居中）
  const scale = Math.min(
    containerWidth / mapSize.width,
    containerHeight / mapSize.height
  )
  const displayWidth = mapSize.width * scale
  const displayHeight = mapSize.height * scale

  // 计算偏移量（居中）
  const offsetX = (containerWidth - displayWidth) / 2
  const offsetY = (containerHeight - displayHeight) / 2

  // 计算像素位置
  const pixelX = offsetX + relativeX * displayWidth
  const pixelY = offsetY + relativeY * displayHeight

  return { x: pixelX, y: pixelY }
}

/**
 * 将像素坐标转换为相对坐标 (0-1)
 */
export function pixelToRelative(
  pixelX: number,
  pixelY: number,
  floor: Floor,
  containerWidth: number,
  containerHeight: number
): { x: number; y: number } {
  const mapSize = MAP_SIZES[floor]

  const scale = Math.min(
    containerWidth / mapSize.width,
    containerHeight / mapSize.height
  )
  const displayWidth = mapSize.width * scale
  const displayHeight = mapSize.height * scale

  const offsetX = (containerWidth - displayWidth) / 2
  const offsetY = (containerHeight - displayHeight) / 2

  const relativeX = (pixelX - offsetX) / displayWidth
  const relativeY = (pixelY - offsetY) / displayHeight

  return { x: relativeX, y: relativeY }
}

/**
 * 计算地图显示的边界
 */
export function getMapBounds(
  floor: Floor,
  containerWidth: number,
  containerHeight: number
): [[number, number], [number, number]] {
  const mapSize = MAP_SIZES[floor]

  const scale = Math.min(
    containerWidth / mapSize.width,
    containerHeight / mapSize.height
  )
  const displayWidth = mapSize.width * scale
  const displayHeight = mapSize.height * scale

  const offsetX = (containerWidth - displayWidth) / 2
  const offsetY = (containerHeight - displayHeight) / 2

  return [
    [offsetY, offsetX],
    [offsetY + displayHeight, offsetX + displayWidth],
  ]
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false

  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
