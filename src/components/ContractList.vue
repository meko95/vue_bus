<template>
  <div>
    <!--<input type="button" class="btn btn-warning" value="请求数据" @click="getData">-->
    <!--<router-link to="/bus/contract/getContract">-->
    <!--<input type="button" value="请求数据" class="btn btn-warning" @click="getData"/>-->
    <!--</router-link>-->
    <!--<router-link to="/bus/contract/addContract">-->
    <!--<input type="button" value="增加数据" class="btn btn-success" @click="addData"/>-->
    <!--</router-link>-->
    <!--<router-link to="/bus/contract/delContract">-->
    <!--<input type="button" value="删除数据" class="btn btn-danger" @click="delData"/>-->
    <!--</router-link>-->
    <!--<router-link to="/bus/contract/editContract">-->
    <!--<input type="button" value="修改数据" class="btn btn-primary" @click="editData"/>-->
    <!--</router-link>-->
    <!--<a href="http://localhost:8080/bus/contract/getContract">点我</a>-->
    <router-view></router-view>
    <section class="search-area">
      <div class="sa-ele">
        <label class="se-title">名称:</label>
        <input class="se-con" v-model="formData.title"/>
      </div>
      <div class="sa-ele">
        <label class="se-title">内容:</label>
        <input class="se-con" v-model="formData.content"/>
      </div>
      <div class="sa-ele">
        <label class="se-title">博文分类:</label>
        <select class="se-con" name="type" v-model="formData.type">
          <!--<option value="-1">请选择</option>-->
          <option v-for="(item,index) in TYPE_LIST" :key="index" :value="item.value">{{item.text}}</option>
          <!--通过js增加-->
        </select>
      </div>
      <div class="sa-ele">
        <button class="search-action" @click="onSearch()">搜索</button>
        <button class="reset-action" @click="onReset()">重置</button>
      </div>
    </section>

    <section class="grid-main">
      <GridManager
        :option="option"
        :callback="callback"
        ref="grid"
      ></GridManager>
    </section>

    <!--<section class="bottom-bar">-->
    <!--<button id="init-gm" @click="onInit()" v-bind:disabled="initDisabled">init</button>-->
    <!--<button id="destroy-gm" @click="onDestroy()" v-bind:disabled="destroyDisabled">destroy</button>-->
    <!--</section>-->
  </div>
</template>
<script>
  import GridManager from './GridManager.vue'

  // 模拟的一个Promise请求
  const getBlogList = function (params) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', 'https://www.lovejavascript.com/blogManager/getBlogList');
      // xhr.open('http://kathryn.cn:8080/bus/contract/getContract')
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return
        }
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          resolve(xhr.response)
          // console.log('ContractList.vue 71')
          // console.log(params)
        } else {
          reject(xhr)
        }
      }
      // 一个简单的处理参数的示例
      let formData = ''
      for (let key in params) {
        // console.log('contractList.vue 90')
        // console.log(key)
        if (formData !== '') {
          formData += '&'
        }
        formData += key + '=' + params[key]
      }
      console.log('ContractList.vue 84')
      console.log(formData) // test=22&type=3&cPage=1&pSize=30&sort_createDate=DESC
      xhr.send(formData)
    })
  }
  export default {
    name: "ContractList",
    data() {
      return {
        contractList: [],
        // 表单数据
        formData: {
          title: '',
          content: '',
          type: ''
        },

        // 分类
        TYPE_LIST: [
          {
            value: '1',
            text: 'HTML/CSS'
          },
          {
            value: '2',
            text: 'nodeJS'
          },
          {
            value: '3',
            text: 'javaScript'
          },
          {
            value: '4',
            text: '前端鸡汤'
          },
          {
            value: '5',
            text: 'PM Coffee'
          },
          {
            value: '6',
            text: '前端框架'
          },
          {
            value: '7',
            text: '前端相关'
          }
        ],
        // github地址
        github: 'https://github.com/baukh789',

        // 初始化按纽禁用标识
        // initDisabled: true,

        // 销毁按纽禁用标识
        // destroyDisabled: true,

        // 表格渲染回调函数
        // query为gmOptions中配置的query
        callback: function (query) {
          console.log('callback => ', query);
        },

        // GM所需参数
        option: {
          supportRemind: true,
          gridManagerName: 'contract',
          height: '524px',
          supportAjaxPage: true,
          supportSorting: true,
          isCombSorting: false,
          disableCache: false,
          // settings: 当前的options配置项汇总，包含分页及排序等信息
          // params: 当前请求时所需要协带的参数信息
          ajax_data: (settings, params) => {
            // console.log('ContractList.vue 172')
            // console.log(params)
            return getBlogList(params)
          },
          ajax_type: 'POST',
          supportMenu: true,
          query: {
            test: 22
          },
          pageSize: 30,
          columnData: [
            {
              key: 'pic',
              remind: 'the pic',
              width: '110px',
              align: 'center',
              text: '缩略图',
              // vue template
              template: `<a target="_blank" style="display:block; height:58.5px;" :href="\'https://www.lovejavascript.com/#!zone/blog/content.html?id=\'+row.id" :title="\'点击阅读[\'+ row.title + \']\'">
                                <img style="width:90px;margin:0 auto;" :src="\'https://www.lovejavascript.com/\'+row.pic" :alt="row.title">
                       </a>`
            }, {
              key: 'title',
              remind: 'the title',
              align: 'left',
              text: '标题',
              sorting: '',
              // 使用函数返回 vue template
              template: function () {
                return '<a class="plugin-action" target="_blank" :href="\'https://www.lovejavascript.com/#!zone/blog/content.html?id=\'+ row.id" :title="\'点击阅读[\'+ row.title +\']\'">{{row.title}}</a>';
              }
            }, {
              key: 'type',
              text: '博文分类',
              width: '120',
              align: 'center',
              // 表头筛选条件, 该值由用户操作后会将选中的值以{key: value}的形式覆盖至query参数内。非必设项
              filter: {
                // 筛选条件列表, 数组对象。格式: [{value: '1', text: 'HTML/CSS'}],在使用filter时该参数为必设项。
                option: [
                  {
                    value: '1',
                    text: 'HTML/CSS'
                  },
                  {
                    value: '2',
                    text: 'nodeJS'
                  },
                  {
                    value: '3',
                    text: 'javaScript'
                  },
                  {
                    value: '4',
                    text: '前端鸡汤'
                  },
                  {
                    value: '5',
                    text: 'PM Coffee'
                  },
                  {
                    value: '6',
                    text: '前端框架'
                  },
                  {
                    value: '7',
                    text: '前端相关'
                  }
                ],
                // 筛选选中项,字符串,默认为''.非必设项,选中的过滤条件将会覆盖query
                selected: '',
                // 否为多选, 布尔值, 默认为false。非必设项
                isMultiple: false
              },
              // template: '<select><option v-for="item in TYPE_LIST" :value="item.value" :selected="item.value === row.type.toString()">{{item.text}}</option></select>'
              template: '<option v-for="item in TYPE_LIST" v-if="item.value === row.type.toString()">{{item.text}}</option>'
            }, {
              key: 'info',
              text: '简介',
              width: '100px',
              isShow: false
            }, {
              key: 'username',
              remind: 'the username',
              width: '100px',
              align: 'center',
              text: '作者',
              template: `<a class="plugin-action" v-bind:href="github" target="_blank" :title="\'去看看的\'+ row.username + \'github\'">{{row.username}}</a>`
            }, {
              key: 'createDate',
              remind: 'the createDate',
              width: '100px',
              text: '创建时间',
              sorting: 'DESC',
              // 使用函数返回 htmlString
              template: function (createDate, rowObject) {
                return new Date(createDate).toLocaleDateString();
              }
            }, {
              key: 'lastDate',
              remind: 'the lastDate',
              width: '100px',
              text: '最后修改时间',
              sorting: '',
              // 使用函数返回 htmlString
              template: function (lastDate, rowObject) {
                return new Date(lastDate).toLocaleDateString();
              }
            }, {
              key: 'action',
              remind: 'the action',
              align: 'center',
              width: '100px',
              text: '<span style="color: red">操作</span>',
              // 使用@click
              template: () => {
                return '<span class="plugin-action" @click="delectRow(row, index)">&nbsp;删除&nbsp;</span>' +
                  '<span class="plugin-action" @click="delectRow(row, index)">&nbsp;增加&nbsp;</span>';
              }
            }],
          // 排序后事件
          sortingAfter: function (data) {
            console.log('sortAfter', data)
          }
        }
      }
    },
    components: {
      GridManager
    },

    methods: {
      // 测试vue下的GM事件
      delectRow: function (row, index) {
        if (window.confirm(`确认要删除当前页第[${index}]条的['${row.title}]?`)) {
          console.log('----删除操作开始----')
          this.$refs['grid'].$el.GM('refreshGrid')
          console.log('数据没变是正常的, 因为这只是个示例,并不会真实删除数据.');
          console.log('----删除操作完成----')
          console.log('')
        }
      },

      // 事件: 搜索
      onSearch: function () {
        var params = Object.assign({
          cPage: 1
        }, this.formData)

        this.$refs['grid'].$el.GM('setQuery', params, function () {
          console.log('setQuery执行成功')
        })
      },

      // 事件: 重置
      onReset: function () {
        this.formData.title = ''
        this.formData.content = ''
        this.formData.type = ''
      },

      // 事件: 初始化
      // onInit: function () {
      //   this.$refs['grid'].$el.GM('init', this.option);
      //   this.initDisabled = true
      //   this.destroyDisabled = false
      // },

      // 事件: 销毁
      // onDestroy: function () {
      //   this.$refs['grid'].$el.GM('destroy')
      //   this.initDisabled = false
      //   this.destroyDisabled = true
      // },
      getData: function () {
        console.log('获取数据---单击按钮事件')
      },
      editData: function () {
        console.log('修改数据---单击按钮事件')
      },
      addData: function () {
        console.log('增加数据---单击按钮事件')
      },
      delData: function () {
        console.log('删除数据---单击按钮事件')
      }
    },
    // created() {
    //   //localhost:8080/bus/contract/getContract
    //   //https://api.myjson.com/bins/spafe
    //   this.$http.get('http://localhost:8080/bus/contract/getContract').then(res => {
    //     this.contractList = res.data
    //   }, err => {
    //     console.log('Error,未获取到数据' + err)
    //   })
    // }
  }
</script>

<style lang="less" scoped>
  @import "../../static/less/_variables.less";

  div {
    /*font-size: @font-size-base;*/
    /*color: @brand-primary;*/
    font-size: 14px;
    color: #428bca;
  }

  html, body {
    width: 100%;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }

  table .plugin-action {
    display: inline-block;
    color: steelblue;
    margin-right: 10px;
    cursor: pointer;
    text-decoration: none;
  }

  table .plugin-action:hover {
    text-decoration: underline;
  }

  .search-area {
    padding: 10px 20px;
    border: 1px solid #ccc;
    background: #efefef;
    margin-bottom: 15px;
  }

  .search-area .sa-ele {
    display: inline-block;
    margin-right: 20px;
    font-size: 12px;
  }

  .search-area .sa-ele .se-title {
    display: inline-block;
    margin-right: 10px;
  }

  .search-area .sa-ele .se-con {
    display: inline-block;
    width: 180px;
    height: 24px;
    border: 1px solid #ccc;
    padding: 0 4px;
    line-height: 24px;
  }

  .search-area .sa-ele .search-action, .search-area .sa-ele .reset-action {
    display: inline-block;
    width: 80px;
    height: 26px;
    border: 1px solid #ccc;
    background: #e8e8e8;
    padding: 0 4px;
    line-height: 26px;
    text-align: center;
    cursor: pointer;
    margin-right: 10px;
  }

  .search-area .sa-ele .search-action:hover, .search-area .sa-ele .reset-action:hover {
    opacity: 0.7;
  }

  .bottom-bar {
    background: #f8f8f8;
    padding: 10px;
    margin-top: 10px;
  }

  .bottom-bar button {
    padding: 5px 20px;
    margin-right: 10px;
  }

  /*.grid-main {*/
  /*height: calc(100vh - 64px - 57px);*/
  /*}*/

</style>
