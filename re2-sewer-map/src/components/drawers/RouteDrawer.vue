<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/store/mapStore'
import type { Route } from '@/types'

const store = useMapStore()
const { currentFloorRoutes, selectedRoute } = storeToRefs(store)

const emit = defineEmits<{
  (e: 'close'): void
}>()

function handleSelectRoute(route: Route) {
  if (selectedRoute.value?.id === route.id) {
    store.selectRoute(null)
  } else {
    store.selectRoute(route)
  }
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
        <h2 class="drawer-title">路线展示</h2>
        <button class="close-btn" @click="handleClose">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div class="drawer-content">
        <div v-if="currentFloorRoutes.length === 0" class="empty-state">
          <p>当前角色和难度没有可用路线</p>
        </div>
        <div v-else class="route-list">
          <div
            v-for="route in currentFloorRoutes"
            :key="route.id"
            class="route-item"
            :class="{ selected: selectedRoute?.id === route.id }"
            @click="handleSelectRoute(route)"
          >
            <div class="route-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="6" cy="6" r="3" />
                <circle cx="18" cy="18" r="3" />
                <path d="M6 9v6c0 3 6 3 6 0" />
              </svg>
            </div>
            <div class="route-info">
              <span class="route-name">{{ route.name }}</span>
              <span class="route-meta">
                {{ route.segments.length }} 段路径
              </span>
            </div>
            <div v-if="selectedRoute?.id === route.id" class="check-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
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
  height: 70%;
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
  height: calc(100% - 80px);
  overflow-y: auto;
}

.empty-state {
  text-align: center;
  padding: 48px 16px;
  color: #7e7576;
}

.route-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.route-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.route-item:active {
  transform: scale(0.98);
}

.route-item.selected {
  background: #e0f2fe;
  border-color: #0ea5e9;
}

.route-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.route-icon svg {
  width: 32px;
  height: 32px;
}

.route-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.route-name {
  font-size: 14px;
  font-weight: 500;
}

.route-meta {
  font-size: 12px;
  color: #7e7576;
  margin-top: 4px;
}

.check-badge {
  width: 24px;
  height: 24px;
  background: #0ea5e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-badge svg {
  width: 14px;
  height: 14px;
  stroke: #ffffff;
}
</style>
