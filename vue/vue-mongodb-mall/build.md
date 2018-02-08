#代码部署

## 上传代码到远程机
```
// 传输单个文件
scp /目录/bin/www root@123.1.1.21:/workspace/demo/bin/www

// 传目录
scp -r /目录/**  root@123.1.1.21:/workspace/demo/
```

## nginx实现代理转发
http://blog.csdn.net/tobacco5648/article/details/51099426