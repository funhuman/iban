<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CarouselManage.aspx.cs"
  Inherits="UI.CarouselModular.CarouselManage" %>
<%@ Register TagPrefix="Header" TagName="Header" Src="/AscxModular/Header.ascx" %>
<%@ Register TagPrefix="Footer" TagName="Footer" Src="/AscxModular/Footer.ascx" %>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon">
  <title>轮播图控制后台 - iban 网</title>
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/index.css">
  <link rel="stylesheet" href="/css/default.css">
</head>
<body>
  <form id="form1" runat="server">
  <Header:Header ID="Header" runat="server"></Header:Header>
  <div class="main container">
    <div class="row">
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
          <%=RollString %>
          <%--<div class="item active">
                <img src="/images/Carousel01.jpg" alt="First slide">
                <div class="carousel-caption">标题 1</div>
              </div>
              <div class="item">
                <img src="/images/Carousel02.jpg" alt="Second slide">
                <div class="carousel-caption">标题 2</div>
              </div>
              <div class="item">
                <img src="/images/Carousel03.jpg" alt="Third slide">
                <div class="carousel-caption">标题 3</div>
              </div>--%>
        </div>
        <!-- 轮播（Carousel）导航 -->
        <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">
            Previous</span> </a><a class="right carousel-control" href="#myCarousel" role="button"
              data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true">
              </span><span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <div class="row">&nbsp;</div>
    <div class="row">
      <div class="col-sm-3">
        <asp:FileUpload ID="FileUpload1" runat="server" />
      </div>
      <div class="col-sm-1">
      </div>
      <div class="col-sm-8">
        <asp:Button class="btn btn-primary" ID="upload" runat="server" OnClick="upload_Click"
          Text="上传图片" />
      </div>
      <asp:Image ID="Image1" runat="server" />
      <div class="col-xs-12" style="height: 10px;">
      </div>
      <div class="col-xs-12">
        <span class="float-left col-xs-2">标题</span>
        <div class="col-xs-6">
          <asp:TextBox CssClass="form-control" ID="title" runat="server" ReadOnly></asp:TextBox>
        </div>
      </div>
      <div class="col-xs-12" style="height: 10px;">
      </div>
      <div class="col-xs-12">
        <span class="float-left col-xs-2">副标题</span>
        <div class="col-xs-6">
          <asp:TextBox CssClass="form-control" ID="subtitle" runat="server" ReadOnly></asp:TextBox></div>
      </div>
      <div class="col-xs-12" style="height: 10px;"></div>
      <div class="col-xs-12">
        <span class="float-left col-xs-2">备注</span>
        <div class="col-xs-6">
          <asp:TextBox CssClass="form-control" ID="description" runat="server" ReadOnly></asp:TextBox></div>
      </div>
      <div class="col-xs-12" style="height: 10px;">
      </div>
    </div>
    <div class="row">&nbsp;</div>
    <div class="row">
      <div class="btn-group btn-group-justified" role="group" aria-label="...">
        <div class="btn-group" role="group">
          <asp:Button class="btn btn-primary" ID="Button1" runat="server" OnClick="Button1_Click" disabled="disabled"
          Text="提交为轮播图1" />
        </div>
        <div class="btn-group" role="group">
          <asp:Button class="btn btn-primary" ID="Button2" runat="server" OnClick="Button2_Click" disabled="disabled"
          Text="提交为轮播图2" />
        </div>
        <div class="btn-group" role="group">
          <asp:Button class="btn btn-primary" ID="Button3" runat="server" OnClick="Button3_Click" disabled="disabled"
          Text="提交为轮播图3" />
        </div>
        <div class="btn-group" role="group">
          <a class="btn btn-primary" href="/index.aspx">返回首页</a>
        </div>
      </div>
    </div>
  </div>
  <Footer:Footer ID="Footer" runat="server"></Footer:Footer>
  </form>
  <script src="/js/jquery.min.js" type="text/javascript"></script>
  <script src="/js/bootstrap.min.js" type="text/javascript"></script>
</body>
</html>
