<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/store/mapStore'
import { MAP_IMAGES, MAP_SIZES, MARKER_CONFIG, ZOOM_CONFIG } from '@/data/constants'
import { relativeToPixel } from '@/utils/coordinate'
import type { Marker } from '@/types'

const store = useMapStore()
const {
  currentFloor,
  zoomLevel,
  filteredMarkers,
  selectedMarker,
  showRoutes,
  selectedRoute,
  currentFloorRouteSegments,
  collectedMarkers,
} = storeToRefs(store)

const mapContainer = ref<HTMLDivElement | null>(null)
const mapImage = ref<HTMLImageElement | null>(null)
const markersLayer = ref<HTMLDivElement | null>(null)
const routesLayer = ref<HTMLDivElement | null>(null)

const containerSize = ref({ width: 0, height: 0 })

// 计算当前地图的显示尺寸
const mapDisplaySize = computed(() => {
  const size = MAP_SIZES[currentFloor.value]
  const scale = Math.min(
    containerSize.value.width / size.width,
    containerSize.value.height / size.height
  )
  return {
    width: size.width * scale,
    height: size.height * scale,
  }
})

// 计算地图偏移量（居中）
const mapOffset = computed(() => ({
  x: (containerSize.value.width - mapDisplaySize.value.width) / 2,
  y: (containerSize.value.height - mapDisplaySize.value.height) / 2,
}))

// 过滤后的标点位置计算
const markerPositions = computed(() => {
  return filteredMarkers.value.map(marker => {
    const pos = relativeToPixel(
      marker.position.x,
      marker.position.y,
      currentFloor.value,
      containerSize.value.width,
      containerSize.value.height
    )
    return {
      ...marker,
      pixelPos: pos,
      isCollected: collectedMarkers.value.has(marker.id),
    }
  })
})

// 路线段
const routePolylines = computed(() => {
  return currentFloorRouteSegments.value.map(segment => {
    const points = segment.points.map(p => {
      return relativeToPixel(
        p.x,
        p.y,
        currentFloor.value,
        containerSize.value.width,
        containerSize.value.height
      )
    })
    return points
  })
})

function handleMarkerClick(marker: Marker) {
  store.selectMarker(marker)
}

function handleMarkerLongPress(marker: Marker) {
  if (marker.collectible) {
    if (store.isMarkerCollected(marker.id)) {
      store.uncollectMarker(marker.id)
    } else {
      store.collectMarker(marker.id)
    }
  }
}

function handleMapClick(e: MouseEvent) {
  // 如果点击的是地图空白处，关闭详情弹窗
  if ((e.target as HTMLElement).classList.contains('map-image')) {
    store.selectMarker(null)
  }
}

function updateContainerSize() {
  if (mapContainer.value) {
    containerSize.value = {
      width: mapContainer.value.clientWidth,
      height: mapContainer.value.clientHeight,
    }
  }
}

onMounted(() => {
  updateContainerSize()
  window.addEventListener('resize', updateContainerSize)
})

// 监听楼层变化，重置视图
watch(currentFloor, () => {
  store.zoomLevel = 1
})
</script>

<template>
  <div
    ref="mapContainer"
    class="map-container"
    @click="handleMapClick"
  >
    <!-- 地图背景层 -->
    <div
      class="map-image"
      :style="{
        backgroundImage: `url(${MAP_IMAGES[currentFloor]})`,
        backgroundSize: `${mapDisplaySize.width}px ${mapDisplaySize.height}px`,
        backgroundPosition: `${mapOffset.x}px ${mapOffset.y}px`,
        backgroundRepeat: 'no-repeat',
      }"
    ></div>

    <!-- 路线层 -->
    <svg
      v-if="showRoutes && selectedRoute"
      ref="routesLayer"
      class="routes-layer"
      :style="{ width: `${containerSize.width}px`, height: `${containerSize.height}px` }"
    >
      <polyline
        v-for="(points, idx) in routePolylines"
        :key="idx"
        :points="points.map(p => `${p.x},${p.y}`).join(' ')"
        fill="none"
        stroke="#0ea5e9"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="route-line"
      />
    </svg>

    <!-- 标点层 -->
    <div
      ref="markersLayer"
      class="markers-layer"
      :style="{ width: `${containerSize.width}px`, height: `${containerSize.height}px` }"
    >
      <div
        v-for="marker in markerPositions"
        :key="marker.id"
        class="marker"
        :class="{
          selected: selectedMarker?.id === marker.id,
          collected: marker.isCollected,
        }"
        :style="{
          left: `${marker.pixelPos.x - MARKER_CONFIG.size / 2}px`,
          top: `${marker.pixelPos.y - MARKER_CONFIG.size / 2}px`,
          width: `${MARKER_CONFIG.size}px`,
          height: `${MARKER_CONFIG.size}px`,
        }"
        @click.stop="handleMarkerClick(marker)"
        @contextmenu.prevent="handleMarkerLongPress(marker)"
      >
        <img :src="`/icons/${marker.category}.svg`" :alt="marker.name" />
        <span class="marker-name">{{ marker.name }}</span>
        <div v-if="marker.isCollected" class="collected-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    </div>

    <!-- 标点详情弹窗 -->
    <Transition name="popup">
      <div
        v-if="selectedMarker"
        class="marker-popup"
        @click.stop
      >
        <div class="popup-header">
          <span class="popup-category">{{ selectedMarker.category }}</span>
          <button class="popup-close" @click="store.selectMarker(null)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div class="popup-content">
          <h3 class="popup-title">{{ selectedMarker.name }}</h3>
          <div class="popup-image">
            <img v-if="selectedMarker.image" :src="selectedMarker.image" :alt="selectedMarker.name" />
            <div v-else class="popup-image-placeholder">
              <span>{{ selectedMarker.name }}</span>
            </div>
          </div>
          <p class="popup-description">{{ selectedMarker.description || '暂无描述' }}</p>
          <div v-if="selectedMarker.collectible" class="popup-actions">
            <button
              class="collect-btn"
              :class="{ collected: store.isMarkerCollected(selectedMarker.id) }"
              @click="handleMarkerLongPress(selectedMarker)"
            >
              {{ store.isMarkerCollected(selectedMarker.id) ? '已收集' : '标记为已收集' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.map-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #f9f9f9;
}

.map-image {
  position: absolute;
  inset: 0;
}

.routes-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.route-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw-route 2s ease-out forwards;
}

@keyframes draw-route {
  to {
    stroke-dashoffset: 0;
  }
}

.markers-layer {
  position: absolute;
  inset: 0;
}

.marker {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #000000;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  animation: marker-breathe 2s ease-in-out infinite;
}

.marker:hover {
  transform: scale(1.1);
  z-index: 10;
}

.marker.selected {
  background: #e0f2fe;
  border-color: #0ea5e9;
  z-index: 20;
}

.marker.collected {
  opacity: 0.5;
  animation: none;
}

.marker img {
  width: 28px;
  height: 28px;
}

.marker-name {
  font-size: 10px;
  margin-top: 2px;
  text-align: center;
  max-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.collected-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  background: #0ea5e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collected-badge svg {
  width: 10px;
  height: 10px;
  stroke: #ffffff;
}

.marker-popup {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.popup-enter-active {
  animation: fade-scale 200ms ease-out;
}

.popup-leave-active {
  animation: fade-scale 200ms ease-out reverse;
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-left: 3px solid #dc2626;
  background: #f9f9f9;
}

.popup-category {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #0ea5e9;
  background: #e0f2fe;
  padding: 4px 8px;
  border-radius: 4px;
}

.popup-close {
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-close svg {
  width: 20px;
  height: 20px;
}

.popup-content {
  padding: 16px;
}

.popup-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px;
}

.popup-image {
  width: 100%;
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;
}

.popup-image img {
  width: 100%;
  height: auto;
}

.popup-image-placeholder {
  width: 100%;
  height: 150px;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7e7576;
  font-size: 14px;
}

.popup-description {
  font-size: 14px;
  line-height: 1.6;
  color: #000000;
}

.popup-actions {
  margin-top: 16px;
}

.collect-btn {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.collect-btn:active {
  transform: scale(0.95);
}

.collect-btn.collected {
  background: #e0f2fe;
  border-color: #0ea5e9;
  color: #0ea5e9;
}
</style>
