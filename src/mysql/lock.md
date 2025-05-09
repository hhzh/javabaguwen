MySQL有两个核心的知识点，索引和锁。前几篇文章已经详细讲解了MySQL索引实现机制，今天再一起学习一下MySQL的锁。
## 1 为什么要加锁？
当多个事务并发操作同一批数据的时候，如果不加锁，就无法保证事务的隔离性，最后导致数据错乱。
加锁是为了保证并发操作下数据的正确性。
## 2 锁的分类有哪些？
- **按锁的粒度可分为：** 表锁、页面锁、行锁、记录锁、间隙锁、临键锁
- **按锁的属性可分为：** 共享锁、排它锁
- **按加锁机制可分为：** 乐观锁、悲观锁
下面依次介绍一下这几种锁：
### 表锁
MyISAM和InnoDB引擎均支持表锁。
- **优点：** 开销小，加锁快，不会出现死锁。
- **缺点：** 锁定力度大，发生锁冲突概率高，并发度最低。

**加锁方式：**
```sql
# 对user表加读锁
lock table user read;
# 同时对user表加读锁，对order表加写锁
lock tables user read, order write;
```
**什么情况下需要用到表锁？**

1. 当需要更新表中的大部分数据
2. 事务涉及到多张表，业务逻辑复杂，加表锁可以避免死锁。
### 页面锁
- **优点：** 开销和加锁速度介于表锁和行锁之间。
- **缺点：** 会出现死锁，锁定粒度介于表锁和行锁之间，并发度一般。
目前只有BDB引擎支持页面锁，应用场景较少。
### 行锁
只有InnoDB引擎支持行锁，另外锁是加在索引上面的。
- **优点：** 开销大，加锁慢；会出现死锁。
- **缺点：** 锁定粒度小，发生锁冲突的概率低，并发度高。
另外记录锁、间隙锁、临键锁均属于行锁。
### 记录锁（Record Locks）
即对某条记录加锁。
```sql
# 对id=1的用户加锁
update user set age=age+1 where id=1;
```
### 间隙锁（Gap Locks）
即对某个范围加锁，但是不包含范围的临界数据。
```sql
# 对id大于1并且小于10的用户加锁
update user set age=age+1 where id>1 and id<10;
```
上面SQL的加锁范围是(1,10)。
**临键锁（Next-Key Locks）**
由记录锁和间隙锁组成，既包含记录本身又包含范围，左开右闭区间。
```sql
# 对id大于1并且小于等于10的用户加锁
update user set age=age+1 where id>1 and id<=10;
```
### 共享锁（又称读锁、S锁）
**作用：**防止其他事务修改当前数据。
**加锁方式：**
在select语句末尾加上**lock in share mode**关键字。
```sql
# 对id=1的用户加读锁
select * from user where id=1 lock in share mode;
```
### 排他锁（又称写锁、X锁）
**作用：**防止其他事务读取或者更新当前数据。
**加锁方式：**
在select语句末尾加上**for update**关键字。
```sql
# 对id=1的用户加写锁
select * from user where id=1 for update;
```
### 乐观锁
总是假设别人不会修改当前数据，所以每次读取数据的时候都不会加锁，只是在更新数据的时候通过version判断别人是否修改过数据，Java的atomic包下的类就是使用乐观锁（CAS）实现的。
适用于读多写少的场景。
**加锁方式：**

1.  读取version 
```sql
select id,name,age,version from user id=1;
```

2.  更新数据，判断version是否修改过。 
```sql
update user set age=age+1 where id=1 and version=1;
```
### 悲观锁
总是假设别人会修改当前数据，所以每次读取的时候，总是加锁。
适用于写多读少的场景。
**加锁方式：**
```sql
# 加读锁
select * from user where id=1 lock in share mode;
# 加写锁
select * from user where id=1 for update;
```
**本文知识点总结：**
![MySQL锁.png](https://javabaguwen.com/img/MySQL%E9%94%81%E6%80%BB%E7%BB%93.png)
