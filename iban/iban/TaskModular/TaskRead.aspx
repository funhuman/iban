<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TaskRead.aspx.cs" Inherits="UI.TaskModular.TaskRead" %>

<%@ Register TagPrefix="Header" TagName="Header" Src="/AscxModular/Header.ascx" %>
<%@ Register TagPrefix="Footer" TagName="Footer" Src="/AscxModular/Footer.ascx" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon">
  <title><%= task.task_name %> - iban网</title>
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/index.css">
</head>
<body>
  <Header:Header ID="Header" runat="server"></Header:Header>
  <form id="form1" runat="server">
    <div>
      <div class="container">
        <div class="row">
          <h2 class="notice-title">
            <%= task.task_name%></h2>
          <span class="notice-time">
            <%= task.start_time.ToString("yyyy-MM-dd HH:mm") %>&nbsp;开始&nbsp;/&nbsp;<%= task.expiration_time.ToString("yyyy-MM-dd HH:mm")%>&nbsp;结束</span><%=progress>=100?"&nbsp;<span class='badge'>已结束</span>":""%>
          <div class="col-xs-4 pull-right">
            <div class="progress">
              <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="<%=progress * 100 %>" aria-valuemin="0" aria-valuemax="100" <%= "style='width: " + progress * 100 + "%'"%> >
                <span class="sr-only"><%=progress * 100 %> Complete</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="notice-text">
            <%= (task.task_text == "" ? "（通知无正文）" : Server.HtmlDecode(task.task_text)) %>
          </div>
        </div>
        <div class="row">&nbsp;</div>
        <div class="row">
          <asp:Button ID="task_finish" runat="server" Text="完成" CssClass="btn btn-primary" OnClick="submit_Click" />
        </div>
      </div>
    </div>
  </form>
  <Footer:Footer ID="Footer" runat="server"></Footer:Footer>
  <!-- JavaScript -->
  <script src="/js/jquery.min.js" type="text/javascript"></script>
  <script src="/js/bootstrap.min.js" type="text/javascript"></script>
  <script src="/js/default.js"></script>
</body>
</html>
