import { Request, Response } from 'express';
// import { get, post } from './decorator'
import { controller, get, post } from '../decorator'
import { getResponseData } from '../utils/util'

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined
  }
}

@controller('/')  // 可以加路由前缀 如 '/abc'
export class LogiController {
  static isLogin(req: BodyRequest): boolean {
    return !!(req.session ? req.session.login : undefined)
  }

  @get('/api/isLogin')
  isLogin(req: BodyRequest, res: Response): void {
    const isLogin = LogiController.isLogin(req);
    res.json(getResponseData(isLogin))
  }

  @post('/api/login')
  login(req: BodyRequest, res: Response): void {
    const { password } = req.body
    // const isLogin = !!(req.session ? req.session.login : undefined)
    const isLogin = LogiController.isLogin(req)

    // 已经登录过了
    if (isLogin) {
      // res.send('已经登录过')
      res.json(getResponseData(true))
    } else {
      if (password === '123' && req.session) {
        req.session.login = true
        // res.send('登录成功')
        res.json(getResponseData(true))
      } else {
        // res.send('登录失败')
        res.json(getResponseData(false, '登录失败'))
      }
    }
  }

  @get('/api/logout')
  logout(req: BodyRequest, res: Response): void {
    // const isLogin = req.session ? req.session.login : undefined
    if (req.session) {
      req.session.login = undefined
    }
    res.json(getResponseData(true))
  }

  @get('/')
  home(req: BodyRequest, res: Response): void {
    // const isLogin = !!(req.session ? req.session.login : undefined)
    const isLogin = LogiController.isLogin(req)
    if (isLogin) {
      res.send(`
      <html>
        <body>
          <a href="/logout">退出</a>
          <a href="/getData">爬取内容</a>
          <a href="/showData">展示内容</a>
        </body>
      </html>
      `)
    } else {
      res.send(`
    <html>
      <body>
        <form method="post" action="/login">
          <input type="password" name="password" />
          <button>提交</button>
        </form>
      </body>
    </html>
  `);
    }
  }
}