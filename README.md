# pubg-spider

一个基于nodejs的爬取pubg.op.gg数据的爬虫项目

## 1. 文件路径
    /src                    
        /configs                    ----配置文件
            /constants.js           ----常量
            /database.js(ignored)   ----mongo数据库配置文件(被gitigore屏蔽)
            /player.js              ----人员清单
        /spider
            /index.js               ----比赛数据爬虫
            /user.js                ----人员id爬虫
            /userAgents.js          ----userAgents配置文件
        /alg.js                     ----算法
        /dao.js                     ----数据持久化模块
    /test                           ----测试文件夹

## 2. 运行方式
目前，可直接运行

```bash
npm run battle
```
来获取我本人的东南亚服务器的吃鸡数据。

更多的功能还在开发中

## 3. todo
1. 解决爬虫访问多次后被服务器ban的问题
2. 完成端到端的测试
3. 将回调函数的异步写法改为 async/awaitss
4. 爬取更多的用户的数据
