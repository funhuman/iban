# iban

<img src="https://img.shields.io/badge/license-MIT-green.svg" />

使用C#、SQL Serve、Bootstrap完成的作业项目。

### 环境

- 开发环境：Visual Studio 2010 Ultimate
- 数据库：SQL Server 2008 R2

## 使用指南

### 配置方法

1. 安装数据库
    使用 SQL Server 2008 R2 打开 `database/iban.sql`，执行。
2. 打开项目
    使用 Visual Studio 2010 Ultimate 打开 `database/iban/iban.sln`。
3. 运行项目
    在开发环境中找到 `index.aspx`，右击，选择在浏览器中查看（Ctrl+Shift+W）。
    系统需要数据库。如有登录异常，请刷新重试。

### 默认登录账号与密码

```
管理员
用户名：admin
密码：Ad.123

用户
用户名：123
密码：123
```

## 功能介绍

- 文章模块：文章创建、编辑和删除
- 用户模块：登录、用户信息修改

登录滑动验证模块参考了网络代码。

## 展示

![首页](/iban/iban/images/mainpage.png)

![登录页](/iban/iban/images/loginpage.png)

## 许可证

MIT
