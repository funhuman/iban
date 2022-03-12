<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TaskChange.aspx.cs" Inherits="UI.TaskModular.TaskChange" %>

<%@ Register TagPrefix="Header" TagName="Header" Src="/AscxModular/Header.ascx" %>
<%@ Register TagPrefix="Footer" TagName="Footer" Src="/AscxModular/Footer.ascx" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon">
  <title>新增新闻 - iban 网</title>
  <link rel="stylesheet" href="/css/bootstrap.min.css" />
  <link rel="stylesheet" href="/css/default.css" />
  <link rel="stylesheet" href="Kindeditor/themes/default/default.css" />
  <link rel="stylesheet" href="Kindeditor/plugins/code/prettify.css" />
  <!-- datetimepicker -->
  <link rel="stylesheet" href="/js/datetimepicker-master/jquery.datetimepicker.css">
</head>
<body>
  <form id="form1" runat="server">
    <Header:Header ID="Header" runat="server"></Header:Header>
    <div>
      <div class="container main">
        <div class="row">
          <div class="col-xs-12">
          <h2><%= Convert.ToInt32(Request["nid"]) <= 0 ? "新增任务" : "修改任务"%></h2>
        </div>
        <div class="row">
          <label class="col-xs-1">
            任务标题</label>
          <div class="col-xs-6">
            <asp:TextBox ID="task_name" CssClass="form-control" runat="server" placeholder="任务标题"></asp:TextBox></div>
          <label class="col-xs-1">
            发布时间</label>
          <div class="col-xs-4">
            <asp:TextBox ID="create_time" CssClass="form-control time" runat="server" placeholder="（当前时间）"></asp:TextBox>
          </div>
        <div class="col-xs-12">&nbsp;</div>
          <label class="col-xs-1">
            开始时间</label>
          <div class="col-xs-6">
            <asp:TextBox ID="start_time" CssClass="form-control time" runat="server" placeholder="（当前时间）"></asp:TextBox></div>
          <label class="col-xs-1">
            结束时间</label>
          <div class="col-xs-4">
            <asp:TextBox ID="expiration_time" CssClass="form-control time" runat="server" placeholder="（当前时间）"></asp:TextBox>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-xs-12">
            <asp:TextBox id="task_text" runat="server" CssClass="form-control noresize" Height="200px" TextMode="MultiLine" placeholder="任务正文"></asp:TextBox>
          </div>
        </div>
        <br>
        <!-- 信息区 -->
        <div class="row">
          <div id="addinfo" class="col-xs-2 text-center">
            <%= (Request["AddCount"] != null ? "成功添加 " + Request["AddCount"] + " 条数据！" : "") %> 
          </div>
        </div>
        <br>
        <!-- 操作区 -->
        <div class="row">
          <div class="col-xs-2">
          </div>
          <div class="col-xs-3">
            <asp:Button ID="changeButton" runat="server" CssClass="btn btn-block btn-success" OnClick="changeButton_Click" />
          </div>
          <div class="col-xs-2">
          </div>
          <div class="col-xs-3">
            <a href='TaskManage.aspx' class="btn btn-block btn-danger">返回</a></div>
          <div class="col-xs-2">
          </div>
        </div>
      </div>
    </div>
    <Footer:Footer ID="Footer" runat="server"></Footer:Footer>
  </form>
  <script src="/js/jquery.min.js" type="text/javascript"></script>
  <script src="/js/bootstrap.min.js" type="text/javascript"></script>
  <script src="/js/default.js"></script>
  <script src="Kindeditor/kindeditor.js"></script>
  <script src="Kindeditor/lang/zh_CN.js"></script>
  <script>
    KindEditor.ready(function (K) {
      var editor1 = K.create('#task_text', {
        cssPath: 'Kindeditor/plugins/code/prettify.css',
        uploadJson: 'Kindeditor/upload_json.ashx',
        fileManagerJson: 'Kindeditor/file_manager_json.ashx',
        allowFileManager: true,
        afterCreate: function () {
          var self = this;
          K.ctrl(document, 13, function () {
            self.sync();
            K('form[id=task_text]')[0].submit();
          });
          K.ctrl(self.edit.doc, 13, function () {
            self.sync();
            K('form[id=task_text]')[0].submit();
          });
        }
      });
      prettyPrint();
    });
  </script>
  <!-- datetimepicker -->
  <script src="/js/datetimepicker-master/build/jquery.datetimepicker.full.js"></script>
  <script>
    $('.time').datetimepicker({
      format: 'Y-m-d H:i',
      step:1,
    });
    $.datetimepicker.setLocale('zh');
  </script>
</body>
</html>
