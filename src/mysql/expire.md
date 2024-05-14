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
![image-20220629230715808.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487720247-700ae71f-a78d-4ce1-99b6-d630385e1ea5.png#averageHue=%23eeeeed&clientId=uffbf9e5d-5f17-4&from=paste&height=348&id=u0a82e217&originHeight=348&originWidth=1484&originalType=binary&ratio=1&rotation=0&showTitle=false&size=133047&status=done&style=none&taskId=u4e9b6515-b5fb-4faf-936d-bb3d8572b90&title=&width=1484)
可以看到type=const，表示使用了主键索引。
explain的所有type类型如下：
![image-20220630000000083.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487728267-d43fefdc-2d6d-46b1-9c23-c5958a3ef472.png#averageHue=%23f8f8f8&clientId=uffbf9e5d-5f17-4&from=paste&height=477&id=u3df35157&originHeight=477&originWidth=601&originalType=binary&ratio=1&rotation=0&showTitle=false&size=55416&status=done&style=none&taskId=ua69181f1-a287-4bcb-ba96-720488674d4&title=&width=601)
## 3. 失效原因
### 1. 数据类型隐式转换
name字段是varchar类型，如果我们使用数据类型查询，就会产生数据类型转换，虽然不会报错，但是无法用到索引。
```sql
explain select * from user where name='一灯';
```
![image-20220629231442732.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487738442-8beb6a10-d8c3-43b1-ab93-2b216bd3c2c7.png#averageHue=%23e9ebe7&clientId=uffbf9e5d-5f17-4&from=paste&height=386&id=ub6f31472&originHeight=386&originWidth=1480&originalType=binary&ratio=1&rotation=0&showTitle=false&size=153301&status=done&style=none&taskId=ub51c3fbd-13c0-48d3-9b45-8a7c14aca03&title=&width=1480)
```sql
explain select * from user where name=18;
```
![image-20220629231513592.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487745067-c1e18ab2-761d-4375-a563-eec9cae0de86.png#averageHue=%23e5e9e3&clientId=uffbf9e5d-5f17-4&from=paste&height=392&id=u1277c16a&originHeight=392&originWidth=1506&originalType=binary&ratio=1&rotation=0&showTitle=false&size=161712&status=done&style=none&taskId=ufc1cf64e-1145-45d1-9e8c-c5b54acb962&title=&width=1506)
### 2. 模糊查询 like 以%开头
```sql
explain select * from user where name like '张%';
```
![image-20220629231905411.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487753447-241d675a-99dc-4ff1-a1ae-25914f8e77e4.png#averageHue=%23e9ebe8&clientId=uffbf9e5d-5f17-4&from=paste&height=410&id=ud429282d&originHeight=410&originWidth=1672&originalType=binary&ratio=1&rotation=0&showTitle=false&size=170861&status=done&style=none&taskId=u9c14c1d6-ff36-4fed-95c5-ab7e72a140d&title=&width=1672)
```sql
explain select * from user where name like '%张';
```
![image-20220629231938893.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487760606-8170916d-f663-4392-be09-de769da355f5.png#averageHue=%23e4e8e2&clientId=uffbf9e5d-5f17-4&from=paste&height=370&id=ucc93d90e&originHeight=370&originWidth=1502&originalType=binary&ratio=1&rotation=0&showTitle=false&size=168367&status=done&style=none&taskId=uc0d4544f-6894-4242-9b5a-840af7bd913&title=&width=1502)
### 3. or前后没有同时使用索引
虽然name字段上加了索引，但是age字段没有索引，使用or的时候会全表扫描。
```sql
# or前后没有同时使用索引，导致全表扫描
explain select * from user where name='一灯' or age=18;
```
![image-20220629232130791.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487773149-5b91f66e-b0f2-49ad-b428-0eaf05b0cbe2.png#averageHue=%23e1e7e0&clientId=uffbf9e5d-5f17-4&from=paste&height=350&id=ue6ad4fa2&originHeight=350&originWidth=1466&originalType=binary&ratio=1&rotation=0&showTitle=false&size=160334&status=done&style=none&taskId=u78060149-610b-4a48-ba89-c74cff5c82d&title=&width=1466)
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
![image-20220630000609202.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487788030-3a0671a4-caaf-4704-bf1f-64afc6f99e22.png#averageHue=%23e2e8df&clientId=uffbf9e5d-5f17-4&from=paste&height=338&id=u2c1bffa1&originHeight=338&originWidth=1520&originalType=binary&ratio=1&rotation=0&showTitle=false&size=150642&status=done&style=none&taskId=ucce4f5a8-07bc-4e92-b7cf-c73113022ac&title=&width=1520)
### 5. 在索引字段进行计算操作
如果我们在索引列进行了计算操作，也是无法用到索引的。
```sql
# 在主键索引上进行计算操作，导致全表扫描
explain select * from user where id+1=2;
```
![image-20220629233208133.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487796382-ac014fc0-417a-4af5-b5f0-28efd7478eb7.png#averageHue=%23e4eae1&clientId=uffbf9e5d-5f17-4&from=paste&height=406&id=ue3fe3023&originHeight=406&originWidth=1530&originalType=binary&ratio=1&rotation=0&showTitle=false&size=170528&status=done&style=none&taskId=uca809223-1925-4ddf-bb6d-835875d1532&title=&width=1530)

### 6. 在索引字段字段上使用函数
如果我们在索引列使用函数，也是无法用到索引的。
![image-20220629233447426.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487805503-9fbaa7b2-049b-4e64-a4df-35daf4ecebaf.png#averageHue=%23e2e8df&clientId=uffbf9e5d-5f17-4&from=paste&height=350&id=uc167c412&originHeight=350&originWidth=1520&originalType=binary&ratio=1&rotation=0&showTitle=false&size=160885&status=done&style=none&taskId=u27e6d9db-9b09-48b8-99b6-e1aaed42d49&title=&width=1520)
### 7. 优化器选错索引
同一条SQL有时候查询用到了索引，有时候却没用到索引，这是咋回事？
这可能是优化器选择的结果，会根据表中数据量选择是否使用索引。
![image-20220629234641204.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487815880-a83895ce-9040-4e82-bee7-1c66bb51f029.png#averageHue=%23e5ebe2&clientId=uffbf9e5d-5f17-4&from=paste&height=366&id=u8082f81d&originHeight=366&originWidth=950&originalType=binary&ratio=1&rotation=0&showTitle=false&size=98509&status=done&style=none&taskId=uf6f73cc1-079b-4eb6-b564-490f485a00d&title=&width=950)
当表中大部分name都是一灯，这时候用name='一灯'做查询，还会不会用到索引呢？
索引优化器会认为，用索引还不如全表扫描来得快，干脆不用索引了。
![image-20220629234900354.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487824236-ac64228e-110a-4796-9e10-53431f9a647d.png#averageHue=%23e0e7dd&clientId=uffbf9e5d-5f17-4&from=paste&height=348&id=u160fe416&originHeight=348&originWidth=1540&originalType=binary&ratio=1&rotation=0&showTitle=false&size=161544&status=done&style=none&taskId=u6594b939-8e8e-4fb5-8397-5ed67620843&title=&width=1540)
当然我们认为优化器优化的不对，也可以使用**force index**强制使用索引。
![image-20220629235137298.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487831275-c9b079bb-0a76-4380-bb3d-45c64c51cfe6.png#averageHue=%23e3e9e1&clientId=uffbf9e5d-5f17-4&from=paste&height=338&id=u690fe4bb&originHeight=338&originWidth=1468&originalType=binary&ratio=1&rotation=0&showTitle=false&size=157649&status=done&style=none&taskId=u0a56de2d-2331-4be2-ade5-5d7ed24ec91&title=&width=1468)
## 知识点总结：

![image-20220630171538701.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487836821-5fbd58dd-4910-43e3-9bb3-c7a383c17819.png#averageHue=%23f9f9f8&clientId=uffbf9e5d-5f17-4&from=paste&height=1398&id=u8d315f28&originHeight=1398&originWidth=1526&originalType=binary&ratio=1&rotation=0&showTitle=false&size=528398&status=done&style=none&taskId=ud029af2c-098d-449f-ae22-fcae97df742&title=&width=1526)
