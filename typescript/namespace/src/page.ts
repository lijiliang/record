namespace Home {
  class Header {
    constructor() {
      const elem = document.createElement('div');
      elem.innerText = 'this is Header';
      document.body.appendChild(elem);
    }
  }

  class Content {
    constructor() {
      const elem = document.createElement('div');
      elem.innerText = 'this is Content';
      document.body.appendChild(elem);
    }
  }

  class Footer {
    constructor() {
      const elem = document.createElement('div');
      elem.innerText = 'this is Footer';
      document.body.appendChild(elem);
    }
  }
  export class Page {
    constructor() {
      new Header();
      new Content();
      new Footer();
    }
  }
}
