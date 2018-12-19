# numjucks 
最近在用egg.js做官网，用了官方默认的模板引擎numjucks。现记录下一些常用的语法

numjucks可以用任意扩展名来命名模板名文件，推荐使用'.njk'
```
$ npm install nunjucks

require('nunjucks');
```

## 变量
```
{{ usernmae }}    {{ foo.bar }}
```

## 过滤器
```
{{ foo | title }}    {{ foo | join(',') }}
```

## 模板继承
定义一个"block"，子模板可以覆盖它
```
{% extends './layouts/layouts.njk'%}
{% block header %}{% endblock %}
{% block main %}
  首页
{% endblock %}
{% block footer %}

{% endblock %}
```

## if
```
{% if num > 20 %}
	大于20显示些内容
{% endif %}

{% if num > 20 %}
  大于20
{% elif num < 6 %}
  小于6
{% else %}
  其它
{% endif %}
```

## for
一、遍历数组
```
var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}];
<h1>标题</h1>
<ul>
  {% for item in items %}
    {{item.title}}
  {% endfor %}
</ul>
```
二、遍历对象
```
var food = {
    'ketchup': '5 tbsp',
    'mustard': '1 tbsp',
    'pickle': '0 tbsp'
};

<div>
  {% for key, value in food %}
    {{key}} - {{value}}
  {% endfor %}
</div>
```

## set 设置和修改变量
```
let username = 'siguang';

{{ username }}            // siguang
{% set username = 'lulu' %}
{{ username }}            // lulu
```

## extends 指定模板继承
```
{% extends 'A.html' %}

{% block header %}
		234567
{% endblock %}
```

## block 区块
```
{% block css %}
		
{% endblock %}
```

## include 可以引用的模板
```
{% include "item.html" %}
```

## import 加载不同的模板

## filter 区块中内容调用过滤器
```
{% filter replace("force", "forth") %}
		may the force be with you
	{% endfilter %}
```

## 去除前后空格
```
var str = ' sssfsdfs ';

{% -%}
```

## 显示html
```
{{content | safe}}
```

## macro 宏
可传入参数,可以像函数一样使用
定义 macro.nj
```
{% macro field(name, value='', type='text') %}
<div class="field">
  <input type="{{ type }}" name="{{ name }}"
         value="{{ value | escape }}" />
</div>
{% endmacro %}
```
调用
```
{% import "./macro.nj" as macros %}

{{ field('user') }}
{{ field('pass', type='password') }}
```


## 运算符
```
表达式 String、Number、Array、Dicts、Boolean

运算符 +、-、/、//、%、*、**

比较 ==、===、!=、!==、>、>=、<、<=

逻辑 and、or、not   {% if users and showUsers %} ... {% endif %}
```

## 函数
```
传入一个函数，在这里可以执行 {{ foo(1,2,3) }}
```

表达式
```
  {{ /bar$/g }}

g: 应用到全局
i: 不区分大小写
m: 多行模式
y: 粘性支持（sticky）
```

参考资料
http://mozilla.github.io/nunjucks/cn/templating.html