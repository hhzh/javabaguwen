昨晚我正在床上睡得着着的，突然来了一条短信。
![手机图片.jpeg](https://cdn.nlark.com/yuque/0/2023/jpeg/12651402/1686489020512-2856e4de-e07f-472a-b4bf-692ea0c74e29.jpeg#averageHue=%23437f0d&clientId=u8c354205-a028-4&from=paste&height=500&id=uc066f531&originHeight=500&originWidth=500&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67032&status=done&style=none&taskId=u08cb1f6d-9adc-418f-9973-2363c96d722&title=&width=500)
什么？线上的订单无法取消！
我赶紧登录线上系统，查看业务日志。
![image-20220805234433155.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686489028695-856ac076-eb33-4096-af12-ceadaf5a4261.png#averageHue=%232c3235&clientId=u8c354205-a028-4&from=paste&height=796&id=u926e8021&originHeight=796&originWidth=1958&originalType=binary&ratio=1&rotation=0&showTitle=false&size=532491&status=done&style=none&taskId=uc3015ea4-c69e-4be7-b51e-158b0dbd516&title=&width=1958)
发现有**MySQL锁超时**的错误日志。
不用想，肯定有另一个事务正在修改这条订单，持有这条订单的锁。
导致当前事务获取不到锁，一直等待，直到超过锁超时时间，然后报错。
既然问题已经清楚了，接下来就轮到怎么排查一下到底是哪个事务正在持有这条订单的锁。
好在MySQL提供了丰富的工具，帮助我们排查锁竞争问题。

现场复现一个这个问题：
创建一张用户表，造点数据：
```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '姓名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
事务1，更新id=1的用户姓名，不提交事务：
```sql
begin;
update user set name='一灯' where id=1;
```
事务2，删除id=1的数据，这时候会产生锁等待：
```
begin;
delete from user where id=1;
```
接下来，我们就通过MySQL提供的锁竞争统计表，排查一下锁等待问题：
先查一下锁等待情况：
```
select * from information_schema.innodb_lock_waits;
```
![image-20220805230315814.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686489045714-de20211e-69f5-4886-8d2d-7b09f669dc36.png#averageHue=%23f0f0ef&clientId=u8c354205-a028-4&from=paste&height=252&id=ue37e08ed&originHeight=252&originWidth=1122&originalType=binary&ratio=1&rotation=0&showTitle=false&size=111604&status=done&style=none&taskId=u7cf31a39-a946-4f8a-ab98-3a7766069a2&title=&width=1122)
可以看到有一个锁等待的事务。
然后再查一下正在竞争的锁有哪些？
```
select * from information_schema.innodb_locks;
```
![image-20220805230652982.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686489054565-641a35bb-a0b7-4ba2-8d7c-c5833958c0d3.png#averageHue=%23f5f5f4&clientId=u8c354205-a028-4&from=paste&height=276&id=uae111877&originHeight=276&originWidth=1908&originalType=binary&ratio=1&rotation=0&showTitle=false&size=184077&status=done&style=none&taskId=u3df54f03-10d1-4e43-973a-ce56f2dc446&title=&width=1908)

可以看到，MySQL统计的非常详细：
> lock_trx_id 表示事务ID 
> lock_mode 表示排它锁还是共享锁
> lock_type 表示锁定的记录，还是范围
> lock_table 锁的表名 
> lock_index 锁定的是主键索引


再查一下正在执行的事务有哪些？
```
select * from information_schema.innodb_trx;
```
![image-20220805231412311.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686489064064-4c1f7f12-c433-47fd-8d81-360477b2eb8b.png#averageHue=%23ecedeb&clientId=u8c354205-a028-4&from=paste&height=362&id=udebc2df6&originHeight=362&originWidth=1976&originalType=binary&ratio=1&rotation=0&showTitle=false&size=148258&status=done&style=none&taskId=u27ac2b69-239f-4866-bda5-2f18f2db783&title=&width=1976)
可以清楚的看到正在执行的事务有两个，一个状态是锁等待（`LOCK WAIT`），正在执行的SQL也打印出来了：
```
delete from user where id=1;
```
正是事务2的删除语句。
不用问，第二条，显示正在运行状态（`RUNNING`）的事务就是正在持有锁的事务1，MySQL线程id（`trx_mysql_thread_id`）是193。
我们用MySQL线程id查一下事务线程id：
```
select * from performance_schema.threads where processlist_id=193;
```
![image-20220805232352034.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686489073707-98e94d80-de9d-41e8-9e9e-abad539be193.png#averageHue=%23f1f1f0&clientId=u8c354205-a028-4&from=paste&height=334&id=u4886fb7a&originHeight=334&originWidth=1970&originalType=binary&ratio=1&rotation=0&showTitle=false&size=125016&status=done&style=none&taskId=u02eb1656-118a-4eac-b236-621001b2c1f&title=&width=1970)
找到对应的事务线程id是218，然后再找一下这个线程正在执行的SQL语句：
```
select THREAD_ID,CURRENT_SCHEMA,SQL_TEXT 
from performance_schema.events_statements_current 
where thread_id=218;
```
![image-20220805233523949.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686489082985-ab31c8dd-d8e1-4f8d-9514-dc8aacf2ce83.png#averageHue=%23ebedec&clientId=u8c354205-a028-4&from=paste&height=322&id=u907801a2&originHeight=322&originWidth=1962&originalType=binary&ratio=1&rotation=0&showTitle=false&size=130731&status=done&style=none&taskId=u589c71af-a038-430e-82a8-8812b8dda89&title=&width=1962)
可以清楚的看到这个线程正在执行的SQL语句就是事务1的update语句。
持有锁的SQL语句找到了，接下来再去找对应的业务代码也就轻而易举了。
以上是基于MySQL5.7版本，在MySQL8.0版本中有些命令已经删除了，替换成了其他命令，下篇文章再讲一下MySQL8.0怎么定位**MySQL锁超时**问题。
