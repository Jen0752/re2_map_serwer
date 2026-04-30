// Service Worker for RE2 Sewer Map
const CACHE_NAME = 're2-sewer-map-v1'

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/maps/re2_sewer_1F.png',
  '/maps/re2_sewer_2F.png',
  '/maps/re2_sewer_3F.png',
  '/maps/re2_sewer_B1.png',
  '/maps/re2_sewer_B1_.png',
  '/maps/re2_sewer_B2.png',
  '/maps/re2_sewer_B3.png',
  '/icons/puzzles.svg',
  '/icons/keyItems.svg',
  '/icons/savePoints.svg',
  '/icons/doors.svg',
  '/icons/enemies.svg',
  '/icons/items.svg',
  '/icons/throwables.svg',
  '/icons/ammo.svg',
  '/icons/health.svg',
]

// 安装事件 - 缓存资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE)
    })
  )
  self.skipWaiting()
})

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

// 请求拦截 - 缓存优先
self.addEventListener('fetch', (event) => {
  // 只处理同源请求
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // 返回缓存并同时更新缓存（后台更新）
        event.waitUntil(
          fetch(event.request).then((response) => {
            if (response && response.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, response)
              })
            }
          }).catch(() => {})
        )
        return cachedResponse
      }

      // 没有缓存，尝试网络请求
      return fetch(event.request).then((response) => {
        // 如果请求成功，缓存响应
        if (response && response.status === 200) {
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })
        }
        return response
      }).catch(() => {
        // 网络请求失败且没有缓存，返回离线页面
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable'
        })
      })
    })
  )
})
