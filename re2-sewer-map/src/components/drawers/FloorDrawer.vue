<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/store/mapStore'
import { FLOORS, FLOOR_ORDER } from '@/data/constants'
import type { Floor } from '@/types'

const store = useMapStore()
const { currentFloor } = storeToRefs(store)

const emit = defineEmits<{
  (e: 'close'): void
}>()

// 按楼层顺序排序
const sortedFloors = computed(() => {
  return [...FLOORS].sort((a, b) => FLOOR_ORDER[a] - FLOOR_ORDER[b])
})

function handleSelectFloor(floor: Floor) {
  store.setFloor(floor)
  emit('close')
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <div class="drawer-overlay" @click="handleClose">
    <div class="drawer" @click.stop>
      <div class="drawer-handle"></div>
      <div class="drawer-header">
        <h2 class="drawer-title">选择楼层</h2>
        <button class="close-btn" @click="handleClose">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div class="drawer-content">
        <div class="floor-grid">
          <button
            v-for="floor in sortedFloors"
            :key="floor"
            class="floor-item"
            :class="{ selected: currentFloor === floor }"
            @click="handleSelectFloor(floor)"
          >
            <span class="floor-name">{{ floor }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
}

.drawer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: auto;
  max-height: 80%;
  background: #ffffff;
  border-radius: 16px 16px 0 0;
  animation: slide-up 300ms ease-out;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.drawer-handle {
  width: 40px;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  margin: 12px auto;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.drawer-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn svg {
  width: 20px;
  height: 20px;
}

.drawer-content {
  padding: 16px;
  overflow-y: auto;
}

.floor-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.floor-item {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.floor-item:active {
  transform: scale(0.95);
}

.floor-item.selected {
  background: #e0f2fe;
  border-color: #0ea5e9;
}

.floor-name {
  font-size: 16px;
  font-weight: 700;
}

.floor-item.selected .floor-name {
  color: #0ea5e9;
}
</style>
