<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/store/mapStore'
import { CATEGORIES } from '@/data/constants'
import type { MarkerCategory } from '@/types'

const store = useMapStore()
const { selectedCategories } = storeToRefs(store)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const expandedCategories = computed(() => {
  return CATEGORIES.map(cat => ({
    ...cat,
    isSelected: store.isCategorySelected(cat.id),
  }))
})

const isAllSelected = computed(() => {
  return selectedCategories.value.length === CATEGORIES.length
})

function handleToggle(category: MarkerCategory) {
  store.toggleCategory(category)
}

function handleToggleAll() {
  store.toggleAllCategories(!isAllSelected.value)
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
        <h2 class="drawer-title">筛选标点</h2>
        <button class="close-btn" @click="handleClose">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div class="drawer-content">
        <div class="action-row">
          <button
            class="action-btn"
            :class="{ active: isAllSelected }"
            @click="handleToggleAll"
          >
            {{ isAllSelected ? '清除全部' : '全选' }}
          </button>
        </div>

        <div class="category-grid">
          <div
            v-for="category in CATEGORIES"
            :key="category.id"
            class="category-item"
            :class="{ selected: store.isCategorySelected(category.id) }"
            @click="handleToggle(category.id)"
          >
            <div class="category-icon">
              <img :src="`/icons/${category.id}.svg`" :alt="category.name" />
            </div>
            <span class="category-name">{{ category.name }}</span>
            <div v-if="store.isCategorySelected(category.id)" class="check-badge">
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

.action-row {
  margin-bottom: 16px;
}

.action-btn {
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.action-btn:active {
  transform: scale(0.95);
}

.action-btn.active {
  background: #e0f2fe;
  border-color: #0ea5e9;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.category-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.category-item:active {
  transform: scale(0.95);
}

.category-item.selected {
  background: #e0f2fe;
  border-color: #0ea5e9;
}

.category-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.category-icon img {
  width: 32px;
  height: 32px;
}

.category-name {
  font-size: 12px;
  text-align: center;
}

.check-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: #0ea5e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-badge svg {
  width: 12px;
  height: 12px;
  stroke: #ffffff;
}
</style>
