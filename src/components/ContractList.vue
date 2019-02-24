<template>
	<div>

		<Header></Header>

		<div id="title">
			合同列表
		</div>
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
				<button class="reset-action" @click="onAdd()">新增</button>
			</div>
		</section>

		<section class="grid-main">
			<GridManager
					:option="option"
					:callback="callback"
					ref="grid"
			></GridManager>
		</section>
	</div>
</template>
<script>
    import GridManager from '@/components/GridManager'
    import Header from '@/components/Header'
    // 模拟的一个Promise请求
    const getBlogList = function (params) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
			// https://www.lovejavascript.com/blogManager/getBlogList
            // http://kathryn.cn:8080/bus/contract/getContractList
            xhr.open('POST', 'https://www.lovejavascript.com/blogManager/getBlogList');
            // xhr.open('http://kathryn.cn:8080/bus/contract/getContract')
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) {
                    return
                }
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {

                    // console.log(xhr.response)
					// console.log(JSON.parse(xhr.response))
					// console.log(JSON.parse(xhr.response).rowsList)
					// resolve(JSON.parse(xhr.response).rowsList)
					resolve(xhr.response)
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
            console.log('ContractList.vue 79')
            console.log('utl:'+formData) // test=22&type=3&cPage=1&pSize=30&sort_createDate=DESC
            xhr.send(formData)
        })
    }
    export default {
        name: "ContractList",
        data() {
            return {
                // contractList: [],

                // ----表单数据----
                formData: {
                    title: '',
                    content: '',
                    type: ''
                },

                // 分类
                TYPE_LIST: [
                    {
                        value: '1',
                        text: '主'
                    },
                    {
                        value: '2',
                        text: '分包'
                    }
                ],
                // github地址
                github: 'https://github.com/baukh789',

                // 表格渲染回调函数
                // query为gmOptions中配置的query
                callback: function (query) {
                    console.log('callback => ', query);
                },

                // GM所需参数
                option: {
                    supportRemind: true,
                    gridManagerName: 'contract',
                    height: '594px',
                    supportAjaxPage: true,
                    supportSorting: true,
                    isCombSorting: false,
                    disableCache: false,
                    // settings: 当前的options配置项汇总，包含分页及排序等信息
                    // params: 当前请求时所需要协带的参数信息
                    ajax_data: (settings, params) => {
                        console.log('ContractList.vue 129')
                        console.log(params)
                        return getBlogList(params)
                    },
                    ajax_type: 'POST',
                    supportMenu: true,
                    query: {
                        // url查询时传的参数
                        // test: 22
                    },
                    pSize: 30,
                    columnData: [
                        {
                            text: '编号',
                            key: 'htbh',
                            width: '160px',
                            align: 'center',
                            template: '<span>{{row.htbh}}111111111111</span>'
                        },
                        {
                            text: '类别',
                            // 表头筛选条件, 该值由用户操作后会将选中的值以{key: value}的形式覆盖至query参数内。非必设项
                            filter: {
                                // 筛选条件列表, 数组对象。格式: [{value: '1', text: 'HTML/CSS'}],在使用filter时该参数为必设项。
                                option: [
                                    {
                                        value: '1',
                                        text: '主'
                                    },
                                    {
                                        value: '2',
                                        text: '分包'
                                    }
                                ],
                                // 筛选选中项,字符串,默认为''.非必设项,选中的过滤条件将会覆盖query
                                selected: '',
                                // 否为多选, 布尔值, 默认为false。非必设项
                                isMultiple: false
                            },
                            key: 'htlb',
                            width: '55px',
                            align: 'center',
							// v-if="item.value === row.htlb.toString()" :selected="item.value === row.htlb.toString()"
							// 筛选功能待实现
                            template: '<span>{{row.htlb}}主</span>'
                        },
                        {
                            text: '名称',
                            key: 'htmc',
                            width: '240px',
                            align: 'center',
                            template: '<span>{{row.htmc}}合同名称合同名称合同名称</span>'
                        },
                        {
                            text: '甲方',
                            key: 'jfmc',
                            width: '100px',
                            align: 'center',
                            template: '<span>{{row.jfmc}}甲A</span>'
                        },
                        {
                            text: '乙方',
                            key: 'yfmc',
                            width: '100px',
                            align: 'center',
                            template: '<span>{{row.yfmc}}乙A</span>'
                        },
                        {
                            text: '丙方',
                            key: 'bfmc',
                            width: '100px',
                            align: 'center',
                            template: '<span>{{row.bfmc}}丙A</span>'
                        },
                        {
                            text: '签订日期',
                            remind: '默认降序',
                            key: 'qdrq',
                            width: '55px',
                            sorting: 'DESC',
                            // 使用函数返回 htmlString
                            template: function (qdrq, rowObject) {
                                // return new Date(qdrq).toLocaleDateString()
                                // row.qdrq
                                return new Date().toLocaleDateString()
                            }
                        },
                        {
                            text: '期限',
                            remind: '单位：月',
                            key: 'htqx',
                            width: '55px',
                            align: 'center',
                            template: '<span>{{row.htqx}}16</span>'
                        },
                        {
                            text: '付款方式',
                            key: 'fkfs',
                            width: '55px',
                            align: 'center',
                            template: '<span>{{row.fkfs}}支付宝</span>'
                        },
                        {
                            text: '寿命',
                            remind: '单位：年',
                            key: 'sbsysm',
                            width: '55px',
                            align: 'center',
                            template: '<span>{{row.sbsysm}}5</span>'
                        },
                        {
                            text: '设备质包款',
                            remind: '单位：万元',
                            key: 'sbzbk',
                            width: '55px',
                            align: 'center',
                            template: '<span>{{row.sbzbk}}16.5</span>'
                        },
                        {
                            text: '设备质保期',
                            remind: '单位：年',
                            key: 'sbzbq',
                            width: '55px',
                            align: 'center',
                            template: '<span>{{row.sbzbq}}3</span>'
                        },
                        {
                            text: '其他条款',
                            key: 'qttk',
                            width: '55px',
                            align: 'center',
                            // :href="'https://www.lovejavascript.com/#!zone/blog/content.html?id='+ row.id" :title="'点击阅读['+ 其他条款 +']'"
                            template: '<a class="plugin-action" target="_blank" href="#" title="点击阅读">{{row.qttk}}其他条款</a>'
                        },
                        {
                            key: 'action',
                            remind: 'the action',
                            align: 'center',
                            width: '100px',
                            text: '<span style="color: gray">操作</span>',
                            // 使用@click
                            template: () => {
                                return '<span class="plugin-action" @click="delRow(row, index)">&nbsp;删除&nbsp;</span>' +
                                    '<span class="plugin-action" @click="editRow(row, index)">&nbsp;修改&nbsp;</span>';
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
            GridManager,
            Header
        },
        methods: {
            // 测试vue下的GM事件
            delRow: function (row, index) {
                if (window.confirm(`确认要删除当前页第[${index}]条的['${row.title}]?`)) {
                    console.log('----删除操作开始----')
                    this.$refs['grid'].$el.GM('refreshGrid')
                    console.log('数据没变是正常的, 因为这只是个示例,并不会真实删除数据.');
                    console.log('----删除操作完成----')
                }
            },
            editRow: function (row, index) {
                if (window.confirm(`确认要修改当前页第[${index}]条的['${row.title}]?`)) {
                    console.log('----修改操作开始----')
                    this.$refs['grid'].$el.GM('refreshGrid')
                    console.log('数据没变是正常的, 因为这只是个示例,并不会真实修改数据.');
                    console.log('----修改操作完成----')
                }
            },
            // 事件:搜索
            onSearch: function () {
                var params = Object.assign({
                    cPage: 1
                }, this.formData)
                this.$refs['grid'].$el.GM('setQuery', params, function () {
                    console.log('setQuery执行成功')
                })
            },
            // 事件:重置
            onReset: function () {
                this.formData.title = ''
                this.formData.content = ''
                this.formData.type = ''
            },
            // 事件:新增
            onAdd: function () {
                console.log('----新增操作开始----')
            },
            // 事件: 初始化
            onInit: function () {
                this.$refs['grid'].$el.GM('init', this.option);
            },
            // 事件: 销毁
            onDestroy: function () {
                this.$refs['grid'].$el.GM('destroy')
            }
        },
        beforeDestroy() {
            this.onDestroy()
        }
    }
</script>

<style lang="less" scoped>
	#title {
		height: 26px;
		text-align: center;
		background-color: #428bca;
		color: white;
		font-size: 18px;
		margin-top: 0px;
	}

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

</style>
