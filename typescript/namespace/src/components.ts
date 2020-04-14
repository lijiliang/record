namespace Components {
  // 导出子的命名空间
  export namespace SubComponents {
    export class Test { }
  }

  export interface User {
    name: string
  }

  export class Header {
    constructor() {
      const elem = document.createElement('div');
      elem.innerText = 'this is Header';
      document.body.appendChild(elem);
    }
  }

  export class Content {
    constructor() {
      const elem = document.createElement('div');
      elem.innerText = 'this is Content';
      document.body.appendChild(elem);
    }
  }

  export class Footer {
    constructor() {
      const elem = document.createElement('div');
      elem.innerText = 'this is Footer';
      document.body.appendChild(elem);
    }
  }
}