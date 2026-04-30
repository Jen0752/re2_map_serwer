# 生化危机2 重制版 下水道互动地图

一个移动端优先的互动地图应用，基于 Vue3 + TypeScript 开发。

## 技术栈

- Vue 3 + Composition API
- TypeScript
- Vite
- Pinia（状态管理）
- Tailwind CSS v4
- CSS 变量（支持风格切换）

## 功能特性

- 支持里昂/克莱尔双角色筛选
- 标准/专家难度切换
- 10 个道具分类筛选
- 7 个楼层地图切换（B3, B2, B1, B1', 1F, 2F, 3F）
- 预设路线展示（带动画）
- 标点详情查看
- 标点收集标记
- 离线缓存支持（Service Worker）
- 移动端流畅运行优化

## 运行项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
re2-sewer-map/
├── public/
│   ├── maps/              # 地图底图
│   ├── icons/             # 分类图标 SVG
│   ├── manifest.json      # PWA 配置
│   └── sw.js              # Service Worker
├── src/
│   ├── assets/            # 源代码中的静态资源
│   ├── components/        # Vue 组件
│   │   ├── drawers/       # 抽屉组件
│   │   └── ...
│   ├── data/             # 数据文件
│   │   ├── markers.ts     # 标点数据
│   │   ├── routes.ts      # 路线数据
│   │   └── constants.ts   # 常量配置
│   ├── store/            # Pinia 状态管理
│   ├── types/            # TypeScript 类型定义
│   ├── utils/            # 工具函数
│   ├── App.vue
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 数据修改

### 添加/修改标点

编辑 `src/data/markers.ts` 文件：

```typescript
{
  id: 'unique-id',
  name: '道具名称',
  category: 'puzzles',  // 分类 ID
  floor: 'B1',          // 楼层
  position: { x: 0.5, y: 0.3 },  // 相对坐标 (0-1)
  characters: ['leon', 'claire'],  // 可用角色
  difficulty: ['standard', 'expert'],  // 可用难度
  description: '描述文本',
  collectible: true,  // 是否可标记为已收集
}
```

### 添加/修改路线

编辑 `src/data/routes.ts` 文件：

```typescript
{
  id: 'route-1',
  name: '路线名称',
  character: 'leon',  // 'leon' 或 'claire'
  difficulty: 'standard',  // 'standard' 或 'expert'
  segments: [
    {
      floor: 'B1',  // 路线段所在的楼层
      points: [
        { x: 0.2, y: 0.3 },
        { x: 0.4, y: 0.5 },
        { x: 0.6, y: 0.7 },
      ]
    }
  ]
}
```

### 替换地图底图

将新图片放入 `public/maps/` 目录，文件名对应 `src/data/constants.ts` 中的 `MAP_IMAGES` 配置。

### 替换分类图标

将新的 SVG 图标放入 `public/icons/` 目录，对应分类：
- puzzles.svg - 提示指引
- keyItems.svg - 解密道具
- savePoints.svg - 存档
- doors.svg - 门
- enemies.svg - 敌人
- items.svg - 收集品
- throwables.svg - 投掷物
- ammo.svg - 弹药
- health.svg - 药品

### 添加物品截图

在标点数据的 `image` 字段中指定图片路径，然后将图片放入 `public/` 目录。

## 分类优先级

标点在密集区域简化显示时，按以下优先级保留：

1. 提示指引/机关拼图 (puzzles)
2. 解密道具/钥匙 (keyItems)
3. 存档 (savePoints)
4. 门 (doors)
5. 敌人 (enemies)
6. 收集品 (items)
7. 投掷物 (throwables)
8. 弹药 (ammo)
9. 药品 (health)

## 风格切换

项目使用 CSS 变量管理颜色和样式，风格定义在 `src/style.css` 的 `:root` 中。修改这些变量即可切换整体风格。

## 离线缓存

应用使用 Service Worker 缓存地图图片和图标，支持离线查看。缓存策略：
- 首次访问时缓存所有资源
- 后续访问优先返回缓存，同时后台更新
- 用户可在开发者工具中手动清除缓存

## 浏览器支持

- Chrome 90+
- Safari 14+
- Firefox 88+
- 移动端浏览器（iOS Safari, Android Chrome）

## License

MIT
