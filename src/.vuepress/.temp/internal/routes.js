export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/index.html.js"), meta: {"t":"项目主页","i":"home"} }],
  ["/home.html", { loader: () => import(/* webpackChunkName: "home.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/home.html.js"), meta: {"t":"如何刷Java八股文"} }],
  ["/demo/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/demo/index.html.js"), meta: {"t":"主要功能与配置演示","i":"laptop-code"} }],
  ["/demo/disable.html", { loader: () => import(/* webpackChunkName: "disable.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/demo/disable.html.js"), meta: {"t":"布局与功能禁用","i":"gears","O":4} }],
  ["/demo/encrypt.html", { loader: () => import(/* webpackChunkName: "encrypt.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/demo/encrypt.html.js"), meta: {"t":"密码加密的文章","i":"lock"} }],
  ["/demo/layout.html", { loader: () => import(/* webpackChunkName: "layout.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/demo/layout.html.js"), meta: {"t":"布局","i":"object-group","O":2} }],
  ["/demo/markdown.html", { loader: () => import(/* webpackChunkName: "markdown.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/demo/markdown.html.js"), meta: {"t":"Markdown 展示","i":"fab fa-markdown","O":2} }],
  ["/demo/page.html", { loader: () => import(/* webpackChunkName: "page.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/demo/page.html.js"), meta: {"t":"页面配置","i":"file","O":3} }],
  ["/about/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/about/index.html.js"), meta: {"t":"如何刷Java八股文"} }],
  ["/interview/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/interview/index.html.js"), meta: {"t":"如何刷Java八股文"} }],
  ["/mysql/MVCC.html", { loader: () => import(/* webpackChunkName: "MVCC.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/MVCC.html.js"), meta: {"t":""} }],
  ["/mysql/MySQL%E9%93%BE%E8%B7%AF%E8%BF%BD%E8%B8%AA.html", { loader: () => import(/* webpackChunkName: "MySQL链路追踪.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/MySQL链路追踪.html.js"), meta: {"t":""} }],
  ["/mysql/b.html", { loader: () => import(/* webpackChunkName: "b.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/b.html.js"), meta: {"t":"二叉搜索树"} }],
  ["/mysql/backup.html", { loader: () => import(/* webpackChunkName: "backup.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/backup.html.js"), meta: {"t":""} }],
  ["/mysql/create.html", { loader: () => import(/* webpackChunkName: "create.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/create.html.js"), meta: {"t":""} }],
  ["/mysql/dead.html", { loader: () => import(/* webpackChunkName: "dead.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/dead.html.js"), meta: {"t":"死锁现象"} }],
  ["/mysql/engine.html", { loader: () => import(/* webpackChunkName: "engine.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/engine.html.js"), meta: {"t":""} }],
  ["/mysql/expire.html", { loader: () => import(/* webpackChunkName: "expire.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/expire.html.js"), meta: {"t":""} }],
  ["/mysql/explain.html", { loader: () => import(/* webpackChunkName: "explain.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/explain.html.js"), meta: {"t":""} }],
  ["/mysql/framework.html", { loader: () => import(/* webpackChunkName: "framework.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/framework.html.js"), meta: {"t":""} }],
  ["/mysql/lock.html", { loader: () => import(/* webpackChunkName: "lock.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/lock.html.js"), meta: {"t":""} }],
  ["/mysql/log.html", { loader: () => import(/* webpackChunkName: "log.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/log.html.js"), meta: {"t":""} }],
  ["/mysql/online.html", { loader: () => import(/* webpackChunkName: "online.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/online.html.js"), meta: {"t":""} }],
  ["/mysql/optimize.html", { loader: () => import(/* webpackChunkName: "optimize.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/optimize.html.js"), meta: {"t":"排查慢SQL"} }],
  ["/mysql/page.html", { loader: () => import(/* webpackChunkName: "page.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/page.html.js"), meta: {"t":""} }],
  ["/mysql/performance.html", { loader: () => import(/* webpackChunkName: "performance.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/performance.html.js"), meta: {"t":""} }],
  ["/mysql/phantom.html", { loader: () => import(/* webpackChunkName: "phantom.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/phantom.html.js"), meta: {"t":""} }],
  ["/mysql/push.html", { loader: () => import(/* webpackChunkName: "push.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/push.html.js"), meta: {"t":""} }],
  ["/mysql/range.html", { loader: () => import(/* webpackChunkName: "range.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/range.html.js"), meta: {"t":""} }],
  ["/mysql/second.html", { loader: () => import(/* webpackChunkName: "second.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/second.html.js"), meta: {"t":""} }],
  ["/mysql/skip.html", { loader: () => import(/* webpackChunkName: "skip.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/skip.html.js"), meta: {"t":""} }],
  ["/mysql/slow.html", { loader: () => import(/* webpackChunkName: "slow.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/slow.html.js"), meta: {"t":""} }],
  ["/mysql/standard.html", { loader: () => import(/* webpackChunkName: "standard.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/standard.html.js"), meta: {"t":""} }],
  ["/mysql/sync.html", { loader: () => import(/* webpackChunkName: "sync.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/sync.html.js"), meta: {"t":""} }],
  ["/mysql/three.html", { loader: () => import(/* webpackChunkName: "three.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/three.html.js"), meta: {"t":""} }],
  ["/mysql/timeout.html", { loader: () => import(/* webpackChunkName: "timeout.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/timeout.html.js"), meta: {"t":""} }],
  ["/mysql/transaction.html", { loader: () => import(/* webpackChunkName: "transaction.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/transaction.html.js"), meta: {"t":"事务四大特性"} }],
  ["/tool/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/tool/index.html.js"), meta: {"t":"如何刷Java八股文"} }],
  ["/algo/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/algo/index.html.js"), meta: {"t":"如何刷Java八股文"} }],
  ["/guide/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/index.html.js"), meta: {"t":"指南","i":"lightbulb"} }],
  ["/guide/foo/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/foo/index.html.js"), meta: {"t":"Foo 功能","i":"lightbulb"} }],
  ["/guide/foo/ray.html", { loader: () => import(/* webpackChunkName: "ray.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/foo/ray.html.js"), meta: {"t":"Ray","i":"circle-info"} }],
  ["/guide/bar/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/bar/index.html.js"), meta: {"t":"Bar 功能","i":"lightbulb"} }],
  ["/guide/bar/baz.html", { loader: () => import(/* webpackChunkName: "baz.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/bar/baz.html.js"), meta: {"t":"Baz","i":"circle-info"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/404.html.js"), meta: {"t":""} }],
  ["/mysql/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/index.html.js"), meta: {"t":"Mysql"} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
