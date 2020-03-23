import axios from 'axios'

export const fetchData = (fn) => {
  axios.get('https://api.zhengfuwu.com/').then((response) => {
    fn(response.data)
  })
}

export const fetchData1 = () => {
//  return axios.get('https://api.zhengfuwu.com/')
  return axios.get('https://api.zhengfuwu.com/1')
}