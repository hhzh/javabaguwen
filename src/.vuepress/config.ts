import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Java八股文网",
  description: "Java八股文网，打造史上最全八股文网站",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
