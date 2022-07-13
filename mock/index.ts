import Mock from 'mockjs';
const Random = Mock.Random

interface DataInfo{
  date: string,
  name: string,
  address: string,
}

const dataList:DataInfo[] = []
for(let i = 0; i < 100; i++) {
  const dataInfo: DataInfo = {
    date: Random.date(), // 生成随机日期
    name: Random.name(), // 生成随机姓名
    address: Random.province(), // 生成随机
  }
  dataList.push(dataInfo);
}

Mock.mock('/api/list', 'post', (params: any) => {
  // console.log(params)
  let info = JSON.parse(params.body)
  console.log(info.current._value)
  let [current, pageSize, total] = [info.current._value, info.pageSize._value, 100]

  let totalPages = total / pageSize
  let newDataList = dataList.slice(current * pageSize, (current + 1) * pageSize)
  return {
    code: 200,
    message: '成功',
    data: {
      pageSize,
      current,
      total,
      totalPages,
      rows: newDataList
    } 
  }
})
