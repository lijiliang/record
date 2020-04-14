///<reference path='./components.ts' />

// 声明命名空间
namespace Home {
  export class Page {
    user: Components.User = {
      name: 'Benson'
    }
    constructor() {
      new Components.Header();
      new Components.Content();
      new Components.Footer();
    }
  }
}
