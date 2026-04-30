<script setup lang="ts">
// 顶部导航栏组件
</script>

<template>
  <header class="map-header">
    <div class="header-left">
      <!-- 预留返回按钮位置 -->
    </div>
    <h1 class="header-title">SEWER_UNIT_02 | 生化危机 2 下水道互动地图</h1>
    <div class="header-right">
      <!-- 预留设置、历史按钮位置 -->
    </div>
  </header>
</template>

<style scoped>
.map-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.header-left,
.header-right {
  width: 60px;
}

.header-title {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #000000;
  text-align: center;
  white-space: nowrap;
}
</style>
