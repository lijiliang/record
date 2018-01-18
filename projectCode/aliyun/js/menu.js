/**
 * https://segmentfault.com/a/1190000008800382  手把手教你JQuery插件的写法和规范
 * 
 */
;(function ($, window){
  $.fn.Menu = function (options) {
    // 默认参数
    var defaluts = {
      dataList: [],
    }
    var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数
    return this.each(function(){
      var _this = $(this) //获取当前dom的jQuery对象，这里的this是当前循环的dom

      console.log(opts)
      var _sidebarNavHtml = ''  // 一二级列表
      var _sidebarOptionHtml = ''  // 三级列表
      var _sidebarOptionTitle = '' // 显示在三级列表下的二级标题
      var _sidebarOptionDate = []  // 三级列表数据
      var _hash = location.hash || ''
      
      /**
       * 一、二级列表
       */
      function sidebarNavHtmlInit () {
        $.each(opts.dataList, function(index, value){
          var _itemHtml = ''  // 二级列表li
          $.each(value.children, function(_index, _value){
            var _childrenData = JSON.stringify(_value.children)  // 三级菜单数据
            _itemHtml += '<li>'+
            '      <div class="tip-show">'+
            '          <div class="tip-titlt"> '+
            '            <i class="tip-icon fa fa-caret-left"></i>'+ _value.description +
            '          </div>'+
            '      </div>'+
            '      <a href='+_value.path+' data-title='+_value.description+' data-path='+_value.path+' data-children='+_childrenData+'>'+
            '        <span class="sublist-icon fa '+_value.iconCls+'"></span>'+
            '        <span class="sub-title">'+ _value.description + '</span>'+
            '      </a>'+
            '    </li>';
          })
  
          // 一级列表
          _sidebarNavHtml += '<div class="sidebar-nav">'+
          '  <div class="sidebar-title">'+
          '    <div class="tip-show" >'+
          '        <div class="tip-titlt"> '+
          '          <i class="tip-icon fa fa-caret-left"></i>'+ value.description + '</div>'+
          '    </div>'+
          '    <span class="title-icon fa fa-caret-right"></span>'+
          '    <span class="sublist-title">'+ value.description +'</span>'+
          '  </div>'+
          '  <ul class="m-nav-list" style="display:none">'+ _itemHtml + '</ul>'+
          '</div>';
        })
        return _sidebarNavHtml
      }

      sidebarNavHtmlInit()

       // 左侧菜单
       var sidebarLeftHtml = '<div class="sidebar-left left-full">'+
       '      <div class="sidebar-fold">'+
       '        <span class="fa fa-bars"></span>'+
       '      </div>'+
       '      <div class="sidebar-title-box">'+ _sidebarNavHtml +'</div>'+
       '</div>';
 
       $(this).append(sidebarLeftHtml)


      // 当前选中二级菜单
      $.each($('.m-nav-list li a'), function(index, value) {
        var _path = $(this).attr('data-path')
        if (_path == _hash) {
          $(this).parents('.sidebar-nav').addClass('nav-show')
          $(this).parents('.m-nav-list').css('display', 'block')
          $(this).parent('li').addClass('active')
          var _path = $(this).attr('data-path')
          var _title = $(this).attr('data-title')
          var _children = JSON.parse($(this).attr('data-children'))
          createSidebarOptionOpen(_title, _path, _children)
        }
      })

      /*左侧导航栏缩进功能*/
      $(".sidebar-left .sidebar-fold").on('click', function(){
        if($(this).parent().attr('class')=="sidebar-left left-full"){
          $(this).parent().removeClass("left-full").addClass("left-off");
        }else{
          $(this).parent().removeClass("left-off").addClass("left-full");
        }
      })	

      /*左侧导航栏显示隐藏功能*/
      $(".sidebar-nav > .sidebar-title").on('click', function(){				
        /*显示*/
        if ($(this).next().css('display') == "none") {
          $('.sidebar-nav').children('ul').slideUp(200)
          $(this).next('ul').slideDown(200)
          $(this).parent('.sidebar-nav').addClass('nav-show').siblings('.sidebar-nav').removeClass('nav-show')
        }else{  /*隐藏*/
          $(this).next('ul').slideUp(200)
          $('.sidebar-nav.nav-show').removeClass('nav-show')
        }
      })

      // 二级菜单选中
      $('.m-nav-list > li a').on('click', function(e){
        e.preventDefault();
        $('.m-nav-list li').removeClass('active')
        $(this).parent('li').addClass('active')
        var _path = $(this).attr('data-path')
        var _title = $(this).attr('data-title')
        var _children = JSON.parse($(this).attr('data-children'))
        createSidebarOptionOpen(_title, _path, _children)
      })

      // 右侧菜单展开收缩
      $(document).on('click', '.navbar-collapse', function(){
        if ($(this).parent().attr('class') == "sidebar-option sidebar-option-open"){
          $(this).parent().removeClass('sidebar-option-open')
        } else {
          $(this).parent().addClass('sidebar-option-open')
        }
      })

      // 右侧菜单 单项选中
      $(document).on('click', '.option-nav-list li a', function(e) {
        e.preventDefault()
        $(this).parent('li').addClass('active').siblings().removeClass('active')
        var _path = $(this).attr('data-path')
        location.hash = _path
      })

      /**
       * 右侧三级菜单html
       * @param {string} title  标题
       * @param {array} optionDate  子级内容
       */
      function sidebarOptionHtmlInit (title, optionDate) {
        var _item = ''
        if (optionDate.length) {
          $.each(optionDate, function(item, value) {
            _item += '<li><a href='+value.path+' data-path='+value.path+'>'+value.description+'</a></li>'
          })
        }
        _sidebarOptionHtml = '<div class="sidebar-option sidebar-option-open">'+
        '  <div class="option-nav-title">'+title+'</div>'+
        '  <div class="option-nav-list">'+
        '    <ul>'+ _item +'</ul>'+
        '  </div>'+
        '  <div class="navbar-collapse">'+
        '    <div class="navbar-collapse-inner">'+
        '      <div class="navbar-collapse-bg"></div>'+
        '      <div class="navbar-collapse-icon">'+
        '        <span class="fa fa-angle-double-right"></span>'+
        '        <span class="fa fa-angle-double-left"></span>'+
        '      </div>'+
        '    </div>'+
        '  </div>'+
        '</div>';
        $('.sidebar-option').remove()  // 先清除再插入
        _this.append(_sidebarOptionHtml)
      }

      /**
       * 创建三级菜单并展开及跳转链接
       * @param {string} title  标题
       * @param {string} path   要跳转的hash
       * @param {array} children  子级内容
       */
      function createSidebarOptionOpen(title, path, children) {
        _sidebarOptionDate = children
        _sidebarOptionTitle = title
        if(_sidebarOptionDate.length){
          location.hash = path
          sidebarOptionHtmlInit(_sidebarOptionTitle, _sidebarOptionDate)
        } else {
          location.hash = path
          $('.sidebar-option').remove()  // 清除三级菜单内容
        }
      }
      

    })

  }
})(jQuery, window)