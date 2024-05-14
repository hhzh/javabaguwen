开发经常遇到分页查询的需求，但是当翻页过多的时候，就会产生深分页，导致查询效率急剧下降。
有没有什么办法，能解决深分页的问题呢？
本文总结了三种优化方案，查询效率直接提升10倍，一起学习一下。
## 1. 准备数据
先创建一张用户表，只在create_time字段上加索引：
```sql
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB COMMENT='用户表';
```
然后往用户表中插入100万条测试数据，这里可以使用存储过程：
```sql
drop PROCEDURE IF EXISTS insertData;
DELIMITER $$
create procedure insertData()
begin
 declare i int default 1;
   while i <= 100000 do
         INSERT into user (name,create_time) VALUES (CONCAT("name",i), now());
         set i = i + 1; 
   end while; 
end $$

call insertData() $$
```
## 2. 验证深分页问题
每页10条，当我们查询第一页的时候，速度很快：
```sql
select * from user 
where create_time>'2022-07-03' 
limit 0,10;
```
![image-20220703181532231.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487903976-10b75fe8-ded2-4868-9d29-4308b4ff6b8e.png#averageHue=%23f1efef&clientId=ud08f7ad0-156c-4&from=paste&height=247&id=u254e3025&originHeight=247&originWidth=498&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18292&status=done&style=none&taskId=ubf3601d4-5cdc-47f1-b5dd-04bdd751d55&title=&width=498)
在不到0.01秒内直接返回了，所以没显示出执行时间。
当我们翻到第10000页的时候，查询效率急剧下降：
```sql
select * from user 
where create_time>'2022-07-03' 
limit 100000,10;
```
![image-20220703181904656.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487911183-735133b2-5fa4-4c8b-ba90-711af8aac209.png#averageHue=%23ecebeb&clientId=ud08f7ad0-156c-4&from=paste&height=241&id=u64ab011f&originHeight=241&originWidth=522&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18166&status=done&style=none&taskId=ub1748546-8b9b-4677-8a9a-b67624abcb2&title=&width=522)
执行时间变成了0.16秒，性能至少下降了几十倍。
耗时主要花在哪里了？

1. 需要扫描前10条数据，数据量较大，比较耗时
2. create_time是非聚簇索引，需要先查询出主键ID，再回表查询，通过主键ID查询出所有字段

画一下回表查询流程：
**1. 先通过create_time查询出主键ID**

![image-20220703204919992.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487918708-e0f76e40-f3a8-495a-8f0f-834f6ab37190.png#averageHue=%23f8f8f8&clientId=ud08f7ad0-156c-4&from=paste&height=424&id=u0f4b2b06&originHeight=424&originWidth=1576&originalType=binary&ratio=1&rotation=0&showTitle=false&size=63308&status=done&style=none&taskId=u199602b8-5e75-460f-94ea-784caf9d61f&title=&width=1576)
**2. 再通过主键ID查询出表中所有字段**

![image-20220703205108719.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487928957-8b39d5a8-e9be-48ca-8268-3be9cddf8a35.png#averageHue=%23f8f8f8&clientId=ud08f7ad0-156c-4&from=paste&height=426&id=u35da7906&originHeight=426&originWidth=1577&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67054&status=done&style=none&taskId=u49c723f8-02e7-4cde-b1c3-fe618f4082e&title=&width=1577)
别问为什么B+树的结构是这样的？问就是规定。
可以看一下前两篇文章。
## 3. 优化查询
### 3.1 使用子查询
先用子查询查出符合条件的主键，再用主键ID做条件查出所有字段。
```sql
select * from user 
where id in (
  select id from user 
  where create_time>'2022-07-03' 
  limit 100000,10
);
```
不过这样查询会报错，说是子查询中不支持使用limit。
![image-20220703205602830.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487940404-18d30c74-a1b9-43c9-a84c-2bc0afc048ab.png#averageHue=%23eedede&clientId=ud08f7ad0-156c-4&from=paste&height=79&id=u4aeb29c3&originHeight=79&originWidth=697&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11818&status=done&style=none&taskId=ub5d8006a-54c7-4ae8-aa62-c5cdb883e0e&title=&width=697)
我们加一层子查询嵌套，就可以了：
```sql
select * from user 
where id in (
 select id from (
    select id from user 
    where create_time>'2022-07-03' 
    limit 100000,10
 ) as t
);
```
![image-20220703205912970.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487952745-f66ebcde-0d5d-41f9-842e-d53972f3483e.png#averageHue=%23f4f3f3&clientId=ud08f7ad0-156c-4&from=paste&height=248&id=ue445ed8f&originHeight=248&originWidth=963&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32127&status=done&style=none&taskId=u52b40e2f-5d36-40e5-a996-9963cc99577&title=&width=963)
执行时间缩短到0.05秒，减少了0.12秒，相当于查询性能提升了3倍。
为什么先用子查询查出符合条件的主键ID，就能缩短查询时间呢？
我们用explain查看一下执行计划就明白了：
```sql
explain select * from user 
where id in (
 select id from (
    select id from user 
    where create_time>'2022-07-03' 
    limit 100000,10
 ) as t
);
```
![image-20220703215830336.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487963996-1a63dfbf-26d9-4373-af55-d70898400d33.png#averageHue=%23f1f0f0&clientId=ud08f7ad0-156c-4&from=paste&height=185&id=u415f2e3d&originHeight=185&originWidth=1209&originalType=binary&ratio=1&rotation=0&showTitle=false&size=30245&status=done&style=none&taskId=ua43d3440-83be-431e-830d-7de72b89402&title=&width=1209)
可以看到Extra列显示子查询中用到**Using index**，表示用到了**覆盖索引**，所以子查询无需回表查询，加快了查询效率。
### 3.2 使用inner join关联查询
把子查询的结果当成一张临时表，然后和原表进行关联查询。
```sql
select * from user 
inner join (
   select id from user 
    where create_time>'2022-07-03' 
    limit 100000,10
) as t on user.id=t.id;
```
![image-20220703220449618.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686487974652-ff3957ce-6739-469b-a70a-3b2c25f18f10.png#averageHue=%23f2f1f1&clientId=ud08f7ad0-156c-4&from=paste&height=245&id=u16ff352a&originHeight=245&originWidth=938&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33516&status=done&style=none&taskId=u37641f85-d973-47f6-8661-da57530ffcc&title=&width=938)
查询性能跟使用子查询一样。
### 3.3 使用分页游标（推荐）
实现方式就是：当我们查询第二页的时候，把第一页的查询结果放到第二页的查询条件中。
例如：首先查询第一页
```sql
select * from user 
where create_time>'2022-07-03' 
limit 10;
```
然后查询第二页，把第一页的查询结果放到第二页查询条件中：
```sql
select * from user 
where create_time>'2022-07-03' and id>10 
limit 10;
```
这样相当于每次都是查询第一页，也就不存在深分页的问题了，推荐使用。
![image-20220703222259556.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686488006669-b474eb34-bdfa-4795-b74e-e3c4141358c8.png#averageHue=%23edecec&clientId=ud08f7ad0-156c-4&from=paste&height=243&id=u81143e2c&originHeight=243&originWidth=580&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19126&status=done&style=none&taskId=u58ce620d-9867-4ba6-89a2-cda8bb6af13&title=&width=580)
执行耗时是0秒，查询性能直接提升了几十倍。
这样的查询方式虽然好用，但是又带来一个问题，就是无法跳转到指定页数，只能一页页向下翻。
所以这种查询只适合特定场景，比如资讯类APP的首页。
互联网APP一般采用瀑布流的形式，比如百度首页、头条首页，都是一直向下滑动翻页，并没有跳转到制定页数的需求。
不信的话，可以看一下，这是头条的瀑布流：
![image-20220703221836032.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686488015321-0f1f3d0e-f95a-42e5-a2d4-8579b55471cd.png#averageHue=%2327282b&clientId=ud08f7ad0-156c-4&from=paste&height=230&id=u6d2ba4e7&originHeight=230&originWidth=626&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40491&status=done&style=none&taskId=u36d6fcb4-0c76-4037-8645-6b5b2acb96e&title=&width=626)

传参中带了上一页的查询结果。

![image-20220703222026194.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686488023917-cc37a536-3081-4a1e-90d3-544bd7cac418.png#averageHue=%2326292d&clientId=ud08f7ad0-156c-4&from=paste&height=173&id=u25d3aec2&originHeight=173&originWidth=492&originalType=binary&ratio=1&rotation=0&showTitle=false&size=28159&status=done&style=none&taskId=udd905091-0733-42d6-8396-5082077dd5b&title=&width=492)

响应数据中，返回了下一页查询条件。
所以这种查询方式的应用场景还是挺广的，赶快用起来吧。
## 知识点总结：
![image-20220703223109687.png](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686488032451-b068576d-7777-4000-82b1-d1ad3254d23b.png#averageHue=%23f9f9f9&clientId=ud08f7ad0-156c-4&from=paste&height=370&id=ufa1abc0a&originHeight=370&originWidth=1031&originalType=binary&ratio=1&rotation=0&showTitle=false&size=66751&status=done&style=none&taskId=ua01dc431-500f-4153-9e58-0244306f87c&title=&width=1031)

