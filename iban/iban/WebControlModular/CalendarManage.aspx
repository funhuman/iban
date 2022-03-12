<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CalendarManage.aspx.cs" Inherits="UI.WebControlModular.CalendarManage" %>

<%@ Register TagPrefix="Header" TagName="Header" Src="/AscxModular/Header.ascx" %>
<%@ Register TagPrefix="Footer" TagName="Footer" Src="/AscxModular/Footer.ascx" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon">
  <title>校历设置 - iban 网</title>
  <!-- Bootstrap 3.3.7 2021-06-17 -->
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <!-- bootstrap datetimepicker -->
  <link rel="stylesheet" href="/js/datetimepicker-master/jquery.datetimepicker.css">
  <link rel="stylesheet" href="/css/default.css">
</head>

<body>
  <Header:Header ID="Header" runat="server"></Header:Header>
  <form id="form1" runat="server">
    <div>
      <div class="row">&nbsp;</div>
      <div class="container">
        <div class="jumbotron">
          <div class="container">
            <h2>设置开学日期</h2>
            <div class="col-xs-12">&nbsp;</div>
            <div class="col-xs-5">
              <asp:TextBox ID="datetimepicker" type="text" CssClass="form-control" runat="server" ReadOnly></asp:TextBox>
            </div>
            <div class="col-xs-7">&nbsp;</div>
            <div class="row">&nbsp;</div>
            <div class="row text-center">
              <div class="btn-group btn-group-toggle">
                <asp:Button class="btn btn-primary" ID="Button1" runat="server" OnClick="Button1_Click" Text="提交" />
                <a href="/index.aspx" class="btn btn-info">返回</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
  <Footer:Footer ID="Footer" runat="server"></Footer:Footer>
  <script src="/js/jquery.min.js" type="text/javascript"></script>
  <script src="/js/bootstrap.min.js" type="text/javascript"></script>
  <!-- bootstrap datetimepicker -->
  <script src="/js/datetimepicker-master/build/jquery.datetimepicker.full.js"></script>
  <script>
    $('#datetimepicker').datetimepicker({
      format: 'Y-m-d',
      timepicker:false,
      weeks: true,
    });
    $.datetimepicker.setLocale('zh');
  </script>
</body>
</html>
