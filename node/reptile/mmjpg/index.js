const path = require('path')
const request = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs-extra')

let url = 'http://www.mmjpg.com/tag/meitui/'

// request.get(url + '1').then((res)=>{
//   console.log(res.text)
// })

// 获取到链接
// async function getUrl(){
//   const res = await request.get(url + 1)
//   const $ = cheerio.load(res.text)  // 获取到页面的结构
//   $('.pic li').each(function(item, elem){
//     const href = $(this).find('a').attr('href')
//     const title = $(this).find('.title').text()
//     console.log(title, href)
//   })
// }
// getUrl()

// 分析Url地址
async function getUrl(){
  let linkArr = [] // 当前频道面的所有地址
  for(let i = 1; i <= 10; i++){
    const res = await request.get(url + i)
    const $ = cheerio.load(res.text)
    $('.pic li').each(function(item, elem){
      let link = $(this).find('a').attr('href')
      linkArr.push(link)
    })
  }
  return linkArr
}

// 获取图片地址
async function getPic(url){
  const res = await request.get(url)
  const $ = cheerio.load(res.text)
  //以图集名称来分目录
  const dir = $('.article h2').text()
  console.log(`创建${dir}文件夹`)
  await fs.mkdir(path.join(__dirname, '/mm', dir))

  // 获取图集下面的总数
  const pageCount = parseInt($('#page .ch.all').prev().text())
  for(let i =1; i <= pageCount; i++){
    let pageUrl = url + '/' + i
    const data = await request.get(pageUrl)
    const _$ = cheerio.load(data.text)
    // 获取图片真实地址
    const imgUrl = _$('#content img').attr('src')

    download(dir, imgUrl)  // 保存图片
  }
}

// 保存图片到本地
async function download(dir, imgUrl){
  console.log(`正在下载${imgUrl}`)
  const filename = imgUrl.split('/').pop() // 图片名字
  const req = request.get(imgUrl)
    .set({'Referer': 'http://www.mmjpg.com'}) // mmjpg.com根据Referer来限制访问
  req.pipe(fs.createWriteStream(path.join(__dirname, 'mm', dir, filename)))
}

async function init(){
  let urls = await getUrl()
  for(let url of urls){
    await(getPic(url))
  }
}

init()
