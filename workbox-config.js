module.exports = {
  globDirectory: "public/",
  globPatterns: ["**/*.{png,html,js,css}"],
  swDest: "public/sw.js",
  runtimeCaching: [
    {
      urlPattern:
        "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
      handler: "CacheFirst",
    },
    {
      urlPattern: "https://cdn.jsdelivr.net/npm/chart.js@2.8.0",
      handler: "CacheFirst",
    },
    {
      urlPattern: "https://unpkg.com/dexie@latest/dist/dexie.js",
      handler: "CacheFirst",
    },
    {
      urlPattern: /api/,
      handler: "StaleWhileRevalidate",
    },
  ],
};
