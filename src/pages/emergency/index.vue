<style scoped>
#app {
  padding-left: 12px;
  padding-right: 12px;
}

.tools {
  height: 76px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.tools .toolbar {
  margin-bottom: 0px;
}
</style>
<template>
  <div id="app">
    <div class="tools">
      <ul class="toolbar">
        <li>
          <label for="docname">文件标题：</label>
          <input class="datainp" id="docname" type="text" style="width:376px;" placeholder="" value="" v-model="docname" @keyup="show($event)" />
        </li>
        <li>
          <label for="selectPlanType">预案类型：</label>
          <select id="selectPlanType" class="datainp datasel" v-model="plantypes.selected">
            <option v-for="option in plantypes.data" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </li>
        <li>
          <a href="javascript:void(0);" @click="query()">
            <i class="fa fa-search"></i>查询</a>
        </li>
      </ul>
      <div style="clear:left;height:10px;"></div>
      <ul class="toolbar">
        <li>
          <label for="selectStateDistrict">所属市州：</label>
          <select id="selectStateDistrict" class="datainp datasel" v-model="states.selected">
            <option v-for="option in states.data" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </li>
        <li>
          <label for="selectCountryDistrict">所属区县：</label>
          <select id="selectCountryDistrict" class="datainp datasel" v-model="countries.selected">
            <option v-for="option in countries.data" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </li>
        <li>
          <label for="selectStateLevel">预案等级：</label>
          <select id="selectStateLevel" class="datainp datasel" v-model="planlevels.selected">
            <option v-for="option in planlevels.data" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </li>
  
        <li>
          <a href="javascript:void(0);" @click="upLoad()">
            <i class="fa fa-plus"></i>上传预案</a>
        </li>
      </ul>
    </div>
  
    <table class="tablelist">
      <thead>
        <tr>
          <th style="width:5%;">序号
            <i class="sort"></i>
          </th>
          <th style="width:35%;">文件标题</th>
          <th style="width:15%;">所属地区</th>
          <th style="width:15%;">所属水系</th>
          <th style="width:10%;">预案类型</th>
          <th style="width:10%;">预案等级</th>
          <th style="width:10%;">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(emp,index) in listResult">
          <td>{{((curr-1)*20)+index+1}}</td>
          <td>{{emp.planDocName}}</td>
          <td>{{emp.districtName}}</td>
          <td>{{emp.hnnm}}</td>
          <td>{{ convertPlanType(emp.planType)}}</td>
          <td>{{ convertPlanLevel(emp.planLevel)}}</td>
          <td>
            <a href="#" class="tablelink" @click="viewDoc(index)">预览</a>
          </td>
        </tr>
      </tbody>
    </table>
  
    <div style="height:55px;line-height:55px;">
      <div id="pager" style="float:left;">
      </div>
      <div style="float:left;">
        <div style="padding-left:17px; margin-top:-3px;font-size:12px;">{{total}}</div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {

    return {
      curr: 1,
      total: '总共0条数据',
      docname: '',
      states: {
        selected: '000000',
        data: []
      },
      countries: {
        selected: '000000',
        data: []
      },
      plantypes: {
        selected: '-1',
        data: [
          { value: '-1', text: '-全部-' },
          { value: '1', text: "├综合预案" },
          { value: '2', text: '├专项预案' },
          { value: '3', text: '　├水库预案' },
          { value: '31', text: '　　├调度方案' },
          { value: '32', text: '　　├度汛方案' },
          { value: '33', text: '　　├应急预案' },
          { value: '8', text: '　　└批复文件' },
          { value: '6', text: '　├城市防洪预案' },
          { value: '7', text: '　└山洪防治预案' },
          { value: '9', text: '├其他' }
        ]
      },
      planlevels: {
        selected: '-1',
        data: [
          { value: '-1', text: '-全部-' },
          { value: '1', text: '省级' },
          { value: '2', text: '市州' },
          { value: '3', text: '区县' }
        ]
      },
      listResult: []
    }
  },
  watch: {
    'states.selected': function (val, old) {
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
        .catch(function (response) {
          console.log(response)
        });
    }
  },
  methods: {
    query: function (page) {

      if (!page)
        page = 1;

      //layer.msg("预案查询...");
      this.$http.get("/api/PlatResource/QueryEmergencyPlan"
        + "?page=" + page
        + "&docname=" + this.docname
        + "&ennmcd="
        + "&districtcode=" + (this.countries.selected != '000000' ? this.countries.selected : this.states.selected)
        + "&plantype=" + this.plantypes.selected
        + "&planlevel=" + this.planlevels.selected
      )
        .then((response) => {
          if (response.data.code = '000') {
            this.listResult = response.data.data;

            var query = this.query;
            this.curr = page;
            // 第一页时，需要重新初始化
            if (page == 1) {
              // 获取总页数
              this.$http.get("/api/PlatResource/QueryEmergencyPlanCount"
                + "?docname=" + this.docname
                + "&ennmcd="
                + "&districtcode=" + (this.countries.selected != '000000' ? this.countries.selected : this.states.selected)
                + "&plantype=" + this.plantypes.selected
                + "&planlevel=" + this.planlevels.selected
              )
                .then((rep) => {
                  console.log(rep.data);
                  if (rep.data.code = '000') {
                    this.total = '总共' + rep.data.data + '条数据';
                    layui.use(['laypage', 'layer'], function () {
                      var laypage = layui.laypage
                        , layer = layui.layer;
                      laypage({
                        cont: 'pager'
                        , pages: ((rep.data.data) / 20 + ((rep.data.data) % 20 > 0 ? 1 : 0))
                        , curr: page
                        , skin: '#1E9FFF'
                        , jump: function (obj, first) {
                          if (!first) {
                            query(obj.curr);
                          }
                        }
                      });

                    });
                  }
                });
            }
          }
          else
            layer.msg(response.data.error);
        })
        .catch(function (response) {
          console.log(response)
        });
    },
    show: function (ev) {
      if (ev.keyCode == 13) {
        this.query(1);
      }
    },
    upLoad: function () {
      //this.people.push(this.newPerson);
      // 添加完newPerson对象后，重置newPerson对象
      //this.newPerson = {name: '', age: 0, sex: 'Male'}
      var query = this.query;
      // 上传预案
      layer.open({
        type: 2,
        skin: 'layui-layer-lan',
        maxmin: false,
        title: '上传预案',
        area: ['800px', '550px'],
        content: ['../fileupload/index.html', 'yes'],
        end: function () {

          query(1);
        }
      });
    },
    viewDoc: function (index) {

      this.$http.get("/api/PlatResource/GetDocument?docid=" + this.listResult[index].planDocID)
        .then((response) => {

          if (response.data.code == '000') {
            window.open(response.data.data.docPath);
          }
          else {
            layer.msg(response.data.error);
          }
        })
        .catch(function (response) {
          console.log(response);
        });

      // 预览预案
      //layer.msg(this.listResult[index]);
    },
    deleteDoc: function (index) {
      // 删除预案
      //layer.msg(index);
      //layer.msg(this.listResult[index]);

      this.$http.post("/api/PlatResource/DeleteEmergencyPlan",
        {
          DocID: this.listResult[index].planDocID
        })
        .then((response) => {

          if (response.data.code = '000') {

            this.query($(".layui-laypage-curr>em").text());
            // 删除后使用，删一个数组元素
            //this.people.splice(index,1);
          }
          else
            layer.msg(response.data.error);
        })
        .catch(function (response) {
          console.log(response)
        });
    },
    convertPlanType: function (type) {

      switch (type) {
        case 1:
          return "综合预案";
        case 2:
          return "专项预案";
        case 3:
          return "水库预案";
        case 31:
          return "调度方案";
        case 32:
          return "度汛方案";
        case 33:
          return "应急预案";
        case 6:
          return "城市防洪预案";
        case 7:
          return "山洪防治预案";
        case 8:
          return "批复";
        case 9:
          return "其他";
        default:
          break;
      }

      return "";
    },
    convertPlanLevel: function (level) {
      switch (level) {
        case 1:
          return "省级";
        case 2:
          return "市州";
        case 3:
          return "区县";
        default:
          break;
      }

      return "";
    }
  },
  created: function () {
    console.log("created");
    this.$http.get("/api/PlatResource/QueryDistrict?mode=2")
      .then((response) => {

        if (response.data.code = '000') {
          var array = [];

          array.push({ value: '000000', text: '-全部-' });
          for (var i = 0; i < response.data.data.length; i++) {
            array.push({ value: response.data.data[i].districtCode, text: response.data.data[i].districtName });
          }
          console.log(array);
          console.log(array[0].text);
          this.states.data = array;

          var array1 = [];
          array1.push({ value: '000000', text: '-全部-' });
          this.countries.data = array1;
          this.countries.selected = array1[0].value;
        }
        else
          layer.msg(response.data.error);
      })
      .catch(function (response) {
        console.log(response)
      });
  },
  mounted() {
    console.log("mounted");
    this.query(1);
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated: function () {
    console.log("updated");
    $('.tablelist tbody tr:odd').addClass('odd');
  },
  destroyed: function () {
    console.log("destroyed");
  },
}
//this.$refs.input1.value
</script>