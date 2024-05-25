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
  ["/guide/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/index.html.js"), meta: {"t":"指南","i":"lightbulb"} }],
  ["/concurrency/AQS.html", { loader: () => import(/* webpackChunkName: "AQS.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/concurrency/AQS.html.js"), meta: {"t":""} }],
  ["/concurrency/AtomicInteger.html", { loader: () => import(/* webpackChunkName: "AtomicInteger.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/concurrency/AtomicInteger.html.js"), meta: {"t":""} }],
  ["/concurrency/CountDownLatch.html", { loader: () => import(/* webpackChunkName: "CountDownLatch.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/concurrency/CountDownLatch.html.js"), meta: {"t":""} }],
  ["/concurrency/CyclicBarrier.html", { loader: () => import(/* webpackChunkName: "CyclicBarrier.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/concurrency/CyclicBarrier.html.js"), meta: {"t":""} }],
  ["/concurrency/ReentrantLock.html", { loader: () => import(/* webpackChunkName: "ReentrantLock.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/concurrency/ReentrantLock.html.js"), meta: {"t":""} }],
  ["/concurrency/Semaphore.html", { loader: () => import(/* webpackChunkName: "Semaphore.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/concurrency/Semaphore.html.js"), meta: {"t":""} }],
  ["/concurrency/Synchronized.html", { loader: () => import(/* webpackChunkName: "Synchronized.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/concurrency/Synchronized.html.js"), meta: {"t":""} }],
  ["/concurrency/Thread.html", { loader: () => import(/* webpackChunkName: "Thread.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/concurrency/Thread.html.js"), meta: {"t":""} }],
  ["/concurrency/ThreadLocal.html", { loader: () => import(/* webpackChunkName: "ThreadLocal.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/concurrency/ThreadLocal.html.js"), meta: {"t":""} }],
  ["/concurrency/ThreadPool.html", { loader: () => import(/* webpackChunkName: "ThreadPool.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/concurrency/ThreadPool.html.js"), meta: {"t":""} }],
  ["/concurrency/volatile.html", { loader: () => import(/* webpackChunkName: "volatile.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/concurrency/volatile.html.js"), meta: {"t":""} }],
  ["/interview/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/interview/index.html.js"), meta: {"t":"如何刷Java八股文"} }],
  ["/about/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/about/index.html.js"), meta: {"t":"如何刷Java八股文"} }],
  ["/algo/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/algo/index.html.js"), meta: {"t":"如何刷Java八股文"} }],
  ["/guide/bar/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/bar/index.html.js"), meta: {"t":"Bar 功能","i":"lightbulb"} }],
  ["/guide/bar/baz.html", { loader: () => import(/* webpackChunkName: "baz.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/bar/baz.html.js"), meta: {"t":"Baz","i":"circle-info"} }],
  ["/tool/CodeReview.html", { loader: () => import(/* webpackChunkName: "CodeReview.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/tool/CodeReview.html.js"), meta: {"t":""} }],
  ["/tool/GuavaCache.html", { loader: () => import(/* webpackChunkName: "GuavaCache.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/tool/GuavaCache.html.js"), meta: {"t":""} }],
  ["/tool/git.html", { loader: () => import(/* webpackChunkName: "git.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/tool/git.html.js"), meta: {"t":""} }],
  ["/list/ArrayBlockingQueue.html", { loader: () => import(/* webpackChunkName: "ArrayBlockingQueue.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/ArrayBlockingQueue.html.js"), meta: {"t":"引言"} }],
  ["/list/ArrayList.html", { loader: () => import(/* webpackChunkName: "ArrayList.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/ArrayList.html.js"), meta: {"t":""} }],
  ["/list/BlockingQueue%E5%90%88%E9%9B%86.html", { loader: () => import(/* webpackChunkName: "BlockingQueue合集.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/BlockingQueue合集.html.js"), meta: {"t":""} }],
  ["/list/ConcurrentHashMap.html", { loader: () => import(/* webpackChunkName: "ConcurrentHashMap.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/ConcurrentHashMap.html.js"), meta: {"t":""} }],
  ["/list/CopyOnWriteArrayList.html", { loader: () => import(/* webpackChunkName: "CopyOnWriteArrayList.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/CopyOnWriteArrayList.html.js"), meta: {"t":""} }],
  ["/list/DelayQueue.html", { loader: () => import(/* webpackChunkName: "DelayQueue.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/DelayQueue.html.js"), meta: {"t":"引言"} }],
  ["/list/HashMap.html", { loader: () => import(/* webpackChunkName: "HashMap.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/HashMap.html.js"), meta: {"t":""} }],
  ["/list/LinkedBlockingQueue.html", { loader: () => import(/* webpackChunkName: "LinkedBlockingQueue.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/LinkedBlockingQueue.html.js"), meta: {"t":"引言"} }],
  ["/list/LinkedHashMap.html", { loader: () => import(/* webpackChunkName: "LinkedHashMap.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/LinkedHashMap.html.js"), meta: {"t":""} }],
  ["/list/LinkedList.html", { loader: () => import(/* webpackChunkName: "LinkedList.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/LinkedList.html.js"), meta: {"t":""} }],
  ["/list/PriorityQueue.html", { loader: () => import(/* webpackChunkName: "PriorityQueue.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/PriorityQueue.html.js"), meta: {"t":"引言"} }],
  ["/list/Set.html", { loader: () => import(/* webpackChunkName: "Set.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/Set.html.js"), meta: {"t":""} }],
  ["/list/SynchronousQueue.html", { loader: () => import(/* webpackChunkName: "SynchronousQueue.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/SynchronousQueue.html.js"), meta: {"t":"引言"} }],
  ["/list/TreeMap.html", { loader: () => import(/* webpackChunkName: "TreeMap.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/TreeMap.html.js"), meta: {"t":""} }],
  ["/guide/foo/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/foo/index.html.js"), meta: {"t":"Foo 功能","i":"lightbulb"} }],
  ["/guide/foo/ray.html", { loader: () => import(/* webpackChunkName: "ray.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/guide/foo/ray.html.js"), meta: {"t":"Ray","i":"circle-info"} }],
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
  ["/mysql/mvcc.html", { loader: () => import(/* webpackChunkName: "mvcc.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/mysql/mvcc.html.js"), meta: {"t":""} }],
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
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/404.html.js"), meta: {"t":""} }],
  ["/concurrency/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/concurrency/index.html.js"), meta: {"t":"Concurrency"} }],
  ["/tool/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/tool/index.html.js"), meta: {"t":"Tool"} }],
  ["/list/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yideng/Documents/workspace/javabaguwen/src/.vuepress/.temp/pages/list/index.html.js"), meta: {"t":"List"} }],
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
