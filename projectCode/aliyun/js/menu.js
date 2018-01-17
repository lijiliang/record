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
      $.each(opts.dataList, function(index, value){

        var _itemHtml = ''  // 二级列表li
        $.each(value.children, function(_index, _value){
          var _childrenData = JSON.stringify(_value.children)
          _itemHtml += '<li>'+
          '      <div class="tip-show">'+
          '          <div class="tip-titlt"> '+
          '            <i class="tip-icon fa fa-caret-left"></i>'+ _value.description +
          '          </div>'+
          '      </div>'+
          '      <a href='+_value.path+' data-path='+_value.path+' data-children='+_childrenData+'>'+
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
      
      // 左侧菜单
      var sidebarLeftHtml = '<div class="sidebar-left left-full">'+
      '      <div class="sidebar-fold">'+
      '        <span class="fa fa-bars"></span>'+
      '      </div>'+
      '      <div class="sidebar-title-box">'+ _sidebarNavHtml +'</div>'+
      '</div>';

      $(this).append(sidebarLeftHtml)

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
    })

    $('.m-nav-list li a').on('click', function(e){
      e.preventDefault();
      console.log('sadf')
    })

  }
})(jQuery, window)