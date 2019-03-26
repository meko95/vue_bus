import Mock from 'mockjs'

var random = Mock.Random
/*配置接口：url地址及数据*/
Mock.mock('http://mysite/weblist', {
  weblist: [
    {type: 'html'},
    {type: 'css'},
    {type: 'javascript'}
  ]
});
Mock.mock('http://mysite/userlist', {
  userlist: [
    {name: 'Mary'},
    {name: 'Tom'},
    {name: 'Lucy'}
  ]
})
// RFID4G场站
Mock.mock('http://localhost:8888/api/rfid4gcz/basic/jt1', {
  totalRow: 10,
  'rfid4gczList|10': [
    {
      'sbzbh|12': /[0-9]/,
      'qypbh|5': /[0-9]/,
      'gldj|1': /[A-D]/,
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'simkh|20': /[0-9]/,
      'sbgsjtmc|1': ['上海久事一集团','上海久事二集团'],
      'sbgsgsmc|1': ['巴士一公司','巴士二公司','巴士三公司','巴士四公司','巴士五公司'],
      'sbgscdmc|1': ['一车队','二车队','三车队','四车队','五车队','六车队','七车队','八车队','九车队',],
      'sbgsxlmc|1': ['56','57','101','1002','1111','66'],
      'sbqyrq': random.date(),
      'sbgxrq': random.date(),
      'sbbfrq': random.date(),
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所'],
      'ewmbh|10': /[0-9]/,
      'tmbh|10': /[0-9]/
    }
  ]
})
// 车辆标签
Mock.mock('http://localhost:8888/api/clbq/basic/jt1', {
  totalRow: 10,
  'ClbqList|10': [
    {
      'sbzbh|12': /[0-9]/,
      'qypbh|5': /[0-9]/,
      'gldj|1': /[A-D]/,
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'simkh|20': /[0-9]/,
      'sbgsjtmc|1': ['上海久事一集团','上海久事二集团'],
      'sbgsgsmc|1': ['巴士一公司','巴士二公司','巴士三公司','巴士四公司','巴士五公司'],
      'sbgscdmc|1': ['一车队','二车队','三车队','四车队','五车队','六车队','七车队','八车队','九车队',],
      'sbgsxlmc|1': ['56','57','101','1002','1111','66'],
      'sbqyrq': random.date(),
      'sbgxrq': random.date(),
      'sbbfrq': random.date(),
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所'],
      'ewmbh|10': /[0-9]/,
      'tmbh|10': /[0-9]/
    }
  ]
})
// 获取 mock.Random 对象
const Random = Mock.Random
const produceNewsData = function () {
  let articles = []
  for (let i = 0; i < 100; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(newArticleObject)
  }
  return {
    articles: articles
  }
}
Mock.mock('http://mysite/produceNews', 'post', produceNewsData)
