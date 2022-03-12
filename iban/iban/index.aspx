<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="UI.index" %>

<%@ Register TagPrefix="Header" TagName="Header" Src="/AscxModular/Header.ascx" %>
<%@ Register TagPrefix="Footer" TagName="Footer" Src="/AscxModular/Footer.ascx" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon">
  <title>首页 - iban 网</title>
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/index.css">
  <link rel="stylesheet" href="/css/default.css">
</head>
<body>
  <form id="form1" runat="server">
    <Header:Header ID="Header" runat="server"></Header:Header>
    <div>
      <!-- 轮播图 -->
      <div id="myCarousel" class="carousel slide">
        <!-- 轮播（Carousel）指标 -->
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <!-- 轮播（Carousel）项目 -->
        <div class="carousel-inner">
          <%=RollString%>
        </div>
        <!-- 轮播（Carousel）导航 -->
        <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">
            Previous</span> </a><a class="right carousel-control" href="#myCarousel" role="button"
              data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true">
              </span><span class="sr-only">Next</span> </a>
      </div>
      <!-- 新闻 -->
      <div class="notice container">
        <div class="row">
          <div class="col-md-8 col-xs-12">
            <h3>┃ 通知公告</h3>
            <%=NoticeString%>
          </div>
          <div class="col-md-1"></div>
          <div class="col-md-3 col-xs-12">
            <h3>┃ 校历周次</h3>
            <span id="school-week"><%=Weeks%></span>&nbsp;/
            <span id="date"></span>
            <%--<img src="/images/school_text.jpg" alt="school text"/>--%>
            <br>
            <h3>┃ 常用链接</h3>
            <p><a href="#">学校主页</a></p>
            <p><a href="#">教学信息综合服务平台</a></p>
            <p><a href="#">教务处</a></p>
            <p><a href="#">毕业设计管理系统</a></p>
          </div>
        </div>
      </div>
      <!-- 功能区 -->
      <div class="container module">
        <div class="row">
          <div class="col-xs-3 flag">
            <a href="/NoticeModular/ReadNotice.aspx?nid=40">
              <div class="module_img">
              </div>
              校历查询
            </a>
            </div><div class="col-xs-3 books">
            <a href="/NoticeModular/NoticeManage.aspx">
              <div class="module_img">
              </div>
              通知公告
            </a>
            </div><div class="col-xs-3 book">
            <a href="/TaskModular/TaskManage.aspx">
              <div class="module_img">
              </div>
              任务卡
            </a>
            </div><div class="col-xs-3 data">
            <a href="/NoticeModular/ReadNotice.aspx?nid=1">
              <div class="module_img">
              </div>
              学习天地
            </a>
          </div>
        </div>
      </div>
      <Footer:Footer ID="Footer" runat="server"></Footer:Footer>
    </div>
  </form>
  <script src="/js/jquery.min.js" type="text/javascript"></script>
  <script src="/js/bootstrap.min.js" type="text/javascript"></script>
  <script src="/js/default.js" type="text/javascript"></script>
</body>
</html>
