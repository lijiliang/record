## Mongoose的使用

## Mongoose简介
Mongoose是在node.js异步环境下对mongodb进行便捷操作的对象模型工具

Mongoose是NodeJS的驱动，不能作为其他语言的驱动。Mongoose有两个特点
    - 通过关系型数据库的思想来设计非关系型数据库
    - 基于mongodb驱动，简化操作

**Mongooose三个重要概念：**
- Schema： 相当于一个数据库的模板，Schema不具备操作数据库的能力。
- Model： 由Schema编译而成的构造器，具有抽象属性和行为，可以对数据库进行增删查改。
- Entity： 真实的数据。

Schema 生成 Model ，Model 创造 Document，Model和Document都可对数据库操作造成影响,但Model比Document更具操作性

Schema用于定义数据库的结构。类似创建表时的数据定义(不仅仅可以定义文档的结构和属性，还可以定义文档的实例方法、静态模型方法、复合索引等)，每个Schema会映射到mongodb中的一个collection，Schema不具备操作数据库的能力

Model是由Schema编译而成的构造器，具有抽象属性和行为，可以对数据库进行增删查改。Model的每一个实例（instance）就是一个文档document


**简单demo**
```
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/test');
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open',()=>{
    //定义一个schema
    let Schema = mongoose.Schema({
        name:String,
        age:Number
    });
    // 自定义方法
    Schema.methods.getAge = function(){
        console.log("I am "+this.age + "years old");
    }
    //继承一个schema
    let Model = mongoose.model("student",Schema);
    //生成一个document
    let student = new Model({
        name:'hanmeimei',
        age:16
    });
    //存放数据
    student.save((err,res)=>{
        if(err) return console.log(err);
        res.getAge();
        //查找数据
        Model.find({name:'hanmeimei'},(err,data)=>{
            console.log(data);
        })
    });
})
```

输出
```
I am 16years old
[ { _id: 5ab1cad40b0132e9a9e6c65b,
    name: 'hanmeimei',
    age: 16,
    __v: 0 } ]
```

查看数据库，发现多了一个`students`的 `table` ，Mongoose会将集合名称设置为模型名称的 **小写版**。如果名称的最后一个字符是字母，则会变成 **复数**；如果名称的最后一个字符是数字，则不变；如果模型名称为 **MyModel**，则集合名称为 **mymodels**；如果模型名称为 **Model1**，则集合名称为 **model1**
