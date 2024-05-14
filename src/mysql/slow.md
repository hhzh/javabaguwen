## 1. 慢查询日志的作用
慢查询日志默认不开启，建议手动开启，方便我们定位线上问题。
执行时间超过阈值的SQL会被写入到慢查询日志当中，这样可以帮助我们记录执行时间过长的SQL语句，定位线上慢SQL问题，方便我们进行SQL性能调优。
## 2. 慢查询日志的配置
### 2.1 查看是否开启了慢查询日志
```
show variables like 'slow_query_log';
```
![image-20220802212557114.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1710899399915-5c36db74-6e38-49ab-ae11-b7fdfcff6252.png#averageHue=%23f2f2f1&clientId=u9b9139c9-b02f-4&from=paste&height=242&id=u3cb3b96f&originHeight=242&originWidth=672&originalType=binary&ratio=1&rotation=0&showTitle=false&size=55362&status=done&style=none&taskId=u391096d5-6f6b-480b-8c7d-07c7ddf22d7&title=&width=672)
默认是OFF，不开启，可以手动开启。
### 2.2 开启慢查询日志
一种方法是可以使用MySQL命令开启：
```
set global slow_query_log=1;
```
![image-20220802212706986.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1710899409252-77c5cb0f-1ba0-47b3-bd3d-f6487456afee.png#averageHue=%23f3f3f2&clientId=u9b9139c9-b02f-4&from=paste&height=338&id=Il9C7&originHeight=338&originWidth=670&originalType=binary&ratio=1&rotation=0&showTitle=false&size=82262&status=done&style=none&taskId=u491c9d42-7ff3-4f04-a2bd-96c73d89c9a&title=&width=670)

另一种方法是修改MySQL配置文件，重新MySQL服务后，开启。
> 修改配置文件my.cnf，加入下面一行命令
> slow_query_log = ON

### 2.3 设置慢查询日志的阈值
慢查询日志的阈值默认是10，单位是秒。
对于线上服务来说，10秒太长了，我们可以手动修改。
![image-20220802213552061.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1710899418635-1d4e3a24-9562-4c74-9563-2ad1e4baeb19.png#averageHue=%23f4f4f3&clientId=u9b9139c9-b02f-4&from=paste&height=248&id=u30fc246e&originHeight=248&originWidth=724&originalType=binary&ratio=1&rotation=0&showTitle=false&size=59954&status=done&style=none&taskId=uefba480a-59c8-4415-83a1-1c764485d6a&title=&width=724)
一种是通过MySQL命令修改，比如修改为1秒：
```
set long_query_time=1;
```
![image-20220802214215003.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1710899428261-58065e0b-ea1e-4b65-a159-ed7527a82cef.png#averageHue=%23f4f4f3&clientId=u9b9139c9-b02f-4&from=paste&height=328&id=u2034636c&originHeight=328&originWidth=714&originalType=binary&ratio=1&rotation=0&showTitle=false&size=83438&status=done&style=none&taskId=uaee29efb-2fc5-4ab6-a825-a8b9d37b7ca&title=&width=714)
另一种方法是修改MySQL配置文件，重新MySQL服务后，开启。
> 修改配置文件my.cnf，加入下面一行命令
> long_query_time = 1

### 2.4 修改慢查询日志位置
使用MySQL命令查看慢查询日志位置：
```
show variables like '%slow_query_log_file%';
```
![image-20220802214504879.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1710899437756-64887849-6cc4-4ccb-9ed8-b21ad41041ee.png#averageHue=%23efefee&clientId=u9b9139c9-b02f-4&from=paste&height=248&id=u83cbc12b&originHeight=248&originWidth=986&originalType=binary&ratio=1&rotation=0&showTitle=false&size=72510&status=done&style=none&taskId=ue618abce-2af7-4696-aa48-ebd06dbc768&title=&width=986)
想要修改慢查询日志位置，可以修改MySQL配置文件，重新MySQL服务后，开启。
> 修改配置文件my.cnf，加入下面一行命令
> slow_query_log_file = /usr/local/mysql/data/localhost_slow.log

### 2.5 记录更多慢查询SQL
默认情况下管理语句是不会被记录到慢查询日志中，管理语句包括ALTER TABLE、 ANALYZE TABLE、 CHECK TABLE、 CREATE INDEX、 DROP INDEX、 OPTIMIZE TABLE和 REPAIR TABLE等。
![image-20220802220313648.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1710899448436-3522d4ff-8dd4-47a1-8136-ee7b2d7f4c2f.png#averageHue=%23f4f4f3&clientId=u9b9139c9-b02f-4&from=paste&height=242&id=ucd80abfa&originHeight=242&originWidth=874&originalType=binary&ratio=1&rotation=0&showTitle=false&size=65700&status=done&style=none&taskId=uab231ae5-2aae-41a1-be79-fd59221b4c2&title=&width=874)
管理语句也是非常重要的，如果想要被记录，可以通过MySQL命令修改：
```
set global log_slow_admin_statements=ON;
```
![image-20220802220532705.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1710899456548-7a18f65c-c042-4b98-967b-0fc52817fb7c.png#averageHue=%23f2f2f1&clientId=u9b9139c9-b02f-4&from=paste&height=334&id=u96947f2b&originHeight=334&originWidth=840&originalType=binary&ratio=1&rotation=0&showTitle=false&size=96487&status=done&style=none&taskId=ub8c0bfba-d99c-405e-90c9-de74ebc97e3&title=&width=840)
默认情况下，不使用索引的语句，也是不会被记录的。
够坑人吧！一不留神就掉坑里了，不记录不使用索引的语句，还要慢查询日志干嘛？
![image-20220802220828942.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1710899462867-18a5e209-6763-41e7-abcf-a764f584da56.png#averageHue=%23f4f4f3&clientId=u9b9139c9-b02f-4&from=paste&height=246&id=u17182a51&originHeight=246&originWidth=896&originalType=binary&ratio=1&rotation=0&showTitle=false&size=65247&status=done&style=none&taskId=u1cee14ab-572f-4204-bb82-507561fc42d&title=&width=896)
想要记录不使用索引的语句，可以通过命令修改：
```
set global log_queries_not_using_indexes=ON;
```
![image-20220802220936024.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1710899472638-53aa7398-39de-4617-b6d3-b796e0cd86c8.png#averageHue=%23f3f3f2&clientId=u9b9139c9-b02f-4&from=paste&height=332&id=u34d3364d&originHeight=332&originWidth=924&originalType=binary&ratio=1&rotation=0&showTitle=false&size=97205&status=done&style=none&taskId=uebbb4bb2-3c0d-484a-a6de-ad509ff1884&title=&width=924)
## 3. 慢查询日志的使用
手动造一条慢SQL，测试一下效果，user表中有100万表数据：
```
select * from user;
```
然后看一下慢查询日志文件的内容：
```
cat /usr/local/mysql/data/localhost_slow.log
```
![image-20220802215744087.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1710899481211-6869872f-7bdd-4ad3-9b55-878f6780e466.png#averageHue=%23f1f0ef&clientId=u9b9139c9-b02f-4&from=paste&height=268&id=u4e4fca85&originHeight=268&originWidth=1296&originalType=binary&ratio=1&rotation=0&showTitle=false&size=146085&status=done&style=none&taskId=u268aa70a-64e6-4d8b-8f57-acfb457dd57&title=&width=1296)
SQL语句和执行时间都被记录了。
## 4. 分析慢查询日志
有时候慢查询日志较多，手动查看起来并不是很方便，好在MySQL提供了分析慢查询日志的工具**mysqldumpslow**。
```java
常用参数有

-s: 表示按何种方式排序：
　　c: 访问次数
　　l: 锁定时间
　　r: 返回记录
　　t: 查询时间
　　al: 平均锁定时间
　　ar: 平均返回记录数
　　at: 平均查询时间
-t: 返回前面多少条的数据；
```
### 4.1 查询返回结果最多的10条SQL：
> mysqldumpslow -s r -t 10 /usr/local/mysql/data/localhost_slow.log

![image-20220802221842502.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1710899490756-8bb6bc54-c87f-40b9-9b6f-e16df6d2172e.png#averageHue=%23f3f3f2&clientId=u9b9139c9-b02f-4&from=paste&height=178&id=u88ef6098&originHeight=178&originWidth=1292&originalType=binary&ratio=1&rotation=0&showTitle=false&size=86646&status=done&style=none&taskId=u2a2be63f-dbc7-42d0-bb1b-7a8a48df890&title=&width=1292)
### 4.2 查询耗时最长的10条SQL：
> mysqldumpslow -s t -t 10 /usr/local/mysql/data/localhost_slow.log

![image-20220802221842502.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1710899498489-d7a930ff-d51b-4023-a4bc-33474f5d4520.png#averageHue=%23f3f3f2&clientId=u9b9139c9-b02f-4&from=paste&height=178&id=u1eb95d8b&originHeight=178&originWidth=1292&originalType=binary&ratio=1&rotation=0&showTitle=false&size=86646&status=done&style=none&taskId=ub0f79e22-2b07-430e-a6c7-a7202a200ab&title=&width=1292)
