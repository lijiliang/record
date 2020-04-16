import { Request, Response } from 'express';
import { controller, get } from './decorator'
import { getResponseData } from '../utils/util'

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined
  }
}

@controller
class LogiController {
  @get('/login')
  login(req: BodyRequest, res: Response) {
    res.send('login is runing')
  }

  @get('/logout')
  logout(req: BodyRequest, res: Response) {
    // const isLogin = req.session ? req.session.login : undefined
    if (req.session) {
      req.session.login = undefined
    }
    res.json(getResponseData(true))
  }

  @get('/')
  home(req: BodyRequest, res: Response) {
    const isLogin = req.session ? req.session.login : undefined
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