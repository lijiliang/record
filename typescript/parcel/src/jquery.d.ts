// 定义全局变量
// declare var $: (param: () => void) => void;

// interface JqueryInstance {
//   html: (html: string) => JqueryInstance
// }
// // 定义全局函数
// declare function $(readyFunc: () => void): void;

// // 函数重载，同一个函数可以有多种形式
// declare function $(selector: string): JqueryInstance

// // 如何对 对象进行类型定义，以及对类进行类型定义，以及命名空间的类型定义
// declare namespace $ {
//   namespace fn {
//     class init { }
//   }
// }

// 使用interface的语法，实现函数重载
// interface jQuery {
//   (readyFunc: () => void): void;
//   (selector: string): JqueryInstance;
// }

// declare var $: jQuery


// es6 模块化描述文件
declare module 'jquery' {
  interface JqueryInstance {
    html: (html: string) => JqueryInstance
  }

  // 混合类型
  function $(readyFunc: () => void): void;
  function $(selector: string): JqueryInstance

  namespace $ {
    namespace fn {
      class init { }
    }
  }

  export = $
}