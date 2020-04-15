import { Router, Request, Response } from 'express';
import Crowller from './crowller'
import DellAnalyzer from './dellAnalyzer'

// 问题1： express 库的类型定义文件 .d.ts 文件类型描述不准确
interface RequestWithbody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form method="post" action="/getData">
          <input type="password" name="password" />
          <button>提交</button>
        </form>
      </body>
    </html>
  `);
})

router.post('/getData', (req: RequestWithbody, res: Response) => {
  const { password } = req.body
  if (password === '123') {
    const secret = 'secretKey';
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

    const analyzer = DellAnalyzer.getInstance();
    new Crowller(url, analyzer);

    res.send('getDate Success')
  } else {
    res.send(`${req.teacherName} password Error!`)
  }
})

export default router