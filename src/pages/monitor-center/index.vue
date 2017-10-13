<style scoped>
.tools {
  height: 33px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.tools .toolbar {
  margin-bottom: 0px;
}
</style>
<template>
  <div id="app" style="height:100%;width:100%;">
    <!-- <input type="button" value="xxxxxxxx" @click="initMap()" style="margin-left:300px;">  -->
    <div id="my_world_map" style="height:100%;width:100%;">
    </div>
    <users ref="users" style="border:0px solid;height:200px;width:300px;left:10px;top:0px;position:absolute;">
    </users>
    <balanceinfo ref="balance" style="border:0px solid;height:200px;width:300px;left:10px;bottom:0px;position:absolute;">
    </balanceinfo>
    <marketinfo ref="market" style="border:0px solid;height:200px;width:300px;right:0px;top:0px;position:absolute;">
    </marketinfo>
    <tradinginfo ref="trading" style="border:0px solid;height:200px;width:300px;right:0px;bottom:0px;position:absolute;">
    </tradinginfo>
  </div>
</template>

<script>
//import klineinfo from './detail/detail.kline.vue'
import marketinfo from './detail/detail.market.vue'
import users from './detail/detail.users.vue'
import balanceinfo from './detail/detail.balance.vue'
import tradinginfo from './detail/detail.trading.vue'
export default {
  components: {
    users,
    marketinfo,
    balanceinfo,
    tradinginfo
  },
  data() {

    return {
      curr: 1,
      total: '总共0条数据',
      states: {
        selected: '000000',
        data: []
      },
      countries: {
        selected: '000000',
        data: []
      },
      listGrid: [],
      screenHeight: 768
    }
  },
  watch: {
    'states.selected': function(val, old) {
      console.log(val);
      console.log(old);

      this.$http.get("/api/PlatResource/QueryDistrictByStateCode?code=" + val)
        .then((response) => {

          if (response.data.code = '000') {
            var array = [];
            console.log(response.data.data.length);

            array.push({ value: '000000', text: '-全部-' });
            for (var i = 0; i < response.data.data.length; i++) {
              array.push({ value: response.data.data[i].districtCode, text: response.data.data[i].districtName });
            }
            console.log(array);
            console.log(array[0].text);
            this.countries.data = array;
            this.countries.selected = array[0].value;
          }
          else
            layer.msg(response.data.error);
        })
        .catch(function(response) {
          console.log(response)
        });
    }
  },
  methods: {
    handleResize(event) {
      //this.screenWidth = document.documentElement.clientHeight;
      //$("#my_world_map").height(this.screenWidth);
      console.log(this.screenHeight);
    },
    loadIpResources() {

      var data = [
        { name: '海门', value: 90 }
      ];

      var geoCoordMap = {
        '海门': [121.15, 31.89]
      };

      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }

      return res;
    },
    initMap() {
      var option = {
        backgroundColor: '#044161',
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            var res = params.name + '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ddb926"></span>';
            var myseries = option.series;
            for (var i = 0; i < myseries.length; i++) {
              for (var j = 0; j < myseries[i].data.length; j++) {
                if (myseries[i].data[j].name == params.name) {
                  res += '使用人数 : ' + myseries[i].data[j].value[2];
                  break;
                }
              }
            }
            return res;
          }
        },

        // 参考样式
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 10,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                  "color": "#044161"
                }
              },
              {
                "featureType": "land",
                "elementType": "all",
                "stylers": {
                  "color": "#004981"
                }
              },
              {
                "featureType": "boundary",
                "elementType": "geometry",
                "stylers": {
                  "color": "#064f85"
                }
              },
              {
                "featureType": "railway",
                "elementType": "all",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "highway",
                "elementType": "geometry",
                "stylers": {
                  "color": "#004981"
                }
              },
              {
                "featureType": "highway",
                "elementType": "geometry.fill",
                "stylers": {
                  "color": "#005b96",
                  "lightness": 1
                }
              },
              {
                "featureType": "highway",
                "elementType": "labels",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "arterial",
                "elementType": "geometry",
                "stylers": {
                  "color": "#004981"
                }
              },
              {
                "featureType": "arterial",
                "elementType": "geometry.fill",
                "stylers": {
                  "color": "#00508b"
                }
              },
              {
                "featureType": "poi",
                "elementType": "all",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "green",
                "elementType": "all",
                "stylers": {
                  "color": "#056197",
                  "visibility": "off"
                }
              },
              {
                "featureType": "subway",
                "elementType": "all",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "manmade",
                "elementType": "all",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "local",
                "elementType": "all",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "arterial",
                "elementType": "labels",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "boundary",
                "elementType": "geometry.fill",
                "stylers": {
                  "color": "#029fd4"
                }
              },
              {
                "featureType": "building",
                "elementType": "all",
                "stylers": {
                  "color": "#1a5787"
                }
              },
              {
                "featureType": "label",
                "elementType": "all",
                "stylers": {
                  "visibility": "off"
                }
              }
            ]
          }
        },
        geo: {
          center: [104.114129, 37.550339],
          map: 'world',
          label: {
            emphasis: {
              show: false
            }
          },
          zoom: 5,
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#004981',
              borderColor: '#029fd4'
            },
            emphasis: {
              areaColor: '#004981'
            }
          }
        },
        series: [
          {
            name: 'pm2.5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: this.loadIpResources(),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#ddb926'
              }
            }
          },
        ]
      };

      var myChart = echarts.init(document.getElementById('my_world_map'));
      myChart.setOption(option);

      // 定期查询是否有变化
      var vm = this;
      setInterval(function() {
        var op = myChart.getOption();
        //var obj=op.series[0].data[0];

        // 修改具体的指标
        //obj.value[2]=Math.random()*100;
        op.series[0].data = vm.loadIpResources();

        // 更新具体的指标
        myChart.setOption(op);
      }, 5000);
    }
  },
  created: function() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
    this.initMap();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated: function() {
    console.log("updated");
  },
  destroyed: function() {
    console.log("destroyed");
    window.removeEventListener('resize', this.handleResize);
  },
}
</script>