export const name = 'benson'

export const getName = () => {
  return name
}

const age = 20

// export default age

// 批量导出
export {
  name as name2,
  getName as getName2,
  age as age2
}