<template>
  <table></table>
</template>

<script>
  import '../../node_modules/gridmanager-vue/css/gm-vue.css'
  import Vue from 'vue'
  import GridManager from 'gridmanager-vue'

  export default {
    name: 'GridManager',
    props: {
      option: {
        type: Object,
        default: {},
      },
      callback: {
        type: Function,
        default: query => query,
      }
    },
    mounted() {
      const _parent = this.$parent

      // 包装ajax_success
      const ajax_success = this.option.ajax_success
      this.option.ajax_success = (respones) => {
        // this.gmData = respones
        ajax_success && ajax_success.call(_parent, respones)
      }

      // 包装ajax_error
      const ajax_error = this.option.ajax_error
      this.option.ajax_error = (error) => {
        // this.gmError = error
        ajax_error && ajax_error.call(_parent, error)
      }

      // 解析Vue 模版, data中的row为固定元素
      // compileList格式为[{el: element, row: 行数据}] {el:tr}
      this.option.compileVue = compileList => {
        // console.log('+++++')
        // console.log(compileList)
        return new Promise(resolve => {
          compileList.forEach(item => {
            const el = item.el
            const attrList = []

            // 递归存储attributes
            function getAllChildren(childNodes) {
              childNodes.length > 0 && [].forEach.call(childNodes, ele => {
                ele.attributes && attrList.push(ele.attributes)
                ele.childNodes.length > 0 && getAllChildren(ele.childNodes)
              })
            }

            // console.log('+++++')
            // console.log(el.childNodes)
            // 为每一tr插入子element
            getAllChildren(el.childNodes)

            // extend methods 每一行获取方法
            const methodsMap = {}
            for (let key in _parent.$options.methods) {
              methodsMap[key] = _parent.$options.methods[key].bind(_parent)
            }

            // extend data 每一行获取数据
            const dataMap = {
              row: item.row,// 行 对象
              index: item.index// 数组索引
            }
            // console.log('+++++')
            // console.log(dataMap)
            Object.assign(dataMap, _parent.$data)

            // create new vue
            new Vue({
              parent: _parent,
              el: el,
              data: () => dataMap,
              methods: methodsMap,
              template: el.outerHTML
            })

            resolve()
          })
        })
      }

      this.$el.GridManager('init', this.option, query => {
        typeof (this.callback) === 'function' && this.callback(query)

        // 当前this指向的是 gridmanager
        // _parent 指向的是调用 gridmanager 的 components
        // GM.setScope 中需要传入的是当前实例化的table和所在域。而这域应该是_parent
        // 不知道什么作用 但不注释的话报找不到setScope函数
        // GridManager.setScope(this.$el, _parent)
      })
    },

    /**
     * 创建前事件
     */
    beforeCreate() {

    },
    created() {

    },
    updated() {

    },

    /**
     * 消毁事件
     */
    destroyed() {
      // 清除右键菜单
      const menuDomList = document.querySelectorAll('.grid-menu[grid-master]');
      [].forEach.call(menuDomList, menuDom => {
        menuDom.parentNode.removeChild(menuDom)
      })

      // 销毁实例
      // 不知道什么作用 但不注释的话报destroy函数控制台报错
      // GridManager.destroy(this.$el)
    }
  }
</script>

<style scoped>

</style>
