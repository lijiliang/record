import axios from 'axios'

export const runCallback = (callback) => {
  // callback('abc')
  callback()
}

export const createObject = (classItem) => {
  new classItem()
}

export const getData = () => {
  return axios.get('https://api.zhengfuwu.com/').then(res => res.data)
}
