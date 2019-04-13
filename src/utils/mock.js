import Mock from 'mockjs'
var random = Mock.Random
// 管理等级
Mock.mock('/api/Sbs/gldj', {
  'GldjList': [
    {
      id: '01',
      descriptionZh: '管理等级A'
    },
    {
      id: '02',
      descriptionZh: '管理等级B'
    },
    {
      id: '03',
      descriptionZh: '管理等级C'
    },
    {
      id: '04',
      descriptionZh: '管理等级D'
    }
  ]
})
// 公司信息
Mock.mock('/api/Sbs/gs', {
  'GsList': [
    {
      id: '01',
      descriptionZh: '澳马'
    },
    {
      id: '02',
      descriptionZh: '中安'
    },
    {
      id: '03',
      descriptionZh: '公用所'
    },
    {
      id: '04',
      descriptionZh: '博协'
    },
    {
      id: '05',
      descriptionZh: '忠程'
    },
    {
      id: '06',
      descriptionZh: '多伦斯'
    },
    {
      id: '07',
      descriptionZh: '新新媒体'
    },
    {
      id: '08',
      descriptionZh: '祺壹'
    },
    {
      id: '09',
      descriptionZh: '福阔'
    }
  ]
})
// 工作状态
Mock.mock('/api/Sbs/gzzt', {
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
// 获取品牌型号信息
Mock.mock('/api/Sbs/ppxh', {
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
Mock.mock('/api/Sbs/ssxzqy', {
  'SsxzqyList': [
    {
      id: '0001',
      descriptionZh: '静安区'
    },
    {
      id: '0002',
      descriptionZh: '杨浦区'
    },
    {
      id: '0003',
      descriptionZh: '徐家汇'
    },
    {
      id: '0004',
      descriptionZh: '普陀区'
    }
  ]
})
// 获取动力类别信息
Mock.mock('/api/Sbs/dllb', {
  'DllbList': [
    {
      id: '01',
      descriptionZh: '柴油车'
    },
    {
      id: '02',
      descriptionZh: '新能源车'
    },
    {
      id: '03',
      descriptionZh: '双源电车'
    }
  ]
})
// 获取设备类别信息
Mock.mock('/api/Sbs/sblb', {
  'SblbList': [
    {
      id: '01',
      descriptionZh: '主机'
    },
    {
      id: '02',
      descriptionZh: 'IP通话'
    },
    {
      id: '03',
      descriptionZh: '4G无线路由器'
    }
  ]
})
Mock.mock('/api/Sbs/gztj', {
  'GztjList': [
    {
      id: '01',
      descriptionZh: '阳光直射'
    },
    {
      id: '02',
      descriptionZh: '阴影处'
    },
    {
      id: '03',
      descriptionZh: '光线充足'
    },
    {
      id: '04',
      descriptionZh: '光线不足'
    }
  ]
})
// 获取站点信息
Mock.mock('/api/Sbs/zd', {
  'ZdList': [
    {
      id: '00001',
      descriptionZh: '站点名称A'
    },
    {
      id: '00002',
      descriptionZh: '站点名称B'
    },
    {
      id: '00003',
      descriptionZh: '站点名称C'
    },
    {
      id: '00004',
      descriptionZh: '站点名称D'
    }
  ]
})
// 获取基站信息
Mock.mock('/api/Sbs/jz', {
  'JzList': [
    {
      id: '0000000001',
      descriptionZh: '基站名称A'
    },
    {
      id: '0000000002',
      descriptionZh: '基站名称B'
    },
    {
      id: '0000000003',
      descriptionZh: '基站名称C'
    },
    {
      id: '0000000004',
      descriptionZh: '基站名称D'
    }
  ]
})
// 获取分片信息
Mock.mock('/api/Sbs/fp', {
  'FpList': [
    {
      id: '00001',
      descriptionZh: '分片区域A'
    },
    {
      id: '00002',
      descriptionZh: '分片区域B'
    },
    {
      id: '00003',
      descriptionZh: '分片区域C'
    },
    {
      id: '00004',
      descriptionZh: '分片区域D'
    }
  ]
})
// 获取设备清晰度信息
Mock.mock('/api/Sbs/qxd', {
  'QxdList': [
    {
      id: '01',
      descriptionZh: '高清'
    },
    {
      id: '02',
      descriptionZh: '标清'
    },
    {
      id: '03',
      descriptionZh: '驾驶行为分析'
    },
    {
      id: '04',
      descriptionZh: '防灾存储设备'
    }
  ]
})
// 获取站亭信息
Mock.mock('/api/Sbs/zt', {
  'ZtList': [
    {
      id: '00001',
      descriptionZh: '站亭名称A'
    },
    {
      id: '00002',
      descriptionZh: '站亭名称B'
    },
    {
      id: '00003',
      descriptionZh: '站亭名称C'
    },
    {
      id: '00004',
      descriptionZh: '站亭名称D'
    }
  ]
})
// 获取光照条件信息
Mock.mock('/api/Sbs/gztj', {
  'GztjList': [
    {
      id: '01',
      descriptionZh: '阳光充足'
    },
    {
      id: '02',
      descriptionZh: '阴蔽处'
    }
  ]
})
// 获取尺寸信息
Mock.mock('/api/Sbs/sbcc', {
  'SbccList': [
    {
      id: '01',
      descriptionZh: '55寸屏'
    },
    {
      id: '02',
      descriptionZh: '32寸屏'
    }
  ]
})
// 获取供电方法信息
Mock.mock('/api/Sbs/gdff', {
  'GdffList': [
    {
      id: '01',
      descriptionZh: '工业电'
    },
    {
      id: '02',
      descriptionZh: '太阳能'
    }
  ]
})
// 获取屏幕材质信息
Mock.mock('/api/Sbs/pcz', {
  'PczList': [
    {
      id: '01',
      descriptionZh: '墨水屏'
    },
    {
      id: '02',
      descriptionZh: 'OLED屏'
    }
  ]
})
// 获取站牌信息
Mock.mock('/api/Sbs/zp', {
  'ZpList': [
    {
      id: '0001',
      descriptionZh: '站牌名称A'
    },
    {
      id: '0002',
      descriptionZh: '站牌名称B'
    },
    {
      id: '0003',
      descriptionZh: '站牌名称C'
    },
    {
      id: '0004',
      descriptionZh: '站牌名称D'
    },
  ]
})
// 获取安装地点信息
Mock.mock('/api/Sbs/azdd',{
  'AzddList':[
    {
      id: '0001',
      descriptionZh: '宝杨路停车场A'
    },
    {
      id: '0002',
      descriptionZh: '宝杨路停车场B'
    },
    {
      id: '0003',
      descriptionZh: '宝杨路停车场C'
    }
  ]
})
// 获取合同类别信息
Mock.mock('/api/contract/htlb',{
  'HtlbList': [
    {
      id: '01',
      descriptionZh: '主合同'
    },
    {
      id: '02',
      descriptionZh: '分包合同'
    }
  ]
})
// 获取付款方式信息
Mock.mock('/api/contract/fkfs',{
  'FkfsList': [
    {
      id: '01',
      descriptionZh: '微信'
    },
    {
      id: '02',
      descriptionZh: '支付宝'
    },
    {
      id: '03',
      descriptionZh: '银行卡'
    }
  ]
})
// 获取设备类型信息
Mock.mock('/api/sbs/sblx',{
  'SblxList': [
    {
      id: '01',
      descriptionZh: 'RFID4G'
    },
    {
      id: '02',
      descriptionZh: 'RFID4G(场站)'
    },
    {
      id: '03',
      descriptionZh: '车辆标签'
    },
    {
      id: '04',
      descriptionZh: '车载一体机'
    },
    {
      id: '05',
      descriptionZh: '报到机'
    },
    {
      id: '06',
      descriptionZh: '一程一检'
    },
    {
      id: '07',
      descriptionZh: '站点通'
    },
    {
      id: '08',
      descriptionZh: '55寸屏'
    },
    {
      id: '09',
      descriptionZh: '站杆预报屏'
    }
  ]
})
// CONTRACT
Mock.mock('/api/sbs/contract',{
  'totalRow': 40,
  'ContractList|40': [
    {
      'htbh|10': /[0-9]/,
      'htlbdm|1': ['01','02'],
      'htlb|1': ['主合同','分包合同'],
      'sblxdm|1': ['01','02','03','04','05','06','07','08','09'],
      'sblx|1': ['RFID4G','车辆标签','一程一检','55寸屏','报到机','站点通','站杆预报屏','RFID4G(场站)','车载一体机'],
      'htmc|1': ['合同合同合同合同名称A','合同合同合同合同名称B','合同合同合同合同名称C'],
      'jfmc|1': ['甲甲甲甲甲甲甲甲方名称A','甲甲甲甲甲甲甲甲方名称B','甲甲甲甲甲甲甲甲方名称C'],
      'yfmc|1': ['乙乙乙乙乙乙乙乙方名称A','乙乙乙乙乙乙乙乙方名称B','乙乙乙乙乙乙乙乙方名称C'],
      'bfmc|1': ['丙丙丙丙丙丙丙丙方名称A','丙丙丙丙丙丙丙丙方名称B','丙丙丙丙丙丙丙丙方名称C'],
      'htqdrq': random.date(),
      'htqx|1': ['1','2','3','4','5','6','7','8'],
      'fkfsdm|1': ['01','02','03'],
      'fkfs|1': ['微信','支付宝','银行卡'],
      'sbsysm|1': ['9','12','15','18','21','24'],
      'sbzbk|1': ['12.5','23.6','30'],
      'sbzbq|1': ['1','2','3','4','5','6','7','8'],
      'qttk': '其他条款'
    }
  ]
})
// 获取设备基本信息
// RFID4G
Mock.mock('/api/rfid4g/basic', {
  'totalRow': 20,
  'Rfid4gList|20': [
    {
      'sbjyh|25': /[0-9]/,
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sbgzztdm|1': ['01', '02', '03', '04'],
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azzp': '查看照片',
      'qypbh|1': ['00001', '00002', '00003', '00004'],
      'qypmc|1': ['分片区域A', '分片区域B', '分片区域C', '分片区域D'],
      'ssxzqydm|1': ['0001', '0002', '0003', '0004'],
      'ssxzqy|1': ['杨浦区', '徐家汇', '静安区', '普陀区'],
      'zdbh|1': ['00001', '00002', '00003', '00004', '00004'],
      'zdmc|1': ['站点名称A', '站点名称B', '站点名称C', '站点名称D'],
      'jzbh|1': ['0000000001', '0000000002', '0000000003', '0000000004'],
      'jzmc|1': ['基站名称A', '基站名称B', '基站名称C', '基站名称D'],
      'gldjdm|1': ['01', '02', '03', '04'],
      'gldj|1': ['管理等级A', '管理等级B', '管理等级C', '管理等级D'],
      'sbppdm|1': ['01', '02', '03'],
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxhdm|1': ['0101', '0102', '0201'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'sbgsjtdm|1': ['01', '02'],
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsdm|1': ['0101', '0102', '0103', '0104', '0105'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscddm|1': ['010101', '010102', '010103', '010104', '010105'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'sbgsxldm|1': ['01010101', '01010102', '01010103', '01010104', '01010105'],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'sbqdrq': random.date(),
      'sbgxrq': random.date(),
      'sbbfrq': random.date(),
      'gysdm|1': ['01', '02', '03', '04'],
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsdm|1': ['01', '02', '03', '04'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所'],
      'simkh|20': /[0-9]/,
      'tmbh|10': /[0-9]/,
      'ewmbh|10': /[0-9]/
    }
  ]
})
// 车载一体机
Mock.mock('/api/czytj/basic', {
  'totalRow': 20,
  'CzytjList|20': [
    {
      'sbjyh|25': /[0-9]/,
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sbgzztdm|1': ['01', '02', '03', '04'],
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azzp': '查看照片',
      'qypbh|1': ['00001', '00002', '00003', '00004'],
      'qypmc|1': ['分片区域A', '分片区域B', '分片区域C', '分片区域D'],
      'azclcph': /沪-[A-Z]-\d{6}/,
      'azclzbh|10': /[0-9]/,
      'gldjdm|1': ['01', '02', '03', '04'],
      'gldj|1': ['管理等级A', '管理等级B', '管理等级C', '管理等级D'],
      'sbppdm|1': ['01', '02', '03'],
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxhdm|1': ['0101', '0102', '0201'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'qxddm|1': ['01', '02', '03', '04'],
      'qxd|1': ['高清', '标清', '驾驶行为分析', '防灾存储设备'],
      'cnsxts|1': /[2-4]/,
      'cwsxts|1': /[2-4]/,
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
      'gysdm|1': ['01', '02', '03', '04'],
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsdm|1': ['01', '02', '03', '04'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所'],
      'ewmbh|10': /[0-9]/,
      'tmbh|10': /[0-9]/
    }
  ]
})
// 55寸屏
Mock.mock('/api/ffcp/basic', {
  'totalRow': 20,
  'FfcpList|20': [
    {
      'sbjyh|25': /[0-9]/,
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'pbh|10': /[0-9]/,
      'sbgzztdm|1': ['01', '02', '03', '04'],
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azzp': '查看全景照片',
      'azzpzmz': '查看正面照片',
      'azzpcmz': '查看侧面照片',
      'qypbh|1': ['00001', '00002', '00003', '00004'],
      'qypmc|1': ['分片区域A', '分片区域B', '分片区域C', '分片区域D'],
      'ztbh|1': ['00001', '00002', '00003', '00004'],
      'ztmc|1': ['站亭名称A', '站亭名称B', '站亭名称C', '站亭名称D'],
      'zdbh|1': ['00001', '00002', '00003', '00004', '00004'],
      'zdmc|1': ['站点名称A', '站点名称C', '站点名称B', '站点名称D'],
      'ssxzqydm|1': ['0001', '0002', '0003', '0004'],
      'ssxzqy|1': ['杨浦区', '徐家汇', '静安区', '普陀区'],
      'gztjdm|1': ['01', '02'],
      'gztj|1': ['阳光充足', '阴蔽处'],
      'gldjdm|1': ['01', '02', '03', '04'],
      'gldj|1': ['管理等级A', '管理等级B', '管理等级C', '管理等级D'],
      'sbppdm|1': ['01', '02', '03'],
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxhdm|1': ['0101', '0102', '0201'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'sbccdm|1': ['01', '02'],
      'sbccmc|1': ['55寸屏', '32寸屏'],
      'gdffdm|1': ['01', '02'],
      'gdffmc|1': ['工业电', '太阳能'],
      'sbgsjtdm|1': ['01', '02'],
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsdm|1': ['0101', '0102', '0103', '0104', '0105'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscddm|1': ['010101', '010102', '010103', '010104', '010105'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队'],
      'sbgsxldm|1': ['01010101', '01010102', '01010103', '01010104', '01010105'],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'sbqdrq': random.date(),
      'sbgxrq': random.date(),
      'sbbfrq': random.date(),
      'gysdm|1': ['01', '02', '03', '04'],
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsdm|1': ['01', '02', '03', '04'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所'],
      'simkh|20': /[0-9]/,
      'tmbh|10': /[0-9]/,
      'ewmbh|10': /[0-9]/
    }
  ]
})
// 站杆预报屏
Mock.mock('/api/zgybp/basic', {
  'totalRow': 20,
  'ZgybpList|20': [
    {
      'sbjyh|25': /[0-9]/,
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sbgzztdm|1': ['01', '02', '03', '04'],
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azzp': '查看全景照片',
      'azzpzmz': '查看正面照片',
      'azzpcmz': '查看侧面照片',
      'qypbh|1': ['00001', '00002', '00003', '00004'],
      'qypmc|1': ['分片区域A', '分片区域B', '分片区域C', '分片区域D'],
      'ssxzqydm|1': ['0001', '0002', '0003', '0004'],
      'ssxzqy|1': ['静安区', '杨浦区', '普陀区'],
      'gldjdm|1': ['01', '02', '03', '04'],
      'gldj|1': ['管理等级A', '管理等级B', '管理等级C', '管理等级D'],
      'sbppdm|1': ['01', '02', '03'],
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxhdm|1': ['0101', '0102', '0201'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'pczdm|1': ['01', '02'],
      'pcz|1': ['墨水屏', 'OLED屏'],
      'gdffdm|1': ['01', '02'],
      'gdffmc|1': ['工业电', '太阳能'],
      'sbccdm|1': ['01', '02'],
      'sbccmc|1': ['55寸屏', '32寸屏'],
      'gztjdm|1': ['01', '02'],
      'gztj|1': ['阳光直射', '阴影处'],
      'sbgsjtdm|1': ['01', '02'],
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsdm|1': ['0101', '0102', '0103', '0104', '0105'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscddm|1': ['010101', '010102', '010103', '010104', '010105'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'sbgsxldm|1': ['01010101', '01010102', '01010103', '01010104', '01010105'],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'zdbh|1': ['00001', '00002', '00003', '00004'],
      'zdmc|1': ['上海站', '人民广场站', '理工站'],
      'zpbh|1': ['0001','0002','0003'],
      'zpmc|1': ['站牌名称A', '站牌名称C', '站牌名称B'],
      'sbqdrq': random.date(),
      'sbgxrq': random.date(),
      'sbbfrq': random.date(),
      'gysdm|1': ['01', '02', '03', '04'],
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsdm|1': ['01', '02', '03', '04'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所'],
      'simkh|20': /[0-9]/,
      'tmbh|10': /[0-9]/,
      'ewmbh|10': /[0-9]/
    }
  ]
})
// 一程一检
Mock.mock('/api/ycyj/basic', {
  'totalRow': 20,
  'YcyjList|20': [
    {
      'sbjyh|25': /[0-9]/,
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'pbh|10': /[0-9]/,
      'sbgzztdm|1': ['01', '02', '03', '04'],
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azdddm|1': ['0001', '0002', '0003'],
      'azdd|1': ['宝杨路停车场A', '宝杨路停车场B', '宝杨路停车场C'],
      'azzp': '查看照片',
      'qypbh|1': ['00001', '00002', '00003', '00004'],
      'qypmc|1': ['分片区域A', '分片区域B', '分片区域C', '分片区域D'],
      'zdbh|1': ['00001', '00002', '00003', '00004'],
      'zdmc|1': ['上海站', '人民广场站', '理工站'],
      'gldjdm|1': ['01', '02', '03', '04'],
      'gldj|1': ['管理等级A', '管理等级B', '管理等级C', '管理等级D'],
      'sbppdm|1': ['01', '02', '03'],
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxhdm|1': ['0101', '0102', '0201'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'sbgsjtdm|1': ['01', '02'],
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsdm|1': ['0101', '0102', '0103', '0104', '0105'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscddm|1': ['010101', '010102', '010103', '010104', '010105'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'sbgsxldm|1': ['01010101', '01010102', '01010103', '01010104', '01010105'],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'sbqdrq': random.date(),
      'sbgxrq': random.date(),
      'sbbfrq': random.date(),
      'gysdm|1': ['01', '02', '03', '04'],
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsdm|1': ['01', '02', '03', '04'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所'],
      'simkh|20': /[0-9]/,
      'tmbh|10': /[0-9]/,
      'ewmbh|10': /[0-9]/
    }
  ]
})
// 车辆标签
Mock.mock('/api/clbq/basic', {
  'totalRow': 20,
  'ClbqList|20': [
    {
      'sbjyh|25': /[0-9]/,
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sbgzztdm|1': ['01', '02', '03', '04'],
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azzp': '查看照片',
      'qypbh|1': ['00001', '00002', '00003', '00004'],
      'qypmc|1': ['分片区域A', '分片区域B', '分片区域C', '分片区域D'],
      'azclcph': /沪-[A-Z]-\d{6}/,
      'azclzbh|10': /[0-9]/,
      'azcldllbdm|1': ['01', '02', '03'],
      'azcldllbmc|1': ['柴油车', '新能源车', '双源电车'],
      // 'ancldyxlj|4-6': ['56','58','1001','202','2222','868'],// 线路集合
      'gldjdm|1': ['01', '02', '03', '04'],
      'gldj|1': ['管理等级A', '管理等级B', '管理等级C', '管理等级D'],
      'sbppdm|1': ['01', '02', '03'],
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxhdm|1': ['0101', '0102', '0201'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'sbgsjtdm|1': ['01', '02'],
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsdm|1': ['0101', '0102', '0103', '0104', '0105'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscddm|1': ['010101', '010102', '010103', '010104', '010105'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'sbgsxldm|1': ['01010101', '01010102', '01010103', '01010104', '01010105'],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'qdjzdm|1': ['00001', '00002', '00003'],
      'qdjz|1': ['起点基站A', '起点基站B', '起点基站C'],
      'zdjzdm|1': ['00001', '00002', '00003'],
      'zdjz|1': ['终点基站A', '终点基站B', '终点基站C'],
      'qjjzdm|1': ['00001', '00002', '00003'],
      'qjjz|1': ['区间基站A', '区间基站B', '区间基站C'],
      'sbqdrq': random.date(),
      'sbgxrq': random.date(),
      'sbbfrq': random.date(),
      'gysdm|1': ['01', '02', '03', '04'],
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsdm|1': ['01', '02', '03', '04'],
      'jcsmc|1': ['澳马', '中安', '秀派', '公用所'],
      'tmbh|10': /[0-9]/,
      'ewmbh|10': /[0-9]/
    }
  ]
})
// 站点通
Mock.mock('/api/zdt/basic', {
  'totalRow': 20,
  'ZdtList|20': [
    {
      'sbjyh|25': /[0-9]/,
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sblb|1': ['主机', '4G无线路由器', 'IP通话'],
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azzp': '查看照片',
      'qypbh|5': /[0-9]/,
      'qypmc|1': ['分片区域1', '分片区域2', '分片区域3'],
      'azdd|1': ['宝杨路站点A', '宝杨路站点B', '宝杨路站点C'],
      'gldj|1': /[A-D]/,
      'sbppdm|1': ['01', '02', '03'],
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxhdm|1': ['0101', '0102', '0201'],
      'sbxh|1': /[A-Z]-\d{4}/,
      'simkh|20': /[0-9]/,
      'sbgsjtdm|1': ['01', '02'],
      'sbgsjtmc|1': ['上海久事一集团', '上海久事二集团'],
      'sbgsgsdm|1': ['0101', '0102', '0103', '0104', '0105'],
      'sbgsgsmc|1': ['巴士一公司', '巴士二公司', '巴士三公司', '巴士四公司', '巴士五公司'],
      'sbgscddm|1': ['010101', '010102', '010103', '010104', '010105'],
      'sbgscdmc|1': ['一车队', '二车队', '三车队', '四车队', '五车队', '六车队', '七车队', '八车队', '九车队',],
      'zdbh|5': /[0-9]/,
      'sbgszdmc|1': ['上海站', '人民广场站', '理工站'],
      'sbgsxldm|1': ['01010101', '01010102', '01010103', '01010104', '01010105'],
      'sbgsxlmc|1': ['56', '57', '101', '1002', '1111', '66'],
      'sbqdrq': random.date(),
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
// RFID4G场站
Mock.mock('/api/rfid4gcz/basic', {
  'totalRow': 20,
  'rfid4gczList|20': [
    {
      'sbzbh|12': /[0-9]/,
      'htbh|10': /[0-9]/,
      'sbgzztdm|1': ['01', '02', '03', '04'],
      'sbgzzt|1': ['工作正常', '正在维修', '暂停使用', '正在迁移'],
      'azwz|1': ['一层', '二层', '三层'],
      'azzp': '查看照片',
      'qypbh|1': ['00001', '00002', '00003', '00004'],
      'qypmc|1': ['分片区域1', '分片区域2', '分片区域3'],
      'gldj|1': /[A-D]/,
      'sbppdm|1': ['01', '02', '03'],
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxhdm|1': ['0101', '0102', '0201'],
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
      'gysdm|1': ['01', '02', '03', '04'],
      'gysmc|1': ['澳马', '中安', '秀派', '公用所'],
      'jcsdm|1': ['01', '02', '03', '04'],
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
      'azdd|1': ['安装地点A', '安装地点B', '安装地点C'],
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
// 报到机
Mock.mock('/api/bdj/basic', {
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
      'sbppdm|1': ['01', '02', '03'],
      'sbpp|1': ['索尼', '三星', '华为'],
      'sbxhdm|1': ['0101', '0102', '0201'],
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
      'ewmbh|10': /[0-9]/,
      'tmbh|10': /[0-9]/
    }
  ]
})
// 统计信息
Mock.mock('/api/Sbs/statistics', {
  'SbStatisticsList': [
    {
      'sblx': 'RFID4G',
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
      'sblx': 'RFID4G(场站)',
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
      'sblx': '车辆标签',
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
      'sblx': '车载一体机',
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
      'sblx': '报到机',
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
      'sblx': '一程一检',
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
      'sblx': '站点通',
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
      'sblx': '55寸屏',
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
      'sblx': '站杆预报屏',
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
Mock.mock('/api/rfid4g/move', {
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
Mock.mock('/api/rfid4g/fix', {
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
Mock.mock('/api/rfid4g/check', {
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
Mock.mock('/api/rfid4g/report', {
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
      'bxlx|1': ['系统自检', '人工报修'],
      'bxfs|1': ['系统预警报修', '平台报修', '微信报修', 'QQ报修', '电话报修'],
      'bxgzmc|1': ['主机故障', '4G无线路由器故障', 'IP通话故障', '其他故障'],
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
