/**
 * menu https://segmentfault.com/a/1190000008800382  手把手教你JQuery插件的写法和规范
 * http://www.cnblogs.com/maitian-lf/p/3610556.html  javascript中用闭包递归遍历树状数组
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
        var pathinfo = getPathInfo(opts.dataList, _hash) || {}
        $.each(opts.dataList, function(index, value){
          var _itemHtml = ''  // 二级列表li
          $.each(value.children, function(_index, _value){
            var twoLiActiveCls = ''
            twoLiActiveCls = pathinfo.twoid == _value.id ? "active" : ""
            var _childrenData = JSON.stringify(_value.children)  // 三级菜单数据
            _itemHtml += '<li class="'+twoLiActiveCls+'" data-twoid='+_value.id+'>'+
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

          var sidebarNavCls = ''
          var navListDisplay = ''
          sidebarNavCls = pathinfo.oneid == value.id ? "sidebar-nav nav-show" : "sidebar-nav"
          navListDisplay = pathinfo.oneid == value.id ? "display:block" : "display:none"
          // 一级列表
          _sidebarNavHtml += '<div class="'+sidebarNavCls+'" data-oneid='+value.id+'>'+
          '  <div class="sidebar-title">'+
          '    <div class="tip-show" >'+
          '        <div class="tip-titlt"> '+
          '          <i class="tip-icon fa fa-caret-left"></i>'+ value.description + '</div>'+
          '    </div>'+
          '    <span class="title-icon fa fa-caret-right"></span>'+
          '    <span class="sublist-title">'+ value.description +'</span>'+
          '  </div>'+
          '  <ul class="m-nav-list" style="'+navListDisplay+'">'+ _itemHtml + '</ul>'+
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

      // 如果有三级菜单，直接创建显示出来
      var _pathinfo = getPathInfo(opts.dataList, _hash) || {}
      if (_pathinfo.level == 3) {
        createSidebarOptionOpen(_pathinfo.twoname, _hash, _pathinfo.children)
      }

      // 当前选中二级菜单
      // $.each($('.m-nav-list li a'), function(index, value) {
      //   var _path = $(this).attr('data-path')
      //   if (_path == _hash) {
      //     $(this).parents('.sidebar-nav').addClass('nav-show')
      //     $(this).parents('.m-nav-list').css('display', 'block')
      //     $(this).parent('li').addClass('active')
      //     var _path = $(this).attr('data-path')
      //     var _title = $(this).attr('data-title')
      //     var _children = JSON.parse($(this).attr('data-children'))
      //     createSidebarOptionOpen(_title, _path, _children)
      //   }
      // })

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
        var pathinfo = getPathInfo(opts.dataList, _hash) || {}
        var _item = ''
        if (optionDate != null && optionDate.length > 0) {
          $.each(optionDate, function(item, value) {
            var actvieLiCls = ''
            actvieLiCls = pathinfo.threeid == value.id ? 'active' : ''
            _item += '<li class="'+actvieLiCls+'" data-threeid='+value.id+'><a href='+value.path+' data-path='+value.path+'>'+value.description+'</a></li>'
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
          // location.hash = path
          sidebarOptionHtmlInit(_sidebarOptionTitle, _sidebarOptionDate)
        } else {
          location.hash = path
          $('.sidebar-option').remove()  // 清除三级菜单内容
        }
      }
      
      // console.log(getPathInfo(opts.dataList, _hash))
      /**
       * 根据path获取信息
       * @param {array} menus 全部菜单数据
       * @param {string} path  当前选中的path(hash)
       */
      function getPathInfo(menus, path){
        var allmenu = []   // 所有菜单展开
        var oneid = ''  // 第一级id
        var twoid = ''
        var threeid = ''
        var twopos = '' // 二级菜单索引
        var threepos = '' // 三级菜单索引
        var children = [] // 三级菜单children
        var level = 1   // 有多少级
        var name = ''   // 当前菜单名称
        var twoname = '' // 二级菜单名称
        for(var i=0;i<menus.length;i++){
          allmenu.push(menus[i])
          var twoChildren = menus[i].children  // 第二级菜单
          if (menus[i].path == path) { 
            oneid = menus[i].id
            level = 1
            name = menus[i].description
            children = []
            twoname = ''
          } else if (twoChildren != null && twoChildren.length > 0){
            for(var j =0; j<twoChildren.length; j++){
              allmenu.push(twoChildren[j])
              var threeChildren = twoChildren[j].children
              if(twoChildren[j].path == path) {
                oneid = twoChildren[j].parentId
                twoid = twoChildren[j].id
                level = 2
                name = twoChildren[j].description
                twopos = j
                children = []
                twoname = ''
              } else if (threeChildren != null && threeChildren.length > 0){
                for(var k = 0; k<threeChildren.length; k++) {
                  allmenu.push(threeChildren[k])
                  if (threeChildren[k].path == path){
                    oneid = menus[i].id
                    twoid = threeChildren[k].parentId
                    threeid = threeChildren[k].id
                    level = 3
                    name = threeChildren[k].description
                    twopos = j
                    threepos = k
                    children = threeChildren
                    twoname = twoChildren[j].description
                  }
                }
              }
            }
          }
        }
        var obj = {
          allmenu: allmenu,
          oneid: oneid,
          twoid: twoid,
          threeid: threeid,
          level: level,
          name: name,
          twopos: twopos,
          threepos: threepos,
          path: path,
          children: children,
          twoname: twoname
        }
        return obj
      }

      /**
       * 递归获取菜单名称
       * @param {array} menus 全部菜单数据
       * @param {string} path  当前选中的path(hash)
       */
      function getMenuName(menus, path) {
        var name = ''
        var id = ''
        for(var i=0;i<menus.length;i++){
          if (menus[i].path == path) {
            name = menus[i].description
            id = menus[i].id
          }else if (menus[i].children != null && menus[i].children.length > 0){
            (function(){
              var m = arguments[0]
              var menupath = arguments[1]
              for(var j=0; j< m.length; j++) {
                if (m[j].path == menupath) {
                  name = m[j].description
                  id = m[j].id
                } else if (m[j].children != null && m[j].children.length > 0) {
                  arguments.callee(m[j].children, path)
                }
              }
            })(menus[i].children, path)
          }
        }
        var obj = {
          name: name,
          id: id
        }
        return obj
      }

      function getByMenuId(Data, id) {
        var Deep, T, F
        for( F = Data.length; F;){
          T = Data[--F]
          if(id === T.path) return T
          if (T.children) {
            Deep = getByMenuId(T.children, id)
            if (Deep) return Deep
          }
        }
      }

    })
  }
})(jQuery, window)