<template>
  <div class="content">
    <div class="set_css pinxiang">
      <p>品项统计排名</p>
      <div class="ranking">
        <div
          class="ranking-item"
          v-for="(item, index) of InstancesRankingResult"
          :key="item.number"
        >
          <span class="stort">NO.{{ index + 1 }}</span>
          <span class="title"> {{ item.name }} </span>
          <div class="progress">
            <el-progress
              :text-inside="true"
              :stroke-width="18"
              :percentage="item.percentage"
            ></el-progress>
          </div>
          <span class="num"> {{ item.number }}次 </span>
        </div>
      </div>

      <!-- <div id="container"></div> -->
    </div>
    <div class="set_css consumption">
      <p>消费金额占比</p>
      <div id="consumption"></div>
    </div>
    <div class="set_css set_428 gender">
      <p class="title">男女占比</p>
      <div class="gender-section">
        <section>
          <img src="../../assets/img/man.png" alt="" />
        </section>
        <section class="section-two">
          <img src="../../assets/img/sex.png" alt="" />
        </section>
      </div>
      <div id="gender">
        <div class="press">
          <div class="blue" ref="blue">
            <span></span>
          </div>
        </div>
        <div class="gender-section">
          <section>
            <p>男性占比</p>
            <b>{{ females + "%" }}</b>
          </section>
          <section class="section-two">
            <p>女性占比</p>
            <b>{{ 100 - females + "%" }}</b>
          </section>
        </div>
      </div>
    </div>
    <div class="set_css set_428 age">
      <p>年龄占比</p>
      <div id="age"></div>
    </div>
    <div class="set_css set_428 marriage">
      <p>新老顾客占比</p>
      <div id="marriage"></div>
    </div>
    <!-- <div class="set_css set_1326">
      <p>缺陷咨询排行</p>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="TOP" width="180">
          </el-table-column>
          <el-table-column prop="name" label="缺陷名称" width="180">
          </el-table-column>
          <el-table-column prop="address" label="咨询次数"> </el-table-column>
          <el-table-column prop="address" label="成交率">
            <template>
              <el-progress :percentage="50"></el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="money" label="成交金额(元)"></el-table-column>
        </el-table>
      </div>
    </div> -->

    <div class="set_css set_1326 treatment">
      <p>
        缺陷排行
        <span class="tip2 tip">已治疗</span>
        <span class="tip1 tip">未治疗</span>
      </p>
      <div class="treatment-cont">
        <div
          class="treatment-item"
          v-for="(item, index) of FeaturesRanking.result"
          :key="index"
        >
          <b>{{ index + 1 }}</b>
          <b class="title">{{ item.name }}</b>
          <div class="treatment-progress">
            <p>
              <el-progress
                color="#90C418"
                :percentage="((item.closed / item.total) * 100).toFixed(2) * 1"
              ></el-progress>
              <b>{{ item.closed }}人</b>
            </p>
            <p>
              <el-progress
                :percentage="
                  ((1 - item.closed / item.total) * 100).toFixed(2) * 1
                "
              ></el-progress>
              <b>{{ item.total - item.closed }}人</b>
            </p>
          </div>
        </div>
      </div>
      <!-- <div id="treatment"></div> -->
    </div>
    <div class="set_css set_1326">
      <p>商品排行</p>
      <div>
        <el-table :data="GoodsRanking.result" style="width: 100%">
          <el-table-column prop="top" label="TOP" width="100">
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="180">
          </el-table-column>
          <el-table-column prop="amount" label="总收入（元）">
          </el-table-column>
          <el-table-column prop="number" label="成交次数"> </el-table-column>
          <!-- <el-table-column prop="address" label="成交次数">
            <template>
              <el-progress :percentage="50"></el-progress>
            </template>
          </el-table-column> -->
          <!-- <el-table-column prop="money" label="成交金额(元)"></el-table-column> -->
        </el-table>
      </div>
    </div>
    <div class="set_css set_1326">
      <p>{{ AccountsRanking.name }}</p>
      <div>
        <el-table
          :data="AccountsRanking.result"
          class="table-size"
          style="width: 100%"
        >
          <el-table-column prop="top" label="TOP" width="100">
          </el-table-column>
          <el-table-column prop="account_name" label="姓名" width="100">
          </el-table-column>
          <el-table-column prop="turnoverRate" label="平均成交率">
          </el-table-column>
          <el-table-column
            prop="average_amount"
            label="平均成交金额（元）"
            width="180"
          ></el-table-column>
          <el-table-column prop="invoice_count" label="咨询次数">
          </el-table-column>
          <el-table-column prop="average_features" label="平均咨询缺陷">
          </el-table-column>
          <el-table-column prop="average_closed_features" label="平均成交缺陷">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { Chart, registerShape } from "@antv/g2";

// import DataSet from "@antv/data-set";
export default {
  props: {
    analyzes: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      tableData: [
        {
          date: "01",
          name: "额部较窄",
          address: "95次",
          turnoverRate: 60,
          money: 10000
        },
        {
          date: "02",
          name: "额部较低",
          address: "88次",
          turnoverRate: 60,
          money: 99999
        },
        {
          date: "03",
          name: "额部凹陷轻微",
          address: "77次",
          turnoverRate: 60,
          money: 688899
        },
        {
          date: "04",
          name: "太阳穴凹陷轻微",
          address: "66次",
          turnoverRate: 60,
          money: 688899
        }
      ],
      analysis: null
    };
  },
  computed: {
    InstancesRankingResult: function() {
      let maxNum = null;
      this.analyzes.InstancesRanking.result.forEach((item, index) => {
        if (index === 0) {
          maxNum = item.number;
          item.percentage = 100;
        } else {
          item.percentage = (item.number / maxNum) * 100;
        }
      });
      return this.analyzes.InstancesRanking.result;
    },
    AmountAreaResult: function() {
      let arr = [];
      for (const key in this.analyzes.AmountArea.result) {
        const index = key.indexOf("-") + 1;
        const keyName = key.slice(index, key.length);
        arr.push({
          type: "￥" + keyName,
          value: this.analyzes.AmountArea.result[key]
        });
      }
      let res = arr.reduce((acc, cur) => {
        return acc + cur.value;
      }, 0);
      arr.forEach(item => {
        item.value = (item.value / res).toFixed(2) * 100;
      });
      console.log(arr);
      return arr;
    },
    females: function() {
      const { males, females } = this.analyzes.Base.result;
      // this.$refs.blue.style.width = ` ${(females / (males + females)) * 100}`;

      return ((females / (males + females)) * 100).toFixed(2);
    },
    AgeArea: function() {
      let arr = [];
      for (const key in this.analyzes.AgeArea.result) {
        const index = key.indexOf("-") + 1;
        const keyName = key.slice(index, key.length);
        arr.push({
          type: keyName,
          value: this.analyzes.AgeArea.result[key]
        });
      }
      let res = arr.reduce((acc, cur) => {
        return acc + cur.value;
      }, 0);
      arr.forEach(item => {
        item.value = (item.value / res).toFixed(2) * 100;
      });
      console.log(arr);
      return arr;
    },
    // 缺陷排行
    FeaturesRanking: function() {
      return this.analyzes.FeaturesRanking;
    },
    // 商品排行
    GoodsRanking: function() {
      this.analyzes.GoodsRanking.result.forEach((item, index) => {
        item.top = index + 1;
      });
      return this.analyzes.GoodsRanking;
    },
    // 咨询师排行
    AccountsRanking: function() {
      this.analyzes.AccountsRanking.result.forEach((item, index) => {
        const { invoice_count, closed_invoice_count } = item;
        item.turnoverRate =
          ((closed_invoice_count / invoice_count) * 100).toFixed(2) + "%";
        item.top = index + 1;
      });
      return this.analyzes.AccountsRanking;
    }
  },
  watch: {},
  mounted() {
    // this.container();
    this.consumption();
    this.age_init();
    this.marriage();
    this.setFemales();
    // this.treatment();
    // this.commodity();
  },
  methods: {
    setFemales() {
      const { males, females } = this.analyzes.Base.result;
      console.log((males / (males + females)) * 100);
      this.$refs.blue.style.width = `${(females / (males + females)) * 100}%`;
    },
    container() {
      // 自定义 shape, 支持图片形式的气泡
      registerShape("interval", "border-radius", {
        draw(cfg, container) {
          const points = cfg.points;
          let path = [];
          path.push(["M", points[0].x, points[0].y]);
          path.push(["L", points[1].x, points[1].y]);
          path.push(["L", points[2].x, points[2].y]);
          path.push(["L", points[3].x, points[3].y]);
          path.push("Z");
          path = this.parsePath(path); // 将 0 - 1 转化为画布坐标

          const group = container.addGroup();
          group.addShape("rect", {
            attrs: {
              x: path[1][1], // 矩形起始点为左上角
              y: path[1][2],
              width: path[2][1] - path[1][1],
              height: path[0][2] - path[1][2],
              fill: cfg.color,
              radius: (path[2][1] - path[1][1]) / 2
            }
          });

          return group;
        }
      });
      const data = [
        { type: "鼻子", value: 95, types: "Profit" },
        { type: "眼睛", value: 85, types: "Profit" },
        { type: "额头", value: 60, types: "Profit" },
        { type: "下颏", value: 48, types: "Profit" },
        { type: "私密抗衰", value: 32, types: "Profit" }
      ];
      const chart = new Chart({
        container: "container",
        autoFit: true,
        height: 500
      });
      chart.data(data);
      chart.scale({
        value: {
          max: 1400,
          min: 0,
          alias: ""
        }
      });

      chart.axis("type", {
        title: null,
        tickLine: null,
        line: null
      });

      chart.axis("value", {
        label: null,
        title: {
          offset: 30,
          style: {
            fontSize: 18,
            fontWeight: 300
          }
        }
      });
      chart.legend(false);
      // 左到右的数据图
      chart.coordinate().transpose();
      chart
        .interval()
        .position("type*value")
        .size(30)
        .label("value", {
          style: {
            fill: "#8d8d8d"
          },
          offset: 10
        });
      chart.interaction("element-active");
      chart.render();
    },
    consumption() {
      const data = this.AmountAreaResult || [
        { type: "￥0-1000", value: 20 },
        { type: "￥1000-5000", value: 18 },
        { type: "￥5000-10000", value: 32 },
        { type: "￥10000-50000", value: 15 },
        { type: "￥50000-100000", value: 15 }
      ];

      // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
      const sliceNumber = 0.01;

      // 自定义 other 的图形，增加两条线
      registerShape("interval", "slice-shape", {
        draw(cfg, container) {
          const points = cfg.points;
          let path = [];
          path.push(["M", points[0].x, points[0].y]);
          path.push(["L", points[1].x, points[1].y - sliceNumber]);
          path.push(["L", points[2].x, points[2].y - sliceNumber]);
          path.push(["L", points[3].x, points[3].y]);
          path.push("Z");
          path = this.parsePath(path);
          return container.addShape("path", {
            attrs: {
              fill: cfg.color,
              path
            }
          });
        }
      });

      const chart = new Chart({
        container: "consumption",
        autoFit: true,
        height: 380
      });
      // chart.scale("type", {
      //   formatter: val => {
      //     val = val * 100 + "%";
      //     return val;
      //   }
      // });

      chart.data(data);
      chart.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.6
      });
      chart.legend("type", {
        position: "right" // 配置图例显示位置
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      });
      chart
        .interval()
        .adjust("stack")
        .position("value")
        .color("type", [
          "#FC4850FF",
          "#59ADFFFF",
          "#90C418FF",
          "#9E63FFFF",
          "#F8C822FF"
        ])
        .shape("slice-shape")
        .label("type", () => {
          // 可以获取到val数据
          // const opacity = val === "四线及以下" ? 1 : 0.5;
          const opacity = 1;
          return {
            offset: -5,
            style: {
              opacity,
              fill: "white",
              fontSize: 18,
              shadowBlur: 1,
              fontWeight: 600,
              shadowColor: "rgba(0, 0, 0, 0)"
            },
            content: obj => {
              return "\n" + obj.value + "%";
            }
          };
        });
      // chart.interaction("element-single-selected");
      chart.render();
    },
    age_init() {
      const data = this.AgeArea || [
        { type: "20岁以下", value: 18 },
        { type: "20-30岁", value: 32 },
        { type: "30-40岁", value: 15 },
        { type: "40岁以上", value: 15 }
      ];

      // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
      const sliceNumber = 0.01;

      // 自定义 other 的图形，增加两条线
      registerShape("interval", "slice-shape", {
        draw(cfg, container) {
          const points = cfg.points;
          let path = [];
          path.push(["M", points[0].x, points[0].y]);
          path.push(["L", points[1].x, points[1].y - sliceNumber]);
          path.push(["L", points[2].x, points[2].y - sliceNumber]);
          path.push(["L", points[3].x, points[3].y]);
          path.push("Z");
          path = this.parsePath(path);
          return container.addShape("path", {
            attrs: {
              fill: cfg.color,
              path
            }
          });
        }
      });

      const chart = new Chart({
        container: "age",
        autoFit: true,
        height: 300
      });
      // chart.scale("type", {
      //   formatter: val => {
      //     val = val * 100 + "%";
      //     return val;
      //   }
      // });

      chart.data(data);
      chart.coordinate("theta", {
        radius: 0,
        innerRadius: 0.6
      });
      chart.tooltip(false);
      // 声明需要进行自定义图例字段： 'item'
      chart.legend("type", {
        position: "right", // 配置图例显示位置
        // custom: true, // 关键字段，告诉 G2，要使用自定义的图例
        // items: data.map((obj, index) => {
        //   return {
        //     name: obj.item, // 对应 itemName
        //     value: obj.percent, // 对应 itemValue
        //     marker: {
        //       symbol: "square", // marker 的形状
        //       style: {
        //         r: 5, // marker 图形半径
        //         fill: chart.getTheme().colors10[index] // marker 颜色，使用默认颜色，同图形对应
        //       }
        //     } // marker 配置
        //   };
        // }),
        itemValue: {
          style: {
            fill: "#999"
          }, // 配置 itemValue 样式
          formatter: val => `${val * 100}%` // 格式化 itemValue 内容
        }
      });
      chart
        .interval()
        .adjust("stack")
        .position("value")
        .color("type", [
          "#FC4850FF",
          "#59ADFFFF",
          "#90C418FF",
          "#9E63FFFF",
          "#F8C822FF"
        ])
        .shape("slice-shape")
        .label("type", () => {
          // const opacity = val === "四线及以下" ? 1 : 0.5;
          const opacity = 1;
          return {
            offset: -6,
            offsetX: 2,
            offsetY: -6,
            style: {
              opacity,
              fill: "white",

              fontSize: 10,
              shadowBlur: 1,
              fontWeight: 600,
              shadowColor: "rgba(0, 0, 0, 0)"
            },
            content: obj => {
              return "\n" + obj.value + "%";
            }
          };
        });
      // chart.interaction("element-single-selected");
      chart.render();
    },
    // 婚姻
    marriage() {
      const { new_user, old_user } = this.analyzes.Base.result;
      const and = new_user + old_user;
      const new_ = (new_user / and).toFixed(2) * 1;
      const old_ = 1 - new_;
      const data = [
        { item: "新 客", count: 40, percent: old_ },
        { item: "老 客", count: 21, percent: new_ }
      ];

      const chart = new Chart({
        container: "marriage",
        autoFit: true,
        height: 300
      });

      chart.data(data);

      chart.coordinate("theta", {
        radius: 0.85
      });

      chart.scale("percent", {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      });

      chart.tooltip({
        showTitle: false,
        showMarkers: false
      });
      chart.legend("item", {
        position: "right" // 配置图例显示位置
      });
      chart.axis(false); // 关闭坐标轴
      const interval = chart
        .interval()
        .adjust("stack")
        .position("percent")
        .color("item", ["#90C418FF", "#0372FFFF"])
        .label("percent", {
          offset: -40,
          style: {
            textAlign: "center",
            shadowBlur: 2,
            shadowColor: "rgba(0, 0, 0, .45)",
            fill: "#fff"
          }
        })
        .tooltip("item*percent", (item, percent) => {
          percent = percent * 100 + "%";
          return {
            name: item,
            value: percent
          };
        })
        .style({
          lineWidth: 1,
          stroke: "#fff"
        });
      chart.interaction("element-single-selected");
      chart.render();

      // 默认选择
      interval.elements[0].setState("selected", true);
    },

    // 治疗排行
    treatment() {
      const data = [
        { label: "额部较窄", type: "已治疗", value: 2800 },
        { label: "额部较窄", type: "未治疗", value: 2260 },
        { label: "额部较低", type: "已治疗", value: 1800 },
        { label: "额部较低", type: "未治疗", value: 1300 },
        { label: "额部凹陷轻微", type: "已治疗", value: 950 },
        { label: "额部凹陷轻微", type: "未治疗", value: 900 },
        { label: "太阳穴凹陷轻微", type: "已治疗", value: 500 },
        { label: "太阳穴凹陷轻微", type: "未治疗", value: 390 },
        { label: "鼻根较低", type: "已治疗", value: 170 },
        { label: "鼻根较低", type: "未治疗", value: 100 }
      ];
      const chart = new Chart({
        container: "treatment",
        autoFit: true,
        height: 400
      });

      chart.data(data);
      chart.legend("type", {
        position: "top" // 配置图例显示位置
      });
      chart
        .coordinate()
        .transpose()
        .scale(1, -1);

      chart.axis("value", {
        position: "right"
      });
      chart.axis("label", {
        label: {
          offset: 12
        }
      });

      chart.tooltip({
        shared: true,
        showMarkers: false
      });

      chart
        .interval()
        .position("label*value")
        .color("type")
        .adjust([
          {
            type: "dodge",
            marginRatio: 0
          }
        ]);

      chart.interaction("active-region");

      chart.render();
    },
    commodity() {
      const data = [
        { name: "总金额", type: "肉毒素.", proportion: 18.9 },
        { name: "总金额", type: "玻尿酸.", proportion: 28.8 },
        { name: "总金额", type: "鼻假体.", proportion: 39.3 },
        { name: "总金额", type: "双眼皮.", proportion: 81.4 },
        { name: "总金额", type: "脂肪注射", proportion: 47 },
        { name: "销售均价", type: "肉毒素.", proportion: 12.4 },
        { name: "销售均价", type: "玻尿酸.", proportion: 23.2 },
        { name: "销售均价", type: "鼻假体.", proportion: 34.5 },
        { name: "销售均价", type: "双眼皮.", proportion: 99.7 },
        { name: "销售均价", type: "脂肪注射", proportion: 52.6 }
      ];
      const chart = new Chart({
        container: "commodity",
        autoFit: true,
        height: 400
      });

      chart.data(data);
      // chart.coordinate("name", {
      //   radius: 0.85
      // });
      chart.scale("proportion", {
        nice: true
      });
      chart.tooltip({
        shared: true,
        showMarkers: false
      });
      chart.legend("name", {
        position: "top" // 配置图例显示位置
      });

      chart
        .interval()
        .position("type*proportion")
        .color("name", ["#90C418FF", "#0372FFFF"])
        .adjust("stack")
        .label("proportion", {
          position: "middle",
          offset: 0,
          style: {
            fill: "#fff",
            stroke: null
          }
        });

      chart.interaction("active-region");

      // // 添加文本标注
      // data.forEach(item => {
      //   chart.annotation().text({
      //     position: [item.type, 1],
      //     content: item.proportion,
      //     style: {
      //       textAlign: "center"
      //     },
      //     offsetY: -30
      //   });
      // });

      // 添加文本标注
      data.forEach(item => {
        if (item.name === "总金额") return;
        chart.annotation().text({
          position: [item.type, item.proportion * 1.8],
          content: item.proportion,
          style: {
            textAlign: "center"
          },
          offsetY: -30
        });
      });
      chart.render();
    }
  }
};
</script>
<style lang="stylus" scoped>
.set_css
  display inline-block
  background-color #fff
  border-radius 10px
  padding 20px 30px
  margin-top 20px
  >p
    font-size 24px
    color #173E67
    font-weight bold
.set_428
  width 366px
  // height 300px
.pinxiang
  width 570px
  // height 400px
  .ranking
    margin 34px 0 0 0
    .progress
      display inline-block
      width 300px
    .ranking-item
      margin-bottom 42px
      span
        display inline-block
      .stort
        color #1432501F
        font-size 14px
      .title
        width 78px
        font-size 18px
        margin 0 20px 0 30px
      .num
        margin-left 20px
        font-size 18px
      /deep/.el-progress-bar__innerText
        display none
.consumption
  width 590px
  // height 400px
.set_590
  width 590px
.set_1326
  width 1326px
.content
  display flex
  justify-content space-between
  flex-wrap wrap
.gender
  .title
    margin-bottom 60px
  .press
    margin 36px auto
    width 366px
    height 10px
    background #FC4850
    border-radius 2px
    .blue
      width 30%
      height 10px
      background #0372FF
      border-radius 2px
      span
        display inline-block
        width 4px
        height 16px
        background #173E67
        border-radius 5px
        position relative
        top -4px
        float right
  .gender-section
    display flex
    width 100%
    justify-content space-between
    section
      p
        color #b8c4d0
        margin-bottom 26px
      b
        font-size 36px
        font-family Helvetica
      width 120px
    .section-two
      text-align right
.treatment
  .tip
    float right
    margin-left 20px
  .tip1:before
    content ''
    display inline-block
    width 10px
    height 10px
    background-color #90C418
    border-radius 50%
  .tip2:before
    content ''
    background-color #0372FF
    display inline-block
    width 10px
    height 10px
    border-radius 50%
  .treatment-cont
    margin-top 38px
    .treatment-item
      margin-bottom 10px
      .title
        margin-left 20px
        width 180px
        display inline-block
      position relative
      margin-top 10px
      height 80px
      .treatment-progress
        p
          margin-bottom 10px
        display inline-block
        width 980px
        margin-left 40px
        position absolute
        top 0
        right 0
        /deep/.el-progress
          display inline-block
          width 880px
          /deep/.el-progress__text
            display none
        /deep/.el-progress-bar__outer
          height 12px !important
/deep/.el-progress__text
  display none
.el-table
  font-size 20px
</style>
