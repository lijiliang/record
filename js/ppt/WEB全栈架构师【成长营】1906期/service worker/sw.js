// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js');

importScripts('https://g.alicdn.com/kg/workbox/3.3.0/workbox-sw.js');

// workbox.precaching([
//   // 注册成功后要立即缓存的资源列表
// ])

if(workbox) {
  console.log(`Yay! workbox is loaded 🎉`);

  workbox.setConfig({
    debug: false,
    modulePathPrefix: 'https://g.alicdn.com/kg/workbox/3.3.0/'
  });
  workbox.skipWaiting();
  workbox.clientsClaim();

  // HTML，如果你想让页面离线可以访问，使用 NetworkFirst，如果不需要离线访问，使用 NetworkOnly，其他策略均不建议对 HTML 使用。
  workbox.routing.registerRoute(
    new RegExp('.*\.html'),
    new workbox.strategies.NetworkFirst()
  );

  // 如果你的 CSS, JS 与站点在同一个域下，并且文件名中带了hash版本号，那可以直接使用 Cache First 策略
  workbox.routing.registerRoute(
    new RegExp('.*\.(?:js|css)'),
    new workbox.strategies.CacheFirst({
      cacheName: 'kyani:static',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60, // 最大的缓存数，超过之后则走 URL 策略清除最老最少使用缓存
          maxAgeSeconds: 60, // 这只最长缓存时间为 60s
        })
      ]
    })
  );

  // 图片建议使用 Cache First,并设置一定的失效时间，请求一次就不会再变动了
  workbox.routing.registerRoute(
      /.*\.(?:png|jpg|jpeg|svg|gif)/g,
      new workbox.strategies.CacheFirst({
        cacheName: 'kyani:img',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60, // 最大的缓存数，超过之后则走 URL 策略清除最老最少使用缓存
            maxAgeSeconds: 60, // 这只最长缓存时间为 60s
          })
        ]
      })
  );

  // 缓存第三方请求的结果
  workbox.routing.registerRoute(
    new RegExp('http://images\.kyani\.cn/'),
    new workbox.strategies.CacheFirst({
      cacheName: 'kyani:images',
      plugins: [
        // 这个插件是让匹配的请求的符合开发者指定的条件的返回结果可以被缓存
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 60, // 最大缓存数
          maxAgeSeconds: 12 * 60 * 60
        })
      ]
    })
  );
} else {
  console.log(`Boo! workbox didn't load 😬`);
}

