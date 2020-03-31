// import axios from 'axios'

const undoList = {
  success: true,
  data: [{
    status: 'div',
    value: 'benson'
  }]
}

export default {
  get(url) {
    if (url === '/getUndoList.json') {
      return new Promise((resolve) => {
        resolve(undoList)
      })
    }
  }
}
