
export class Header {
  constructor() {
    const elem = document.createElement('div');
    elem.innerText = 'this is Header1';
    document.body.appendChild(elem);
  }
}

export class Content {
  constructor() {
    const elem = document.createElement('div');
    elem.innerText = 'this is Content1';
    document.body.appendChild(elem);
  }
}

export class Footer {
  constructor() {
    const elem = document.createElement('div');
    elem.innerText = 'this is Footer1';
    document.body.appendChild(elem);
  }
}