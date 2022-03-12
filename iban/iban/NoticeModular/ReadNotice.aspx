<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReadNotice.aspx.cs" Inherits="UI.NoticeModular.ReadNotice" %>

<%@ Register TagPrefix="Header" TagName="Header" Src="/AscxModular/Header.ascx" %>
<%@ Register TagPrefix="Footer" TagName="Footer" Src="/AscxModular/Footer.ascx" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon">
  <title><%= notice.notice_title %> - iban网</title>
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/notice.css">
  <link rel="stylesheet" href="/css/default.css">
</head>
<body>
  <Header:Header ID="Header" runat="server"></Header:Header>
  <div>
    <div class="container">
      <div class="row">
        <h2 class="notice-title">
          <%= notice.notice_title %></h2>
        <span class="notice-time">
          <%= notice.notice_time.ToString("yyyy-MM-dd HH:mm") %>&nbsp;/&nbsp;<%= notice.notice_editor_nikename %></span><%--&nbsp;<span class="badge">已读</span>--%>
      </div>
      <div class="row">&nbsp;</div>
      <div class="row">
        <div class="notice-text">
          <%= (notice.notice_text == "" ? "（通知无正文）" : Server.HtmlDecode(notice.notice_text)) %>
        </div>
      </div>
      <div class="row">&nbsp;</div>
      <div class="row">
        <div class="comment-title">
          评论区
        </div>
      </div>
      <div class="row">&nbsp;</div>
      <div class="row">
        <div class="comment-text">
          <%=comment_text %>
        </div>
      </div>
      <!-- 按钮触发模态框 -->
      <div style="margin: 0 auto; text-align: left;">
        <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal"
          style="margin: 10px auto">
          评论</button>
      </div>
      <!-- 模态框（Modal） -->
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <form id="form1" runat="server">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;</button>
                <h4 class="modal-title" id="myModalLabel">
                  评论</h4>
              </div>
              <div class="modal-body">
                <div>
                  <div style="width: 100%; margin: 0 auto;">
                    <%--<p class="col-xs-3">
                      邮箱</p>
                    <div class="col-xs-9">
                      <asp:TextBox ID="advise_email" runat="server" CssClass="form-control" placeholder="请输入邮箱方便管理员联系"></asp:TextBox>
                    </div>
                    <div class="col-xs-12" style="height: 20px;">
                    </div>--%>
                    <%--<div class="col-xs-3 package-key">
                      评论内容</div>--%>
                    <div class="col-xs-12">
                      <%--<textarea id="advise_text" rows="3" runat="server" placeholder="请输入建议内容" cssclass="form-control textarea-default col-xs-12"
                        style="width: 100%; padding: 6px 12px;"></textarea>--%>
                      <asp:TextBox ID="comment_textbox" runat="server" CssClass="form-control noresize"
                        Height="200px" TextMode="MultiLine" placeholder="请输入评论内容"></asp:TextBox>
                    </div>
                    <%--<div class="col-xs-12" style="height: 20px;">
                    </div>
                    <div class="col-xs-3 package-key">
                      附件</div>
                    <div class="col-xs-9">
                      <asp:FileUpload ID="FileUpload1" runat="server" CssClass="fileinput" />
                    </div>--%>
                    <div class="col-xs-12" style="height: 20px;">
                    </div>
                    <div class="col-xs-2">
                    </div>
                    <div class="col-xs-2">
                      <asp:Button ID="submit" runat="server" Text="提交" CssClass="btn btn-block btn-primary" OnClick="submit_Click" />
                    </div>
                    <div class="col-xs-2">
                    </div>
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <div class="col-xs-2">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal -->
        </form>
      </div>
    </div>
    <Footer:Footer ID="Footer" runat="server"></Footer:Footer>
  </div>
  <!-- JavaScript -->
  <script src="/js/jquery.min.js"></script>
  <script src="/js/bootstrap.min.js"></script>
</body>
</html>
