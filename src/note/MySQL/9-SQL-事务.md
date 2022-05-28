事务是一组操作的集合，是一个不可分割的工作单位。事务会把所有的操作作为一个整体一起向系统提交或者撤销操作请求，即这些操作要么同时成功，要么同时失败。

MySQL 中的事务默认是自动提交的：当执行一条 DML 语句，MySQL 会立即隐式地提交事务。

# 基本操作

查看事务提交方式：

```sql
SELECT @@autocommit;
```

设置事务提交方式：

```sql
SET @@autocommit = 0;
```

提交事务：

```sql
COMMIT;
```

回滚事务：

```sql
ROLLBACK;
```

开启事务：

```sql
START TRANSACTION 或 BEGIN;
```

# 操作演示

我们首先初始化表：

```sql
create table if not exists account(
    id int auto_increment primary key comment '主键ID',
    name varchar(10) comment '姓名',
    money int comment '余额'
) comment '账户表';

insert into account(id, name, money) values (null, '张三', 2000), (null, '李四', 2000);
```

我们想要将张三的余额取出1000，转给李四，那么在该事务中，至少应该包含以下几个步骤（操作）：

1. 查询张三余额。

```sql
select * from account where name = '张三';
```

2. 张三余额 -1000。

```sql
update account set money = money - 1000 where name = '张三';
```

3. 李四余额 +1000。

```sql
update account set money = money + 1000 where name = '李四';
```

如果上面任意一个步骤出错，说明该事务全部失败，需要不断将已经执行的操作回滚到最开始。

我们有两种方式来绑定事务进行执行：

1. 修改事务自动提交方式

将事务绑定执行：

```sql
set @@autocommit = 0;
select * from account where name = '张三';
update account set money = money - 1000 where name = '张三';
update account set money = money + 1000 where name = '李四';
commit;
```

如果事务中出现异常，那么我就执行回滚操作：

```sql
set @@autocommit = 0;
select * from account where name = '张三';
update account set money = money - 1000 where name = '张三';
这是一条错误代码！
update account set money = money + 1000 where name = '李四';
rollback;
```

2. 开启事务（不需要修改事务自动提交方式）

```sql
start transaction;
set @@autocommit = 0;
select * from account where name = '张三';
update account set money = money - 1000 where name = '张三';
update account set money = money + 1000 where name = '李四';
commit;
```

# 四大特性

+ 原子性 Atomicity

事务是不可分割的最小操作单元，要么全部成功，要么全部失败。

+ 一致性 Consistency

事务完成时，必须使所有的数据都保持一直状态。

+ 隔离性 Isolation

数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行。

+ 持久性 Durability

事务一旦提交或者回滚，对数据库中的数据的改变就是永久的。

# 并发事务问题

+ 脏读

一个事务读到另外一个事务还没有提交的数据。

+ 不可重复读

一个事务先后读取同一条记录，但两次读取的数据不同，称之为不可重复读。

+ 幻读

一个事务按照条件查询数据时，没有对应的数据行，但是在插入数据时，又发现这行数据已经存在，好像出现了「幻影」。
