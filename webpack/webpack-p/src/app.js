// window.PIXI = require('pixi.js');
window.resources = {
  'video/a1.mp4': document.getElementById('video1'),
  'video/a2.mp4': document.getElementById('video2')
};

for(key in resources){
  resources[key].src = "../"+key;
};

const imglogo = require('./image/scene0/logo.png')
const download_active = require('./image/scene0/download_active.png')
const love2 = require('./image/scene0/love2.png')
const download = require('./image/scene0/download.png')
console.log(imglogo,download_active)

let imgUrl = [
  imglogo,
  download_active,
  love2,
  './image/scene0/love_icon.png',
  './image/scene0/hand.png',
  './image/scene0/back_map.png',
  './image/scene0/selected.png',
  './image/scene0/love_white.png',
  './image/scene0/start-btn-nor.png',
  './image/scene0/start-btn-click.png',
  download,
  './image/scene0/1.png',
  './image/scene0/2.png',
  './image/scene0/3.png',
  './image/scene0/4.png',
  './image/scene0/5.png',
  './image/scene0/6.png',
  './image/scene0/7.png',
  './image/scene0/8.png'
]


imgUrl.map((item) => {
  console.log(item)
  // resources[item] = require('./image/scene0/logo.png');
  // console.log(require(item))
})

function useMedia(arr,target={},callBack){
  for(var i = 0; i< arr.length; i++){
      let name = arr[i].replace(/(\..\/)|(\.\/)/g,'');
      target[name] = new Image();
      target[name].src = arr[i];
      // if(!callBack) target[name].src = arr[i];
  }
  if (!!callBack){
      return callBack(target);
  }
}

useMedia(imgUrl,resources);


// resources['image/scene0/download.png'].src = require('./image/scene0/download.png');
// resources['image/scene0/download_active.png'].src = require('./image/scene0/download_active.png');
// resources['image/scene0/logo.png'].src = require('./image/scene0/logo.png');
// resources['image/scene0/love2.png'].src = require('./image/scene0/love2.png');
// resources['image/scene0/love_icon.png'].src = require('./image/scene0/love_icon.png');
// resources['image/scene0/hand.png'].src = require('./image/scene0/hand.png');
// resources['image/scene0/back_map.png'].src = require('./image/scene0/back_map.png');
// resources['image/scene0/love_white.png'].src = require('./image/scene0/love_white.png');
// resources['image/scene0/selected.png'].src = require('./image/scene0/selected.png');
// resources['image/scene0/start-btn-click.png'].src = require('./image/scene0/start-btn-click.png');
// resources['image/scene0/start-btn-nor.png'].src = require('./image/scene0/start-btn-nor.png');

// resources['image/scene0/1.png'].src = require('./image/scene0/1.png');
// resources['image/scene0/2.png'].src = require('./image/scene0/2.png');
// resources['image/scene0/3.png'].src = require('./image/scene0/3.png');
// resources['image/scene0/4.png'].src = require('./image/scene0/4.png');
// resources['image/scene0/5.png'].src = require('./image/scene0/5.png');
// resources['image/scene0/6.png'].src = require('./image/scene0/6.png');
// resources['image/scene0/7.png'].src = require('./image/scene0/7.png');
// resources['image/scene0/8.png'].src = require('./image/scene0/8.png');

// resources['video/a1.mp4'].src = require('../video/a1.mp4');
// resources['video/a2.mp4'].src = require('../video/a2.mp4');

// function initMedia(res){
//   const keys = Object.keys(res);
//   keys.forEach(element => {
//       res[element].src = require(`../${element}`);
//   });
//   return res 
// }



// for(var key in resources) {
//     let url = '../'+key;
//     resources[key].src = require(url);
// }


// require('./main.js');
