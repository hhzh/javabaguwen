import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/interview/": [
        "README.md",
        "map",
    ],
    "/algo/": [
        "README.md",
        "map",
    ],
    "/tool/": [
        "README.md",
        "Git",
        "Linux",
        "Maven",
        "Arthas",
        "Nginx",
        "JUnit",
        "TestNG",
        "Mockito",
        "CodeReview",
    ],
    "/about/": [
        "README.md",
        "map",
    ],
    "/": [
        {
            text: "一、前言",
            link: "home",
        },
        {
            text: "二、Java基础",
            collapsible: true,
            children: [
                {
                    prefix: "basic/",
                    text: "2.1 Java基础题",
                    collapsible: true,
                    children: [
                        "readme.md",
                        "what-is-java",
                        "jdk-install-config",
                        "IDEA-install-config",
                        "hello-world",
                    ],
                },
            ]
        },
        {
            text: "三、Java进阶",
            collapsible: true,
            children: [
                {
                    text: "3.1 Java集合",
                    collapsible: true,
                    children: [
                        "readme.md",
                        "array-list",
                        "linked-list",
                        "hash-map",
                        "linked-hash-map",
                        "tree-map",
                        "set",
                        "copy-on-write-array-list",
                        "con-current-hash-map",
                        "array-blocking-queue",
                        "linked-blocking-queue",
                        "synchronous-queue",
                        "priority-queue",
                        "delay-queue",
                        "blocking-collection"
                    ],
                },
                {
                    text: "3.2 Java并发",
                    collapsible: true,
                    children: [
                        "readme.md",
                        "thread",
                        "thread-pool",
                        "aqs",
                        "reentrant-lock",
                        "count-down-latch",
                        "linked-hash-map",
                        "semaphore",
                        "cyclic-barrier",
                        "thread-local",
                        "atomic-integer",
                        "synchronized",
                        "volatile",
                    ],
                },
            ]
        },
        {
            text: "四、MySQL",
            collapsible: true,
            prefix: "mysql/",
            children: [
                {
                    text: "4.1 MySQL架构",
                    link: "framework",
                },
                {
                    text: "4.2 MySQL存储引擎",
                    link: "engine",
                },
                {
                    text: "4.3 MySQL B+树索引",
                    link: "b",
                },
                {
                    text: "4.4 MySQL Explain详解",
                    link: "explain",
                },
                {
                    text: "4.5 MySQL索引失效",
                    link: "expire",
                },
                {
                    text: "4.6 MySQL日志",
                    link: "log",
                },
                {
                    text: "4.7 慢查询日志",
                    link: "slow",
                },
                {
                    text: "4.8 MySQL锁",
                    link: "lock",
                },
                {
                    text: "4.9 MySQL加锁范围",
                    link: "range",
                },
                {
                    text: "4.10 MySQL死锁",
                    link: "dead",
                },
                {
                    text: "4.11 MySQL事务",
                    link: "transaction",
                },
                {
                    text: "4.12 MySQL主从同步",
                    link: "sync",
                },
                {
                    text: "4.13 MySQL深分页问题",
                    link: "page",
                },
                {
                    text: "4.14 创建MySQL索引",
                    link: "create",
                },
                {
                    text: "4.15 MySQL使用规范",
                    link: "standard",
                },
                {
                    text: "4.16 MySQL索引下推",
                    link: "push",
                },
                {
                    text: "4.17 MySQL备份数据",
                    link: "backup",
                },
                {
                    text: "4.18 MySQL幻读",
                    link: "phantom",
                },
                {
                    text: "4.19 MySQL索引跳跃",
                    link: "skip",
                },
                {
                    text: "4.20 MySQL锁超时",
                    link: "timeout",
                },
                {
                    text: "4.21 分析MySQL性能",
                    link: "performance",
                },
                {
                    text: "4.22 在线加字段",
                    link: "online",
                },
                {
                    text: "4.23 MySQL二阶段提交",
                    link: "second",
                },
                {
                    text: "4.24 优化SQL查询流程",
                    link: "optimize",
                },
                {
                    text: "4.25 数据库三范式",
                    link: "three",
                },
                {
                    text: "4.26 存储引擎",
                    link: "engine",
                },
            ]
        },
        {
            text: "五、JVM",
            collapsible: true,
            prefix: "mysql/",
            children: [
                {
                    text: "4.1 Java基础题",
                    link: "",
                },
            ]
        },
        {
            text: "四、MySQL",
            collapsible: true,
            prefix: "mysql/",
            children: [
                {
                    text: "4.1 Java基础题",
                    link: "",
                },
            ]
        },
        {
            text: "四、MySQL",
            collapsible: true,
            prefix: "mysql/",
            children: [
                {
                    text: "4.1 Java基础题",
                    link: "",
                },
            ]
        },
        {
            text: "四、MySQL",
            collapsible: true,
            prefix: "mysql/",
            children: [
                {
                    text: "4.1 Java基础题",
                    link: "",
                },
            ]
        },
        {
            text: "幻灯片",
            icon: "person-chalkboard",
            link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
        },
    ],
});
