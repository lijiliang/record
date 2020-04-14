import express, { Request, Response } from 'express'
import router from './router'

const app = express()
app.use(router)  // 加载路由


app.listen(7001, () => {
  console.log('server is runing')
})