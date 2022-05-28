# 数据库操作

## 查询

查询所有数据库：

```sql
SHOW DATABASES;
```

查询当前数据库：

```sql
SELECT DATABASE();
```

## 创建

创建数据库：

```sql
CREATE DATABASE [IF NOT EXISTS] 数据库名称 [DEFAULT CHARSET 字符集] [COLLATE 排序规则];
```

## 删除

```sql
DROP DATABASE [IF EXISTS] 数据库名称;
```

## 使用

```sql
USE 数据库名称;
```

# 表操作

## 查询

查询当前数据库的所有表：

```sql
SHOW TABLES;
```

查询表结构：

```sql
DESC 表名称;
```

查询指定表的建表语句：

```sql
SHOW CREATE TABLE 表名称;
```

## 创建

创建表：

```sql
CREATE TABLE 表名称(
	字段1 字段1类型 [COMMENT 字段1注释],
    ......
    字段n 字段n类型 [COMMENT 字段n注释]
)[COMMENT 表注释];
```

## 修改

添加字段：

```sql
ALTER TABLE 表名称 ADD 字段名称 类型 [COMMENT 注释] [约束];
```

修改数据类型：

```sql
ALTER TABLE 表名称 MODIFY 字段名称 新数据类型;
```

修改字段名和字段类型：

```sql
ALTER TABLE 表名称 CHANGE 旧字段名称 类型 [COMMENT 注释] [约束];
```

修改表名称：

```sql
ALTER TABLE 表面 RENAME To 新表名;
```

## 删除

删除字段：

```sql
ALTER TABLE 表名称 DROP 字段名称;
```

删除表：

```sql
DROP TABLE [IF EXISTS] 表名称;
```

删除指定表，并重新创建该表：

```sql
TRUNCATE TABLE 表名称;
```

