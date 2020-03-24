export const timer =  (callback) => {
  setTimeout(() => {
    callback()
  }, 3000)
}

export const timer1 =  (callback) => {
  setTimeout(() => {
    callback()
    setTimeout(() => {
      callback()
    }, 3000)
  }, 3000)
}