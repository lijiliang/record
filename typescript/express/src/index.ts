import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import './controller/LoginController'  // 引入自动执行
import './controller/CrowllerController'  // 引入自动执行
// import { router } from './controller/decorator'
import router from './router'

// 问题1： express 库的类型定义文件 .d.ts 文件类型描述不准确
// 问题2： 当我使用中间件的时候，对req 或者 res 做了修改之后呢，实际上类型并不能改变

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieSession({
  name: 'session',
  keys: [
    'Benson'
  ],
  maxAge: 24 * 60 * 60 * 1000  // 24小时
}))
app.use((req: Request, res: Response, next: NextFunction) => {
  req.teacherName = 'Benson';
  next();
})
app.use(router)  // 加载路由

app.listen(7001, () => {
  console.log('server is runing')
})