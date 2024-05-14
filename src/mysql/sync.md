## 1. MySQL主从同步实现方式
MySQL主从同步是基于Bin Log实现的，而Bin Log记录的是原始SQL语句。
**Bin Log**共有三种日志格式，可以**binlog_format**配置参数指定。

| 参数值 | 含义 |
| --- | --- |
| Statement | 记录原始SQL语句，会导致更新时间与原库不一致。
比如 update_time=now() |
| Row | 记录每行数据的变化，保证了数据与原库一致，缺点是数据量较大。 |
| Mixed | Statement和Row的混合模式，默认采用Statement模式，涉及日期、函数相关的时候采用Row模式，既减少了数据量，又保证了数据一致性。 |

**常见的主从同步架构有一主多从、双主多从。**
![image-20220623221000975.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487544213-5cc24e91-28e4-41a0-b56e-1054b540e05d.png#averageHue=%23f3f2e3&clientId=u5870c972-1a24-4&from=paste&height=540&id=udd169b48&originHeight=540&originWidth=572&originalType=binary&ratio=1&rotation=0&showTitle=false&size=138116&status=done&style=none&taskId=ufa4b93d3-9825-4864-ace4-74dbb46cb35&title=&width=572)
![image-20220623221025652.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487550666-fe0860de-0896-446f-b873-2f087203a50c.png#averageHue=%23f1efdf&clientId=u5870c972-1a24-4&from=paste&height=536&id=u22121266&originHeight=536&originWidth=1052&originalType=binary&ratio=1&rotation=0&showTitle=false&size=226528&status=done&style=none&taskId=u77d7d84b-d03b-43b8-abe1-5315c79bb6d&title=&width=1052)

## 2. MySQL主从同步的作用

1. 读写分离，提升数据库性能
2. 容灾恢复，主服务器不可用时，从服务器提供服务，提高可用性
3. 冗余备份，主服务器数据损坏丢失，从服务器保留备份
### 一主多从架构：
一般是主库负责所有读写请求，而从库只负责容灾恢复和冗余备份。
如果做了读写分离的话，主库负责写请求，从库负责读请求，可以提升数据库性能。
### 双主多从架构：
一般是主库1负责所有读写请求，主库2不对外提供服务，只用来容灾恢复。
相比一主多从架构，双主多从架构可以减少宕机时间，更快恢复数据库可用状态。
## 3. 主动同步的原理
![image-20220623221744177.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487559310-3daa172f-dc50-4720-872e-501f513e887f.png#averageHue=%23dce8cc&clientId=u5870c972-1a24-4&from=paste&height=946&id=uee2ab33c&originHeight=946&originWidth=1052&originalType=binary&ratio=1&rotation=0&showTitle=false&size=409401&status=done&style=none&taskId=uafe692d8-36dc-4abb-b784-2beb183bfd8&title=&width=1052)

1.  当主库数据发生变更时，写入本地Bin Log文件 
2.  从库IO线程发起dump主库Bin Log文件的请求 
3.  主库IO线程推送Bin Log文件到从库中 
4.  从库IO线程把Bin Log内容写入本地的Relay Log文件中 
5.  从库SQL线程读取Relay Log文件内容 
6.  从库SQL线程重新执行一遍SQL语句 

## 4. 主从同步延迟问题
主从同步最常遇到的问题就是主从同步延迟，可以通过在从库上执行**show slave status**命令查看延迟时间，**Seconds_Behind_Master**表示延迟的秒数。
![image-20220620230713466.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487567275-1c163217-a937-4e61-9f2b-5325ed311212.png#averageHue=%232a0c21&clientId=u5870c972-1a24-4&from=paste&height=648&id=u29eeb541&originHeight=648&originWidth=639&originalType=binary&ratio=1&rotation=0&showTitle=false&size=97789&status=done&style=none&taskId=u8e0fecaf-9118-4585-9c2c-35fa257da5e&title=&width=639)

### 主从同步延迟的原因有哪些？

1.  从库机器性能较差
主库负责所有读写请求，从库只用来备份，会用性能较差的机器，执行时间自然较慢。 
2.  从库压力更大
读写分离后，主库负责写请求，从库负责读请求。
互联网应用一般读请求更多，所以从库读压力更大，占用更多CPU资源。 
3.  网络延迟
当主库的Bin Log文件往从库上发送时，可能产生网络延迟，也会导致从库数据跟不上。 
4.  主库有大事务
当主库上有个大事务需要执行5分钟，把Bin Log文件发送到从库，从库至少也需要执行5分钟，所以这时候从库就出现了5分钟的延迟。 

### **主从同步延迟的解决方案？**

1.  从库机器性能较差
把从库换成跟主库同等规格的机器。 
2.  从库压力更大
多搞几台从库，分担读请求压力。 
3.  网络延迟
联系运维或者云服务提供商解决。 
4.  主库有大事务
把大事务分割成小事务执行，大事务不但会产生从库延迟，还可能产生死锁，降低数据库并发性能，所以尽量少用大事务。 
## 5. 如何提升主从同步性能
### 1. 从库开启多线程复制
就是在主从同步的最后两步使用多线程，修改配置 **slave_parallel_workers**=4，代表开启4个复制线程。
![image-20220623222719256.png](https://cdn.nlark.com/yuque/0/2024/png/12651402/1710829738466-88663806-43b0-4aa1-b458-b89e780eba6e.png#averageHue=%23dce8cb&clientId=u455dc75c-574e-4&from=paste&height=934&id=u9677bbe0&originHeight=934&originWidth=994&originalType=binary&ratio=1&rotation=0&showTitle=false&size=407288&status=done&style=none&taskId=uc74be9c9-c7e4-468c-92d2-9177d47e360&title=&width=994)

### 2. 修改同步模式，改为异步
**主从同步共有三种复制方式：**

1.  全同步复制
当主库执行完一个事务，并且所有从库都执行完该事务后，才给客户端返回成功。 
2.  半同步复制
至少有一个从库执行完成后，就给客户端返回成功。 
3.  异步复制
主库执行完后，立即返回成功，不关心从库是否执行完成。 

如果对数据安全性要求没那么高，可以把同步模式改成半同步复制或者异步复制。

### 3. 修改从库Bin Log配置
**修改sync_binlog配置：**
> sync_binlog=0 ，表示写binlog不立即刷新磁盘，由系统决定什么时候刷新磁盘。
> sync_binlog=1，每次写binlog都刷新磁盘，安全性高，性能差。 
> sync_binlog=N，写N次binlog才刷新磁盘。

从库对数据安全性要求没那么高，可以设置sync_binlog=0。

**修改innodb_flush_log_at_trx_commit配置：**
> innodb_flush_log_at_trx_commit=0，每隔一秒钟，把事务日志刷新到磁盘。 
> innodb_flush_log_at_trx_commit=1，每次事务都刷新到磁盘。
> innodb_flush_log_at_trx_commit=2，每次事务都不主动刷新磁盘，由系统决定什么时候刷新磁盘。

从库对数据安全性要求没那么高，可以设置innodb_flush_log_at_trx_commit=2。
## 知识点总结：
![主从同步知识点总结.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487592544-def7cc92-e93b-4003-88fb-2bf65f2e5a1a.png#averageHue=%23e7e7e7&clientId=u5870c972-1a24-4&from=paste&height=2060&id=uae3be294&originHeight=2060&originWidth=1956&originalType=binary&ratio=1&rotation=0&showTitle=false&size=306286&status=done&style=none&taskId=u75b4a768-afbd-43ce-b60b-1cfb8ea8d20&title=&width=1956)
