// interface 和 type 相类似，但并不完全一致 
interface Person {
  // readonly name: string,
  name: string;
  age?: number;  // age属性可有可无
  [propName: string]: any;  // 还可以有其它属性，只要是字符串类型就行
  say(): string;  // 必须有一个说话的方法
}

// 接口继承
interface Teacher extends Person {
  teach(): string;
}

interface SayHi {
  (word: string): string
}

const getPersonName = (person: Person): void => {
  console.log(person.name)
}

const setPersonName = (person: Person, name: string): void => {
  person.name = name;
}

const person = {
  name: 'Dell',
  sex: 'male',
  say() {
    return 'say hello'
  },
  teach() {
    return 'teach'
  }
}
getPersonName(person)
setPersonName(person, 'benson')


class UserPerson implements Person {
  name: 'benson';
  say() {
    return 'hello'
  }
}

