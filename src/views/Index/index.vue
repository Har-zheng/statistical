<template>
  <div class="index">
    <!-- {{ analyzes["FocusOn.Base"] }} -->
    <Top :Base="analyzes.Base"></Top>
    <Content :analyzes="analyzes"></Content>
  </div>
</template>
<script>
import Top from "@/views/Top/top.vue";
import Content from "@/views/Content/content.vue";

export default {
  components: {
    Top,
    Content
  },
  data() {
    return {
      analyzes: {}
    };
  },
  created() {
    this.analyzes = JSON.parse(localStorage.getItem("analyzer"));
    console.log(this.analyzes);
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="stylus" scoped>
.top
  height 195px
  background-color #fff
  border-radius 10px
</style>
