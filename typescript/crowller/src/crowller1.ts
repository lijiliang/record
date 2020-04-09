// ts -> .d.ts 翻译文件 @types/superagent -> js
import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import cheerio from 'cheerio'

interface Course {
  title: string;
  count: number
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

class Crowller {
  private secret = 'secretKey';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private filePath = path.resolve(__dirname, '../data/course.json')

  constructor() {
    this.initSpiderProcess()
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const courseInfo = this.getCourseInfo(html)
    const fileContent = this.generateJsonContent(courseInfo)
    fs.writeFileSync(this.filePath, JSON.stringify(fileContent));
  }

  // 获取html
  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text;
  }

  getCourseInfo(html: string) {
    const $ = cheerio.load(html)
    const courseItems = $('.course-item')
    const courseInfos: Course[] = []
    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc')
      const title = descs.eq(0).text()
      const count = parseInt(
        descs
          .eq(1)
          .text()
          .split('：')[1],
        10
      );
      // console.log(title, count)
      courseInfos.push({
        title,
        count: 1 + Math.round(Math.random() * (100 - 1))
      })
    })
    return {
      time: new Date().getTime(),
      data: courseInfos
    }
  }

  // json内容
  generateJsonContent(courseInfo: CourseResult) {
    let fileContent: Content = {};
    // 判断文件是否存在
    if (fs.existsSync(this.filePath)) {
      fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    }

    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
    // fs.writeFileSync(filePath, JSON.stringify(fileContent));  // 写文件
  }

}

const crowller = new Crowller()