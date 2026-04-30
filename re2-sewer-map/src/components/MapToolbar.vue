<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/store/mapStore'

const store = useMapStore()
const {
  currentDifficulty,
  currentCharacter,
  showRoutes,
  activeDrawer,
  currentFloor,
} = storeToRefs(store)

const emit = defineEmits<{
  (e: 'openDrawer', type: 'filter' | 'route' | 'floor'): void
}>()

const buttons = computed(() => [
  {
    id: 'filter',
    icon: 'filter',
    label: '筛选',
    active: activeDrawer.value === 'filter',
    action: () => emit('openDrawer', 'filter'),
  },
  {
    id: 'mode',
    icon: currentDifficulty.value === 'standard' ? 'shield' : 'star',
    label: currentDifficulty.value === 'standard' ? '标准模式' : '专家模式',
    active: false,
    action: () => store.setDifficulty(currentDifficulty.value === 'standard' ? 'expert' : 'standard'),
  },
  {
    id: 'route',
    icon: 'route',
    label: '路线',
    active: showRoutes.value,
    action: () => store.toggleRoutes(),
  },
  {
    id: 'character',
    icon: currentCharacter.value === 'leon' ? 'leon' : 'claire',
    label: currentCharacter.value === 'leon' ? '里昂' : '克莱尔',
    active: false,
    action: () => store.setCharacter(currentCharacter.value === 'leon' ? 'claire' : 'leon'),
  },
  {
    id: 'zoomIn',
    icon: 'plus',
    label: '放大',
    active: false,
    action: () => store.zoomIn(),
  },
  {
    id: 'zoomOut',
    icon: 'minus',
    label: '缩小',
    active: false,
    action: () => store.zoomOut(),
  },
  {
    id: 'floor',
    icon: 'floor',
    label: currentFloor.value,
    active: activeDrawer.value === 'floor',
    action: () => emit('openDrawer', 'floor'),
  },
])

function handleClick(action: () => void) {
  action()
}
</script>

<template>
  <div class="map-toolbar">
    <button
      v-for="btn in buttons"
      :key="btn.id"
      class="toolbar-btn"
      :class="{ active: btn.active }"
      :title="btn.label"
      @click="handleClick(btn.action)"
    >
      <!-- 筛选图标 -->
      <svg v-if="btn.icon === 'filter'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
      </svg>

      <!-- 盾牌图标 -->
      <svg v-else-if="btn.icon === 'shield'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>

      <!-- 星星图标 -->
      <svg v-else-if="btn.icon === 'star'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>

      <!-- 路线图标 -->
      <svg v-else-if="btn.icon === 'route'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M6 9v6c0 3 6 3 6 0" />
      </svg>

      <!-- 里昂图标 -->
      <svg v-else-if="btn.icon === 'leon'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      </svg>

      <!-- 克莱尔图标 -->
      <svg v-else-if="btn.icon === 'claire'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20c0-4 3-6 6-6s6 2 6 6" />
        <path d="M8 6c0-2 2-4 4-4s4 2 4 4" />
      </svg>

      <!-- 加号图标 -->
      <svg v-else-if="btn.icon === 'plus'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>

      <!-- 减号图标 -->
      <svg v-else-if="btn.icon === 'minus'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>

      <!-- 楼层图标 -->
      <svg v-else-if="btn.icon === 'floor'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>

      <span class="btn-label">{{ btn.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.map-toolbar {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1000;
}

.toolbar-btn {
  width: 56px;
  height: 56px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.toolbar-btn:active {
  transform: scale(0.95);
}

.toolbar-btn.active {
  background: #e0f2fe;
  border-color: #0ea5e9;
}

.toolbar-btn.active svg {
  stroke: #0ea5e9;
}

.toolbar-btn svg {
  width: 24px;
  height: 24px;
}

.btn-label {
  font-size: 10px;
  margin-top: 2px;
}
</style>
