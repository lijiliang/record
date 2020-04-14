import { Router, Request, Response } from 'express';
import Crowller from './crowller'
import DellAnalyzer from './dellAnalyzer'

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('hello word')
})

router.get('/getData', (req: Request, res: Response) => {
  const secret = 'secretKey';
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

  const analyzer = DellAnalyzer.getInstance();
  new Crowller(url, analyzer);

  res.send('getDate Success')
})

export default router