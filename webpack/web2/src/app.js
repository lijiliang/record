import React from 'react'
import ReactDom from 'react-dom';

import 'font-awesome/css/font-awesome.css'
ReactDom.render(
  <div>
    react dev 
    <img src={require('../src/common/img/41.jpg')} />
    <i className="fa fa-cloud-upload"></i>
  </div>,
  document.getElementById('root')
)