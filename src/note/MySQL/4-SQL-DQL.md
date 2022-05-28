# 基本查询

查询多个字段：

```sql
SELECT 字段1, 字段2, ... FROM 表名称;
```

```sql
SELECT * from 表名称;
```

设置别名：

```sql
SELECT 字段1[AS 别名1], 字段2[AS 别名2], ... FROM 表名称;
```

去除重复记录：

```sql
SELECT DISTINCT 字段列表 FROM 表名称;
```

# 条件查询

基本语法：

```sql
SELECT 字段列表 FROM 表名称 WHERE 条件列表;
```

条件语句与逻辑语句，与其他语言的相关语法形式类似，故此处不做更多说明。

需要特别注意的是下面两个语法：

```sql
BETWEEN ... AND ...
```

表示在某个范围之内，闭区间。

```sql
LIKE 占位符
```

LIKE 表示模糊匹配（_匹配单个字符，%匹配任意多个字符）。

# 聚合函数

聚合函数是讲一列数据作为一个整体，进行纵向计算。（即，同一个指标下的不同数据。）要注意的是，null 不参与任何聚合函数的运算。

常见聚合函数有：

count、max、min、avg 和 sum。

语法格式如下：

```sql
SELECT 聚合函数(字段列表) FROM 表名称;
```

# 分组查询

语法如下：

```sql
SELECT 字段列表 FROM 表名称 [WHERE 条件] GROUP BY 分组字段名 [HAVING 分组后过滤条件]
```

where 与 having 条件的区别：

+ 执行时机不同：where 是分组之间进行过滤；having 是分组之后对结果进行过滤。
+ 判断条件不同：where 不能对聚合函数进行判断；having 可以。

要注意的是，分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段没有意义。

例子如下：

1. 根据性别分组，并且统计男性员工和女性员工的数量：

``` 
select gender, count(*) from empolyee group by gender;
```

2. 根据性别分组，统计男性员工和女性员工的平均年龄：

```sql
select gender, avg(age) from employee group by gender;
```

3. 查询年龄小于 45 的员工，并根据工作地址分组，获取员工数量大于等于 3 的工作地址。

```sql
select location, count(*) from employee where age < 45 group by location having count(*) >= 3
```

# 排序查询

语法：

```sql
SELECT 字段列表 FROM 表名称 ORDER BY 字段1 排序方式1, 字段2 排序方式2, ...;
```

排序方式如下：

1. ASC：升序（默认值）
2. DESC：降序

如果是多字段排序，当第一个字段值相同时，才会根据第二个字段进行排序。

# 分页查询

语法：

```sql
SELECT 字段列表 FROM 表名称 LIMIT 起始索引,查询记录数;
```

注意：

+ 起始索引是从 0 开始。起始索引 = （查询页码 - 1） * 每页显示记录数。
+ 如果查询的是第一页的数据，起始索引可以省略，可以直接简写为 limit 10 的形式。

# 执行顺序问题

DQL 语句的编写顺序如下：

1. SELECT
2. FROM
3. WHERE
4. GROUP By
5. HAVING
6. ORDER BY
7. LIMIT

但是执行顺序如下：

1. FROM
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. ORDER BY
7. LIMIT

