import Mock from 'mockjs'

var random = Mock.Random
// 管理等级
Mock.mock('/api/Sbs/gldj',{
  'GldjList':[
    {
      id: '0',
      descriptionZh: '管理等级A'
    },
    {
      id: '1',
      descriptionZh: '管理等级B'
    },
    {
      id: '2',
      descriptionZh: '管理等级C'
    },
    {
      id: '3',
      descriptionZh: '管理等级D'
    }
  ]
})
// 公司信息
Mock.mock('/api/Sbs/gs',{
  'GsList':[
    {
      id: '00',
      descriptionZh: '澳马'
    },
    {
      id: '01',
      descriptionZh: '中安'
    },
    {
      id: '02',
      descriptionZh: '公用所'
    },
    {
      id: '03',
      descriptionZh: '博协'
    },
    {
      id: '04',
      descriptionZh: '忠程'
    },
    {
      id: '05',
      descriptionZh: '多伦斯'
    },
    {
      id: '06',
      descriptionZh: '新新媒体'
    },
    {
      id: '07',
      descriptionZh: '祺壹'
    },
    {
      id: '08',
      descriptionZh: '福阔'
    }
  ]
})
// 工作状态
Mock.mock('/api/Sbs/gzzt',{
  'GzztList': [
    {
      id: '01',
      descriptionZh: '正常工作'
    },
    {
      id: '02',
      descriptionZh: '暂停使用'
    },
    {
      id: '03',
      descriptionZh: '正在维修'
    },
    {
      id: '04',
      descriptionZh: '正在迁移'
    }
  ]
})
// 获取启用片名称信息
Mock.mock('/api/Sbs/qypmc',{
  'QypmcList': [
    {
      id: '01',
      descriptionZh: '分片区域1'
    },
    {
      id: '02',
      descriptionZh: '分片区域2'
    },
    {
      id: '03',
      descriptionZh: '分片区域3'
    },
    {
      id: '04',
      descriptionZh: '分片区域4'
    }
  ]
})
// 获取品牌型号信息
Mock.mock('/api/Sbs/ppxh',{
  'PpxhList': [
    {
      value: '01',
      label: '三星',
      children: [
        {
          value: '0101',
          label: 'A-4463'
        },
        {
          value: '0102',
          label: 'B-1024'
        }
      ]
    },
    {
      value: '02',
      label: '华为',
      children: [
        {
          value: '0201',
          label: 'C-4463'
        },
        {
          value: '0202',
          label: 'D-1024'
        }
      ]
    },
    {
      value: '03',
      label: '索尼',
      children: [
        {
          value: '0301',
          label: 'E-4463'
        },
        {
          value: '0302',
          label: 'F-1024'
        }
      ]
    }
  ]
})
// 行政区域信息
Mock.mock('/api/Sbs/ssxzqy',{
  'SsxzqyList': [
    {
      id: '01',
      descriptionZh: '静安区'
    },
    {
      id: '02',
      descriptionZh: '杨浦区'
    },
    {
      id: '03',
      descriptionZh: '徐家汇'
    },
    {
      id: '04',
      descriptionZh: '普陀区'
    }
  ]
})
// 获取合同信息

// 获取设备基本信息
// RFID4G
Mock.mock('/api/rfid4g/basic/jt1', {
  'totalRow': 20,
  'Rfid4gList|20': [
    {
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azzp': '查看照片',
      'qypbh|5': /[0-9]/,
      'qypmc|1': ['分片区域1', '分片区域2', '分片区域3'],
      'ssxzqy|1': ['杨浦区', '徐家汇', '静安区', '普陀区'],
      'gldj|1': /[A-D]/,
      'sbppdm|1': ['01','02','03'],
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxhdm|1': ['0101','0102','0201'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'simkh|20': /[0-9]/,
      'sbgsjtdm|1': ['01', '02'],
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsdm|1': ['0101', '0102', '0103', '0104', '0105'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscddm|1': ['010101', '010102', '010103', '010104', '010105'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'sbgsxldm|1': ['01010101', '01010102', '01010103', '01010104', '01010105'],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'sbqyrq': random.date(),
      'sbgxrq': random.date(),
      'sbbfrq': random.date(),
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所'],
      'zdbh|5': /[0-9]/,
      'jzbh|10': /[0-9]/,
      'ewmbh|10': /[0-9]/,
      'tmbh|10': /[0-9]/
    }
  ]
})
// RFID4G场站
Mock.mock('/api/rfid4gcz/basic/jt1', {
  'totalRow': 20,
  'rfid4gczList|20': [
    {
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azwz|1': ['一层', '二层', '三层'],
      'azzp': '查看照片',
      'qypbh|5': /[0-9]/,
      'qypmc|1': ['分片区域1', '分片区域2', '分片区域3'],
      'gldj|1': /[A-D]/,
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'simkh|20': /[0-9]/,
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
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
// RFID4G场站安装地点信息
Mock.mock('/api/rfid4g_location/basic', {
  'rfid4g_locationList|100': [
    {
      'htbh|10': /[0-9]/,
      'sblb': 'RFID4G（场站）',
      'azddmc|1': ['安装地点A', '安装地点B', '安装地点C'],
      'tccbh|12': /[0-9]/,
      'tccmph|16': /[0-9]/,
      'tccmc|1': ['停车场名称1', '停车场名称2', '停车场名称3'],
      'tccmj|1': ['3700', '2600', '1102'],
      'tccghtfls|1': ['100', '70', '50'],
      'tccsjtfls|1': ['95', '65', '44'],
      'jcmjzs|1': ['4', '3', '2'],
      'tcclcjzs|1': ['4', '3', '2']
    }
  ]
})
// 车辆标签
Mock.mock('/api/clbq/basic/jt1', {
  'totalRow': 20,
  'ClbqList|20': [
    {
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azzp': '查看照片',
      'qypbh|5': /[0-9]/,
      'qypmc|1': ['分片区域1', '分片区域2', '分片区域3'],
      'ancph': /沪-[A-Z]-\d{6}/,
      'azclbh|10': /[0-9]/,
      'azcldllbdm|1': ['柴油车', '新能源车', '双源电车'],
      // 'ancldyxlj|4-6': ['56','58','1001','202','2222','868'],
      'gldj|1': /[A-D]/,
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'bqdyjzqd|1': ['起点站A', '起点站B', '起点站C'],
      'bqdyjzzd|1': ['终点站A', '终点站B', '终点站C'],
      // 'bqdyjzqjzjh|2-3': ['起点站A','起点站B','起点站C','终点站A','终点站B','终点站C'],
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
// 车载一体机
Mock.mock('/api/czytj/basic/jt1', {
  'totalRow': 20,
  'CzytjList|20': [
    {
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azzp': '查看照片',
      'qypbh|5': /[0-9]/,
      'qypmc|1': ['分片区域1', '分片区域2', '分片区域3'],
      'azclcph': /沪-[A-Z]-\d{6}/,
      'azclzbh|10': /[0-9]/,
      'gldj|1': /[A-D]/,
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'qxd|1': ['高清', '标清', '驾驶行为分析', '防灾存储设备'],
      'cnsxts|1': /[2-4]/,
      'cwsxts|1': /[2-4]/,
      'simkh|20': /[0-9]/,
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
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
// 报到机
Mock.mock('/api/bdj/basic/jt1', {
  'totalRow': 20,
  'BdjList|20': [
    {
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azwz|1': ['一层', '二层', '三层'],
      'azzp': '查看照片',
      'qypbh|5': /[0-9]/,
      'qypmc|1': ['分片区域1', '分片区域2', '分片区域3'],
      'gldj|1': /[A-D]/,
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'simkh|20': /[0-9]/,
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
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
// 一程一检
Mock.mock('/api/ycyj/basic/jt1', {
  'totalRow': 20,
  'YcyjList|20': [
    {
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azdd|1': ['宝杨路停车场A', '宝杨路停车场B', '宝杨路停车场C'],
      'azzp': '查看照片',
      'qypbh|5': /[0-9]/,
      'qypmc|1': ['分片区域1', '分片区域2', '分片区域3'],
      'gldj|1': /[A-D]/,
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'simkh|20': /[0-9]/,
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'zdbh|5': /[0-9]/,
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
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
// 站点通
Mock.mock('/api/zdt/basic/jt1', {
  'totalRow': 20,
  'ZdtList|20': [
    {
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sblb|1': ['主机', '4G无线路由器', 'IP通话'],
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azzp': '查看照片',
      'qypbh|5': /[0-9]/,
      'qypmc|1': ['分片区域1', '分片区域2', '分片区域3'],
      'gldj|1': /[A-D]/,
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'simkh|20': /[0-9]/,
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'zdbh|5': /[0-9]/,
      'sbgszdmc|1': ['上海站', '人民广场站', '理工站'],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'sbqyrq': random.date(),
      'sbgxrq': random.date(),
      'sbbfrq': random.date(),
      'ztbh|10': /[0-9]/,
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所'],
      'ewmbh|10': /[0-9]/,
      'tmbh|10': /[0-9]/
    }
  ]
})
// 55寸屏
Mock.mock('/api/ffcp/basic/jt1', {
  'totalRow': 20,
  'FfcpList|20': [
    {
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azzp': '查看全景照片',
      'azzpzmz': '查看正面照片',
      'azzpcmz': '查看侧面照片',
      'qypbh|5': /[0-9]/,
      'qypmc|1': ['分片区域1', '分片区域2', '分片区域3'],
      'azdd|1': ['宝杨路停车场A', '宝杨路停车场B', '宝杨路停车场C'],
      'ztmc|1': ['站亭名称A', '站亭名称B', '站亭名称C'],
      'azddmc|1': ['安装地点A', '安装地点C', '安装地点B'],
      'ssqymc|1': ['静安区', '杨浦区', '普陀区'],
      'gztj|1': ['阳光充足', '阴蔽处'],
      'gldj|1': /[A-D]/,
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'sbccmc|1': ['55寸屏', '32寸屏'],
      'gdffmc|1': ['工业电', '太阳能'],
      'simkh|20': /[0-9]/,
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'zdbh|5': /[0-9]/,
      'sbgszdmc|1': ['上海站', '人民广场站', '理工站'],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'sbqyrq': random.date(),
      'sbgxrq': random.date(),
      'sbbfrq': random.date(),
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所'],
      'ztbh|10': /[0-9]/,
      'pbh|10': /[0-9]/,
      'ewmbh|10': /[0-9]/,
      'tmbh|10': /[0-9]/
    }
  ]
})
// 站杆预报屏
Mock.mock('/api/zgybp/basic/jt1', {
  'totalRow': 20,
  'ZgybpList|20': [
    {
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azzp': '查看全景照片',
      'azzpzmz': '查看正面照片',
      'azzpcmz': '查看侧面照片',
      'qypbh|5': /[0-9]/,
      'qypmc|1': ['分片区域1', '分片区域2', '分片区域3'],
      'ssqymc|1': ['静安区', '杨浦区', '普陀区'],
      'azddmc|1': ['安装地点A', '安装地点C', '安装地点B'],
      'gldj|1': /[A-D]/,
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'sbcz|1': ['墨水屏', 'OLED屏'],
      'gztj|1': ['阳光直射', '阴影处'],
      'sbccmc|1': ['55寸屏', '32寸屏'],
      'gdffmc|1': ['工业电', '太阳能'],
      'simkh|20': /[0-9]/,
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'zdbh|5': /[0-9]/,
      'sbgszdmc|1': ['上海站', '人民广场站', '理工站'],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'sbqyrq': random.date(),
      'sbgxrq': random.date(),
      'sbbfrq': random.date(),
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所'],
      'ztbh|10': /[0-9]/,
      'pbh|10': /[0-9]/,
      'ewmbh|10': /[0-9]/,
      'tmbh|10': /[0-9]/
    }
  ]
})
// 统计信息
Mock.mock('/api/Sbs/statistics/jt1', {
  'SbStatisticsList': [
    {
      'sblb': 'RFID4G',
      'sb_sum|1000-3000': 666,
      'sb_online|900-3000': 666,
      'sb_offline|0-50': 6,
      'sb_sxl|1': ['72.27%'],
      'sb_update|0-20': 6,
      'sb_down|0-20': 6,
      'sb_change|0-20': 6,
      'gz_sum|0-20': 6,
      'sb_check|0-20': 6,
      'sb_report|0-10': 6,
      'fix_sum|0-20': 6,
      'today|0-10': 6,
      'nextday|0-10': 6,
      'threeday|0-10': 6,
      'moreday|0-10': 6,
      'bad|0-10': 6,
      'replace|0-10': 6
    },
    {
      'sblb': 'RFID4G（场站）',
      'sb_sum|1000-3000': 666,
      'sb_online|900-3000': 666,
      'sb_offline|0-50': 6,
      'sb_sxl|1': ['72.27%'],
      'sb_update|0-20': 6,
      'sb_down|0-20': 6,
      'sb_change|0-20': 6,
      'gz_sum|0-20': 6,
      'sb_check|0-20': 6,
      'sb_report|0-10': 6,
      'fix_sum|0-20': 6,
      'today|0-10': 6,
      'nextday|0-10': 6,
      'threeday|0-10': 6,
      'moreday|0-10': 6,
      'bad|0-10': 6,
      'replace|0-10': 6
    },
    {
      'sblb': '车辆标签',
      'sb_sum|1000-3000': 666,
      'sb_online|900-3000': 666,
      'sb_offline|0-50': 6,
      'sb_sxl|1': ['72.27%'],
      'sb_update|0-20': 6,
      'sb_down|0-20': 6,
      'sb_change|0-20': 6,
      'gz_sum|0-20': 6,
      'sb_check|0-20': 6,
      'sb_report|0-10': 6,
      'fix_sum|0-20': 6,
      'today|0-10': 6,
      'nextday|0-10': 6,
      'threeday|0-10': 6,
      'moreday|0-10': 6,
      'bad|0-10': 6,
      'replace|0-10': 6
    },
    {
      'sblb': '车载一体机',
      'sb_sum|1000-3000': 666,
      'sb_online|900-3000': 666,
      'sb_offline|0-50': 6,
      'sb_sxl|1': ['72.27%'],
      'sb_update|0-20': 6,
      'sb_down|0-20': 6,
      'sb_change|0-20': 6,
      'gz_sum|0-20': 6,
      'sb_check|0-20': 6,
      'sb_report|0-10': 6,
      'fix_sum|0-20': 6,
      'today|0-10': 6,
      'nextday|0-10': 6,
      'threeday|0-10': 6,
      'moreday|0-10': 6,
      'bad|0-10': 6,
      'replace|0-10': 6
    },
    {
      'sblb': '报到机',
      'sb_sum|1000-3000': 666,
      'sb_online|900-3000': 666,
      'sb_offline|0-50': 6,
      'sb_sxl|1': ['72.27%'],
      'sb_update|0-20': 6,
      'sb_down|0-20': 6,
      'sb_change|0-20': 6,
      'gz_sum|0-20': 6,
      'sb_check|0-20': 6,
      'sb_report|0-10': 6,
      'fix_sum|0-20': 6,
      'today|0-10': 6,
      'nextday|0-10': 6,
      'threeday|0-10': 6,
      'moreday|0-10': 6,
      'bad|0-10': 6,
      'replace|0-10': 6
    },
    {
      'sblb': '一程一检',
      'sb_sum|1000-3000': 666,
      'sb_online|900-3000': 666,
      'sb_offline|0-50': 6,
      'sb_sxl|1': ['72.27%'],
      'sb_update|0-20': 6,
      'sb_down|0-20': 6,
      'sb_change|0-20': 6,
      'gz_sum|0-20': 6,
      'sb_check|0-20': 6,
      'sb_report|0-10': 6,
      'fix_sum|0-20': 6,
      'today|0-10': 6,
      'nextday|0-10': 6,
      'threeday|0-10': 6,
      'moreday|0-10': 6,
      'bad|0-10': 6,
      'replace|0-10': 6
    },
    {
      'sblb': '站点通',
      'sb_sum|1000-3000': 666,
      'sb_online|900-3000': 666,
      'sb_offline|0-50': 6,
      'sb_sxl|1': ['72.27%'],
      'sb_update|0-20': 6,
      'sb_down|0-20': 6,
      'sb_change|0-20': 6,
      'gz_sum|0-20': 6,
      'sb_check|0-20': 6,
      'sb_report|0-10': 6,
      'fix_sum|0-20': 6,
      'today|0-10': 6,
      'nextday|0-10': 6,
      'threeday|0-10': 6,
      'moreday|0-10': 6,
      'bad|0-10': 6,
      'replace|0-10': 6
    },
    {
      'sblb': '55寸屏',
      'sb_sum|1000-3000': 666,
      'sb_online|900-3000': 666,
      'sb_offline|0-50': 6,
      'sb_sxl|1': ['72.27%'],
      'sb_update|0-20': 6,
      'sb_down|0-20': 6,
      'sb_change|0-20': 6,
      'gz_sum|0-20': 6,
      'sb_check|0-20': 6,
      'sb_report|0-10': 6,
      'fix_sum|0-20': 6,
      'today|0-10': 6,
      'nextday|0-10': 6,
      'threeday|0-10': 6,
      'moreday|0-10': 6,
      'bad|0-10': 6,
      'replace|0-10': 6
    },
    {
      'sblb': '站杆预报屏',
      'sb_sum|1000-3000': 666,
      'sb_online|900-3000': 666,
      'sb_offline|0-50': 6,
      'sb_sxl|1': ['72.27%'],
      'sb_update|0-20': 6,
      'sb_down|0-20': 6,
      'sb_change|0-20': 6,
      'gz_sum|0-20': 6,
      'sb_check|0-20': 6,
      'sb_report|0-10': 6,
      'fix_sum|0-20': 6,
      'today|0-10': 6,
      'nextday|0-10': 6,
      'threeday|0-10': 6,
      'moreday|0-10': 6,
      'bad|0-10': 6,
      'replace|0-10': 6
    }
  ]
})
// 获取设备迁移信息
// RFID4G
Mock.mock('/api/rfid4g/move/jt1', {
  'totalRow': 30,
  'Rfid4gMoveList|30': [
    {
      'sbqybh': random.date(),
      'qydh|12': /[0-9]/,
      'sbbh|12': /[0-9]/,
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'sbysdz|1': ['原始地址A', '原始地址B', '原始地址C'],
      'sbqymbdz|1': ['目标地址A', '目标地址B', '目标地址C'],
      'sbqyczrygh|5': /[0-9]/,
      'sbqyczryxm|1': ['操作员A', '操作员B', '操作员C'],
      'sbqysprygh|5': /[0-9]/,
      'sbqyspryxm|1': ['审批员A', '审批员B', '审批员C'],
      'sbqybz': '查看备注'
    }
  ]
})
// 获取设备修理信息
// RFID4G
Mock.mock('/api/rfid4g/fix/jt1', {
  'totalRow': 30,
  'Rfid4gFixList|30': [
    {
      'wxsj': random.date(),
      'wxdh|12': /[0-9]/,
      'ybxdh|12': /[0-9]/,
      'bxsbbh|12': /[0-9]/,
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'xlgs': /[0-9]/,
      'xfzt|1': ['正在修复', '已修复', '不能修复', '暂停使用'],
      'xffs|1': ['现场修理', '回厂修理', '远程修理'],
      'xfnr': '查看修复内容',
      'xfrdm|5': /[0-9]/,
      'xfrmc|1': ['修复人A', '修复人B', '修复人C'],
      'bmzgmc|1': ['部门主管A', '部门主管B', '部门主管C'],
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所']
    }
  ]
})
// 获取设备巡检信息
// RFID4G
Mock.mock('/api/rfid4g/check/jt1',{
  'totalRow': 30,
  'Rfid4gCheckList|30': [
    {
      'xjsj': random.date(),
      'xjdh|12': /[0-9]/,
      'xjsbbh|12': /[0-9]/,
      'sbzt|1': ['工作正常', '工作异常', '待核实', '暂停使用'],
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'xjbz': '查看巡检备注',
      'xjydm|5': /[0-9]/,
      'xjygmc|1': ['巡检人A', '巡检人B', '巡检人C'],
      'bmzgmc|1': ['部门主管A', '部门主管B', '部门主管C'],
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所'],
      'sbtxm|10': /[0-9]/,
      'sbewm|10': /[0-9]/
    }
  ]
})
// 获取设备报修信息
// RFID4G
Mock.mock('/api/rfid4g/report/jt1',{
  'totalRow': 30,
  'Rfid4gReportList|30': [
    {
      'bxsj': random.date(),
      'bxdh|12': /[0-9]/,
      'bxsbbh|12': /[0-9]/,
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'bxnr': '查看报修备注',
      'bxlx|1': ['系统自检','人工报修'],
      'bxfs|1': ['系统预警报修','平台报修','微信报修','QQ报修','电话报修'],
      'bxgzmc|1': ['主机故障','4G无线路由器故障','IP通话故障','其他故障'],
      'xjydm|5': /[0-9]/,
      'xjygmc|1': ['巡检员A', '巡检员B', '巡检员C'],
      'bmzgmc|1': ['部门主管A', '部门主管B', '部门主管C'],
      'bxrydm|5': /[0-9]/,
      'bxrymc|1': ['报修员A', '报修员B', '报修员C'],
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所'],
      'sbtxm|10': /[0-9]/,
      'sbewm|10': /[0-9]/
    }
  ]
})
