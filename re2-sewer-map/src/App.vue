<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/store/mapStore'
import MapHeader from '@/components/MapHeader.vue'
import MapFilterSidebar from '@/components/MapFilterSidebar.vue'
import MapToolbar from '@/components/MapToolbar.vue'
import MapContainer from '@/components/MapContainer.vue'
import FilterDrawer from '@/components/drawers/FilterDrawer.vue'
import RouteDrawer from '@/components/drawers/RouteDrawer.vue'
import FloorDrawer from '@/components/drawers/FloorDrawer.vue'

const store = useMapStore()
const { activeDrawer } = storeToRefs(store)

function handleOpenDrawer(type: 'filter' | 'route' | 'floor') {
  store.openDrawer(type)
}

function handleCloseDrawer() {
  store.closeDrawer()
}
</script>

<template>
  <div class="app-container">
    <MapHeader />
    <div class="main-content">
      <MapFilterSidebar />
      <MapContainer />
      <MapToolbar @open-drawer="handleOpenDrawer" />
    </div>

    <!-- 抽屉组件 -->
    <Transition name="drawer">
      <FilterDrawer v-if="activeDrawer === 'filter'" @close="handleCloseDrawer" />
    </Transition>
    <Transition name="drawer">
      <RouteDrawer v-if="activeDrawer === 'route'" @close="handleCloseDrawer" />
    </Transition>
    <Transition name="drawer">
      <FloorDrawer v-if="activeDrawer === 'floor'" @close="handleCloseDrawer" />
    </Transition>
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}
</style>
