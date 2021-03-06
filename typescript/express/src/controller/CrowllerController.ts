import fs from 'fs'
import path from 'path'
import { Request, Response, NextFunction } from 'express';
// import { controller, get, use } from './decorator'
// import { get } from './decorator'
import { controller, use, get } from '../decorator'
import { getResponseData } from '../utils/util'
import Crowller from '../utils/crowller'
import Analyzer from '../utils/dellAnalyzer'

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined
  }
}

// 判断是否登录的中间件
const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session ? req.session.login : undefined)
  console.log('checkLogin middleware')
  if (isLogin) {
    next()
  } else {
    // res.send('请先登录')
    res.json(getResponseData(null, '请先登录'))
  }
}

const test = (req: Request, res: Response, next: NextFunction): void => {
  console.log('test middleware')
  next()
}

@controller('/api')
export class CrowllerController {
  @get('/getData')
  @use(checkLogin)
  @use(test)
  getData(req: BodyRequest, res: Response): void {
    const secret = 'secretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

    const analyzer = Analyzer.getInstance();
    new Crowller(url, analyzer);

    // res.send('getDate Success')
    res.json(getResponseData(true))
  }

  @get('/showData')
  @use(checkLogin)
  showData(req: BodyRequest, res: Response): void {
    try {
      const position = path.resolve(__dirname, '../../data/course.json')
      const result = fs.readFileSync(position, 'utf8')
      res.json(JSON.parse(result))
    } catch (e) {
      // res.send('尚未爬取到内容')
      res.json(getResponseData(false, '尚未爬取到内容'))
    }
  }


}