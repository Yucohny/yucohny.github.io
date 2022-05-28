# 字符串函数

+ ```sql
  CONCAT(S1, S2, ..., Sn)
  ```

  字符串拼接，将 S1、S2、... 和 Sn 拼接成一个字符串。

+ ```sql
  LOWER(str)
  ```

  将字符串 str 全部转为小写。

+ ```sql
  UPPER(str)
  ```

  将字符串 str 全部转为大写。

+ ```sql
  LPAD(str, n, pad)
  ```

  左填充，用字符串 pad 对 str 的左边进行填充，使得整个字符串长度为 n。

+ ```sql
  RPAD(str, n, pad)
  ```

  右填充，用字符串 pad 对 str 的右边进行填充，使得整个字符串长度为 n。

+ ```sql
  TRIM(str)
  ```

  去掉字符串头部和尾部的空格。

+ ```sql
  SUBSTRING(str, start, len)
  ```

  返回字符串 str 的 start 位置起长度为 len 的子字符串。

# 数值函数

+ ```sql
  CEIL(x)
  ```

  向上取整。

+ ```sql
  floor(x)
  ```

  向下取整

+ ```sql
  MOD(x, y)
  ```

  返回 x % y

+ ```sql
  RAND()
  ```

  返回 0 ~ 1 内的随机数

+ ```sql
  ROUND(x, y)
  ```

  求 x 四舍五入的值，保留 y 位小数。

# 日期函数

+ ```sql
  CURDATE()
  ```

  返回当前日期

+ ```sql
  CURTIME()
  ```

  返回当前时间

+ ```sql
  NOW()
  ```

  返回当前日期和时间

+ ```sql
  YEAR(date)
  ```

  获取 date 的所属年份。

+ ```sql
  MONTH(date)
  ```

  获取 date 的所属月份。

+ ```sql
  DAY(date)
  ```

  获取 date 的所属日期。

+ ```sql
  DATE_ADD(date, INTERVAL expr type)
  ```

  返回一个日期/时间值加上一个时间间隔 expr 后的时间值。

+ ```sql
  DATEDIFF(date1, date2)
  ```

  返回起始时间 date1 和结束时间 date2 之间的天数。

# 流程函数

+ ```sql
  IF(value, x, y)
  ```

  如果 value 为 true，则返回 x，否则返回 y。

+ ```sql
  IFNULL(value1, value2)
  ```

  如果 value1 不为空，则返回 value1，否则返回 value2。

+ ```sql
  CASE WHEN [val1] THEN [res1]... ELSE [default] END
  ```

  如果 val1 为 true，返回 res1，... 否则返回 default 默认值。

+ ```sql
  CASE [expr] WHEN [val1] THEN [res1] ... ELSE [default] END
  ```

  如果 expr 的值等于 val1，则返回 res1，... 否则返回 default 默认值。
