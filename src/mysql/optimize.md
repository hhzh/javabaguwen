MySQL调优是面试中最常问的问题，但是面试者在回答这个问题的时候，答的很混乱，逻辑不清晰，也不全面。今天就跟大家一起总结一下MySQL调优流程。

面试官：我看你的简历上写着精通MySQL调优，你说一下MySQL调优流程？

# 排查慢SQL
第一步不是使用explain命令分析慢SQL，而是先要找到慢SQL。
排查慢SQL，最容易想到的就是查看慢SQL日志。
## 慢SQL日志

1. 查找慢SQL日志文件位置：
```sql
show variables like '%slow_query_log_file%';
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1713625073865-fac42fe3-afd4-480a-bca3-9dfe90e8213e.png#averageHue=%23f1f1f1&clientId=uc1ce16c9-2538-4&from=paste&height=248&id=u0c8e667b&originHeight=248&originWidth=986&originalType=binary&ratio=1&rotation=0&showTitle=false&size=51647&status=done&style=none&taskId=u493b0dc7-6f6a-4d33-95a3-df5cf35f97c&title=&width=986)

2. 使用**mysqldumpslow**命令分析慢SQL日志
```sql
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
查询返回结果最多的10条SQL：
```sql
mysqldumpslow -s r -t 10 /usr/local/mysql/data/localhost_slow.log
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1713625159115-498bab9d-2b18-4284-8986-6ffd2cfcb6f4.png#averageHue=%23efefef&clientId=uc1ce16c9-2538-4&from=paste&height=178&id=u039ca20d&originHeight=178&originWidth=1292&originalType=binary&ratio=1&rotation=0&showTitle=false&size=64774&status=done&style=none&taskId=u8ae215b3-732b-48c0-a79e-663d89dab97&title=&width=1292)
查询耗时最长的10条SQL：
```sql
mysqldumpslow -s t -t 10 /usr/local/mysql/data/localhost_slow.log
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1713625180971-773b3dc0-da5f-4fcf-ba9f-e9f53034eb64.png#averageHue=%23efefef&clientId=uc1ce16c9-2538-4&from=paste&height=178&id=u1d23dde7&originHeight=178&originWidth=1292&originalType=binary&ratio=1&rotation=0&showTitle=false&size=64774&status=done&style=none&taskId=u5a2409b5-bddd-4c2f-894d-b41fcc4376b&title=&width=1292)
## performance_schema 库
performance_schema库帮助我们记录了MySQL的运行情况，很多性能问题都可以在performance_schema库中查到。
有哪些锁等待、加锁的SQL、正在执行的事务等。

- information_schema.innodb_lock_waits 锁等待
- information_schema.innodb_locks 定位锁
- information_schema.innodb_trx 定位事务
- performance_schema.threads 定位线程
- performance_schema.events_statements_current 定位SQL
- information_schema.processlist 正在执行的SQL进程
- information_schema.profiling 分析SQL每一步的耗时，查询性能瓶颈
1. 查看锁等待情况：
```sql
select * from information_schema.innodb_lock_waits;
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1713860874033-14609d9b-8226-425c-bdfe-29cb94005587.png#averageHue=%23eeeeee&clientId=u285fc8e7-a5ac-4&from=paste&height=252&id=u1540c2f3&originHeight=252&originWidth=1122&originalType=binary&ratio=1&rotation=0&showTitle=false&size=62528&status=done&style=none&taskId=u27d47b31-9836-4818-92ba-afe10a5078a&title=&width=1122)
可以看到有一个锁等待的事务。

2. 查看正在竞争的锁
```sql
select * from information_schema.innodb_locks;
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1713861499500-1f56ba03-596b-418f-b304-3f839362d79c.png#averageHue=%23f5f5f4&clientId=u285fc8e7-a5ac-4&from=paste&height=276&id=u610179b9&originHeight=276&originWidth=1908&originalType=binary&ratio=1&rotation=0&showTitle=false&size=140944&status=done&style=none&taskId=u5a49eea4-13c8-47c5-ba70-05e9b57bb37&title=&width=1908)
可以看到，MySQL统计的非常详细：
> lock_trx_id 表示事务ID 
> lock_mode 表示排它锁还是共享锁
> lock_type 表示锁定的记录，还是范围
> lock_table 锁的表名 
> lock_index 锁定的是主键索引

3. 查看正在执行的事务
```sql
select * from information_schema.innodb_trx;
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1713861545774-94ee6197-b796-4064-a74f-0d5545920f9e.png#averageHue=%23ecedeb&clientId=u285fc8e7-a5ac-4&from=paste&height=362&id=u30fa8926&originHeight=362&originWidth=1976&originalType=binary&ratio=1&rotation=0&showTitle=false&size=122413&status=done&style=none&taskId=u8c22eaac-7786-4a3a-9538-eebf57982c4&title=&width=1976)
可以清楚的看到正在执行的事务有两个，一个状态是锁等待（LOCK WAIT），正在执行的SQL也打印出来了。

4. 查看事务线程
```sql
select * from performance_schema.threads where processlist_id=193;
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1713861631381-4c9b3288-cad7-4c56-97de-483b0d104b96.png#averageHue=%23f1f1f0&clientId=u285fc8e7-a5ac-4&from=paste&height=334&id=uba874885&originHeight=334&originWidth=1970&originalType=binary&ratio=1&rotation=0&showTitle=false&size=101063&status=done&style=none&taskId=u70bf6ad3-0c48-4033-81f8-65b647c98da&title=&width=1970)

5. 查看线程正在执行的SQL语句
```sql
select THREAD_ID,CURRENT_SCHEMA,SQL_TEXT 
from performance_schema.events_statements_current 
where thread_id=218;
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1713861668183-99d8b802-c53c-4db7-8214-7567f43800a0.png#averageHue=%23ebedec&clientId=u285fc8e7-a5ac-4&from=paste&height=322&id=u53e1cc3e&originHeight=322&originWidth=1962&originalType=binary&ratio=1&rotation=0&showTitle=false&size=107371&status=done&style=none&taskId=u5ae50977-1d8b-4936-9f34-9d6aaa73c66&title=&width=1962)
# 优化慢SQL
## explain执行计划
最常用的方案就是使用explain命令，查看SQL的索引使用情况。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1713858630946-819d9bfe-3b4d-4ecd-ac3c-759a5d8f855d.png#averageHue=%23fafafa&clientId=ue91ecc20-be6a-4&from=paste&height=2238&id=ucb586f08&originHeight=2238&originWidth=1856&originalType=binary&ratio=1&rotation=0&showTitle=false&size=394979&status=done&style=none&taskId=ue5213c96-5d64-4f29-b6cb-bcda6b95679&title=&width=1856)
优先查看type字段，可以看到是否用到索引？用到了哪种索引？性能由好到差依次是：
> system > const > eq_ref > ref  > ref_or_null > index_merge > range > index > ALL

再看一下key_len（索引长度），可以看出用到了联合索引中的前几列。
再看一下rows（预估扫描行数），如果扫描行数过多，表示匹配到结果数过多，会出现慢SQL，可以修改查询条件，缩减查询范围，减少扫描行数。
最后看一下Extra字段，如果显示Using index表示用到了覆盖索引，减少了回表查询，可以提高查询效率。如果显示Using filesort（排序字段没有使用索引）、Using temporary（用到临时表存储中间查询结果）、Using join buffer（表连接没有用到索引），这些都是需要优化的。
## 创建索引规范
有时候已经创建索引未必合适，可以选取适合创建索引的字段。
哪些字段适合创建索引？有如下几条规范：

1. 频繁查询的字段适合创建索引
2. 区分度高的字段适合创建索引
3. 有序的字段适合创建索引
4. 在where和on条件出现的字段优先创建索引
5. 优先创建联合索引，区分度高的字段放在联合索引第一列
6. 过长字符串可以使用前缀索引
7. 频繁更新的字段不适合创建索引
8. 避免创建过多索引
## 优化查询规范
总结了一些使用MySQL查询的规范，遵守可以提高查询效率。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1713860423577-c1edb848-976f-47fd-a2a7-33831d69a224.png#averageHue=%23f8f8f8&clientId=ue91ecc20-be6a-4&from=paste&height=758&id=u4d780961&originHeight=758&originWidth=548&originalType=binary&ratio=1&rotation=0&showTitle=false&size=86672&status=done&style=none&taskId=ub3c5a79d-8b23-4ed6-ab30-20728fb9385&title=&width=548)
## 索引失效
如果遇到索引失效，也有可能出现慢SQL。常见的索引失效场景有如下这些：

1. 数据类型隐式转换
2. 模糊查询 like 以%开头
3. or前后没有同时使用索引
4. 联合索引，没有使用第一列索引
5. 在索引字段进行计算操作
6. 在索引字段字段上使用函数
7. 优化器选错索引

如果优化器选错索引，可以使用force index强制使用指定的索引。
例如：
```sql
select * from user FORCE INDEX(user_id) where user_id=1;
```
## optimizer trace（优化器追踪）
当MySQL表中存在多个索引时，MySQL优化器会选择其中一个或者多个，有时候也会选错索引。optimizer trace（优化器追踪）可以查看explain执行计划的生成过程，以及每个索引的预估成本，可以了解到MySQL优化器为什么会选择这个索引。
optimizer trace同样也是在information_schema库中。
```sql
SELECT * FROM information_schema.OPTIMIZER_TRACE;
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1713859927593-a31521b7-8dc1-4857-9929-686a0968ba5a.png#averageHue=%23f3f3f3&clientId=ue91ecc20-be6a-4&from=paste&height=178&id=u1bd711f0&originHeight=178&originWidth=975&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23662&status=done&style=none&taskId=u89edb806-6e14-4708-a7f3-af982378c7e&title=&width=975)
输出结果共有4列：
> QUERY 表示我们执行的查询语句 
> TRACE 优化器生成执行计划的过程（重点关注） 
> MISSING_BYTES_BEYOND_MAX_MEM_SIZE 优化过程其余的信息会被显示在这一列 
> INSUFFICIENT_PRIVILEGES 表示是否有权限查看优化过程，0是，1否

接下来我们看一下TRACE列的内容，里面的数据很多，我们重点分析一下range_scan_alternatives结果列，这个结果列展示了索引选择的过程。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1713859965640-7520d013-846d-4025-8b51-cf7fe91525ed.png#averageHue=%231a354b&clientId=ue91ecc20-be6a-4&from=paste&height=740&id=u8f3dfde5&originHeight=740&originWidth=516&originalType=binary&ratio=1&rotation=0&showTitle=false&size=75793&status=done&style=none&taskId=u9e3684f5-981a-424a-907c-643a3115ca6&title=&width=516)
输出结果字段含义：
> index 索引名称
> ranges 查询范围
> index_dives_for_eq_ranges 是否用到索引潜水的优化逻辑
> rowid_ordered 是否按主键排序 
> using_mrr 是否使用mrr 
> index_only 是否使用了覆盖索引
> in_memory 使用内存大小
> rows 预估扫描行数
> cost 预估成本大小，值越小越好
> chosen 是否被选择
> cause 没有被选择的原因，cost表示成本过高

从输出结果中，可以看到优化器最终选择了使用(`name`)索引，而(`gender`,`name`)索引因为成本过高没有被使用。
## 死锁日志
当使用MySQL事务的时候，可能会出现死锁，也会出现超时的情况。
可以使用命令查看死锁日志，以及产生死锁的SQL。
```sql
show engine innodb status;
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1713860684651-f1575bac-cbdd-4974-a1b7-6a3625c31d02.png#averageHue=%2337495a&clientId=ue91ecc20-be6a-4&from=paste&height=2367&id=udf51a3b6&originHeight=2367&originWidth=1500&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1680855&status=done&style=none&taskId=u516c6e43-b529-4f1b-963d-8cf7c98dd18&title=&width=1500)
在死锁日志中，可以清楚地看到这两条insert语句产生了死锁，最终事务2被会回滚，事务1执行成功。
```sql
# 事务1
insert into user (id,name,age) values (5,'张三',5);
# 事务2
insert into user (id,name,age) values (6,'李四',6);
```

1. 先看一下MySQL表数据量有多大，如果超过5千万条，常规的SQL优化手段不起作用，可以进行`分库分表`。
2. 分库分表的同时，如果发现写请求很多，可以进行`读写分离`，拆分成读库和写库。
3. 使用explain命令查看SQL执行计划，看是否用到索引、用到了哪些索引、索引的性能、扫描的行数等。
4. 如果想知道explain命令中为什么会使用这个索引，可以使用 优化器追踪（optimizer trace）查看优化器的选择过程，以及每个索引的扫描行数、预估成本等。
5. 如果要分析有哪些慢SQL，可以查看`慢SQL日志`slow_query_log，慢SQL中记录了耗时长的、锁定时间长的、返回记录多的SQL。
6. 查看`死锁日志`，有没有出现死锁的情况。show engine innodb status;
7. 看一下有没有深分页的问题，改成子查询，先查询出主键再查询出所有字段，用到覆盖索引。使用分页游标。
8. 查看`information_schema`库，有哪些锁等待、加锁的SQL、正在执行的事务等。
   - information_schema.innodb_lock_waits 锁等待
   - information_schema.innodb_locks 定位锁
   - information_schema.innodb_trx 定位事务
   - performance_schema.threads 定位线程
   - performance_schema.events_statements_current 定位SQL
   - information_schema.processlist 正在执行的SQL进程
   - information_schema.profiling 分析SQL每一步的耗时，查询性能瓶颈
## 分库分表
如果常规的SQL优化手段不起作用，就可以进行分库分表。
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1713861948228-b1d2a6b5-f758-4389-a307-034df02e7ae7.png#averageHue=%23f8f8f8&clientId=u285fc8e7-a5ac-4&from=paste&height=868&id=ub57a2fcc&originHeight=868&originWidth=2344&originalType=binary&ratio=1&rotation=0&showTitle=false&size=275900&status=done&style=none&taskId=ud6b99465-89cf-44d4-8c27-b45b48b21cc&title=&width=2344)
