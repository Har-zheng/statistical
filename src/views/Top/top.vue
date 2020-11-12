<template>
  <div class="top border_">
    <div class="header">
      <div>
        <!-- <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
      </div>
      <div>
        <ul class="ul">
          <li>今天</li>
          <li>近7天</li>
          <li>近30天</li>
          <li>近180天</li>
        </ul>
        <el-date-picker
          v-model="start_end"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="top-bottom">
      <div class="item item-start">
        <div class="">
          <p>新增数量(人)</p>
          <b>{{ baseResult.new_user }}</b>
        </div>
        <div>
          <p>老顾客数量(人)</p>
          <b>{{ baseResult.old_user }}</b>
        </div>
        <div>
          <p>咨询总人数</p>
          <b>{{ baseResult.old_user + baseResult.new_user }}</b>
        </div>
      </div>
      <div class="item  item-content item-middle">
        <p>咨询成交率</p>
        <b>{{ (baseResult.rates * 100).toFixed(2) + "%" }}</b>
      </div>
      <div class="item  item-content item-end">
        <p>成交金额</p>
        <b>{{ baseResult.amount }}</b>
      </div>
      <div class="item item-right">
        <p>客单价</p>
        <b>{{ baseResult.kedanjia }}</b>
      </div>
    </div>
    <!-- <div id="c1"></div> -->
  </div>
</template>
<script>
// import { Chart } from '@antv/g2';
export default {
  props: {
    Base: {
      type: Object,
      default: () => ({
        result: null
      })
    }
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      start_end: ""
    };
  },
  computed: {
    baseResult: function() {
      console.log(this.Base);
      return this.Base.result;
    }
  },
  mounted() {
    // const data = [
    //   { genre: 'Sports', sold: 275 },
    //   { genre: 'Strategy', sold: 115 },
    //   { genre: 'Action', sold: 120 },
    //   { genre: 'Shooter', sold: 350 },
    //   { genre: 'Other', sold: 150 },
    // ];
    // // Step 1: 创建 Chart 对象
    // const chart = new Chart({
    //   container: 'c1', // 指定图表容器 ID
    //   width: 600, // 指定图表宽度
    //   height: 300, // 指定图表高度
    // });
    // // Step 2: 载入数据源
    // chart.data(data);
    // // Step 3: 创建图形语法，绘制柱状图
    // chart.interval().position('genre*sold');
    // // Step 4: 渲染图表
    // chart.render();
  }
};
</script>
<style lang="stylus" scoped>
.top
  height 195px
  background-color #fff
  border-radius 10px
  padding 10px 30px
  .header
    display flex
    justify-content space-between
    border-bottom 1px solid #E8EBF0
    padding-bottom 11px
  .top-bottom
    display flex
    padding-top 20px
    .item
      padding-left 20px
      p
        font-size 14px
        padding-bottom 10px
      b
        font-size 42px
        color #173E67
    .item-start
      display flex
      width 40%
      justify-content space-around
    .item-content
      border-left 1px solid #E8EBF0
      border-right 1px solid #E8EBF0
      padding-left 60px
    .item-right
      padding-left 60px
      width 16%
    .item-middle
      width 22%
    .item-end
      width 24%
      border-left none
.ul
  display inline-block
  li
    float left
    padding 0 10px
    font-size 18px
    // color #0372FF
    color #000000
</style>
