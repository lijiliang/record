import axios from 'axios'

export const fetchData = () => {
  return new Promise((resolved, reject) => {
    resolved("(function() { return '123'})()")
  })
}

// data: "(function() { return '123'})()"

// export const getNumber = () => {
//   return 123
// }