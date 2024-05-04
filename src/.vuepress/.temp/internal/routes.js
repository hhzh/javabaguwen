export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/index.html.js"), meta: {"t":"项目主页","i":"home"} }],
  ["/home.html", { loader: () => import(/* webpackChunkName: "home.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/home.html.js"), meta: {"t":"如何刷Java八股文"} }],
  ["/about/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/about/index.html.js"), meta: {"t":"如何刷Java八股文"} }],
  ["/algo/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/algo/index.html.js"), meta: {"t":"如何刷Java八股文"} }],
  ["/guide/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/index.html.js"), meta: {"t":"指南","i":"lightbulb"} }],
  ["/demo/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/demo/index.html.js"), meta: {"t":"主要功能与配置演示","i":"laptop-code"} }],
  ["/demo/disable.html", { loader: () => import(/* webpackChunkName: "disable.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/demo/disable.html.js"), meta: {"t":"布局与功能禁用","i":"gears","O":4} }],
  ["/demo/encrypt.html", { loader: () => import(/* webpackChunkName: "encrypt.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/demo/encrypt.html.js"), meta: {"t":"密码加密的文章","i":"lock"} }],
  ["/demo/layout.html", { loader: () => import(/* webpackChunkName: "layout.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/demo/layout.html.js"), meta: {"t":"布局","i":"object-group","O":2} }],
  ["/demo/markdown.html", { loader: () => import(/* webpackChunkName: "markdown.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/demo/markdown.html.js"), meta: {"t":"Markdown 展示","i":"fab fa-markdown","O":2} }],
  ["/demo/page.html", { loader: () => import(/* webpackChunkName: "page.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/demo/page.html.js"), meta: {"t":"页面配置","i":"file","O":3} }],
  ["/interview/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/interview/index.html.js"), meta: {"t":"如何刷Java八股文"} }],
  ["/mysql/b.html", { loader: () => import(/* webpackChunkName: "b.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/b.html.js"), meta: {"t":"二叉搜索树"} }],
  ["/mysql/framework.html", { loader: () => import(/* webpackChunkName: "framework.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/framework.html.js"), meta: {"t":""} }],
  ["/tool/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/tool/index.html.js"), meta: {"t":"如何刷Java八股文"} }],
  ["/guide/bar/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/bar/index.html.js"), meta: {"t":"Bar 功能","i":"lightbulb"} }],
  ["/guide/bar/baz.html", { loader: () => import(/* webpackChunkName: "baz.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/bar/baz.html.js"), meta: {"t":"Baz","i":"circle-info"} }],
  ["/guide/foo/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/foo/index.html.js"), meta: {"t":"Foo 功能","i":"lightbulb"} }],
  ["/guide/foo/ray.html", { loader: () => import(/* webpackChunkName: "ray.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/foo/ray.html.js"), meta: {"t":"Ray","i":"circle-info"} }],
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
