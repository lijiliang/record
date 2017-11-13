import React from 'react'
import ReactDom from 'react-dom';

// import './common/style/main.css'
import dog from './common/img/41.jpg';

import style from './common/style/main.css';
import './common/style/fonts.css';

import './common/style/main1.scss';

import scssStyle from './common/style/main1.scss';

import lessStyle from './common/style/main2.less';

console.log(style)
ReactDom.render(
  <div className={style.ot}>
    react dev 
    <div className={style.oa}>server</div> 
    <i className="icon icon-bao"></i>
    <div className={scssStyle.otb}>
      otb
      <p className={scssStyle.bb}>bb</p>
    </div>
    <div className={lessStyle.less}>
      less
      <div className={lessStyle.child}>less-child</div>
    </div>
  </div>,
  document.getElementById('root')
)