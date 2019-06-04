'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import logo from './images/logo.png'
import loading from './images/loading.gif'

class Search extends React.Component {
  render() {
    return <div className="texta">
      <div>
        <img src={ logo }></img>
        <img src={loading} />
      </div>
      搜索文字 ~~~
      <span>span</span>
    </div>
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
)