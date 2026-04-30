<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/store/mapStore'
import { CATEGORIES } from '@/data/constants'
import type { MarkerCategory } from '@/types'

const store = useMapStore()
const { selectedCategories } = storeToRefs(store)

const emit = defineEmits<{
  (e: 'toggle', category: MarkerCategory): void
  (e: 'toggleAll', selectAll: boolean): void
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

const isNoneSelected = computed(() => {
  return selectedCategories.value.length === 0
})

function handleToggle(category: MarkerCategory) {
  store.toggleCategory(category)
}

function handleToggleAll() {
  store.toggleAllCategories(!isAllSelected.value)
}
</script>

<template>
  <aside class="filter-sidebar">
    <div class="sidebar-header">
      <h2 class="sidebar-title">MAP_FILTERS</h2>
      <span class="sidebar-subtitle">道具筛选</span>
    </div>

    <div class="sidebar-actions">
      <button
        class="action-btn"
        :class="{ active: isAllSelected }"
        @click="handleToggleAll"
      >
        {{ isAllSelected ? '清除全部' : '全选' }}
      </button>
    </div>

    <div class="category-list">
      <div
        v-for="category in CATEGORIES"
        :key="category.id"
        class="category-item"
        :class="{ selected: store.isCategorySelected(category.id) }"
        @click="handleToggle(category.id)"
      >
        <div class="category-checkbox">
          <svg
            v-if="store.isCategorySelected(category.id)"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div class="category-icon">
          <img :src="`/icons/${category.id}.svg`" :alt="category.name" />
        </div>
        <span class="category-name">{{ category.name }}</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.filter-sidebar {
  width: 200px;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: auto;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.sidebar-title {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin: 0;
}

.sidebar-subtitle {
  font-size: 11px;
  color: #7e7576;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.sidebar-actions {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.action-btn {
  width: 100%;
  padding: 8px 12px;
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

.category-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.category-item {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.category-item:hover {
  background: #f9f9f9;
}

.category-item.selected {
  background: #e0f2fe;
}

.category-checkbox {
  width: 20px;
  height: 20px;
  border: 1px solid #000000;
  border-radius: 4px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-item.selected .category-checkbox {
  background: #0ea5e9;
  border-color: #0ea5e9;
  color: #ffffff;
}

.category-checkbox svg {
  width: 14px;
  height: 14px;
}

.category-icon {
  width: 32px;
  height: 32px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-icon img {
  width: 24px;
  height: 24px;
}

.category-name {
  font-size: 14px;
  flex: 1;
}
</style>
