工作中，经常遇到这样的问题，我明明在MySQL表上面加了索引，为什么执行SQL查询的时候却没有用到索引？
同一条SQL有时候查询用到了索引，有时候却没用到索引，这是咋回事？
原因可能是索引失效了，失效的原因有以下几种，看你有没有踩过类似的坑？
## 1. 数据准备：
有这么一张用户表，在name字段上建个索引：
```
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `age` int DEFAULT NULL COMMENT '年龄',
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`)
) ENGINE=InnoDB COMMENT='用户表';
```
## 2. Explain详解：
想要查看一条SQL是否用到索引？用到了哪种类型的索引？
可以使用**explain**关键字，查看SQL执行计划。例如：
```sql
explain select * from user where id=1;
```
![image-20220629230715808.png](https://javabaguwen.com/img/explain%E8%AF%A6%E8%A7%A3.png)
可以看到type=const，表示使用了主键索引。
explain的所有type类型如下：
![image-20220630000000083.png](https://javabaguwen.com/img/explain-type%E7%B1%BB%E5%9E%8B.png)
## 3. 失效原因
### 1. 数据类型隐式转换
name字段是varchar类型，如果我们使用数据类型查询，就会产生数据类型转换，虽然不会报错，但是无法用到索引。
```sql
explain select * from user where name='一灯';
```
![image-20220629231442732.png](https://javabaguwen.com/img/%E7%B4%A2%E5%BC%95%E9%9A%90%E5%BC%8F%E8%BD%AC%E6%8D%A21.png)
```sql
explain select * from user where name=18;
```
![image-20220629231513592.png](https://javabaguwen.com/img/%E7%B4%A2%E5%BC%95%E9%9A%90%E5%BC%8F%E8%BD%AC%E6%8D%A22.png)
### 2. 模糊查询 like 以%开头
```sql
explain select * from user where name like '张%';
```
![image-20220629231905411.png](https://javabaguwen.com/img/like1.png)
```sql
explain select * from user where name like '%张';
```
![image-20220629231938893.png](https://javabaguwen.com/img/like2.png)
### 3. or前后没有同时使用索引
虽然name字段上加了索引，但是age字段没有索引，使用or的时候会全表扫描。
```sql
# or前后没有同时使用索引，导致全表扫描
explain select * from user where name='一灯' or age=18;
```
![image-20220629232130791.png](https://javabaguwen.com/img/%E5%A4%B1%E6%95%88or.png)
### 4. 联合索引，没有使用第一列索引
如果我们在（name，age）上，建立联合索引，但是查询条件中只用到了age字段，也是无法用到索引的。
使用联合索引，必须遵循最左匹配原则，首先使用第一列字段，然后使用第二列字段。
```
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `age` int DEFAULT NULL COMMENT '年龄',
  PRIMARY KEY (`id`),
  KEY `idx_name_age` (`name`,`age`)
) ENGINE=InnoDB COMMENT='用户表';
```
![image-20220630000609202.png](https://javabaguwen.com/img/%E5%A4%B1%E6%95%88%E8%81%94%E5%90%88%E7%B4%A2%E5%BC%95.png)
### 5. 在索引字段进行计算操作
如果我们在索引列进行了计算操作，也是无法用到索引的。
```sql
# 在主键索引上进行计算操作，导致全表扫描
explain select * from user where id+1=2;
```
![image-20220629233208133.png](https://javabaguwen.com/img/%E5%A4%B1%E6%95%88%E8%AE%A1%E7%AE%97.png)

### 6. 在索引字段字段上使用函数
如果我们在索引列使用函数，也是无法用到索引的。
![image-20220629233447426.png](https://javabaguwen.com/img/%E5%A4%B1%E6%95%88%E5%87%BD%E6%95%B0.png)
### 7. 优化器选错索引
同一条SQL有时候查询用到了索引，有时候却没用到索引，这是咋回事？
这可能是优化器选择的结果，会根据表中数据量选择是否使用索引。
![image-20220629234641204.png](https://javabaguwen.com/img/%E5%A4%B1%E6%95%88%E9%80%89%E9%94%99.png)
当表中大部分name都是一灯，这时候用name='一灯'做查询，还会不会用到索引呢？
索引优化器会认为，用索引还不如全表扫描来得快，干脆不用索引了。
![image-20220629234900354.png](https://javabaguwen.com/img/%E5%A4%B1%E6%95%88%E9%80%89%E9%94%992.png)
当然我们认为优化器优化的不对，也可以使用**force index**强制使用索引。
![image-20220629235137298.png](https://javabaguwen.com/img/%E5%A4%B1%E6%95%88%E9%80%89%E9%94%993.png)
## 知识点总结：

![image-20220630171538701.png](https://javabaguwen.com/img/%E7%B4%A2%E5%BC%95%E5%A4%B1%E6%95%88%E6%80%BB%E7%BB%93.png)
