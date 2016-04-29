# 45个javascript小技巧 #
- 声明变量时别忘记用val
- 相等比较请用 === 而不是 ==
- undefined、null、0、false、NaN、''(空字符串)、都是假值
- 行未加封号
- 小心使用typeof、instanceof以及constructor
   - javascript原型链和instanceof运算符的暖昧关系
   - typeof笔instanceof简介及用法
   - javascript中prototype、constructor以及__proto__之间的三角关系
- IIFE 立即执行函数表达式
- 获取数组的任一元素 
    ```javascript
    var arr = [10,24,'a','foo',2342,100];
    var randomItem = arr[Math.floor(Math.random()*arr.length)];
    ```
- 获取某一范围内的任一数值
  ```javascript
    var x = Math.floor(Math.random()*(max - min + 1)) + min;
  ```
- 生成0~max的数组([0,1,2,...max])
  ```javascript
    var a = [],max = 10;
    for(var i=0;a.push(i++) <= max;);
  ```
- 生成任意长度字符串(字符包括a-z0-9)
    ```javascript
    function generateRandomAlphaNum(len){
        var rdmString = '';
        for(;rdmString.length<len;rdmString+=Math.random().toString(36).substr(2));
        return rdmString.substr(0,len)
    }
    ```
  - 数组乱序
    ```javascript
    var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
    numbers = numbers.sort(function(){ return Math.random() - 0.5});
    ```
- 在一个数组后附加一个数组
  ```javascript
    var array1 = [12 , "foo" , {name "Joe"} , -2458];
    var array2 = ["Doe" , 555 , 100];
    Array.prototype.push.apply(array1, array2);
  ```
- 把伪数组转为数组
```javascript
    var argArray = Array.prototype.slice.call(arguments);
```
- 判断数字
    ```javascript
    function isNumber(){
        return !isNaN(parseFloat(n))  && isFinite(n);
    }
    ```
- 获取数组最值
    ```javascript
    var numbers = [5,12,2342,105,90,14];
    var maxInNumbers = Math.max.apply(Math, numbers);
    var mixInNumbers = Math.min.apply(Math, numbers);
    ```
- 清空数组
    ```javascript
    var myArray = [1,2,3];
    myArray.length = 0;
    ```
- 小数点保留
    ```javascript
    var num = 2.431231;
    num = num.toFixed(4);
    ```
- 用for-in检查对象属性
    ```javascript
    for(var name in object){
        if(object.hasOwnProperty(name)){
            //do something
        }
    }
    ```
- 使用 isFinite() 方法前先检查参数
    ```javascript
        isFinite(0/0) ; // false 
        isFinite("foo"); // false 
        isFinite("10"); // true 
        isFinite(10);   // true 
        isFinite(undefined);  // false 
        isFinite();   // false 
        isFinite(null);  // true  !!! 
    ```
- JSON 序列化和反序列化
    ```javascript
        var person = {name :'Saad', age : 26, department : {ID : 15, name : "R&D"} }; 
        var stringFromPerson = JSON.stringify(person); 
        /* stringFromPerson is equal to "{"name":"Saad","age":26,"department":{"ID":15,"name":"R&D"}}"   */ 
        var personFromString = JSON.parse(stringFromPerson);  
        /* personFromString is equal to person object  */
    ```

- HTML 实体编码
    ```javascript
        function escapeHTML(text) {  
            var replacements= {"<": "&lt;", ">": "&gt;","&": "&amp;", """: "&quot;"};                      
            return text.replace(/[<>&"]/g, function(character) {  
                return replacements[character];  
            }); 
        }
    ```