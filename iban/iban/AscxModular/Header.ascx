<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Header.ascx.cs" Inherits="UI.AscxModular.Header" %>
  <link rel="stylesheet" href="/css/index.css">
  <link rel="stylesheet" href="/css/default.css">
    <!-- 顶部 -->
    <%--<div class="container">
      <div class="row">
        <div class="header">
          <div class="col-xs-12">
            这里缺一个logo
          </div>
        </div>
      </div>
    </div>--%>
    <!-- 导航栏 -->
    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">
            <span class="sr-only">切换导航</span> <span class="icon-bar"></span><span class="icon-bar">
            </span><span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/index.aspx">首页</a>
        </div>
        <div class="collapse navbar-collapse" id="example-navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a href="/NoticeModular/NoticeManage.aspx">通知公告</a></li>
            <li><a href="/TaskModular/TaskManage.aspx">任务卡</a></li>
            <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">后台管理
              <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="/WebControlModular/CalendarManage.aspx">校历管理</a></li>
                <li class="divider"></li>
                <li><a href="/WebControlModular/CarouselManage.aspx">轮播图管理</a></li>
                <li class="divider"></li>
                <li><a href="/NoticeModular/NoticeManage.aspx">通知管理</a></li>
                <li class="divider"></li>
                <li><a href="/TaskModular/TaskManage.aspx">任务管理</a></li>
              </ul>
            </li>
            <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">用户 <%=user.nickname%>
              <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <%=user.uid == 0 ? "<li><a href='/UserModular/Login.aspx'>登录</a></li><li class='divider'></li>" : ""%>
                <li><a href="/UserModular/UserChange.aspx">修改信息</a></li>
                <li class="divider"></li>
                <li><a href="/UserModular/Login.aspx?type=exit">退出</a></li>
              </ul>
            </li>
          </ul><!-- /.nav.navbar-nav -->
        </div>
      </div>
    </nav><!-- /导航栏 -->