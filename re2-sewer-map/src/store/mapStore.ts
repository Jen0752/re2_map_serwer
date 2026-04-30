import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Floor,
  Character,
  Difficulty,
  MarkerCategory,
  DrawerType,
  Marker,
  Route,
} from '@/types'
import { EXAMPLE_MARKERS } from '@/data/markers'
import { EXAMPLE_ROUTES } from '@/data/routes'
import { DEFAULT_FILTERS } from '@/data/constants'

export const useMapStore = defineStore('map', () => {
  // 状态
  const currentFloor = ref<Floor>('B1')
  const zoomLevel = ref(1)
  const panPosition = ref({ x: 0, y: 0 })

  const currentCharacter = ref<Character>('leon')
  const currentDifficulty = ref<Difficulty>('standard')

  const selectedCategories = ref<MarkerCategory[]>([...DEFAULT_FILTERS.categories])
  const selectedCharacters = ref<Character[]>([...DEFAULT_FILTERS.characters])
  const selectedDifficulties = ref<Difficulty[]>([...DEFAULT_FILTERS.difficulties])

  const activeDrawer = ref<DrawerType>(null)
  const selectedMarker = ref<Marker | null>(null)
  const showRoutes = ref(false)
  const selectedRoute = ref<Route | null>(null)

  // 已收集标点
  const collectedMarkers = ref<Set<string>>(new Set())

  // 地图实例引用
  const mapInstance = ref<any>(null)

  // 计算属性：过滤后的标点
  const filteredMarkers = computed(() => {
    return EXAMPLE_MARKERS.filter(marker => {
      // 楼层过滤
      if (marker.floor !== currentFloor.value) return false

      // 角色过滤
      if (!selectedCharacters.value.some(c => marker.characters.includes(c))) {
        return false
      }

      // 难度过滤
      if (!selectedDifficulties.value.some(d => marker.difficulty.includes(d))) {
        return false
      }

      // 分类过滤
      if (!selectedCategories.value.includes(marker.category)) {
        return false
      }

      return true
    })
  })

  // 计算属性：当前楼层的路线
  const currentFloorRoutes = computed(() => {
    return EXAMPLE_ROUTES.filter(
      route =>
        route.character === currentCharacter.value &&
        route.difficulty === currentDifficulty.value
    )
  })

  // 计算属性：特定楼层的路线段
  const currentFloorRouteSegments = computed(() => {
    if (!selectedRoute.value) return []
    return selectedRoute.value.segments.filter(s => s.floor === currentFloor.value)
  })

  // 方法：切换楼层
  function setFloor(floor: Floor) {
    currentFloor.value = floor
    // 切换楼层时重置地图位置
    panPosition.value = { x: 0, y: 0 }
    zoomLevel.value = 1
  }

  // 方法：切换角色
  function setCharacter(character: Character) {
    currentCharacter.value = character
  }

  // 方法：切换难度
  function setDifficulty(difficulty: Difficulty) {
    currentDifficulty.value = difficulty
  }

  // 方法：切换分类选中状态
  function toggleCategory(category: MarkerCategory) {
    const index = selectedCategories.value.indexOf(category)
    if (index === -1) {
      selectedCategories.value.push(category)
    } else {
      selectedCategories.value.splice(index, 1)
    }
  }

  // 方法：全选/取消全部分类
  function toggleAllCategories(selectAll: boolean) {
    if (selectAll) {
      selectedCategories.value = [...DEFAULT_FILTERS.categories]
    } else {
      selectedCategories.value = []
    }
  }

  // 方法：检查分类是否被选中
  function isCategorySelected(category: MarkerCategory): boolean {
    return selectedCategories.value.includes(category)
  }

  // 方法：打开抽屉
  function openDrawer(drawer: DrawerType) {
    activeDrawer.value = drawer
  }

  // 方法：关闭抽屉
  function closeDrawer() {
    activeDrawer.value = null
  }

  // 方法：选择标点
  function selectMarker(marker: Marker | null) {
    selectedMarker.value = marker
  }

  // 方法：标记标点为已收集
  function collectMarker(markerId: string) {
    collectedMarkers.value.add(markerId)
    saveCollectedMarkers()
  }

  // 方法：取消标记已收集
  function uncollectMarker(markerId: string) {
    collectedMarkers.value.delete(markerId)
    saveCollectedMarkers()
  }

  // 方法：检查标点是否已收集
  function isMarkerCollected(markerId: string): boolean {
    return collectedMarkers.value.has(markerId)
  }

  // 方法：切换路线显示
  function toggleRoutes() {
    showRoutes.value = !showRoutes.value
    if (!showRoutes.value) {
      selectedRoute.value = null
    }
  }

  // 方法：选择路线
  function selectRoute(route: Route | null) {
    selectedRoute.value = route
  }

  // 方法：设置地图实例
  function setMapInstance(map: any) {
    mapInstance.value = map
  }

  // 方法：缩放地图
  function zoomIn() {
    zoomLevel.value = Math.min(zoomLevel.value + 0.25, 3)
  }

  function zoomOut() {
    zoomLevel.value = Math.max(zoomLevel.value - 0.25, 0.5)
  }

  // 本地存储：保存已收集标点
  function saveCollectedMarkers() {
    localStorage.setItem(
      're2-sewer-collected',
      JSON.stringify([...collectedMarkers.value])
    )
  }

  // 本地存储：加载已收集标点
  function loadCollectedMarkers() {
    const saved = localStorage.getItem('re2-sewer-collected')
    if (saved) {
      collectedMarkers.value = new Set(JSON.parse(saved))
    }
  }

  // 本地存储：保存用户偏好
  function savePreferences() {
    localStorage.setItem(
      're2-sewer-preferences',
      JSON.stringify({
        character: currentCharacter.value,
        difficulty: currentDifficulty.value,
        categories: selectedCategories.value,
      })
    )
  }

  // 本地存储：加载用户偏好
  function loadPreferences() {
    const saved = localStorage.getItem('re2-sewer-preferences')
    if (saved) {
      const prefs = JSON.parse(saved)
      currentCharacter.value = prefs.character
      currentDifficulty.value = prefs.difficulty
      selectedCategories.value = prefs.categories
    }
  }

  // 方法：一键重置
  function resetAll() {
    currentFloor.value = 'B1'
    zoomLevel.value = 1
    panPosition.value = { x: 0, y: 0 }
    currentCharacter.value = 'leon'
    currentDifficulty.value = 'standard'
    selectedCategories.value = [...DEFAULT_FILTERS.categories]
    selectedCharacters.value = [...DEFAULT_FILTERS.characters]
    selectedDifficulties.value = [...DEFAULT_FILTERS.difficulties]
    activeDrawer.value = null
    selectedMarker.value = null
    showRoutes.value = false
    selectedRoute.value = null
    collectedMarkers.value = new Set()

    localStorage.removeItem('re2-sewer-collected')
    localStorage.removeItem('re2-sewer-preferences')
  }

  // 初始化
  loadCollectedMarkers()
  loadPreferences()

  return {
    // 状态
    currentFloor,
    zoomLevel,
    panPosition,
    currentCharacter,
    currentDifficulty,
    selectedCategories,
    selectedCharacters,
    selectedDifficulties,
    activeDrawer,
    selectedMarker,
    showRoutes,
    selectedRoute,
    collectedMarkers,
    mapInstance,

    // 计算属性
    filteredMarkers,
    currentFloorRoutes,
    currentFloorRouteSegments,

    // 方法
    setFloor,
    setCharacter,
    setDifficulty,
    toggleCategory,
    toggleAllCategories,
    isCategorySelected,
    openDrawer,
    closeDrawer,
    selectMarker,
    collectMarker,
    uncollectMarker,
    isMarkerCollected,
    toggleRoutes,
    selectRoute,
    setMapInstance,
    zoomIn,
    zoomOut,
    savePreferences,
    loadPreferences,
    resetAll,
  }
})
