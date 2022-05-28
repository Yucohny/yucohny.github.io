DCL（Data Control Language），用来管理数据库用户、控制数据库的访问权限。

# 管理用户

## 查询用户

```sql
USE mysql;
SELECT * FROM user;
```

## 创建用户

```sql
CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';
```

如果是任意主机，那么就使用 \@ 符号即可。

## 修改用户密码

```sql
ALTER USER '用户名'@'主机名' IDENTIFIED WITh mysql_native_password BY '新密码'
```

## 删除用户

```sql
DROP USER '用户名'@'主机名';
```

# 权限控制

## 常用权限

MySQL 中常用权限如下：

+ ALL, ALL PRIVILEGES

所有权限

+ SELECT

查询数据

+ INSERT

插入数据

+ UPDATE

修改数据

+ DELETE

删除数据

+ ALTER

修改表

+ DROP

删除数据库/表/视图

+ CREATE

创建数据库/表

## 查询权限

```sql
SHOW GRANTS FOR '用户名'@'主机名';
```

## 授予权限

```sql
GRANT 权限泪飙 ON 数据库名.表名 TO '用户名'@'主机名';
```

## 撤销权限

```sql
REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';
```

