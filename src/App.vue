<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>
<script>
// import { analyzer } from "@/api/analysis.js";
import axios from "axios";
export default {
  created() {
    // 获取表格数据   ?token=3f49762d-d1e7-4db5-b536-2da351f2d446
    const GetRequestUrl = this.GetRequestUrl();
    console.log(GetRequestUrl);
    console.log(location);
    let token = GetRequestUrl.token;
    if (GetRequestUrl.token) {
      localStorage.setItem("token", GetRequestUrl.token);
    } else {
      token = localStorage.getItem("token");
    }

    this.$store.dispatch("SetToken", token).then(() => {
      this.getAnalyzer();
    });
  },
  methods: {
    //  获取图表数据
    GetRequestUrl() {
      let url = window.location.hash;
      let url_obj = {};
      let url_arr = url.substring(url.indexOf("?") + 1).split("&");
      url_arr.forEach(item => {
        let new_url = item.split("=");
        Object.defineProperty(url_obj, new_url[0], {
          value: new_url[1],
          enumerable: true
        });
      });
      return url_obj;
    },
    getAnalyzer() {
      axios.get("/analysis.json").then(res => {
        const { data } = res.data;
        console.log(Object.keys(data));
        let obj = {};
        for (const key in data) {
          const index = key.indexOf(".") + 1;
          const keyName = key.slice(index, key.length);
          obj[keyName] = data[key];
        }
        console.log(location);
        // ?token=

        localStorage.setItem("analyzer", JSON.stringify(obj));
        if (this.$route.path === "/") {
          this.$router.push({ path: "/analyzer" });
        }
      });

      // analyzer({
      //   views: [
      //     "FocusOn.InstancesRanking",
      //     "FocusOn.AccountsRanking",
      //     "FocusOn.Base",
      //     "FocusOn.AgeArea",
      //     "FocusOn.AmountArea",
      //     "FocusOn.FeaturesRanking",
      //     "FocusOn.GoodsRanking"
      //   ]
      // }).then(res => {
      //   console.log(res);
      //   const { code, data } = res.data;
      //   if (!code) {
      //     console.log(Object.keys(data));
      //     let obj = {};
      //     for (const key in data) {
      //       const index = key.indexOf(".") + 1;
      //       const keyName = key.slice(index, key.length);
      //       obj[keyName] = data[key];
      //     }
      //     console.log(location);
      //     // ?token=

      //     localStorage.setItem("analyzer", JSON.stringify(obj));
      //     if (this.$route.path === "/") {
      //       this.$router.push({ path: "/analyzer" });
      //     }
      //   }
      // });
    }
  }
};
</script>
<style lang="stylus">
html
  background-color #EFF3F6
  padding 20px
  font-family Helvetica
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  // text-align center
  color #2c3e50
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video
  margin 0
  padding 0
  border 0
  font-size 100%
  font inherit
  vertical-align baseline
  font-family Helvetica
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section
  display block
body
  line-height 1
ol, ul
  list-style none
blockquote, q
  quotes none
blockquote:before, blockquote:after, q:before, q:after
  content ''
  content none
table
  border-collapse collapse
  border-spacing 0
html
  background-color #EFF3F6
  padding 20px
.el-popper[x-placement^=bottom] .popper__arrow:after
  content none !important
</style>
