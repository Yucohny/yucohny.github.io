约束是作用于表中字段上的规则，用于限制存储在表中的数据

约束用于保证数据库中的数据的正确性、有效性和完整性。

约束的分类如下：

+ 非空约束

NOT NULL

限制该字段的数据不能为 null。

+ 唯一约束

UNIQUE

保证该字段的所有数据都是唯一、不重复的。

+ 主键约束

PRIMARY KEY

主键是一行数据的唯一标识，要求非空且唯一。

+ 默认约束

DEFAULT

保存数据时，如果未指定该字段的值，则采用默认值。

+ 检查约束

CHECK

> 注意：检查约束为 MySQL v8.0.16 版本新增特性。

检查约束用于保证字段值满足某一个条件

+ 外键约束

FOREIGN KEY

外键约束用于让两张表的数据之间建立连接，保证数据的一致性和完整性。

约束是作用于表中字段上的，可以在创建/修改表时添加约束。

# 案例1

根据下列需求，完成表结构的创建

+ id

int。

主键，且向上增长。

+ name

varchar(10)。

不为空，并且唯一。

+ age

int。

0 < age<= 120

+ status

char(1)

如果没有指定该值，默认为 1。

+ gender

char(1)

无。

## 创建数据库

首先我们创建一个数据库：

```sql
create database if not exists study;
```

## 创建表

```sql
create table if not exists user(
    id int primary key auto_increment comment '主键',
    name varchar(10) not null unique comment '姓名',
    age int check (0 < age && age <= 120) comment '年龄',
    status char(1) default '1' comment '状态',
    gender char(1) comment '性别'
) comment '用户表';
```

## 插入数据

注意，由于 id 关键字已经规定了自动向上增长，因此我们可以不用手动插入 id 数据。

根据上述约束，下面一些插入数据的语法都是有效的（示例）：

```sql
insert into user(name, age, gender) values('Yucohny', 19, '1');
insert into user(name, age, status, gender) values('Clover', 19, 1, '0');
```

# 外键约束

我们通过外键将父表与子表建立关系（父表影响子表），并且将子表中的对应数据称为外键。

## 添加外键

添加外键有下面几种方式：

1. 在创建表时添加外键：

```sql
CREATE TABLE 表名称(
	字段名称 数据类型,
    ...
    [CONSTRAINT] [外键名称] FOREIGN BY (外键字段名) REFERENCES 主表 (主表字段名)
);
```

2.  创建表后添加外键：

```sql
ALTER TABLE 表名称 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段名) REFERENCES 主表 (主表字段名);
```

> 注意：外键名称是我们自己取的一个名称。

## 删除外键

```sql
ALTER TABLE 表名称 DROP FOREIGN KEY 外键名称;
```

## 删除与更新行为

+ NO ACTION/RESTRICT

当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新。

+ CASCADE

当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有，则也删除/更新外键在子表中的记录。

+ SET NULL

当在父表中删除对应记录时，首先检查该记录是否有对应外键，如果有，则设置子表中该外键值为 null（这里首先要求该外键允许取 null）。

+ SET DEFAULT

当父表有变更时，子表将外键列设置成一个默认值（该特性在 Innodb 中不支持）。

设定行为语法如下：

```sql
ALTER TABLE 表名称 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段) REFERENCES 主表名称(主表字段名) ON UPDATE CASCADE ON DELETE CASCADE;
```

