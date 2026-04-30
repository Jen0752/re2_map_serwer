/**
 * 性能监控工具
 */

// 帧率监控
class FPSMonitor {
  private frames = 0
  private lastTime = performance.now()
  private fps = 60
  private callback: ((fps: number) => void) | null = null

  start(callback: (fps: number) => void) {
    this.callback = callback
    this.tick()
  }

  private tick = () => {
    this.frames++
    const now = performance.now()
    const delta = now - this.lastTime

    if (delta >= 1000) {
      this.fps = Math.round((this.frames * 1000) / delta)
      this.frames = 0
      this.lastTime = now

      if (this.callback) {
        this.callback(this.fps)
      }
    }

    requestAnimationFrame(this.tick)
  }

  stop() {
    this.callback = null
  }
}

// 全局 FPS 监控实例
let fpsMonitor: FPSMonitor | null = null

/**
 * 开始帧率监控
 */
export function startFPSMonitor(callback: (fps: number) => void) {
  if (!fpsMonitor) {
    fpsMonitor = new FPSMonitor()
  }
  fpsMonitor.start(callback)
}

/**
 * 停止帧率监控
 */
export function stopFPSMonitor() {
  if (fpsMonitor) {
    fpsMonitor.stop()
    fpsMonitor = null
  }
}

/**
 * 请求动画帧控制
 */
export function createAnimationController() {
  let isRunning = false
  let animationId: number | null = null
  let frameCount = 0
  const targetFPS = 60
  const frameInterval = 1000 / targetFPS
  let lastFrameTime = 0

  const tick = (currentTime: number) => {
    if (!isRunning) return

    const delta = currentTime - lastFrameTime

    if (delta >= frameInterval) {
      lastFrameTime = currentTime - (delta % frameInterval)
      frameCount++
    }

    animationId = requestAnimationFrame(tick)
  }

  return {
    start() {
      if (isRunning) return
      isRunning = true
      lastFrameTime = performance.now()
      animationId = requestAnimationFrame(tick)
    },
    stop() {
      isRunning = false
      if (animationId !== null) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
    },
    getFrameCount() {
      return frameCount
    },
    isRunning() {
      return isRunning
    },
  }
}

/**
 * 检测低端设备
 */
export function isLowEndDevice(): boolean {
  // 基于 navigator.hardwareConcurrency 和设备内存判断
  const cores = navigator.hardwareConcurrency || 2
  const memory = (navigator as any).deviceMemory || 4

  return cores <= 2 || memory <= 2
}

/**
 * 获取推荐帧率
 */
export function getRecommendedFPS(): number {
  return isLowEndDevice() ? 30 : 60
}

/**
 * 分帧处理大量数据
 */
export function processInChunks<T, R>(
  items: T[],
  processor: (item: T) => R,
  chunkSize: number,
  onProgress?: (processed: number, total: number) => void
): Promise<R[]> {
  return new Promise(resolve => {
    const results: R[] = []
    let currentIndex = 0

    const processChunk = () => {
      const chunk = items.slice(currentIndex, currentIndex + chunkSize)

      for (const item of chunk) {
        results.push(processor(item))
      }

      currentIndex += chunkSize

      if (onProgress) {
        onProgress(currentIndex, items.length)
      }

      if (currentIndex < items.length) {
        // 让出主线程
        setTimeout(processChunk, 0)
      } else {
        resolve(results)
      }
    }

    processChunk()
  })
}

/**
 * 内存监控
 */
export function createMemoryMonitor() {
  let lastMemory = 0

  const getMemory = (): number | null => {
    if ('memory' in performance && (performance as any).memory) {
      return (performance as any).memory.usedJSHeapSize
    }
    return null
  }

  return {
    getMemory,
    getLastMemory() {
      return lastMemory
    },
    update() {
      lastMemory = getMemory() || 0
    },
    getMemoryIncrease(): number {
      const current = getMemory() || 0
      return current - lastMemory
    },
  }
}
