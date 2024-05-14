## 1. 背景
MySQL实现事务、崩溃恢复、集群的主从复制，底层都离不开日志，所以日志是MySQL的精华所在。只有了解MySQL日志，才算是彻底搞懂MySQL。
今天一灯就带你深入浅出的学习MySQL的三大日志系统，**Redo Log（重做日志）**、**Undo Log（恢复日志）**、**Bin Log（备份日志）**。
## 2. Redo Log（重做日志）
### 2.1 Redo Log的内容与作用
Redo Log 记录的是物理日志，也就是磁盘数据页的修改。
**作用：** 用来保证服务崩溃后，仍能把事务中变更的数据持久化到磁盘上。
MySQL事务中持久性就是使用**Redo Log**实现的。
### 2.2 什么时候写入Redo Log？
![image-20220615233558509.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487417828-ebca8037-2fbf-4cb0-a899-626f564b382a.png#averageHue=%23cbe0ca&clientId=u3389259a-4a16-4&from=paste&height=978&id=u6ebc2275&originHeight=978&originWidth=1026&originalType=binary&ratio=1&rotation=0&showTitle=false&size=371027&status=done&style=none&taskId=u50d296f9-30c8-4879-9798-7375b42d24b&title=&width=1026)

1. 从磁盘加载数据到内存
2. 在内存中修改数据
3. 把新数据写到**Redo Log Buffer**中
4. 把**Redo Log Buffer**中数据持久化到**Redo Log**文件中
5. 把**Redo Log**文件中数据持久化到数据库磁盘中

你可能会问，为什么需要写**Redo Log Buffer**和**Redo Log FIle**？直接持久化到磁盘不好吗？
直接写磁盘会有产生严重的性能问题：

1.  InnoDB在磁盘中存储的基本单元是页，可能本次修改只变更一页中几个字节，但是需要刷新整页的数据，就很浪费资源。 
2.  一个事务可能修改了多页中的数据，页之间又是不连续的，就会产生随机IO，性能更差。 

这种方案叫做WAL（Write-Ahead Logging），预写日志，就是先写日志，再写磁盘。
### 2.3 Redo Log刷盘规则
写入**Redo Log Buffer**之后，并不会立即持久化到**Redo Log FIle**，需要等待操作系统调用fsync()操作，才会刷到磁盘上。

![image-20220615233622647.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487429132-f9069523-2a32-41b6-ad43-f9dfb9128d5d.png#averageHue=%23eaefe2&clientId=u3389259a-4a16-4&from=paste&height=952&id=ua9e4bbc8&originHeight=952&originWidth=1118&originalType=binary&ratio=1&rotation=0&showTitle=false&size=382164&status=done&style=none&taskId=u03606d92-f6c5-411a-9009-14e2eff57dd&title=&width=1118)
具体什么时候可以把**Redo Log Buffer**刷到**Redo Log FIle**中，可以通过**innodb_flush_log_at_trx_commit**参数配置决定。

| 参数值 | 含义 |
| --- | --- |
| 0（延迟写） | 提交事务后，不会立即刷到OS Buffer中，而是等一秒后刷新到OS Buffer并调用fsync()写入**Redo Log FIle**，可能会丢失一秒钟的数据。 |
| 1（实时写 | 每次提交事务，都会刷新到OS Buffer并调用fsync()写到**Redo Log FIle**，性能较差 |
| 2（延迟刷新） | 每次提交事务只刷新到OS Buffer，一秒后再调用fsync()写入**Redo Log FIle**。 |

InnoDB 的**Redo Log File**是固定大小的。可以配置为每组4个文件，每个文件的大小是 1GB，那么**Redo Log File**可以记录4GB的操作。

采用循环写入覆盖的方式，write pos记录开始写的位置，向后移动。checkpoint记录将要擦除的位置，也是向后移动。write pos到checkpoint之间的位置，是可写区域，checkpoint到write pos之间的位置是已写区域。

![image-20220615233640757.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487437923-35230512-f702-4cb9-93f2-200ccbed0c7a.png#averageHue=%23eeefec&clientId=u3389259a-4a16-4&from=paste&height=784&id=uf25c5c64&originHeight=784&originWidth=862&originalType=binary&ratio=1&rotation=0&showTitle=false&size=300342&status=done&style=none&taskId=u467105bc-72df-42bf-8ffa-67d127f749d&title=&width=862)

## 3. Undo Log（回滚日志）
### 3.1 Undo Log的内容与作用
Undo Log记录的是逻辑日志，也就是SQL语句。
比如：当我们执行一条insert语句时，Undo Log就记录一条相反的delete语句。
**作用：**

1.  回滚事务时，恢复到修改前的数据。 
2.  实现 **MVCC（多版本并发控制，Multi-Version Concurrency Control）** 。 

MySQL事务中原子性就是使用**Undo Log**实现的。
### 3.2 Undo Log如何回滚到上一个版本
实现方式通过两个隐藏列trx_id（最近一次提交事务的ID）和roll_pointer（上个版本的地址），建立一个版本链。并在事务中读取的时候生成一个ReadView（读视图），在Read Committed隔离级别下，每次读取都会生成一个读视图，而在Repeatable Read隔离级别下，只会在第一次读取时生成一个读视图。

![image-20220615233701598.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487450876-c264a9b3-fbe7-4dbd-a140-0b4224d7be9a.png#averageHue=%23f1f1f0&clientId=u3389259a-4a16-4&from=paste&height=650&id=u412a63f9&originHeight=650&originWidth=1358&originalType=binary&ratio=1&rotation=0&showTitle=false&size=274366&status=done&style=none&taskId=ub05a66ce-bb2c-4403-a44b-8648c77424d&title=&width=1358)
## 4. Bin Log（备份日志）
### 4.1 Bin Log的内容与作用
**Bin Log**记录的是逻辑日志，即原始的SQL语句，是MySQL自带的。
**作用：** 数据备份和主从同步。
**Bin Log**共有三种日志格式，可以**binlog_format**配置参数指定。

| 参数值 | 含义 |
| --- | --- |
| Statement | 记录原始SQL语句，会导致更新时间与原库不一致。
比如 update_time=now() |
| Row | 记录每行数据的变化，保证了数据与原库一致，缺点是数据量较大。 |
| Mixed | Statement和Row的混合模式，默认采用Statement模式，涉及日期、函数相关的时候采用Row模式，既减少了数据量，又保证了数据一致性。 |


### 4.2 什么时候写入Bin Log？
**Bin Log**采用追加写入的模式，并不会覆盖原有日志，所以可以用来恢复到之前某个时刻的数据。
**Bin Log**也是采用WAL模式，先写日志，再写磁盘。
至于什么时候刷新到磁盘，可以**sync_binlog**配置参数指定。

| 参数值 | 含义 |
| --- | --- |
| 0（延迟写） | 每次提交事务都不会刷盘，由系统自己决定什么时候刷盘，可能会丢失数据。 |
| 1（实时写） | 每次提交事务，都会刷盘，性能较差。 |
| N（延迟写） | 提交N个事务后，才会刷盘。 |

加入写**Bin Log**之后的事务流程：
![image-20220615233733690.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487462117-ab6b1ecb-ce2a-49eb-8924-0c3b4386f52f.png#averageHue=%23cbe0c9&clientId=u3389259a-4a16-4&from=paste&height=1282&id=uc8c0fef5&originHeight=1282&originWidth=986&originalType=binary&ratio=1&rotation=0&showTitle=false&size=522508&status=done&style=none&taskId=ua6b4ae57-0f5f-419c-a123-402a15970c7&title=&width=986)
这就是二阶段提交的概念，先写处于prepare状态的Redo Log，事务提交后，再写处于commit状态的Redo Log。
## 知识点总结：
![image-20220615233827497.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487471587-e1f65651-eaba-4596-b34c-f92d1b7ab14b.png#averageHue=%23fafafa&clientId=u3389259a-4a16-4&from=paste&height=714&id=u46b7ef0e&originHeight=714&originWidth=1465&originalType=binary&ratio=1&rotation=0&showTitle=false&size=183600&status=done&style=none&taskId=u4ae88356-a63d-409e-92c3-acc89dc8d6e&title=&width=1465)